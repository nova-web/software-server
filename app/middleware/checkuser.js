module.exports = options => {
  return async function checkuser(ctx, next) {
    console.log('middleware [checkuser]');
    //TODO
    await next();
  };
};
