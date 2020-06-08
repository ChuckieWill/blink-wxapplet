// components/w-navi/w-navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean,//右侧  第一期
    latest:Boolean//左侧  最新一期
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc:'images/triangle.dis@left.png',
    leftSrc:'images/triangle@left.png',
    disRightSrc:'images/triangle.dis@right.png',
    rightSrc:'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击左侧按钮
    onLeft(event){
      console.log('组件内next',!this.properties.latest)
      //如果不是最新一期则抛出事件
      if(!this.properties.latest){
        console.log('判断后组件内next')
        this.triggerEvent('left',{},{})
      }
    },
    //点击右侧按钮
    onRight(event){
      //如果不是第一期则抛出事件
      console.log('组件内previous',!this.properties.first)
      if(!this.properties.first){
        console.log('判断后组件内previous')
        this.triggerEvent('right',{},{})
      }
    }

  }
})
