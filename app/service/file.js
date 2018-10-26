const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const formidable = require('formidable');
const Controller = require('egg').Controller;

class FileController extends Controller {
  // async index() {
  //   this.ctx.body = '<a download href="/download/VX5s/v1.rar">v1.rar</a><br><a download href="/download/VX5s/v2.rar">v2.rar</a>';
  // }

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
  async upload(file, folderName, fileName) {
    let result = {
      url: '',
      size: ''
    };
    if (file) {
      // 获取 steam
      const rs = fs.createReadStream(file.path);
      // 生成文件名
      fileName = fileName + '-' + Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(file.name);
      // 创建文件夹;
      let folderPath = path.join(this.config.baseDir, 'app/public/upload', folderName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
      // 生成写入路径
      const target = path.join(folderPath, fileName);
      // 写入流
      const ws = fs.createWriteStream(target);
      try {
        // 写入文件
        await awaitWriteStream(rs.pipe(ws));
        result.url = '/upload/' + folderName + '/' + fileName;
        result.size = file.size;
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        await sendToWormhole(rs);
        throw err;
      }
    }
    return result;
  }

  async uploadImg(file) {
    let result = '';
    if (file) {
      // 获取 steam
      const rs = fs.createReadStream(file.path);
      // 生成文件名
      const fileName = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(file.name);
      // 生成写入路径
      const target = path.join(this.config.baseDir, 'app/public/images', fileName);
      // 写入流
      const ws = fs.createWriteStream(target);
      try {
        // 写入文件
        await awaitWriteStream(rs.pipe(ws));
        result = '/images/' + fileName;
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        await sendToWormhole(rs);
        throw err;
      }
    }
    return result;
  }

  async download() {
    // this.ctx.params['0']
    // let path = this.ctx.params['0'];
    const filePath = path.resolve(this.app.config.static.dir, 'upload/' + this.ctx.params['0']);
    // this.ctx.attachment('hello.rar');
    return fs.createReadStream(filePath);
  }

  // async downloadImage() {
  //   const url = 'http://cdn2.ettoday.net/images/1200/1200526.jpg';
  //   // return await this.ctx.curl(url, {
  //   //   streaming: true
  //   // });

  //   let filePath = path.join(this.config.baseDir, 'app/public/images', '15403766373841712.png');
  //   console.log(filePath);
  //   var content = fs.readFileSync(filePath, 'binary');
  //   // return fs.createReadStream(filePath);
  //   return content;
  // }

  delFile(url) {
    url = path.join(this.config.baseDir, 'app/public', url);
    if (fs.existsSync(url)) {
      fs.unlinkSync(url);
    }
  }
}

module.exports = FileController;
