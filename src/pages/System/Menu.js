import React, {PureComponent} from 'react';
import {Button, Card, Col, Divider, Drawer, Form, Icon, Input, Modal, Row, Tree, TreeSelect} from 'antd';
import {connect} from 'dva';
import styles from './Menu.less'

const {TreeNode} = Tree;
const FormItem = Form.Item;
let uuid = 0;

@Form.create()
@connect(({ menu }) => ({
  menu,
  treeData:menu.treeData,
  menuChildren:menu.menuChildren,
}))
class Menu extends PureComponent{

  state = { visible: false };

  componentDidMount(){
    /**
     * 页面初始化完成加载首次渲染的菜单数据
     */
    const {dispatch} = this.props
    dispatch({
      type: 'menu/fetchTreeData',
    });
  }

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

  /**
   * 鼠标右键点击树节点事件
   * @param event
   * @param node
   */
  handleRightClick = (event) => {
    const{title,key} = event.node.props.dataRef

    Modal.confirm({
      title: '菜单删除确认',
      content: '是否删除此【'.concat(title).concat('】菜单!!!'),
      okText: '确定',
      cancelText: '取消',
      onOk:this.handleDeleteMenuByMenuId(key),
    });
  }

  handleDeleteMenuByMenuId = (key) => {
    const{dispatch} = this.props
    dispatch({
      type:'menu/remove',
      payload: key,
    });
  }

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render(){
    const {treeData} = this.props;

    const { submitting } = this.props;
    const {
      form: { getFieldDecorator,getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 18, offset: 6 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    getFieldDecorator('keys', { initialValue: [] });

    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '按钮' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: "请输入按钮的key-name或者删除这个输入框。",
            }],
          })(
            <Input placeholder="key-name" style={{ width: '60%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className={styles["dynamic-delete-button"]}
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      );
    });

    return (
      <Row gutter={10}>
        <Col lg={6} md={24}>
          <Card bordered={false}>

            <Tree onRightClick={(event) => this.handleRightClick(event)}>
              {this.renderTreeNodes(treeData)}
            </Tree>
          </Card>
        </Col>
        <Col lg={16} md={24}>
          <Card bordered={false}>
            <Button type="primary" onClick={this.showDrawer}>新增菜单</Button>
            <Drawer
              title="新增菜单"
              width={720}
              placement="right"
              onClose={this.onClose}
              maskClosable={false}
              visible={this.state.visible}
              style={{
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: 53,
              }}
            >
              <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
                <FormItem {...formItemLayout} label="菜单编号">
                  {getFieldDecorator('menuId', {
                    rules: [
                      {
                        required: true,
                        message: '请输入菜单编号',
                      },
                    ],
                  })(<Input placeholder="菜单编号为数字格式" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="菜单名称">
                  {getFieldDecorator('menuName', {
                    rules: [
                      {
                        required: true,
                        message: '请输入菜单名称',
                      },
                    ],
                  })(<Input placeholder="菜单名称" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="父菜单">
                  {getFieldDecorator('pId', {
                    rules: [
                      { required: true,
                        message: '请选择一个菜单!'
                      }
                    ],
                  })(
                    <TreeSelect
                      style={{ width: 300 }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={treeData}
                      placeholder="请选择一个菜单"
                    />
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label="菜单路径">
                  {getFieldDecorator('path', {
                    rules: [
                      {
                        required: true,
                        message: '请输入菜单路径',
                      },
                    ],
                  })(<Input placeholder="菜单路径" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="菜单图标">
                  {getFieldDecorator('icon', {
                    rules: [
                      {
                        required: true,
                        message: '请输入菜单图标',
                      },
                    ],
                  })(<Input placeholder="菜单图标" />)}
                </FormItem>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                    <Icon type="plus" /> 添加按钮信息
                  </Button>
                </FormItem>
                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    新增
                  </Button>
                  <Button style={{ marginLeft: 8 }}>保存</Button>
                </FormItem>
              </Form>
            </Drawer>
            <Divider dashed />
            <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
              <FormItem {...formItemLayout} label="菜单编号">
                {getFieldDecorator('menuId', {
                  rules: [
                    {
                      required: true,
                      message: '请输入菜单编号',
                    },
                  ],
                })(<Input placeholder="菜单编号为数字格式" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="菜单名称">
                {getFieldDecorator('menuName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入菜单名称',
                    },
                  ],
                })(<Input placeholder="菜单名称" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="父菜单">
                {getFieldDecorator('pId', {
                  rules: [
                      { required: true,
                        message: '请选择一个菜单!'
                      }
                    ],
                })(
                  <TreeSelect
                    style={{ width: 300 }}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={treeData}
                    placeholder="请选择一个菜单"
                  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="菜单路径">
                {getFieldDecorator('path', {
                  rules: [
                    {
                      required: true,
                      message: '请输入菜单路径',
                    },
                  ],
                })(<Input placeholder="菜单路径" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="菜单图标">
                {getFieldDecorator('icon', {
                  rules: [
                    {
                      required: true,
                      message: '请输入菜单图标',
                    },
                  ],
                })(<Input placeholder="菜单图标" />)}
              </FormItem>
              {formItems}
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                  <Icon type="plus" /> 添加按钮信息
                </Button>
              </FormItem>
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  提交
                </Button>
                <Button style={{ marginLeft: 8 }}>删除</Button>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }

}

export default Menu
