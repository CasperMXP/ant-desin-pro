import React, {Fragment, PureComponent} from 'react';
import {connect} from 'dva';
import {Badge, Button, Card, Col, Divider, Form, Input, message, Modal, Row, Select, Tooltip, Transfer,} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../List/TableList.less';

const validStatusMap = ['0', '1'];
const validStatus = ['无效', '有效'];

const FormItem = Form.Item;
const {Option} = Select;
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
 * 新增角色模态框
 * @type {React.ComponentClass<RcBaseFormProps & Omit<FormComponentProps, keyof FormComponentProps>>}
 */
const CreateRoleForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleAdd,
    handleModalVisible,
    renderSelectOptions,
    roleTypes,
  } = props;

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
      title="新增角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...formItemLayout} label="角色编号">
        {form.getFieldDecorator('roleId', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="角色名称"
      >
        {form.getFieldDecorator('roleName', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="角色类型">
        {form.getFieldDecorator('roleTypeId', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })( <Select style={{ width: 120 }}>{renderSelectOptions(roleTypes)}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="描述">
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});
/**
 * 更新角色模态框
 * @type {React.ComponentClass<RcBaseFormProps & Omit<FormComponentProps, keyof FormComponentProps>>}
 */
const UpdateRoleForm = Form.create()(props => {
  const {
    form,
    handleUpdate,
    updateModalVisible,
    editRoleRecord,
    handleUpdateModalVisible,
    renderSelectOptions,
    roleTypes,
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
      title="更新角色"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible()}
    >
      <FormItem {...formItemLayout} label="角色编号">
        {form.getFieldDecorator('roleId', {
          initialValue:editRoleRecord.roleId,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" disabled />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="角色名称"
      >
        {form.getFieldDecorator('roleName', {
          initialValue:editRoleRecord.roleName,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="角色类型">
        {form.getFieldDecorator('roleTypeId', {
          initialValue:editRoleRecord.roleTypeId,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })( <Select style={{ width: 120 }}>{renderSelectOptions(roleTypes)}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="描述">
        {form.getFieldDecorator('description', {
          initialValue:editRoleRecord.description,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

/**
 * 角色与菜单按钮资源关联模态框
 */
const SetRoleResourceForm = Form.create()(props =>{

});

/**
 * 角色与人员关联模态框
 * @type {React.ComponentClass<RcBaseFormProps & Omit<FormComponentProps, keyof FormComponentProps>>}
 */
const SetRoleUserForm = Form.create()(props => {

  const {
    form,
    handleSetRoleUser,
    roleUserModalVisible,
    roleRecord,
    handleRoleUserModalVisible,
    users,
  } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSetRoleUser(fieldsValue);
    });
  };

  const changeTransfer = (targetKeys) => {
    roleRecord.loginNames = [...targetKeys]
  }

  return (
    <Modal
      centered
      closable={false}
      maskClosable={false}
      width={600}
      title="设置角色关联人员"
      visible={roleUserModalVisible}
      onOk={okHandle}
      onCancel={() => handleRoleUserModalVisible()}
    >
      <FormItem
        {...formItemLayout}
        label="角色id"
      >
        {form.getFieldDecorator('roleId', {
          initialValue:roleRecord.roleId,
        })(<Input disabled />)}
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="角色名称"
      >
        {form.getFieldDecorator('roleName', {
          initialValue:roleRecord.roleName,
        })(<Input disabled />)}
      </FormItem>
      <FormItem>
        {form.getFieldDecorator('loginNames', {
        })(
          <Transfer
            dataSource={users}
            showSearch
            titles={['可关联人员', '已关联人员']}
            listStyle={{
              width: 250,
              height: 300,
            }}
            targetKeys={roleRecord.loginNames}
            render={item => item.title + '-' + item.key}
            onChange={changeTransfer}
          />
        )}
      </FormItem>

    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ role, loading, user }) => ({
  role,
  loading: loading.models.role,
  roleTypes: role.roleTypes,
  users: user.users
}))
@Form.create()
class Role extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    roleUserModalVisible: false,
    selectedRows: [],
    formValues: {},
    editRoleRecord: {},
    roleRecord: {},
  };

  /**
   * 定义表格列信息
   * @type {*[]}
   */
  columns = [
    {
      title: '角色ID',
      dataIndex: 'roleId',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '角色类型',
      dataIndex: 'roleTypeName',
    },
    {
      title: '角色描述',
      dataIndex: 'description',
    },
    {
      title: '有效状态',
      dataIndex: 'validFlag',
      filters: [
        {
          text: validStatus[0],
          value: validStatusMap[0],
        },
        {
          text: validStatus[1],
          value: validStatusMap[1],
        },
      ],
      render(val) {
        return <Badge status={validStatus[val]} text={validStatus[val]} />;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>角色资源设置</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleRoleUserUpdateModalVisible(true, record)}>角色人员设置</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <a>{record.validFlag === 1 ? '失效' : '生效'}</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    const pageInfo = {
      pageSize: 10,
      current: 1,
    };
    dispatch({
      type: 'role/fetch',
      payload: pageInfo,
    });
    dispatch({
      type: 'role/fetchRoleType',
    });
    dispatch({
      type: 'user/fetchAllUsers'
    });
  }


  /**
   * 动态渲染角色类型下拉列表
   * @param data
   * @returns {*}
   */
  renderSelectOptions = data =>
    data.map(item =>
      <Option value={item.roleTypeId}>{item.roleTypeName}</Option>
    )

  /**
   * 处理表格上分页，条件过滤等事件
   * @param pagination 分页数据
   * @param filtersArg 过滤参数
   * @param sorter 排序参数
   */
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
      type: 'user/fetch',
      payload: params,
    });
  };

  /**
   * 表格上搜索条件的重置按钮
   */
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'user/fetch',
      payload: {},
    });
  };

  /**
   * 将选择的表格用户进行删除,将有效标志设置为0
   */
  handleDeleteClick = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows) {
      dispatch({
        type: 'user/remove',
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

  /**
   * 设置用户有效
   */
  handleUserValidClick = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows) {
      dispatch({
        type: 'user/valid',
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
   * 表格上条件过滤查询
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
        type: 'user/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      editRoleRecord: record || {},
    });
  };

  handleRoleUserUpdateModalVisible = (flag, record) => {
    this.setState({
      roleUserModalVisible: !!flag,
      roleRecord: record || {},
    });
    const { dispatch } = this.props;
    const pageInfo = {
      pageSize: 10,
      current: 1,
    };
    dispatch({
      type: 'role/fetch',
      payload: pageInfo,
    });
  };

  /**
   * 新增角色方法
   * @param fields
   */
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/add',
      payload: {
        desc: fields,
      },
    });
    message.success('添加角色成功');
    this.handleModalVisible();
  };

  /**
   * 更新角色方法
   * @param fields
   */
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/update',
      payload: {
        desc: fields,
      },
    });

    message.success('更新角色成功');
    this.handleUpdateModalVisible();
  };

  /**
   * 给角色设置用户
   * @param fields
   */
  handleSetRoleUser = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'role/setUsers',
      payload: {
        desc: fields,
      },
    });
    this.handleRoleUserUpdateModalVisible();
  }

  renderSimpleForm() {
    const {
      roleTypes,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="角色类型">
              {getFieldDecorator('roleTypeId')(
                <Select>
                  {this.renderSelectOptions(roleTypes)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="角色名称">
              {getFieldDecorator('roleName')(<Input placeholder="请输入" />)}
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

  render() {
    const {
      role: { data },
      loading,
      roleTypes,
      users,
    } = this.props;

    const {
      selectedRows,
      modalVisible,
      updateModalVisible,
      editRoleRecord,
      roleRecord,
      roleUserModalVisible,
    } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleChange: this.handleChange,
      renderSelectOptions:this.renderSelectOptions,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      renderSelectOptions:this.renderSelectOptions,
    };

    const setRoleUserMethods = {
      handleRoleUserModalVisible: this.handleRoleUserUpdateModalVisible,
      handleSetRoleUser: this.handleSetRoleUser,
    };

    return (

      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建角色
              </Button>
              <Button
                icon="import"
                type="primary"
                onClick={() => this.handleImportUserFromExcel(true)}
              >
                Excel导入
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Tooltip title="统一默认重置用户密码为1">
                    <Button icon="safety" onClick={this.handleResetPassword}>
                      重置密码
                    </Button>
                  </Tooltip>
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
        <CreateRoleForm
          {...parentMethods}
          modalVisible={modalVisible}
          roleTypes={roleTypes}
        />
        <UpdateRoleForm
          {...updateMethods}
          updateModalVisible={updateModalVisible}
          editRoleRecord={editRoleRecord}
          roleTypes={roleTypes}
        />
        <SetRoleUserForm
          {...setRoleUserMethods}
          roleUserModalVisible={roleUserModalVisible}
          roleRecord={roleRecord}
          users={users}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Role;
