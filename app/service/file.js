const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const formidable = require('formidable');
const Controller = require('egg').Controller;

class FileController extends Controller {
  async parse(req) {
    const form = new formidable.IncomingForm();
    form.uploadDir = './app/public/temp'; //设置临时文件存放目录
    form.maxFileSize = 2 * 1024 * 1024 * 1024; //最大2GB
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) throw err;
        resolve({ fields, files });
      });
    });
  }

  //文件重命名 folderName 空标识上传的是图片
  async rename(file, folderName = '') {
    let result = { url: '', size: '' };

    if (!file) return result;

    let sourcePath = path.join(this.config.baseDir, file.path);
    let folderPath = path.join(this.config.baseDir, 'app/public/' + (folderName ? 'upload' : 'images'), folderName);
    // 创建文件夹;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    let extName = path.extname(file.name);
    let fileName = file.name.replace(extName, '') + '.' + Date.now() + extName;
    let destPath = path.join(folderPath, fileName);
    try {
      fs.renameSync(sourcePath, destPath);
      if (folderName) {
        result.url = '/upload/' + folderName + '/' + fileName;
      } else {
        result.url = '/images/' + fileName;
      }
      result.size = file.size;
    } catch (e) {}
    return result;
  }

  /**
   * 【废弃】
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
      fileName = fileName + '.' + Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(file.name);
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

  async uploadImg(file, folderName) {
    let result = '';
    if (file) {
      // 获取 steam
      const rs = fs.createReadStream(file.path);
      // 生成文件名
      const fileName = folderName + '.' + Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(file.name);
      // 创建文件夹;
      const folderPath = path.join(this.config.baseDir, 'app/public/upload', folderName);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }
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

  delFile(url) {
    url = path.join(this.config.baseDir, 'app/public', url);
    if (fs.existsSync(url)) {
      fs.unlinkSync(url);
    }
  }
}

module.exports = FileController;
