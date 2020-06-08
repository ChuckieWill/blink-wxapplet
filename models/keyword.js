import {
    HTTP
  } from '../utils/http-p.js'

class KeywordModel extends HTTP{
    key = 'q'
    maxLength = 10

    //从本地获取历史搜索
    getHistory(){
        const word = wx.getStorageSync(this.key)
        if(!word){
            return []
        }
        return word
    }

    //从服务器获取热门搜索
    getHot(){
        return this.request({
            url:'book/hot_keyword'
        })
    }

    //将搜索历史加入本地
    addToHistory(keyword){
        let word = this.getHistory()
        const had = word.includes(keyword)
        if(!had){
            const length = word.length
            if(length>=this.maxLength){
                word.pop()
            }
            word.unshift(keyword)
            wx.setStorageSync(this.key, word)
        }
    }

}

export  { KeywordModel}