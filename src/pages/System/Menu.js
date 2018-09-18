import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Tooltip,
  Tree,
  TreeSelect,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import BtnTableForm from './BtnTableForm';
import styles from '../List/TableList.less';

const statusMap = ['1', '0'];
const status = ['无效', '有效'];

const FormItem = Form.Item;
const { TreeNode } = Tree;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/**
 * 新增菜单
 * @type {React.ComponentClass<RcBaseFormProps & Omit<FormComponentProps, keyof FormComponentProps>>}
 */
const CreateMenuForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, orgTree } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title="新建菜单"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...formItemLayout} label="菜单编号">
        {form.getFieldDecorator('menuId', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="菜单名称">
        {form.getFieldDecorator('menuName', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="菜单路径">
        {form.getFieldDecorator('path', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="父菜单">
        {form.getFieldDecorator('pid', {
          rules: [{ required: true, message: '请选择一个组织!' }],
        })(
          <TreeSelect
            allowClear
            style={{ width: 300 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={orgTree}
            placeholder="请选择"
          />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="图标">
        {form.getFieldDecorator('icon', {
          rules: [{ required: true, message: '请输入！' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="按钮">
        {form.getFieldDecorator('buttons', {
          initialValue: [],
        })(<BtnTableForm />)}
      </FormItem>
    </Modal>
  );
});

/**
 * 更新菜单面板
 * @type {React.ComponentClass<RcBaseFormProps & Omit<FormComponentProps, keyof FormComponentProps>>}
 */
const UpdateMenuForm = Form.create()(props => {
  const {
    form,
    handleUpdate,
    updateModalVisible,
    editMenuRecord,
    handleUpdateModalVisible,
    orgTree,
  } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleUpdate(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title="更新菜单"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible()}
    >
      <FormItem {...formItemLayout} label="菜单编号">
        {form.getFieldDecorator('menuId', {
          initialValue: editMenuRecord.menuId,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" disabled />)}
      </FormItem>
      <FormItem {...formItemLayout} label="菜单名称">
        {form.getFieldDecorator('menuName', {
          initialValue: editMenuRecord.menuName,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="菜单路径">
        {form.getFieldDecorator('path', {
          initialValue: editMenuRecord.path,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="父菜单">
        {form.getFieldDecorator('pid', {
          initialValue: editMenuRecord.pid,
          rules: [{ required: true, message: '请选择一个组织!' }],
        })(
          <TreeSelect
            allowClear
            style={{ width: 300 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={orgTree}
            placeholder="请选择"
          />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="图标">
        {form.getFieldDecorator('icon', {
          initialValue: editMenuRecord.icon,
          rules: [{ required: true, message: '请输入！' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="按钮">
        {form.getFieldDecorator('buttons', {
          initialValue: editMenuRecord.buttons,
        })(<BtnTableForm />)}
      </FormItem>
    </Modal>
  );
});

@Form.create()
@connect(({ menu, loading }) => ({
  menu,
  treeData: menu.treeData,
  menuChildren: menu.menuChildren,
  loading: loading.models.menu,
}))
class Menu extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    editMenuRecord: {},
  };

  /**
   * 定义表格列信息
   * @type {*[]}
   */
  columns = [
    {
      title: '菜单ID',
      dataIndex: 'menuId',
    },
    {
      title: '菜单名称',
      dataIndex: 'menuName',
    },
    // {
    //   title: '菜单全称',
    //   dataIndex: 'menuFullName',
    // },
    {
      title: '父菜单全名称',
      dataIndex: 'parentMenuFullName',
    },
    // {
    //   title: '菜单路径',
    //   dataIndex: 'path',
    // },
    {
      title: '菜单全路径',
      dataIndex: 'fullPath',
    },
    {
      title: '叶子节点',
      dataIndex: 'leafFlag',
    },
    {
      title: '有效状态',
      dataIndex: 'validFlag',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    // {
    //   title: '创建人',
    //   dataIndex: 'creatorName',
    // },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    //   sorter: true,
    //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    // },
    {
      title: '最近更新人',
      dataIndex: 'lastUpdateBy',
    },
    {
      title: '最近更新时间',
      dataIndex: 'lastUpdateTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <Button
            icon="edit"
            type="primary"
            onClick={() => this.handleUpdateModalVisible(true, record)}
          />
          <Tooltip title={record.validFlag === 1 ? '设置无效' : '设置有效'}>
            <Button
              type={record.validFlag === 1 ? 'danger' : 'primary'}
              icon={record.validFlag === 1 ? 'close' : 'check'}
              onClick={() => this.handleChangeOrgValidFlag(record)}
            />
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/fetchTreeData',
    });
    dispatch({
      type: 'menu/fetch',
    });
  }

  /**
   * 左侧树选择处理事件
   * @param event
   */
  handleSelectTree = event => {
    const { dispatch } = this.props;
    const pageInfo = {
      pageSize: 10,
      current: 1,
      orgId: event[0],
    };
    dispatch({
      type: 'org/fetch',
      payload: pageInfo,
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'org/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'org/fetch',
      payload: {},
    });
  };

  /**
   * ToDo 未实现
   */
  handleExportExcelClick = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows) {
      dispatch({
        type: 'org/export',
        payload: {
          key: selectedRows.map(row => row.key),
        },
        callback: () => {
          this.setState({
            selectedRows: [],
          });
        },
      });
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  /**
   * 处理表格上条件过滤框
   * @param e
   */
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'org/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  /**
   * 编辑组织按钮框
   * @param flag
   * @param record
   */
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      editMenuRecord: record || {},
    });
  };

  /**
   * 删除组织
   * @param orgId
   */
  handleChangeValidFlagByOrgId = (orgId, validFlag) => {
    const params = {
      id: orgId,
      valid: validFlag,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'org/changeValidFlag',
      payload: params,
    });
  };

  /**
   * 改变组织的有效状态
   * @param record
   */
  handleChangeOrgValidFlag = record => {
    const { orgName, orgId, validFlag } = record;
    if (validFlag === 1) {
      Modal.confirm({
        title: '确认设置无效【'.concat(orgName).concat('】嘛?'),
        content: '设置无效【 '.concat(orgName).concat('】将该组织的子组织和人员信息设置无效！！！'),
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        onOk: () => this.handleChangeValidFlagByOrgId(orgId, validFlag),
      });
    } else {
      Modal.confirm({
        title: '确认设置有效【'.concat(orgName).concat('】嘛?'),
        content: '设置有效【 '.concat(orgName).concat('】将该组织的子组织和人员信息设置有效！！！'),
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        onOk: () => this.handleChangeValidFlagByOrgId(orgId, validFlag),
      });
    }
  };

  /**
   * 新增菜单方法
   * @param fields
   */
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/add',
      payload: {
        desc: fields,
      },
    });
    message.success('添加菜单成功');
    this.handleModalVisible();
  };

  /**
   * 更新菜单方法
   * @param fields
   */
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'menu/update',
      payload: {
        desc: fields,
      },
    });
    message.success('更新成功');
    this.handleUpdateModalVisible();
  };

  /**
   * 渲染左侧树的子节点
   * @param data
   * @returns {*}
   */
  renderTreeNodes = data =>
    data.map(item => {
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
   * 表格上方条件过滤框渲染
   * @returns {*}
   */
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="菜单名称">
              {getFieldDecorator('menuName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="菜单路径">
              {getFieldDecorator('path')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
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

  render() {
    const {
      menu: { data },
      treeData,
      loading,
    } = this.props;

    const { selectedRows, modalVisible, updateModalVisible, editMenuRecord } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper>
        <Row gutter={5}>
          <Col lg={5} md={24}>
            <Card bordered={false}>
              <Tree onSelect={this.handleSelectTree}>{this.renderTreeNodes(treeData)}</Tree>
            </Card>
          </Col>
          <Col lg={19} md={24}>
            <Card bordered={false}>
              <div className={styles.tableList}>
                <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
                <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                    新建
                  </Button>
                  <Button
                    icon="import"
                    type="primary"
                    onClick={() => this.handleModalVisible(true)}
                  >
                    Excel导入
                  </Button>
                  {selectedRows.length > 0 && (
                    <span>
                      <Button icon="export" onClick={this.handleExportExcelClick}>
                        导出Excel
                      </Button>
                    </span>
                  )}
                </div>
                <StandardTable
                  selectedRows={selectedRows}
                  loading={loading}
                  data={data}
                  columns={this.columns}
                  onSelectRow={this.handleSelectRows}
                  onChange={this.handleStandardTableChange}
                />
              </div>
            </Card>
            <CreateMenuForm
              {...parentMethods}
              modalVisible={modalVisible}
              orgTree={treeData}
            />
            <UpdateMenuForm
              {...updateMethods}
              editMenuRecord={editMenuRecord}
              updateModalVisible={updateModalVisible}
              orgTree={treeData}
            />
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Menu;
