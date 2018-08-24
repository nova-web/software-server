const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    // const newsList = await ctx.service.news.list(page);
    const newsList = [1, 2, 3];
    // await ctx.render('news/list.tpl', { list: newsList });
    // const newsList = await this.app.mysql.select('user');
    // ctx.body = { list: newsList };

    // await this.ctx.render('app/view/index.html');
    // console.log('~~', this.app.config.view.root);
    // const file = path.resolve(this.app.config.view.root[0], 'index.html');
    this.ctx.set('Content-Type', 'text/html');
    // this.ctx.body = await fs.readFileSync(file);
    // await this.ctx.render('index.html');
    await ctx.render('index.html');
  }
}

module.exports = NewsController;
