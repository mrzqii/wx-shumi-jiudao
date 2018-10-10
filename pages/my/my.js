
// 必须相对路径
 
import { BookModel } from '../../models/book.js'
import { ClassicModel } from '../../models/classic.js'
const bookModel = new BookModel
const classicModel = new ClassicModel
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否授权
    authorized:false,
    userInfo:null,
    bookCount:0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 必须用户已经授权了才能获取到信息
    // wx.getUserInfo({
    //   success:data=>{
    //     console.log(data)
    //   }
    // })
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  getMyBookCount(){
    console.log(2)
    bookModel.getMyBookCount()
    .then(res=> {
      this.setData({
        bookCount:res.count
      })
    })
  },
  getMyFavor(){
    classicModel.getMyFavor(res=> {
      this.setData({
        classics:res
      })
    })
  },
  onGetUserInfo(event){
    const userInfo = event.detail.userInfo
    if(!userInfo)return
    this.setData({
      authorized: true,
      userInfo: userInfo,
    })
  },
  userAuthorized(){
    wx.getSetting({
      success: data=>{
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            
            success:data => {
            
              this.setData({
                
                userInfo:data.userInfo,
                authorized:true
              })
            }
          })
        }
      }
    })
  },
  onJumpToAbout(){
    wx.navigateTo({
      url: '/pages/about/about'
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