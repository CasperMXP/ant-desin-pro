import React, {PureComponent} from 'react';
import {Card, Col, Row, Tree} from 'antd';
import {connect} from "dva";

/**
 * 组织机构及用户管理界面
 */

const {TreeNode} = Tree;

@connect(({ org }) => ({
  org,
  orgChildren:org.orgChildren
}))
class Org extends PureComponent{

  state = {
    treeData: [
      { title: '新网银行', key: '1' },
    ],
  }

  onLoadData = (treeNode) =>
     new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }
      let{treeData} = this.state
       /**
        * 根据key（orgId）查询子组织
        * @type {{title: string, key: string}[]}
        */
       const {dispatch} = this.props
       dispatch({
         type: 'org/children',
         payload: treeNode.props.dataRef.key,
       })
        const {orgChildren} = this.props

      treeNode.props.dataRef.children = orgChildren

      treeData = [...treeData]
      this.setState({
        treeData,
      });
      resolve();
    });

  /**
   * 渲染树节点
   * @param data
   * @returns {*}
   */
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
    /**
     * 使用state的变量必须从新声明引用
     */
    const {treeData} = this.state
    return (
      <Row gutter={5}>
        <Col lg={6} md={24}>
          <Card title="组织机构树" bordered={false}>
            <Tree loadData={this.onLoadData}>
              {this.renderTreeNodes(treeData)}
            </Tree>
          </Card>
        </Col>
        <Col lg={18} md={24}>
          <Card title="用户列表" bordered={false}>
            <div>User Table</div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Org
