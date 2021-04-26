"less.compile": {
  "outExt": ".css"
},


#### 一、按需导入 ant-design插件,
react-app-rewired、babel-plugin-import
** 修改 config-overrides.js 文件 **
``` const { injectBabelPlugin } = requir('react-app-rewired');
  module.exports = function override(config, env) {
   config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    return config;
  };
``` 
但是会报错：``` The "injectBabelPlugin" helper has been deprecated as of v2.0. You can use customize-cra plugins in replacement ```
解决:npm install customize-cra --save-dev（less、less-loader）
``` 
const {
    override,
    fixBabelImports,
    // addLessLoader,
} = require("customize-cra");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd", libraryDirectory: "es", style: 'css' // change importing css to less
    }),
    // addLessLoader({
    //   javascriptEnabled: true,
    //   modifyVars: { "@primary-color": "#1DA57A" }
    // })
);

```

#### 跨域问题 **什么是跨域问题？
在package.json 中设置"proxy":"http://localhost:3333"

#### redux的流程,redux怎样与组件共享状态(connect()(组件名)),怎样利用redux里的state完成重定向
#### axios的封装(->ajax) 主要是怎样将data拼接到get请求的url里

*6.28*
### 怎么在非路由组件里使用路由组件的api

##  URL 和 URI 的区别和联系

## 怎么将tabbar中的四个Item动态减少一个

*6.29*
#####  头像和avatar冲突，找到选择头像组件将text修改
#####  注册老板时跳转到satffinfo界面，因为getRedirectTo()中判断错用了Boss,(应该用laoban--->表单中用的是laoban )
###  height:100%和height:inherit的区别

*6.30*
###### mongodb突然连接超时---->与服务器连接超时
###### 给mongdb 加密：
1、mongo
2、use admin
3、db.createUser({user:'root',pwd:'root',roles:['root]})
4、验证是否添加成功，'db.auth(用户名，用户密码)' 这里用db.auth('root', '123456') 如果返回 '1'表示验证成功， 如果是 '0' 表示验证失败...
5、接下来为这个库添加一个用户，并且赋予权限，db.createUser({user:'zwVic',pwd:'adgjmp123',roles: [{role:'readWrite',db:'Article'}]})})
上面的代码意思是 创建一个zwStar用户 给予读写权限 db表示该用户操作的数据库名
6、重新开机mongodb，MongoDB默认是没有开启访问控制，我们通过--auth参数重启mongod服务。
**mongod --dbpath 【存放数据库文件夹路径】 --auth**
一旦开启了，用户连接mongod必须指定用户名和密码。
*7、连接加密数据库*
xxx.db('mongodb://your name: your pwd@ ip :27017/Article');
your name：为用户名
your pwd:为密码

#  socket.io 后台也需要

*7.1*
#### import 一个包时  只有该包显示于package.json里才会有提示
使用 npm run eject 即可将所有的依赖导入到package.json中
### 当返回的数据为[object,object]时，需要取到具体的key才能显示出value

*7.10*
#### 单例对象 actions中initIO()
  
*7.11*
#### https://emojipedia.org/
#### AIRA
Accessible Rich Internet Applications (ARIA) 是能够让残障人士更加便利的访问 Web 内容和使用 Web 应用（特别是那些由JavaScript 开发的）的一套机制。

**ARIA是对超文本标记语言（HTML）的补充，以便在没有其他机制的情况下，使得应用程序中常用的交互和小部件可以传递给辅助交互技术。**例如，ARIA支持HTML4中的可访问导航地标、JavaScript小部件、表单提示和错误消息、实时内容更新等。

ARIA 是一组特殊的易用性属性，可以添加到任意标签上，尤其适用于 HTML。role 属性定义了对象的通用类型（例如文章、警告，或幻灯片）。额外的 ARIA 属性提供了其他有用的特性，例如表单的描述或进度条的当前值。
### role 
**role 是增强语义性，当现有的HTML标签不能充分表达语义性的时候，就可以借助role来说明。**通常这种情况出现在一些自定义的组件上，这样可增强组件的可访问性、可用性和可交互性。
**role的作用是描述一个非标准的tag的实际作用。比如用div做button，那么设置div 的 role=“button”，辅助工具就可以认出这实际上是个button**
### aria-label aria-labelledby
**aria-label属性用来给当前元素加上的标签描述，接受字符串作为参数。是用不可视的方式给元素加label（如果被描述元素存在真实的描述元素，可使用 aria-labelledby 属性作为来绑定描述元素和被描述元素来代替）。**
aria-label属性可以用在任何典型的HTML元素中，并不需要配合特定的ARIA role才能使用。
**在下面的示例中，按钮（button）元素被定义为一个关闭（close）按钮，按钮中间有一个“X”字符。辅助软件并不能知道X是什么意思，所以需要aria-label标签来为辅助设备提供相应的标识来告诉它这个button是close的作用。**
<button aria-label="Close" onclick="myDialog.close()">X</button>

*7.13*
##### 为什么MSG_READ的reducer里需要先使用forEach再使用map?
**(经过测试，直接用forEach之后用不用map效果都一样,可能有bug,但没发现)**
##### 当退出当前聊天界面时,未读提示消失有延迟
###### 引入了第三方动画库 Ant-Motion  npm install -S rc-queue-anim


*7.14*
##### 为什么将reducer里errorMsg中的redirectTo去掉就不报频繁修改state的错误了？？

##### 添加了Toast功能 
**<></>是<React.Fragment></React.Fragment>的语法糖,Fragments可传入key值（循环的时候需要）**

**7.15**
##### react-creat-app怎么配置webpack-dev-server相关项？
一、npm run eject 出现webpack.config.js **但是此过程不可逆，而且会无法升级react-scripts包**
二、下载react-app-rewired（react社区内专门用来自定义配置RCA的工具）
1、把react-scripts start 改成 react-app-rewired start
2、2.x以上使用customize-cra包，再在根目录下创建config-overrides.js文件，导入如下代码：
const {
    override,
    fixBabelImports,
    addLessLoader,
    overrideDevServer
} = require('customize-cra');
**这里必须用两个箭头函数**
**disableHostCheck和proxy同一级（不是prox下的）**
const serverConfig = ()=> (configFunction) =>{
    configFunction.disableHostCheck=true
    return configFunction
}

module.exports = {
  webpack:{...},
  devServer:overrideDevServer(
    serverConfig()
  )
}