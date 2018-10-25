const Controller = require('egg').Controller;

class FileController extends Controller {
  async index() {
    this.ctx.body = '<a download href="/download/VX5s/v1.rar">v1.rar</a><br><a download href="/download/VX5s/v2.rar">v2.rar</a>';
  }

  /**
   * 上传文件，兼容单文件和多文件
   * @param customName 单文件自定义文件名
   * @param isAjax 上传方式
   */
  async upload() {
    await this.ctx.service.file.upload();
    ctx.success({});
  }

  async download() {
    this.ctx.set('Content-Type', 'application/octet-stream');
    this.ctx.body = await this.ctx.service.file.download();
  }

  // async downloadImage() {
  //   this.ctx.type = 'binary';

  //   let res = await this.ctx.service.file.downloadImage();
  //   console.log(this.ctx);
  //   this.ctx.body = res;
  // }
}

module.exports = FileController;
