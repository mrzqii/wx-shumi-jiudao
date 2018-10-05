// 使用promise的方式来封装接口

import { config } from '../config.js'
const tips = {
  1:'抱歉，出错啦',
  1005:'appkey无效',
  1004:'禁止访问',
  1006:'服务器内部错误',
  3000:'期刊不存在',
  2000:'你已经点过赞了',
  2001:'你还没有点过赞'
}

class HTTP {
  // promiss的写法
  // 对象的解构 方式传参
  request({url,data={}, method='GET'}){
    return new Promise((resolve,reject) => {
      this._request(url, resolve, reject, data, method)
    }) 
  }
  //http 请求类, 当noRefech为true时，不做未授权重试机制
  _request(url, resolve, reject, data={}, method='GET') {
    var that = this
    wx.request({
      url: config.api_base_url + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appKey
      },
      success: (res) =>{
        // 判断以2（2xx)开头的状态码为正确
        let code = res.statusCode.toString();
        if(code.startsWith('2')){
          resolve(res.data)
        }else{
          // 只是为了把promise状态更改为rejected
          reject()
          let error_code = res.data.error_code
          that._show_error(error_code)
        }
      },
      fail: function (err) {
        reject()
        that._show_error(1)
      }
    });
  }
  _show_error(error_code) {
    // 代码的健壮性
    if(!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip? tip:tips[1],
      icon: 'none',
      duration: 2000
    })
  }
};

export { HTTP };