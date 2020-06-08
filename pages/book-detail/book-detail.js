// pages/book-detail/book-detail.js
import {BookModel} from '../../models/book.js'
import {LikeModel} from '../../models/like.js'


let likeModel = new LikeModel()
let bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    likeCount:0,
    likeStatus:false,
    book:{},
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail,comments,likeStatus])
    .then((res)=>{
      this.setData({
        book:res[0].data,
        comments:res[1].data.comments,
        likeCount:res[2].data.fav_nums,
        likeStatus:res[2].data.like_status
      })
      wx.hideLoading()
    })

    // detail.then((res)=>{
    //   console.log('detail',res)
    //   this.setData({
    //     book:res.data
    //   })
    // })

    // comments.then((res)=>{
    //   this.setData({
    //     comments:res.data.comments
    //   })
    // })

    // likeStatus.then((res)=>{
    //   this.setData({
    //     likeStatus:res.data.like_status,
    //     likeCount:res.data.fav_nums
    //   })
    // })
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

  //------------------------事件处理函数-----------------------
  //点赞
  onLike(event){
    let behavior = event.detail.behavior
    likeModel.like(behavior,this.data.book.id,400)
  },
  //切换到评论
  onFakepost(){
    this.setData({
      posting:true
    })
  },
  //取消评论框
  onCancle(){
    this.setData({
      posting:false
    })
  },
  //提交短评
  onPost(event){
    const comment = event.detail.text || event.detail.value 

    if(!comment){
      return
    }

    if(comment.length>12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
    }

    bookModel.postComment(this.data.book.id,comment)
    .then((res)=>{
      wx.showToast({
        title: '+1',
        icon:'none'
      })

      this.data.comments.unshift({
        content:comment,
        nums:1
      })

      this.setData({
        comments:this.data.comments,
        posting:false
      })
    })
  }
})