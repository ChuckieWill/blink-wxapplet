// pages/my/my.js
import {BookModel} from '../../models/book.js'
import {ClassicModel} from '../../models/classic.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAuthor:false,
    userInfo:null,
    likeCount:0,
    likeList:[]

  },

//-----------------------------------------事件处理函数---------------------------
//用户授权弹窗处理
  onGotUserInfo(event){
    const userInfo = event.detail.detail.userInfo
    if(userInfo){
      this.setData({
        userInfo,
        showAuthor:true
      })
    }
  },
//跳转到期刊详情页
  onPreview(event){
    const id = event.detail.id
    const type = event.detail.type
    wx.navigateTo({
      url: `/pages/classic-detail/calssic-detail?id=${id}&type=${type}`,
    })
  },


//-----------------------------------------网络请求函数---------------------------
  _getUserInfor(){
    wx.getSetting({
      complete: (res) => {
        const flag = res.authSetting['scope.userInfo']
        if(flag){
          wx.getUserInfo({
            complete: (res) => {
              this.setData({
                userInfo:res.userInfo,
                showAuthor:true
              })
            },
          })
        }
      },
    })
  },

  _getMyBookCount(){
    bookModel.getMyBookCount().then((res)=>{
      this.setData({
        likeCount:res.data.count
      })
    })
  },

  _getMyFavor(){
    classicModel.getMyFavor((res)=>{
      this.setData({
        likeList:res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this._getUserInfor()
    this._getMyBookCount()
    this._getMyFavor()
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