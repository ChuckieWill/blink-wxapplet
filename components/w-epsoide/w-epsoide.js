// components/w-epsoide/w-epsoide.js
const months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index:String
  },

  observers:{
    index(num){
      let _index = num<10?'0'+num : num
      this.setData({
        _index
      })
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    month:'',
    year:0,
    _index:''
  },

  lifetimes:{
    attached(){
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()

      this.setData({
        year,
        month:months[month]
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
