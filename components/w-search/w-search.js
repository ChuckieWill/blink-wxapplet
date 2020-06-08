// components/w-search/w-search.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
import {paginationBev} from '../behaviors/pagination.js'


let bookModel = new BookModel()
let keywordModel = new KeywordModel()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [paginationBev],
    properties: {
        isMore:String
    },
    observers:{
        isMore(isMore){
            console.log('shanglachudi')
            this._showLoadingBottom()
            this._getSearch(this.data.keyword)
        }
    },

    /**
     * 组件的初始数据
     */ 
    data: {
        historyWord:[],
        hotWord:[],
        isSearch:false,//控制搜索书籍列表的显示
        keyword:'',
        isNoData:false, //服务器没有加载到数据
        loadingBottom:false,
        loadingCenter:false,
    },

    lifetimes: {
        attached: function() {
          // 在组件实例进入页面节点树时执行
          const historyWord = keywordModel.getHistory()
          this.setData({
              historyWord
          })

          keywordModel.getHot().then((res)=>{
              this.setData({
                  hotWord:res.data.hot
              })
          })
        },
      },
      
    /**
     * 组件的方法列表
     */
    methods: {
        //退出搜索结果
        onDetele(){
            this._closeSearchResult()            
        },
        //取消搜索
        onCancle(){
            this.triggerEvent('cancle',{})
        },
        //搜索输入
        onConfirm(event){
            const keyword = event.detail.value || event.detail.text
            this._showSearchResult(keyword)
            this._showLoadingCenter()
            this.recovery()
            this._getSearch(keyword)
        },

        //向服务器请求搜索的数据及相关业务
        _getSearch(keyword){
            //判断keyword是否为空  若为空则直接退出网络请求
            if(keyword == false){
                this._hideLoadingBottom()
                return 
            }
            //判断是否上锁 若上锁则直接退出网络请求
            if(this.isLocked()){
                return
            }
            
            // 判断是否加载完所有数据  若全部加载完则不再发送网络请求 避免发送多次无用的请求消耗资源
            if(this.isGetMore()){
                //上锁
                this.locked()
                //向服务器请求搜索数据
                bookModel.getSearch(this.getStart(),keyword).then((res)=>{
                    this.setNewData(res.data.books)
                    //没有加载到数据
                    if(this.isNoData()){
                        this.setData({
                            isNoData:true
                        })
                    }
                    //解锁
                    this.unLocked()
                    //将搜索词写入历史搜索
                    keywordModel.addToHistory(keyword)
                    this._hideLoadingCenter()
                    this._hideLoadingBottom()
                },()=>{
                    //解锁
                    this.unLocked()
                })
            }
            
        },

        _showSearchResult(keyword){
            this.setData({
                keyword,
                isSearch:true
            })
        },

        _closeSearchResult(){
            this.setData({
                isSearch:false,
                keyword:'',
                isNoData:false,
            })
        },

        _showLoadingCenter(){

            this.setData({
                loadingCenter:true
            })
        },

        _hideLoadingCenter(){
            this.setData({
                loadingCenter:false
            })
        },

        _showLoadingBottom(){
            this.setData({
                loadingBottom:true
            })
        },

        _hideLoadingBottom(){
            this.setData({
                loadingBottom:false
            })
        },


    }
})
