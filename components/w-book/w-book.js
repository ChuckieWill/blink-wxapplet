// components/w-book/w-book.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
    showLike:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //事件处理 -- 跳转到book详情页面
    onTap(){
      const bid = this.properties.book.id 
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}`,
      })
    }

  }
})
