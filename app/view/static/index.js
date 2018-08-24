(function() {
  if (!window.Android) {
    window.Android = {
      getIp: function() {
        return '172.16.41.110';
      },
      getLanguage: function() {
        return Number((window.localStorage.getItem('lang') || 'zh') === 'zh');
      },
      setEnglish: function() {},
      setChinese: function() {},
      checkVersion: function() {
        return 0;
      },
      setConfigured: function() {},
      getConfigured: function() {
        return true;
      },
      getVersionName: function() {
        return '2.0.0.T2';
      },
      returnDeviceList: function() {},
      startUpdate: function() {
        return 0;
      },
      openOperation() {},
      alteredPassword() {}
    };
  }

  var ip = Android.getIp();
  window.Android = Android;
  window.apihost = 'http://' + ip + ':5000';
  window.offline = ip === '127.0.0.1';
  window.goHistory = function() {
    if (window.showImageLoading) {
      return false;
    }

    if (window.location.hash !== '#/') {
      window.history.go(-1);
    } else {
      window.Android.returnDeviceList();
    }
  };
})();
