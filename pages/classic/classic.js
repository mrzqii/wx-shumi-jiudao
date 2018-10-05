// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true, //最新一期期刊是true因为在onLoad里面获取的就是latest
    first: false,
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((data) => {
     
      this.setData({
        classic: data,
        likeStatus: data.like_status,
        likeCount: data.fav_nums,
        
      })
    })
  },

  onPrevious: function (event) {
    this._updateClassic('previous')
  },

  onNext: function (event) {
     this._updateClassic('next')
  },
  // 点击喜欢以后向服务器发送数据保存
  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  _updateClassic:function(nextOrPrevious){
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (data) => {
      // if (data) {
        this._getLikeStatus(data.id, data.type)
        this.setData({
          classic: data,
          latest: classicModel.isLatest(data.index),
          first: classicModel.isFirst(data.index)
        })
      // }
      // else {
      //   console.log('not more classic')
      // }
    })
  },

  _getLikeStatus: function (cid, category) {
    likeModel.getClassicLikeStatus(cid, category, (data) => {
      this.setData({
        likeStatus: data.like_status,
        likeCount: data.fav_nums
      })
    })
  },

  onShareAppMessage() {

  }
})