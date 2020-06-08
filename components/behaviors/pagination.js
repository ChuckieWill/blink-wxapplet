const paginationBev = Behavior({
    data:{
        dataArray:[],
        isGetMore:true,//列表数据全部加载完成时设置为false
        isLocked:false,//锁 用于控制上锁、解锁  确保网络请求不重复  发送网络请求时上锁  请求结束后解锁
    },

    methods:{
        setNewData(dataArray){
            if(dataArray.length == 0){
                this.data.isGetMore = false
            }

            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray:tempArray
            })
        },

        //获取加载更多时的起始页码
        getStart(){
            return this.data.dataArray.length
        },

        //是否还加载更多数据 若列表数据已全部加载完则返回false  --- 避免无用加载
        isGetMore(){
            return this.data.isGetMore
        },

        //是否服务器没有数据
        isNoData(){
            if(this.getStart() == 0 & !this.isGetMore()){
                return true
            }else{
                return false
            }
        },

        //恢复初始状态
        recovery(){
            this.setData({
                dataArray:[],
                isGetMore:true
            })
        },

        //获取锁的状态
        isLocked(){
            return this.data.isLocked
        },

        //上锁
        locked(){
            this.data.isLocked = true
        },

        //解锁
        unLocked(){
            this.data.isLocked =false
        } 
    }  
})

export {paginationBev}