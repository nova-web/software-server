//格式化日期
Date.prototype.format = function(fmt) {
  let o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(String(o[k]).length));
    }
  }
  return fmt;
};

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

module.exports = {
  formatDate(nS, format) {
    //日期格式化
    if (!nS) {
      return '';
    }
    format = format || 'yyyy-MM-dd hh:mm:ss';
    return new Date(nS).format(format);
  },
  pick(obj, arr) {
    return arr.reduce((iter, val) => (val in obj && (iter[val] = obj[val]), iter), {});
  },
  whereAndEq(obj) {
    let result = {};
    for (key in obj) {
      if (obj[key] && obj[key].length) {
        result[key] = obj[key];
      }
    }
    return result;
  },
  whereAndLike(obj) {
    let result = {};
    for (key in obj) {
      if (obj[key] && obj[key].length) {
        result[key] = {
          $like: `%${obj[key]}%`
        };
      }
    }
    return result;
  },
  whereOr(obj) {
    let result = {};
    let filters = this.whereAndLike(obj);
    if (Object.keys(filters).length) {
      result = { $or: filters };
    }
    return result;
  },
  whereDate(obj) {
    if (obj.start && obj.end) {
      return {
        $gte: new Date(obj.start),
        $lte: new Date(obj.end)
      };
    } else if (obj.start) {
      return {
        $gte: new Date(obj.start)
      };
    } else if (obj.end) {
      return {
        $lte: new Date(obj.end)
      };
    } else {
      return {
        $lte: new Date()
      };
    }
  }
};
