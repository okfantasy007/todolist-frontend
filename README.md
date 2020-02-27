### 一、项目当前状况  

- 访问地址  

| 环境 | 地址 | 账号 | 密码 | 备注 |
| ------ | ------ | ------ | ------ | ------ |
| 测试 | xxx | xxx | xxx | xxx |
| 生产 | xxx | xxx | xxx | xxx |  

- 当前版本：1.0.0
- 代码托管  
   - 工具：gitLab
   - 地址：https://gitlab.com/okfantasy007/react-project-demo.git

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
      |     |     |-- index.js/                     // 后端API地址配置文件
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
