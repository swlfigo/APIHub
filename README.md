![](http://sylarimage.oss-cn-shenzhen.aliyuncs.com/2019-09-02-logo.png)

# APIHub

一个基于 `Vue3.x` + `Express4.x` 的 `App` 后端接口数据模拟开箱即用工具

本地使用 `SQLite3` 数据库存储路由数据

当然可以使用 `Charles` 或者本地搭建 `Nginx / Apache` 模拟服务器返回数据

# Usage

1. 安装相关依赖库

```shell
# install dependencies
npm install
```

2. 分别运行前后端项目

```shell
# 运行前端项目
npm start

# 运行后端项目
node app.js
```

3. 根据提示在浏览器打开网址即可,如果有端口冲突，请自行更改端口!如果修改端口，注意跨域问题,前端配置需要在 `./config/index.js` 中修改 `proxyTable` 中相应参数
4. 根据界面显示添加相应路由，后端访问新增接口即可返回输入的测试 `JSON`(`App`测试时候，需要手机与电脑统一 `Wifi` 网段下,访问地址改为电脑相应端口号)



![](http://sylarimage.oss-cn-shenzhen.aliyuncs.com/2019-09-02-022630.png)

![](http://sylarimage.oss-cn-shenzhen.aliyuncs.com/2019-09-02-022737.png)

