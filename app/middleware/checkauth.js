module.exports = options => {
  return async function checktoken(ctx, next) {
    console.log('middleware [checkauth]');
    if (ctx.userId === 0) {
      await next();
    } else {
      const url = ctx.request.method.toLowerCase() + ctx.request.url;
      const urls = await ctx.service.acl.getAclUrls();
      console.log(url, urls);
      let access = false;
      for (let i = 0; i < urls.length; i++) {
        if (url.indexOf(urls[i]) !== -1) {
          access = true;
          break;
        }
      }
      console.log('access', access);
      if (access) {
        await next();
      } else {
        ctx.status = 403;
        ctx.fail('访问受限');
      }
    }
  };
};
