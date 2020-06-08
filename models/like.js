import {HTTP} from '../utils/http.js'

class LikeModel extends HTTP {
  //操作点赞（点赞or取消点赞）
  //behavior：期刊操作状态（喜欢like or 取消喜欢cancle）,artId:期刊号id,category:期刊类型type
  like(behavior,artId,category){
    let url = behavior=='like'?'like':'like/cancel'
    this.request({
      url,
      method:'POST',
      data:{
        art_id:artId,
        type:category
      }
    })
  }

  //实时获取点赞状态
  //artID:期刊id,category:期刊类型type,sCallback:回调函数
  getClassicLikeStatus(artID,category,sCallback){
    this.request({
      url:'classic/'+category+'/'+artID+'/favor',
      success:(res)=>{
        sCallback(res)
      }
    })
  }
}

export {LikeModel}