// app.js
module.exports = app => {
  app.on('error', (err, ctx) => {
    let errMsg = '';
    if (err.name === 'SequelizeValidationError') {
      errMsg = err.errors.map(item => item.message);
      ctx.fail(errMsg);
    }
  });
  app.on('request', ctx => {
    console.log(`--------------${ctx.request.method}请求${ctx.request.url}--------------`);
  });
  app.on('response', ctx => {
    if (ctx.response.status === 500) {
      ctx.body = '系统错误';
      ctx.status = 500;
    }
  });
};
