// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:{},
    first:false,//右侧  最新一期   期刊号在classic.index中记录 最新一期则index最大一期
    latest:true,//左侧  第一期     往右期刊号减小 期刊号index最小的一期
    likeStatus:false,//喜欢状态
    likeCount:0,//喜欢人数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      console.log('classic页面getLatest',res)
      this.setData({
        classic:res,
        likeCount:res.fav_nums,
        likeStatus:res.like_status
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

  },

  //-----------------------------事件处理函数------------------------
  //喜欢点击事件
  onLike(event){
    console.log(event)
    let behavior = event.detail.behavior
    likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
  },
  //navi切换组件点击左按钮(下一期)
  onNext(){
    this._getClassic('next')
  },
  //navi切换组件点击右按钮(上一期)
  onPrevious(){
   this._getClassic('previous')
  },

  //-----------------------------工具函数------------------------
  //获取当前期刊前一期或后一期的期刊数据
  _getClassic(nextOrPrevious){
    let index = this.data.classic.index
    classicModel.getClassic(index,nextOrPrevious,(res)=>{
      console.log('classic页面getClassic',res)
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic:res, 
        latest:classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
      })
    })
  },

  //获取期刊的点赞实时状态
  _getLikeStatus(artID,category){
    likeModel.getClassicLikeStatus(artID,category,(res)=>{
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
  }
})