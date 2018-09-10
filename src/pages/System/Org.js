import React, {Fragment, PureComponent} from 'react';
import {Button, Card, Col, Divider, Form, Input, Modal, Row, Select, Table, Tree} from 'antd';
import {connect} from "dva";
import styles from "../List/TableList.less";


/**
 * 组织机构及用户管理界面
 * AntD-Tree参考 https://ant.design/components/tree-cn/#API
 */

const {TreeNode} = Tree;
const FormItem = Form.Item;
const { Option } = Select;

@connect(({ org, user }) => ({
  org,
  orgChildren: org.orgChildren,
  users:user.users,
}))
@Form.create()
class Org extends PureComponent{

  state = {
    treeData: [
      { title: '新网银行', key: '1' },
    ],
  }

  /**
   * 定义的表格展示列结构
   * @type {*[]}
   */
  columns = [
    {
      title: '用户编号',
      dataIndex: 'userId',
    },
    {
      title: '登录名',
      dataIndex: 'loginName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '组织机构',
      dataIndex: 'orgId',
    },
    {
      title: '有效标志',
      dataIndex: 'validFlag',
    },
    {
      title:'创建时间',
      dataIndex:'createTime',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <a href="">详细</a>
        </Fragment>
      ),
    },
  ];

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
    });
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
   * Todo
   * 处理树节点点击触发事件,点击后右边表格查询当前组织下的人员列表信息
   * @param selectedKeys 当前点击节点的key也就是组织机构id
   */
  handleSelect = (selectedKeys) => {

  }

  /**
   * 处理树节点的鼠标右击事件，弹出面板框，展示，新增，删除，修改按钮
   * @param event
   * @param node
   */
  handleRightClick = (event,node)=> {
    const{title,eventKey} = node.props
    /**
     * 根节点不能删除
     */
    if(eventKey === '1'){
      Modal.warning({
        title:'顶层组织【'.concat(title).concat('】不能删除'),
        content:'顶层组织【'.concat(title).concat('】不能删除'),
      });
    }else{
      Modal.confirm({
        title: '是否删除【'.concat(title).concat('】') ,
        content: '确定删除【'.concat(title).concat('】吗？\''),
        okText: '确认',
        cancelText: '取消',
        onOk: () => this.deleteOrgByKey(eventKey),
      });
    }

  }

  deleteOrgByKey = (key) => {

  }


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

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="账户名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="有效状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">有效</Option>
                  <Option value="1">无效</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render(){
    const {treeData} = this.state
    const{users} = this.props

    return (
      <Row gutter={5}>
        <Col lg={6} md={24}>
          <Card title="组织机构树" bordered={false}>
            <Tree onSelect={this.handleSelect} onRightClick={({event,node})=>this.handleRightClick(event,node)} loadData={(treeNode)=>this.onLoadData(treeNode)}>
              {this.renderTreeNodes(treeData)}
            </Tree>
          </Card>
        </Col>
        <Col lg={18} md={24}>
          <Card title="用户列表" bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
              <Table rowKey='userId' rowSelection={this.rowSelection} dataSource={users} columns={this.columns} />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Org
