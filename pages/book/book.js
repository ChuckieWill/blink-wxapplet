// pages/book/book.js
import {BookModel} from '../../models/book.js'
import {random} from '../../utils/commen.js'


let bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books:[],
    isSearch:false,
    isMore:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const hotList = bookModel.getHotList()
    hotList.then(
      (res)=>{
      console.log('book-hotlist',res)
      this.setData({
        books:res.data
      })
      },
      (error)=>{
      console.log(error)
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
    this.setData({
      isMore:random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //---------------------------------事件处理函数----------------------------
  //显示搜索页面
  onSearch(){
    this.setData({
      isSearch:true
    })
  },
  //退出搜索页面
  onCancle(){
    this.setData({
      isSearch:false
    })
  }
})