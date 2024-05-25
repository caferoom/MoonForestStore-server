
+ 基于开源项目NideShop重建，精简了一些功能的同时完善了一些功能，并重新设计了UI
+ 测试数据来自上述开源项目
+ 服务端api基于Ｎode.js+ThinkJS+MySQL

### 本地开发环境配置
+ 克隆项目到本地
+ 创建数据库hiolabsDB并导入项目根目录下的hiolabsDB.sql 
推荐使用软件Navicat创建和管理数据库，也可以用以下命令创建：
```
CREATE SCHEMA `hiolabsDB` DEFAULT CHARACTER SET utf8mb4 ;
```
> 注意数据库字符编码为utf8mb4 
+ 更改数据库配置
  src/common/config/database.js
```
const mysql = require('think-model-mysql');

module.exports = {
    handle: mysql,
    database: 'hiolabsDB',
    prefix: 'hiolabs_',
    encoding: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123123', //你的密码
    dateStrings: true
};
```

+ 填写微信登录和微信支付配置和其他设置，比如七牛，阿里云快递等等

src/common/config/config.js
```
// default config
module.exports = {
  default_module: 'api',
  weixin: {
    appid: '', // 小程序 appid
    secret: '', // 小程序密钥
    mch_id: '', // 商户帐号ID
    partner_key: '', // 微信支付密钥
    notify_url: '' // 微信异步通知，例：https://www.hiolabs.com/api/pay/notify
  }
};
```

+ 安装依赖并启动
```
npm install
npm start
```

如果安装不成功，百度搜索cnpm，用淘宝源代替，替换后，用cnpm i进行安装依赖  

启动后，本地访问 http://127.0.0.1:8360/

### 上线需要以下准备工作： 
+ 一个微信服务公众号  
+ 阿里云服务器  
+ 注册小程序  
+ 完成认证的七牛  
+ 完成API安全设置的微信商户，并绑定好小程序id（支付）   
+ 阿里云物流api  
+ 备案后的域名  
+ 如果卖食品，还需要《食品经营许可证》  

也不一定用七牛云的服务，可以用本地存储，不过要自己开发上传功能，可以参考项目中的upload.js  

客服使用微信小程序官方提供的客服功能即可


### 功能列表
+ 首页：搜索、Banner、公告、分类Icons、分类商品列表
+ 详情页：加入购物车、立即购买、选择规格
+ 搜索页：排序
+ 分类页：分页加载商品
+ 我的页面：订单（待付款，待发货，待收货），足迹，收货地址
