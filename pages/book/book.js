// pages/book/book.js
import { BookModel} from '../../models/book.js'
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 这里举一个列子来说明promise的正确用法，比如需要依次调用接口API1,API2,API3
    // 注意这里写的bookModel.getHotList返回的是promise对象

    // 错误的使用方式： 也是一个回调地狱
    // const hotList = bookModel.getHotList()
    // hotList.then((res => {
    //     console.log(res) 
    //     bookModel.getHotList2()
    //     .then(res => {
    //       console.log(res)
    //       bookModel.getHotList3()
    //       .then((res) => {
    //         console.log(res)
    //       })
    //     })
    //   })
    // )

    // 正确的方式： 解决回调地狱的方式
    // bookModel.getHotList()
    //   .then((res) => {
    //     console.log(res)
    //     return bookModel.getHotList2()
    //   })
    //   .then((res) => {
    //     console.log(res)
    //     return bookModel.getHotList3()
    //   })
    //   .then((res) => {
    //     console.log(res)
    //   })
    bookModel.getHotList()
      .then( res => {
        this.setData({
          books:res
        })
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})