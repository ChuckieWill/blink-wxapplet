import {Base64} from 'js-base64'
import {config} from '../config.js'
import {Token} from './token.js'

const tips = {
    1: '抱歉，出现了一个错误',
    1005:'appkey无效，请前往www.7yue.pro申请',
    3000:'期刊不存在'
}

class HTTP{
    request({url,data={},method='GET'}){
      return new Promise((resolve,reject)=>{
        this._request(url,resolve,reject,data,method)
      })
    }
    _request(url,resolve,reject,data={},method='GET', noRefetch=false){
        wx.request({
            method,
            data,
            url:config.api_base_url + url,
            header:{
                // 'content-type':'application/json',
                // 'appkey':config.appkey
                Authorization: this._encode()

            },
            success:(res)=>{
                let code = res.statusCode.toString()
                if (code.startsWith('2')){
                    //返回token验证成功
                  resolve(res)
                }
                else{
                    if(code == '403'){
                        //token过期
                        if(!noRefetch){
                            //重新获取token
                            this._refetch(
                                url,
                                resolve,
                                reject,
                                data,
                                method
                            )
                        }
                    }else{
                        //返回token验证失败
                        reject()
                        let error_code = res.data.error_code
                        this._show_error(error_code)
                    }
                }
            },
            fail:(err)=>{
                reject()
                this._show_error(1)
            }
        })

    }

    //服务器异常处理
     _show_error(error_code){
        if(!error_code){
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip?tip:tips[1], 
            icon:'none',
            duration:2000
        }) 
    }

    //刷新token，并二次重发
    _refetch(...param){
        let token = new Token()
        //刷新token
        token.getTokenFromServer().then((token) => {
            //二次重发
            this._request(...param, true)
        })
    }

    //给token进行base64加密
     _encode() {
        const token = wx.getStorageSync('token')
        const base64 = Base64.encode(token + ":")
        return 'Basic ' + base64
    }


}

export {HTTP}
