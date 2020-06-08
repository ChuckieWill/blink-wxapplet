// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type: Boolean,
    },
    count:{
      type:Number
    },
    noChange:Boolean //传入true时 点击无效果
  },
  observers:{
     noChange(flag){
      if(flag){
        this.data.isChange = false
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
    isChange:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //---------------------------事件处理函数-------------------
    onLike(event){
      if(!this.properties.isChange){
        return
      }
      let like = this.properties.like
      let count = this.properties.count

      count = like?count-1:count+1
      this.setData({
        count:count,
        like:!like
      })
      //将喜欢状态传给组件调用方
      let behavior = this.data.like?'like':'cancle'
      this.triggerEvent('like',{
        behavior
      })

    }
  }
})
