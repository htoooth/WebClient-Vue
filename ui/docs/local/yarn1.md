# MapGIS 源使用方式

## 快速使用

```sh
# npm
npm config set prefix D:\develop\nodejs\global
npm config set cache D:\develop\nodejs\cache
# yarn
yarn config set prefix D:\develop\yarn\cache
yarn config set global-folder D:\develop\yarn\global
```

## powershell

```sh
set-ExecutionPolicy RemoteSigned
```

## yarn

```sh
yarn config set registry http://192.168.11.130:4873/
这里要注意：也加一句：npm set registry http://192.168.11.130:4873/（然后说明：最好也把这个设好）
# https://github.com/yarnpkg/yarn/issues/4862#issuecomment-368688262
# npm config set registry https://registry.npm.taobao.org // 还原回公网仓库（）
# yarn config set registry https://registry.npm.taobao.org // 还原回公网仓库（原本的npm和yarn的源不一样）
yarn global add node-gyp
yarn global add node-sass@4.12.0
```

::: tip
强烈建议走 yarn 的方式，不然很容易出现下面 npm 的错误情况
:::

## 基本操作命令

```
下载nrm: npm install -g nrm
查看可切换的镜像源: nrm ls(*表示正在使用的镜像源)
切换镜像源 nrm use 镜像名
```

## 发布内网仓库

```sh
# 设置为mapgis内部源
npm set registry http://192.168.11.130:4873/

# 注册用户
npm adduser --registry http://192.168.11.130:4873/

# 查看用户
npm who am i

# 发布仓库  一定要再对应的发布库的根目录下发布

npm publish --registry http://192.168.11.130:4873/
```

::: tip 仓库过大无法发布
npm config set max_body_size 100mb --registry http://192.168.11.130:4873/
:::

## 发布外网仓库

```sh
# 设置npm官方源
npm set registry http://www.npmjs.org

# 查看当前所在源
npm config get registry

# 注意发布公网，不能使用淘宝镜像源

# 注册用户
npm adduser

# 登录
npm login

# 发布仓库
进入要发布的package.json所在的目录下，发布包(前提：npm账号属于mapgis组织)
npm publish --access public
```

## ~~npm(不建议使用)~~

```sh
npm set registry http://192.168.11.130:4873/
npm install -g nrm
nrm add mapgis http://192.168.11.130:4873/
nrm use mapgis
npm install -g node-gyp
npm install -g node-sass@4.12.0
```

| 列表                         | 使用                             |
| :--------------------------- | :------------------------------- |
| ![mapgis](./yarn/mapgis.png) | ![mapgis](./yarn/use_mapgis.png) |

::: warning
建议不要走 npm, npm 很容易出现下面的情况
![mapgis](./yarn/npm_error.png)
:::
