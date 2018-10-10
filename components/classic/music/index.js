// components/classic/music/music.js
import { classicBeh } from '../classic-beh.js'

let mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],

  properties: {
    src:String
     
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function() {
    console.log('11')
    this._recoverPlaying()
    this._monitorSwitch()
  },

  detached: function() {
    // wx.pauseBackgroundAudio()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      
      // 判断当前是否是播放状态
      if (!this.data.playing) {
        console.log(1)
        this.setData({
          playing: true,
        })
        if(mMgr.src == this.properties.src){
          mMgr.play()
        }
        else{
          // 当设置了新的 src 时，会自动开始播放,默认为空字符串
          mMgr.src = this.properties.src
        }
        mMgr.title = this.properties.title
      } else {
        console.log(2)
        this.setData({
          playing: false,
        })
        mMgr.pause()
      }
    },

    _recoverPlaying: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        console.log('aaa:'+mMgr.src)
        if (!mMgr.paused) {
          this.setData({
            playing: true
          })
        }
      }
    },

    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverPlaying()
      })
      mMgr.onPause(() => {
        this._recoverPlaying()
      })
      mMgr.onStop(() => {
        this._recoverPlaying()
      }),
      mMgr.onEnded(()=>{
        this._recoverPlaying()
      })
    }

  }
})