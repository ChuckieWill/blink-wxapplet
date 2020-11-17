class Token {
  getTokenFromServer() {
    return new Promise((resolve, reject) => {
      this._getToken(resolve,reject)
    })
  }

  _getToken(resolve,reject){
    wx.login({
      success: (res) => {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:3000/v1/token/',
            method: "POST",
            data: {
              account: res.code,
              type: 100 //小程序登录方式
            },
            success: (res) => {
              console.log(res.data)
              const status = res.statusCode.toString()
              //状态码以2开头，表示请求成功
              if (status.startsWith('2')) {
                wx.setStorageSync('token', res.data.token)
                resolve()
              }
            },
            fail: (err)=> {
              reject()
            }
          })
        } else {
          reject()
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
}

export { Token }