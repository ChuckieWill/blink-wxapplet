// pages/classic-detail/calssic-detail.js
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classic:{}
    },

    //获取期刊详情
    _getClassicById(type,id){
        classicModel.getById(type,id,(res)=>{
            console.log(res,'期刊详情')
            this.setData({
                classic:res
            })
          })
    },

    //喜欢点击事件
    onLike(event){
        console.log(event)
        let behavior = event.detail.behavior
        likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._getClassicById(options.type,options.id)
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