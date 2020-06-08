// components/classic/w-music/w-music.js
import {
  classicBeh
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String,
  },
  observers: {
    src(src) {
      this._recoverStatus()
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    isPlaying: false
  },

  lifetimes: {
    attached: function() {
      this._monitorSwith()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //------------------------------事件处理函数------------------------------
    //播放切换
    playChange() {
      if (this.data.isPlaying) {
        mMgr.pause()
        this.setData({
          isPlaying: false
        })
      } else {
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
        this.setData({
          isPlaying: true
        })
      }
    },

    //------------------------------工具函数------------------------------
    //控制音乐播放暂停的状态
    _recoverStatus() {
      //判断是否为正在播放的音乐
      if (mMgr.src == this.properties.src) {
        //判断背景音乐是否暂停
        if (mMgr.paused) {
          this.setData({
            isPlaying: false
          })
        } else {
          this.setData({
            isPlaying: true
          })
        }
      } else {
        this.setData({
          isPlaying: false
        })
      }
    },

    //监听控制面板对音乐的控制并更新音乐播放暂停的状态
    _monitorSwith() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
    },

  }

})