// components/w-tag/w-tag.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true
    },
    externalClasses:['tag-class'],
    properties: {
        comment:String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(){
            this.triggerEvent('taping',{
                text:this.properties.comment
            })
        }
    }
})
