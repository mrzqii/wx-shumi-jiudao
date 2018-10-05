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
   
  

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params) {
    
    var that = this

    if (!params.method) {
      params.method = 'GET';
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appKey
      },
      success: (res) =>{
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        let code = res.statusCode.toString();
        // var startChar = code.charAt(0);
        // if (startChar == '2') {
        //   params.success && params.success(res.data);
        // } else {
        //   params.error && params.error(res);
        // }
        // 使用es6的新方法
        // startsWith
        // endsWidth
        if(code.startsWith('2')){
          params.success && params.success(res.data)
          
        }else{
          let error_code = res.data.error_code
          that._show_error(error_code)
        }
      },
      fail: function (err) {
        that._show_error(1)
      }
    });
  }

  _show_error(error_code) {
    // 代码的健壮性
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
};

export { HTTP };