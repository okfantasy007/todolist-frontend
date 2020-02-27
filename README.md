### 一、项目当前状况  

- 访问地址  

| 环境 | 地址 | 账号 | 密码 | 备注 |
| ------ | ------ | ------ | ------ | ------ |
| 测试 | xxx | xxx | xxx | xxx |
| 生产 | xxx | xxx | xxx | xxx |  

- 当前版本：1.0.0
- 代码托管  
   - 工具：gitLab
   - 地址：https://github.com/okfantasy007/todolist-web.git

### 二、开发相关  
#### 1. 技术栈部分  
- 框架和库
    + React
    + React-Router
    + React-Redux
    + Redux-Saga
    + [antd](https://ant.design/docs/react/introduce-cn)（UI）
- 项目结构  

```  
    react-project-demo/
      |-- build/                                    // 存放打包文件
      |-- docs/                                     // 存放项目相关文档
      |-- public/
      |     |-- index.html                          // 模板页
      |     |-- favicon.ico
      |-- src/
      |     |-- assets/                             // 公共静态资源
      |     |     |-- fonts/
      |     |     |-- images/
      |     |     |-- styles/
      |     |     |     |-- antd-override.less      // 重写ant design样式
      |     |     |     |-- base.less               // 公用样式 或 基础样式
      |     |     |     |-- constants.less          // less全局变量
      |     |-- config/                             
      |     |     |-- index.js/                     // 后端websocket API地址配置文件
      |     |-- containers/                         // smart型组件
      |     |     |-- addTaskPage/                  // 组件汇聚
      |     |     |     |-- index.js                // 组件入口
      |     |     |     |-- index.less              // 样式文件
      |     |     |     |-- reducer.js              // 组件reducer汇聚
      |     |     |     |-- saga.js                 // 组件saga汇聚
      |     |     |-- defaultPage/                  
      |     |     |     |-- index.js                
      |     |     |     |-- index.less              
      |     |     |     |-- reducer.js              
      |     |     |     |-- saga.js                 
      |     |     |-- settingDefaultPage/           
      |     |     |     |-- index.js                
      |     |     |     |-- index.less              
      |     |     |     |-- reducer.js              
      |     |     |     |-- saga.js                 
      |     |     |-- settingPage/                  
      |     |     |     |-- index.js                
      |     |     |     |-- index.less              
      |     |     |     |-- reducer.js              
      |     |     |     |-- saga.js                 
      |     |     |-- updateUserInfoPage/           
      |     |     |     |-- index.js                
      |     |     |     |-- index.less              
      |     |     |     |-- reducer.js              
      |     |     |     |-- saga.js                 
      |     |-- layout/                             // 布局组件（如header，sider等）
      |     |     |-- headerZone/                   
      |     |     |     |-- index.js                                   
      |     |-- route/                              // 路由
      |     |     |-- index.js                      // 根路由
      |     |-- sagas/                              // saga汇聚
      |     |     |-- index.js                      
      |     |-- store/                              // redux汇聚
      |     |     |-- index.js
      |     |-- utils/                              // 公用方法&通用工具
      |     |     |-- async-component.js            // 异步加载组件（高阶组件HOC）
      |     |     |-- index.js                      // 通用方法汇聚
      |     |     |-- request.js                    // axios实例封装
      |     |     |-- RSA.js                        // RSA工具
      |     |-- views/                              // 主页&登录页
      |     |     |-- home/                         // 主页    
      |     |     |     |-- index.js/               // 主页入口
      |     |     |     |-- index.less/             // 样式文件
      |     |     |-- login/                        // 登录页
      |     |     |     |-- index.js/               // 登录页入口
      |     |     |     |-- index.less/             // 样式文件
      |     |     |     |-- reducer.js/             // 登录页reducer汇聚
      |     |     |-- register/                     // 注册页
      |     |     |     |-- index.js/               // 注册页入口
      |     |     |     |-- index.less/             // 样式文件
      |     |     |     |-- reducer.js/             // 注册页reducer汇聚           
      |     |-- index.js                            // JavaScript入口文件
      |-- .gitignore                                // git忽略配置文件
      |-- config-overrides.js                       // create-react-app工程配置
      |-- package.json
      |-- README.md
```

- 开发规范  

#### 2. 业务部分  
- 产品设计文档  
   - 相关地址链接   
   WIKI（业务产品需求文档/产品原型/产品需求文档）：xxx   
- UI设计稿  
   - 相关地址链接   
   产品原型：xxx
- 业务简介      
   xxx 

#### 3. 工程化部分  
- 相关工程化工具链接  
- 配置说明  

### 三、部署相关  
- 部署负责人：xxx  
- 发布方式  
   - 测试环境：http://39.108.85.75:8080/  
   - 生产环境
- 系统环境  

| 环境 | 地址 | 账号 | 密码 | 后端API地址 | 前端打包文件替换目录 |
| ------ | ------ | ------ | ------ |  ------ | ------------ |
| 测试 | xxx | xxx | xxx | xxx | xxx |
| 生产1 | xxx | \ | \ | xxx | \ |
| 生产2 | xxx | \ | \ | xxx | \ |

### 四、后端相关  
- 后端负责人：xxx  
- API文档：xxx  

### 五、测试相关  
- 测试负责人：xxx  
- 测试用例和测试报告   
    + 测试用例：xxx
    + 测试报告：xxx

### 六、功能介绍
#### 1、新用户注册
![新用户注册](https://github.com/okfantasy007/todolist-web/blob/master/image/%E6%B3%A8%E5%86%8C.png "新用户注册")

#### 2、登录成功主动提示未完成任务信息
![登录成功主动提示信息](https://github.com/okfantasy007/todolist-web/blob/master/image/%E7%99%BB%E5%BD%95%E6%88%90%E5%8A%9F.png "登录成功主动提示信息")

#### 3、展示在线用户信息（用户列表，用户数）
![展示在线用户信息](https://github.com/okfantasy007/todolist-web/blob/master/image/%E5%B1%95%E7%A4%BA%E5%9C%A8%E7%BA%BF%E7%94%A8%E6%88%B7%E5%88%97%E8%A1%A8.jpg "展示在线用户信息")

#### 4、新用户登录系统，其他在线用户均可收到该用户的登录通知
![新用户登录广播通知](https://github.com/okfantasy007/todolist-web/blob/master/image/%E6%96%B0%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E9%80%9A%E7%9F%A5.png "新用户登录广播通知")

#### 5、用户退出系统，自动更新所有在线用户客户端的在线用户信息

#### 6、两个客户端同时用一个账号登录系统，前面登录的客户端被后面登录的客户端挤出，并重定向到登录页

#### 7、管理员账号删除普通账号，如果被删除的普通账号处于已登录状态，则自动让其退出系统

#### 8、检测敏感用户信息变更，自动重定向到登录页重新登录
![检测用户信息变更](http:/https://github.com/okfantasy007/todolist-web/blob/master/image/%E6%A3%80%E6%B5%8B%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF%E5%8F%98%E6%9B%B4.png "检测用户信息变更")

#### 9、简单权限管理
##### 9.1、管理员账号
![管理员账号-todolist](https://github.com/okfantasy007/todolist-web/blob/master/image/%E7%AE%A1%E7%90%86%E5%91%98%E8%B4%A6%E5%8F%B7-todolist.png "管理员账号-todolist")

![管理员账号-用户](https://github.com/okfantasy007/todolist-web/blob/master/image/%E7%AE%A1%E7%90%86%E5%91%98%E8%B4%A6%E5%8F%B7-%E7%94%A8%E6%88%B7.png "管理员账号-用户")

##### 9.2、普通账号
![普通账号-todolist](https://github.com/okfantasy007/todolist-web/blob/master/image/%E6%99%AE%E9%80%9A%E8%B4%A6%E5%8F%B7-todolist.png "普通账号-todolist")

![普通账号-用户](https://github.com/okfantasy007/todolist-web/blob/master/image/%E6%99%AE%E9%80%9A%E8%B4%A6%E5%8F%B7-%E7%94%A8%E6%88%B7.png "普通账号-用户")
