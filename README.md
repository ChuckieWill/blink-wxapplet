# blink-wxapplet项目说明

> 本项目对应的服务端Github地址：**[ bink-backend](https://github.com/ChuckieWill/bink-backend)**

####  起步

* 1 克隆到本地

* 2 安装`package.json`文件中的依赖 ：`npm install`  

  * 工具 --> 构建 npm

* 3 修改配置信息

  * prject.config.json下设置appid

    ```js
    "appid": "自己的微信小程序appid" 
    ```

  * config.js下设置后端接口和appkey

    * 下面的接口为本项目对应的服务端[bink-backend](https://github.com/ChuckieWill/bink-backend)的基地址

    ```js
    api_base_url: 'http://localhost:3000/v1/',//后端接口基地址
    ```

    

