import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import {
  AutoComplete,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Tooltip,
  TreeSelect,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../List/TableList.less';

const validStatusMap = ['0', '1'];
const validStatus = ['无效', '有效'];
const adminStatusMap = ['0', '1', '2', '3'];
const adminStatus = ['普通', '超级', '业务', '系统'];

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
 * 新增用户模态框
 * @type {React.ComponentClass<RcBaseFormProps & Omit<FormComponentProps, keyof FormComponentProps>>}
 */
const CreateUserForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleAdd,
    handleChange,
    handleModalVisible,
    orgTree,
    dataSource,
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
      title="新增用户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...formItemLayout} label="用户编号">
        {form.getFieldDecorator('userId', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入用户编号" />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={
          <span>
            登录名&nbsp;
            <Tooltip title="登录账户名称，一般为中文名字缩写，且唯一">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {form.getFieldDecorator('loginName', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入登录名" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="姓名">
        {form.getFieldDecorator('userName', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="手机号">
        {form.getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入手机号" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="邮箱">
        {form.getFieldDecorator('email', {
          rules: [{ required: true, message: '请输入邮箱！' }],
        })(
          <AutoComplete dataSource={dataSource} onChange={handleChange} placeholder="请输入邮箱">
            <Input />
          </AutoComplete>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="组织">
        {form.getFieldDecorator('orgId', {
          rules: [{ required: true, message: '请选择一个组织!' }],
        })(
          <TreeSelect
            allowClear
            style={{ width: 300 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={orgTree}
            placeholder="请选择一个组织"
          />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="管理员标志">
        {form.getFieldDecorator('adminFlag', {
          rules: [{ required: true, message: '请选择一个' }],
          initialValue: 0,
        })(
          <RadioGroup name="adminFlagRadioGroup">
            <Radio value={0}>普通</Radio>
            <Radio value={1}>超级</Radio>
            <Radio value={2}>业务</Radio>
            <Radio value={3}>系统</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="员工编号">
        {form.getFieldDecorator('userNumber', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="登录方式">
        {form.getFieldDecorator('loginType', {
          rules: [
            {
              required: true,
              message: '请选择一个！',
            },
          ],
          initialValue: 0,
        })(
          <RadioGroup name="loginTypeRadioGroup">
            <Radio value={0}>账户</Radio>
            <Radio value={1}>手机</Radio>
          </RadioGroup>
        )}
      </FormItem>
    </Modal>
  );
});

/**
 * 更新用户模态框
 * @type {React.ComponentClass<RcBaseFormProps & Omit<FormComponentProps, keyof FormComponentProps>>}
 */
const UpdateUserForm = Form.create()(props => {
  const {
    form,
    handleUpdate,
    updateModalVisible,
    editUserRecord,
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
      title="更新用户"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible()}
    >
      <FormItem {...formItemLayout} label="用户编号">
        {form.getFieldDecorator('userId', {
          initialValue: editUserRecord.userId,
        })(<Input placeholder="请输入用户编号" disabled />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={
          <span>
            登录名&nbsp;
            <Tooltip title="登录账户名称，一般为中文名字缩写，且唯一">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {form.getFieldDecorator('loginName', {
          initialValue: editUserRecord.loginName,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入登录名" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="姓名">
        {form.getFieldDecorator('userName', {
          initialValue: editUserRecord.userName,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="手机号">
        {form.getFieldDecorator('phone', {
          initialValue: editUserRecord.phone,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入手机号" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="邮箱">
        {form.getFieldDecorator('email', {
          initialValue: editUserRecord.email,
          rules: [{ required: true, message: '请输入邮箱！' }],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="组织">
        {form.getFieldDecorator('orgId', {
          initialValue: editUserRecord.orgName,
          rules: [{ required: true, message: '请选择一个组织!' }],
        })(
          <TreeSelect
            allowClear
            style={{ width: 300 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={orgTree}
            placeholder="请选择一个组织"
          />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="管理员标志">
        {form.getFieldDecorator('adminFlag', {
          initialValue: editUserRecord.adminFlag,
          rules: [{ required: true, message: '请选择一个' }],
        })(
          <RadioGroup name="adminFlagRadioGroup">
            <Radio value={0}>普通</Radio>
            <Radio value={1}>超级</Radio>
            <Radio value={2}>业务</Radio>
            <Radio value={3}>系统</Radio>
          </RadioGroup>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="员工编号">
        {form.getFieldDecorator('userNumber', {
          initialValue: editUserRecord.userNumber,
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="登录方式">
        {form.getFieldDecorator('loginType', {
          rules: [
            {
              required: true,
              message: '请选择一个！',
            },
          ],
          initialValue: editUserRecord.loginType,
        })(
          <RadioGroup name="loginTypeRadioGroup">
            <Radio value={0}>账户</Radio>
            <Radio value={1}>手机</Radio>
          </RadioGroup>
        )}
      </FormItem>
    </Modal>
  );
});

/* eslint react/no-multi-comp:0 */
@connect(({ user, loading, org }) => ({
  user,
  orgTree: org.orgTree,
  loading: loading.models.user,
}))
@Form.create()
class User extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    dataSource: [],
    editUserRecord: {},
  };

  /**
   * 定义表格列信息
   * @type {*[]}
   */
  columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
    },
    {
      title: '登录名',
      dataIndex: 'loginName',
    },
    {
      title: '姓名',
      dataIndex: 'userName',
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
      title: '组织全称',
      dataIndex: 'orgFullName',
    },
    // {
    //   title: '登录方式',
    //   dataIndex: 'loginType',
    // },
    // {
    //   title: '员工编号',
    //   dataIndex: 'userNumber',
    // },
    {
      title: '管理员标志',
      dataIndex: 'adminFlag',
      filters: [
        {
          text: adminStatus[0],
          value: 0,
        },
        {
          text: adminStatus[1],
          value: 1,
        },
        {
          text: adminStatus[2],
          value: 2,
        },
        {
          text: adminStatus[3],
          value: 3,
        },
      ],
      render(val) {
        return <Badge status={adminStatusMap[val]} text={adminStatus[val]} />;
      },
    },
    {
      title: '有效状态',
      dataIndex: 'validFlag',
      filters: [
        {
          text: validStatus[0],
          value: 0,
        },
        {
          text: validStatus[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={validStatusMap[val]} text={validStatus[val]} />;
      },
    },
    // {
    //   title: '创建人',
    //   dataIndex: 'creatorName',
    // },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    // {
    //   title: '最近更新人',
    //   dataIndex: 'lastUpdateBy',
    // },
    // {
    //   title: '最近更新时间',
    //   dataIndex: 'lastUpdateTime',
    //   sorter: true,
    //   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    // },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <Button
            icon="edit"
            type="primary"
            onClick={() => this.handleUpdateModalVisible(true, record)}
          />
          <Divider type="vertical" />
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
    const pageInfo = {
      pageSize: 10,
      current: 1,
    };
    dispatch({
      type: 'user/fetch',
      payload: pageInfo,
    });
    dispatch({
      type: 'org/fetchOrgTree',
    });
  }

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

  /**
   * 重置密码
   */
  handleResetPassword = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows) {
      dispatch({
        type: 'user/resetPassword',
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
      editUserRecord: record || {},
    });
  };

  /**
   * 拼接邮箱后缀
   * @param value
   */
  handleChange = value => {
    this.setState({
      dataSource:
        !value || value.indexOf('@') >= 0
          ? []
          : [`${value}@xwbank.com`, `${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`],
    });
  };

  /**
   * 新增用户方法
   * @param fields
   */
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/add',
      payload: {
        desc: fields,
      },
    });
    message.success('添加用户成功');
    this.handleModalVisible();
  };

  /**
   * 更新用户方法
   * @param fields
   */
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/update',
      payload: {
        desc: fields,
      },
    });

    message.success('用户更新成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      orgTree,
      form: { getFieldDecorator },
    } = this.props;

    const { dataSource } = this.state;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem>
              {getFieldDecorator('orgId')(
                <TreeSelect
                  allowClear
                  style={{ width: 300 }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={orgTree}
                  placeholder="请选择一个组织"
                />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入手机号" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="邮箱">
              {getFieldDecorator('email')(
                <AutoComplete
                  dataSource={dataSource}
                  onChange={this.handleChange}
                  placeholder="请输入邮箱"
                >
                  <Input />
                </AutoComplete>
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

  render() {
    const {
      user: { data },
      orgTree,
      loading,
    } = this.props;

    const {
      selectedRows,
      modalVisible,
      updateModalVisible,
      dataSource,
      editUserRecord,
    } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      handleChange: this.handleChange,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper>
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
                onClick={() => this.handleImportUserFromExcel(true)}
              >
                Excel导入
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button icon="export" onClick={this.handleExportExcel}>
                    导出Excel
                  </Button>
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
        <CreateUserForm
          {...parentMethods}
          modalVisible={modalVisible}
          orgTree={orgTree}
          dataSource={dataSource}
        />
        <UpdateUserForm
          {...updateMethods}
          editUserRecord={editUserRecord}
          updateModalVisible={updateModalVisible}
          orgTree={orgTree}
        />
      </PageHeaderWrapper>
    );
  }
}

export default User;
