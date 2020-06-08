import {HTTP} from '../utils/http.js'

class ClassicModel extends HTTP {
  //获取最新一期
  //sCallback:回调函数
  getLatest(sCallback){
    this.request({
      url: 'classic/latest',
      success:(res)=>{
        sCallback(res)
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
      }
    })
  }

  //获取当前一期的上一期或下一期
  //该函数代替getNext() 和 getPrevious()
  //sCallback:回调函数  index:当前期刊的序号  nextOrPrevious:传入next or previous
  getClassic(index,nextOrPrevious,sCallback){
    //从缓存获取  or  api获取并存入缓存
    //确定key
    let key = nextOrPrevious == 'next'?this._getKey(index+1):this._getKey(index-1)
    let classic = wx.getStorageSync(key)
    if(!classic){
      this.request({
        url:'classic/'+index+'/'+nextOrPrevious,
        success:(res)=>{
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    }else{
      sCallback(classic)
    }
    
  }

  //获取我喜欢的期刊数据
  getMyFavor(sCallback){
    this.request({
      url:'classic/favor',
      success:(res)=>{
        sCallback(res)
      }
    })
  }

  //获取某一期详情信息
  //id:期刊id  type:期刊类型
  getById(type,id,sCallback){
    this.request({
      url:`classic/${type}/${id}`,
      success:(res)=>{
        sCallback(res)
      }
    })

  }

  // 获取当前一期的上一期(右侧)
  // sCallback:回调函数  index:当前期刊的序号
  // getPrevious(index,sCallback){
  //   this.request({
  //     url:'classic/'+index+'/previous',
  //     success:(res)=>{
  //       sCallback(res)
  //     }
  //   })
  // }

  // 获取当前一期的下一期（左侧）
  // sCallback:回调函数  index:当前期刊的序号
  // getNext(index,sCallback){
  //   this.request({
  //     url:'classic/'+index+'/next',
  //     success:(res)=>{
  //       sCallback(res)
  //     }
  //   })
  // }

  //判断是否为第一期
  isFirst(index){
    return index == 1 ? true:false
  }

  //判断是否为最新一期
  isLatest(index){
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ?true:false
  }

  //将最新期刊号存入本地
  _setLatestIndex(index){
    wx.setStorageSync('latest', index)
  }

  //从本地获取最新期刊号
  _getLatestIndex(){
    let index = wx.getStorageSync('latest')
    return index
  }

  //确定期刊存入本地的key
  _getKey(index){
    let key = 'classic-'+index
    return key 
  }
}

export {ClassicModel}