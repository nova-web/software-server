const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const formidable = require('formidable');
const Controller = require('egg').Controller;

class FileController extends Controller {
  async index() {
    this.ctx.body = '<a download href="/download/VX5s/v1.rar">v1.rar</a><br><a download href="/download/VX5s/v2.rar">v2.rar</a>';
  }

  async parse(req) {
    const form = new formidable.IncomingForm();
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        resolve({ fields, files });
      });
    });
  }

  /**
   * 上传文件，兼容单文件和多文件
   * @param customName 单文件自定义文件名
   * @param isAjax 上传方式
   */
  async upload() {
    const { ctx, logger } = this;
    const extraParams = await this.parse(ctx.req);
    let { multipleFile, customName, isAjax } = extraParams && extraParams['fields'];
    logger.info(multipleFile, customName, isAjax);
    const urls = [];
    for (let key in extraParams.files) {
      const file = extraParams.files[key];
      logger.info('file.name', file.name);
      logger.info('customName', customName);
      const stream = fs.createReadStream(file.path);
      const fileName = customName ? customName + path.extname(file.name) : file.name;

      // if (!fs.existsSync(path)) { 创建文件夹
      //  fs.mkdirSync(path);
      // }

      const target = path.join(this.config.baseDir, 'app/public/upload', fileName);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      urls.push(target);
    }
    ctx.body = { status: 1 };
    ctx.status = 200;
  }

  async download() {
    // this.ctx.params['0']
    // let path = this.ctx.params['0'];
    const filePath = path.resolve(this.app.config.static.dir, 'upload/' + this.ctx.params['0']);
    // this.ctx.attachment('hello.rar');
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = fs.createReadStream(filePath);
  }

  // async downloadImage() {
  //   const url = 'http://cdn2.ettoday.net/images/1200/1200526.jpg';
  //   const res = await this.ctx.curl(url, {
  //     streaming: true
  //   });

  //   this.ctx.type = 'jpg';
  //   this.ctx.body = res.res;
  // }
}

module.exports = FileController;
