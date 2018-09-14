English | [简体中文](./README.zh-CN.md) | [Русский](./README.ru-RU.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

An out-of-box UI solution for enterprise applications as a React boilerplate.

[![CircleCI Status](https://circleci.com/gh/ant-design/ant-design-pro.svg?style=svg)](https://circleci.com/gh/ant-design/ant-design-pro/)
[![Build status](https://ci.appveyor.com/api/projects/status/67fxu2by3ibvqtat/branch/master?svg=true)](https://ci.appveyor.com/project/afc163/ant-design-pro/branch/master)
[![Dependencies](https://img.shields.io/david/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro)
[![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro?type=dev)
[![Gitter](https://badges.gitter.im/ant-design/ant-design-pro.svg)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

![](https://user-images.githubusercontent.com/8186664/44953195-581e3d80-aec4-11e8-8dcb-54b9db38ec11.png)

</div>

- Preview: http://preview.pro.ant.design
- Home Page: http://pro.ant.design
- Documentation: http://pro.ant.design/docs/getting-started
- ChangeLog: http://pro.ant.design/docs/changelog
- FAQ: http://pro.ant.design/docs/faq
- Mirror Site in China: http://ant-design-pro.gitee.io

## 2.0 Released Now! 🎉🎉🎉
[Announcing Ant Design Pro 2.0.0](https://medium.com/ant-design/beautiful-and-powerful-ant-design-pro-2-0-release-51358da5af95)

## Translation Recruitment :loudspeaker:

We need your help: https://github.com/ant-design/ant-design-pro/issues/120

## Features

- :gem: **Neat Design**: Follow [Ant Design specification](http://ant.design/)
- :triangular_ruler: **Common Templates**: Typical templates for enterprise applications
- :rocket: **State of The Art Development**: Newest development stack of React/umi/dva/antd
- :iphone: **Responsive**: Designed for variable screen sizes
- :art: **Theming**: Customizable theme with simple config
- :globe_with_meridians: **International**: Built-in i18n solution
- :gear: **Best Practices**: Solid workflow to make your code healthy
- :1234: **Mock development**: Easy to use mock development solution
- :white_check_mark: **UI Test**: Fly safely with unit and e2e tests

## Templates

```
- Dashboard
  - Analytic
  - Monitor
  - Workspace
- Form
  - Basic Form
  - Step Form
  - Advanced From
- List
  - Standard Table
  - Standard List
  - Card List
  - Search List (Project/Applications/Article)
- Profile
  - Simple Profile
  - Advanced Profile
- Account
  - Account Center
  - Account Settings
- Result
  - Success
  - Failed
- Exception
  - 403
  - 404
  - 500
- User
  - Login
  - Register
  - Register Result
```

## Usage

```bash
$ git clone https://github.com/ant-design/ant-design-pro.git --depth=1
$ cd ant-design-pro
$ npm install
$ npm start         # visit http://localhost:8000
```

More instructions at [documentation](http://pro.ant.design/docs/getting-started).

## Browsers support

Modern browsers and IE11.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## Contributing

Any type of contribution is welcome, here are some examples of how you may contribute to this project:

- Use Ant Design Pro in your daily work.
- Submit [issues](http://github.com/ant-design/ant-design-pro/issues) to report bugs or ask questions.
- Propose [pull requests](http://github.com/ant-design/ant-design-pro/pulls) to improve our code.


2018年09月06日

1. 处理登录逻辑和token的的验证
2. 查看路由的权限的问题
3. 剔除目前不需要的代码

今日总结：

实现了登录页面，登录页面[](./src/pages/User/Login.js),其中登录页面的用户名和密码的验证在[](./src/components/Login/map.js)
常用的验证函数在可以参考[](https://ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)

2018年09月10日

需要设计出树组件的怎么操作新增和删除和编辑按钮？
开发过程中需要注意的是热开发模式会导致一些出其不意的异常，重启后可解决

参考文档 https://dvajs.com/api/#model

2018年09月11日

antd tree组件 功能太简单根本无法满足以前的原型设计，所有都替换成表格的形式来做

表单参考页面
https://ant.design/components/form-cn/#components-form-demo-register


lastUpdateTime_descend
lastUpdateTime_ascend

createTime_descend
createTime_ascend

2018年09月12日 - 记录开发的菜单管理的全过程 

[antd-pro快速开始](https://pro.ant.design/docs/getting-started-cn)

1. 新建页面src/pages/System/Menu.js,新建src/pages/System/Menu.less存放样式信息，并在Menus.js中引用
其基本结构如下，详细参考react的创建组件的方式

```

import React, {PureComponent } from 'react';
import styles from './Menu.less'

class Menu extends PureComponent{

  state = {

  }

  componentDidMount(){

  }

  render(){

    return (
      <div>菜单管理</div>
    );
  }

}
export default Menu
```

2. 添加menu的路由信息，config/router.config.js，,详细参考umi的文件路径名约定路由

```
 {
    path: '/system',
    name: 'system',
    routes: [
      {
        path: '/system/menu',
        name: 'menu',
        component: './System/Menu',
      },
    
    ],
  },
```

3. 启动项目，访问http://localhost:8000/system/menu 就可以看到页面

4. 设计页面布局，菜单管理页面，左边为菜单树，右边为新增菜单表单，可以理解为左右结构

- [antd组件示例网站](https://ant.design/docs/react/introduce-cn)
- [antd-pro示例网站](https://pro.ant.design/components/AvatarList-cn)

- [gird布局组件](https://ant.design/components/grid-cn/)
- [Card布局模式](https://ant.design/components/card-cn/#components-card-demo-in-column)

代码如下,注意顶部的import语句需要import的引用的组件

```
import React, {PureComponent } from 'react';
import {Card, Col, Row} from 'antd';

import styles from './Menu.less'


class Menu extends PureComponent{

  state = {

  }

  componentDidMount(){

  }

  render(){

    return (
      <Row gutter={16}>
        <Col span={8}>
          <Card title="菜单树" bordered={false}>Card content</Card>
        </Col>
        <Col span={16}>
          <Card title="菜单表单" bordered={false}>Card content</Card>
        </Col>
      </Row>
    );
  }

}

export default Menu

```

5. 此时来实现左侧菜单树

- [树的例子](https://ant.design/components/tree-cn/)

- [异步加载树](https://ant.design/components/tree-cn/#components-tree-demo-dynamic)

拷贝相应的代码到相应的位置，其中注意eslint的代码检测规范，特别说明：

- [es6变量声明](http://es6.ruanyifeng.com/#docs/let)
- [变量的解析和赋值](http://es6.ruanyifeng.com/#docs/destructuring)
- [rest参数](http://es6.ruanyifeng.com/#docs/function#rest-%E5%8F%82%E6%95%B0)
- [箭头函数](http://es6.ruanyifeng.com/#docs/function#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0)
- [Promise](http://es6.ruanyifeng.com/#docs/promise)
- [es6编程风格](http://es6.ruanyifeng.com/#docs/style)

```
import React, {PureComponent} from 'react';
import {Card, Col, Row, Tree} from 'antd';


const {TreeNode} = Tree;

class Menu extends PureComponent{

  state = {
    treeData: [
      { title: 'Expand to load', key: '0' },
      { title: 'Expand to load', key: '1' },
      { title: 'Tree Node', key: '2', isLeaf: true },
    ],
  }

  componentDidMount(){

  }

  onLoadData = (treeNode) =>
      new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }

        treeNode.props.dataRef.children = [
          { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
          { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
        ];

        const {treeData} = this.state
        this.setState({
          treeData: [...treeData],
        });
        resolve();
      });


  renderTreeNodes = (data) =>
     data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });

  render(){

    const {treeData} = this.state;

    return (
      <Row gutter={10}>
        <Col lg={8} md={24}>
          <Card title="菜单树" bordered={false}>
            <Tree loadData={this.onLoadData}>
              {this.renderTreeNodes(treeData)}
            </Tree>
          </Card>
        </Col>
        <Col lg={16} md={24}>
          <Card title="菜单表单" bordered={false}>Card content</Card>
        </Col>
      </Row>
    );
  }

}

export default Menu

```

6. 此时菜单树还是写的死数据，可以发现treeData是首次渲染的菜单，点击页面菜单后才渲染子菜单通过 treeNode.props.dataRef.children属性，
根据系统的菜单默认约定，第一菜单为 新网银行，其中pid默认为0，因此需要展示新网银行下的一级子菜单作为首次渲染的菜单treeData,
此时就涉及到与后端的交互。

建议下先阅读[dvajs](https://dvajs.com/guide/)

其中dva将分层来实现
- ui负责页面展示也就是src/pages/System/Menu.js
- modal负责数据和逻辑处理src/models/menu.js
- service层负责请求后端src/services/menu.js

7. 首先建立modal层src/models/menu.js，内容如下：

```
export default {

  namespace: 'menu',

  state: {
    
  },
  /**
   * 处理异步操作和业务逻辑，不直接修改state,由action触发，可以触发action,可以和服务器交互，可以获取全局的state
   */
  effects: {
  },
  
  /**
   * reducers 处理同步操作，唯一可以修改state的地方，由action触发
   */
  reducers: {
   
  },
};

```

根据我们的目标是获取首次渲染的一级子菜单也就是treeData,添加modal中方法

```
import {queryTreeData} from '@/services/menu';

export default {
  namespace: 'menu',

  state: {
    treeData: [],
  },
  /**
   * 处理异步操作和业务逻辑，不直接修改state,由action触发，可以触发action,可以和服务器交互，可以获取全局的state
   * call执行异步函数，put发出一个action,select用于从state里获取数据
   */
  effects: {
    *fetchTreeData({ call, put }) {
      const response = yield call(queryTreeData);
      yield put({
        type: 'saveTreeData',
        payload: response,
      });
    },


  },
  /**
   * reducers 处理同步操作，唯一可以修改state的地方，由action触发
   */
  reducers: {
    saveTreeData(state, action) {
      return {
        ...state,
        treeData: action.payload.data,
      };
    },
  },
};

```

其中queryTreeData来自src/services/menu.js代码如下：

```
import {requestWithToken} from "../utils/request";

export async function queryTreeData() {
  return requestWithToken('/api/menu/tree');
}

```

8. 我这边是采用前后台一起开发，所以此时就可以开发后端接口，可以前后端分离开发的，只需要mock/menu.js中模拟数据，目前为了快速，先不mock,
直接与后台对接测试，其中一点前端项目启动后访问的localhost:8080 而同一台机器上要访问后端接口需要设置代理config/config.js

关于config.js其实是umi的配置参考https://umijs.org/config/

```
proxy: {
  "/api": {
    "target": "http://localhost:8888/",
    "changeOrigin": true,
  }
},
```

9. 开发后端接口注意事项，为了前端方便不做数据转换处理，所以后端直接返回前端需要的数据格式，
已知treeData格式为：

```
 treeData: [
      { title: 'Expand to load', key: '0' },
      { title: 'Expand to load', key: '1' },
      { title: 'Tree Node', key: '2', isLeaf: true },
    ],

```

所以建立后端com.xwbank.xtxn.portal.vo.MenuTreeVo.java 

```
@Getter
@Setter
public class MenuTreeVo {
    /**
     * title->menuName
     */
    private String title;
    /**
     * key->menuId
     */
    private Integer key;
    /**
     * 需要判断当前节点是否有子节点
     */
    private Boolean isLeaf;
}
```

10. 后端开发完后现在需要来将前端的ui和modal层联系起来,通过connect，可参考

https://dvajs.com/guide/introduce-class.html#connect-%E6%96%B9%E6%B3%95

其中src/pages/System/Menu.js关代码如下，

```
import React, {PureComponent} from 'react';
import {Card, Col, Row, Tree} from 'antd';
import { connect } from 'dva';

const {TreeNode} = Tree;

@connect(({ menu }) => ({
  menu,
  treeData:menu.treeData,
}))
class Menu extends PureComponent{

  state = {
    treeData: [],
  }

  componentDidMount(){

    const {dispatch} = this.props
    dispatch({
      type: 'menu/fetchTreeData',
    });
  }

  onLoadData = (treeNode) =>
      new Promise((resolve) => {
        if (treeNode.props.children) {
          resolve();
          return;
        }

        treeNode.props.dataRef.children = [
          { title: 'Child Node', key: `${treeNode.props.eventKey}-0` },
          { title: 'Child Node', key: `${treeNode.props.eventKey}-1` },
        ];

        const {treeData} = this.state
        this.setState({
          treeData: [...treeData],
        });
        resolve();
      });


  renderTreeNodes = (data) =>
     data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item} />;
    });

  render(){

    const {treeData} = this.props;

    return (
      <Row gutter={10}>
        <Col lg={8} md={24}>
          <Card title="菜单树" bordered={false}>
            <Tree loadData={this.onLoadData}>
              {this.renderTreeNodes(treeData)}
            </Tree>
          </Card>
        </Col>
        <Col lg={16} md={24}>
          <Card title="菜单表单" bordered={false}>Card content</Card>
        </Col>
      </Row>
    );
  }

}

export default Menu

```

- 比较关键的就是的代码就是@connect
- componentDidMount中页面加载完成后就发起请求后台数据
- render中采用this.props的数据const {treeData} = this.props;

11. 接下来就完成异步加载树节点，

编辑modal代码如下，主要是*children和saveOrgChildren以及state中的orgChildren

```
import {queryMenusByLoginName,queryTreeData,queryMenuChildren} from '@/services/menu';

export default {
  namespace: 'menu',

  state: {
    treeData: [],
    menuChildren: []
  },
  /**
   * 处理异步操作和业务逻辑，不直接修改state,由action触发，可以触发action,可以和服务器交互，可以获取全局的state
   * call执行异步函数，put发出一个action,select用于从state里获取数据
   */
  effects: {
    *fetchTreeData({payload}, { call, put } ) {
      const response = yield call(queryTreeData,payload);
      yield put({
        type: 'saveTreeData',
        payload: response,
      });
    },
    *children({payload}, { call, put } ) {
      const response = yield call(queryMenuChildren,payload);
      yield put({
        type: 'saveMenuChildren',
        payload: response,
      });
    },


  },
  reducers: {
    saveTreeData(state, action) {
      return {
        ...state,
        treeData: action.payload.data,
      };
    },
    saveMenuChildren(state, action) {
      return {
        ...state,
        menuChildren: action.payload.data,
      };
    },
  },
};

```

编辑src/services/menu.js添加如下代码：

```
export async function queryMenuChildren(menuId) {
  return requestWithToken(`/api/menu/children/${menuId}`);
}
```

编辑src/pages/System/Menu.js层如下，主要根据点击的key(menuId)去加载子菜单

```
 onLoadData = (treeNode) =>
      new Promise((resolve) => {
      
         /**
           * 根据key（menuId）查询子菜单
           * @type {{title: string, key: string}[]}
           */
          const {dispatch} = this.props
          dispatch({
            type: 'menu/children',
            payload: treeNode.props.dataRef.key,
          })
          const {menuChildren} = this.props
      
        if (treeNode.props.children) {
          resolve();
          return;
        }

        treeNode.props.dataRef.children = menuChildren

        const {treeData} = this.state
        this.setState({
          treeData: [...treeData],
        });
        re
```

12. 编辑根据菜单id获取子菜单的接口就完成了


13. 接下来完成新增菜单的表单设计

参考如下：https://ant.design/components/form-cn/#components-form-demo-register





13. 接下来就实现右键点击树节点，弹出 新增，编辑，删除，面板框

- 参考Tree组件提供的API https://ant.design/components/tree-cn/#Tree-props

```
<Tree loadData={this.onLoadData} onRightClick={(event,node) => this.handleRightClick(event,node)}>
  {this.renderTreeNodes(treeData)}
</Tree>

handleRightClick = (event,node) => {

}
```

此时需要在handleRightClick函数的里实现弹出一个面板框，采用气泡卡片
https://ant.design/components/popover-cn/


2018年09月13日-再次讨论菜单管理页面原型设计

功能分析：菜单管理实现菜单的展示，菜单的新增，编辑，删除，已经按钮新增，编辑，删除

原型设计：
菜单展示通过树与表格组件的结合，
左侧菜单树只是展示菜单名称的层级结构，右侧为菜单表格详细展示菜单信息关键项（编号，名称，路径，图标），
首次进入该页面，左侧菜单树默认展示一级菜单，右侧表格默认展示一级菜单及子菜单
鼠标左键单击点击左侧菜单树节点，右边表格立即呈现当前被点击节点和点击节点的一级子菜单详细信息

新增菜单：右边菜单表格左上方添加新增菜单按钮，鼠标点击弹出模态框

模态框中添加菜单信息文本输入框，和新增按钮通过可编辑表格

https://ant.design/components/table-cn/#components-table-demo-edit-cell

编辑菜单：表格末尾列操作

删除菜单： 表格末尾列操作，不提供批量失效的功能

2018年09月13日23:21:02 问题记录

$ git clone https://github.com/ant-design/ant-design-pro.git --depth=1

导致push到另外一个仓库的时候一直报如下错误：

一直提示 ! [remote rejected] master -> master (shallow update not allowed)

执行git fetch --unshallow origin后
重新git push -u github origin即可

2018年09月14日13:40:49


