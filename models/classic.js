import { HTTP } from '../util/http.js'
// import { ClassicStorage } from '../models/classic-storage.js'

class ClassicModel extends HTTP {
  // prefix = 'classic'

  constructor() {
    super()
  }

  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        // 如果不用箭头函数，this将指代不正确
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
        this._setLatestIndex(res.index)
        sCallback(res)
      }
    })
  }

  getPrevious(index, sCallback) {
    this._getClassic(index, 'previous', sCallback)
  }

  getNext(index, sCallback) {
    this._getClassic(index, 'next', sCallback)
  }

//   getById(cid, type, success) {
//     let params = {
//       url: 'classic/' + type + '/' + cid,
//       success: success
//     }
//     this.request(params)
//   }

  isLatest(index) {
    let key = this._getKey('latest-' + index)
    let latestEpsoide = wx.getStorageSync(key)
    if (latestEpsoide) {
      if (index == latestEpsoide) {
        return true
      }
    }
    else return false
  }
  // 判断是不是第一期
  isFirst(index) {
    if (index == 1) {
      return true
    }
    else return false
  }

//   getMyFavor(success) {
//     let params = {
//       url: 'classic/favor',
//       success: success
//     }
//     this.request(params)
//   }

  getClassic(index, next_or_previous, sCallback) {
    let key = next_or_previous == 'next' ? this._getKey(index + 1) :
      this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      let params = {
        url: `classic/${index}/${next_or_previous}`,
        success: (data) => {
          let key = this._getKey(data.index)
          wx.setStorageSync(key, data)
          sCallback(data)
        }
      }
      this.request(params)
    }
    else {
      sCallback(classic)
    }
  }

  /**
   * 在缓存中存放最新一期的期数
   */
  _setLatestIndex(index) {
    let key = this._getKey('latest-' + index)
    wx.setStorageSync(key, index)
  }

  _getLatestEpsoide(index) {
    let key = this._getKey(index)
    return wx.getStorageSync(key)
  }

  _getKey(partKey) {
    let key = this.prefix + '-' + partKey
    return key
  }
}

export { ClassicModel }