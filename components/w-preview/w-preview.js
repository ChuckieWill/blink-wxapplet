// components/w-preview/w-preview.js
const types = ['','电影','音乐','句子']
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        classic:Object
    },

    //100 电影 200 音乐 300 句子
    observers:{
        ['classic.type'](count){
            const index = count/100
            this.setData({
                type:types[index]
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        type:''
    },

    /**
     * 组件的方法列表
     */
    methods: {
    //点击事件抛出
        onTap(){
            this.triggerEvent('tapping',{
                id:this.properties.classic.id,
                type:this.properties.classic.type
            })
        }
    }
})
