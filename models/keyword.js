import { HTTP } from '../util/http-p.js'

class KeywordModel extends HTTP {
  key = 'q'
  maxLength = 10

  // 获取所有历史搜索的关键字
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if(!words) {
      return []
    }
    return words
  }

  getHot() {
    return this.request({
      url: './book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    // ES6语法
    const has = words.includes(keyword)
    // 如果缓存是有这个关键词的话就不做处理
    if(!has) {
      const length = words.length
      if(length >= this.maxLength){
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)

    }
     
  }

}

export { KeywordModel}