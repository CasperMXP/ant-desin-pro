import React, {PureComponent} from 'react';
import {Card, Col, Modal, Row, Tree, Form, Input, TreeSelect} from 'antd';
import {connect} from 'dva';

const {TreeNode} = Tree;
const FormItem = Form.Item;


const CreateForm = Form.create()(props => {
  const { form, handleAdd,selectMenuTree } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  return (
    <div>
      <FormItem {...formItemLayout} label="组织编号">
        {form.getFieldDecorator('orgId', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="组织名称">
        {form.getFieldDecorator('orgName', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="父组织">
        {form.getFieldDecorator('parentOrgId', {
          rules: [{ required: true, message: '请选择一个组织!' }],
        })(
          <TreeSelect
            allowClear
            style={{ width: 300 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={selectMenuTree}
            placeholder="请选择一个菜单"
          />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </div>
  );
});

@connect(({ menu }) => ({
  menu,
  treeData:menu.treeData,
  menuChildren:menu.menuChildren,
}))
class Menu extends PureComponent{

  state = {
  }

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

  render(){
    const {treeData} = this.props;
    return (
      <Row gutter={10}>
        <Col lg={8} md={24}>
          <Card title="菜单树" bordered={false}>
            <Tree onRightClick={(event) => this.handleRightClick(event)}>
              {this.renderTreeNodes(treeData)}
            </Tree>
          </Card>
        </Col>
        <Col lg={16} md={24}>
          <Card title="菜单表单" bordered={false}>
            <CreateForm />
          </Card>
        </Col>
      </Row>
    );
  }

}

export default Menu
