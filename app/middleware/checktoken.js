module.exports = options => {
  return async function checktoken(ctx, next) {
    console.log('middleware [checkauth]');
    console.log(ctx.request.method.toLowerCase() + ctx.request.url);
    await next();
  };
};
