import {
  HTTP
} from '../utils/http-p.js'


class BookModel extends HTTP {
  //获取热门书籍列表
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  //获取书籍详情
  getDetail(bid){
    return this.request({
      url:`book/${bid}/detail`
    })
  }

  //获取书籍点赞状态
  getLikeStatus(bid){
    return this.request({
      url:`book/${bid}/favor`
    })
  }

  //获取书籍的短评
  getComments(bid){
    return this.request({
      url:`book/${bid}/short_comment`
    })
  }
  
  //获取我喜欢的书籍的数量
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  //提交书籍短评
  postComment(bid,comment){
    return this.request({
      url:'book/add/short_comment',
      method:'POST',
      data:{
        book_id:bid,
        content:comment
      }
    })
  }

  //获取书籍搜索结果
  getSearch(start,q){
    return this.request({
      url:'book/search',
      data:{
        start,
        q,
        summary:1,
      }
    })
  }
}



export {
  BookModel
}