import React, {Fragment, PureComponent} from 'react';
import {connect} from 'dva';
import {Badge, Button, Card, Col, Divider, Form, Input, message, Modal, Row, Tooltip, Tree, TreeSelect,} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import moment from 'moment';
import styles from '../List/TableList.less';

const statusMap = ['1', '0'];
const status = ['无效', '有效'];
const statusBtn = ['有效', '无效'];

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
 * 新增组织面板
 * @type {React.ComponentClass<RcBaseFormProps & Omit<FormComponentProps, keyof FormComponentProps>>}
 */
const CreateOrgForm = Form.create()(props => {
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
      title="新建组织"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...formItemLayout} label="组织编号">
        {form.getFieldDecorator('orgId', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="组织名称">
        {form.getFieldDecorator('orgName', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="父组织">
        {form.getFieldDecorator('pid', {
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
      <FormItem {...formItemLayout} label="描述">
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

/**
 * 更新组织面板
 * @type {React.ComponentClass<RcBaseFormProps & Omit<FormComponentProps, keyof FormComponentProps>>}
 */
const UpdateOrgForm = Form.create()(props => {
  const {
    form,
    handleUpdate,
    updateModalVisible,
    editOrgRecord,
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
      title="更新组织"
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => handleUpdateModalVisible()}
    >
      <FormItem {...formItemLayout} label="组织编号">
        {form.getFieldDecorator('orgId', {
          initialValue: editOrgRecord.orgId,
        })(<Input disabled />)}
      </FormItem>
      <FormItem {...formItemLayout} label="组织名称">
        {form.getFieldDecorator('orgName', {
          initialValue: editOrgRecord.orgName,
          rules: [{ required: true, message: '请输入组织名称!' }],
        })(<Input placeholder="请输入组织名称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="父组织">
        {form.getFieldDecorator('pid', {
          initialValue: editOrgRecord.pid,
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
      <FormItem {...formItemLayout} label="描述">
        {form.getFieldDecorator('description', {
          initialValue: editOrgRecord.description,
          rules: [{ required: true, message: '请输入组织描述!' }],
        })(<Input placeholder="请输入组织描述" />)}
      </FormItem>
    </Modal>
  );
});
/* eslint react/no-multi-comp:0 */
@connect(({ org, loading }) => ({
  org,
  orgTree: org.orgTree,
  loading: loading.models.org,
}))
@Form.create()
class Org extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    formValues: {},
    editOrgRecord: {},
  };

  /**
   * 定义表格列信息
   * @type {*[]}
   */
  columns = [
    {
      title: '组织ID',
      dataIndex: 'orgId',
    },
    {
      title: '组织名称',
      dataIndex: 'orgName',
    },
    {
      title: '组织全称',
      dataIndex: 'orgFullName',
    },
    {
      title: '父组织名称',
      dataIndex: 'parentOrgName',
    },
    {
      title: '描述',
      dataIndex: 'description',
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
          <Divider type="vertical" />
          <Tooltip title={record.validFlag ===1 ? "设置无效" : "设置有效"}>
            <Button
              type={record.validFlag ===1 ? "danger" : "primary"}
              icon={record.validFlag ===1 ? "close" : "check"}
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
      type: 'org/fetch',
      payload: pageInfo,
    });
    dispatch({
      type: 'org/fetchOrgTree',
    });
  }

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
   * 处理组织树的选择事件，选择节点后，刷新右边表格数据为当前节点和它的一级子节点数据
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
      editOrgRecord: record || {},
    });
  };

  /**
   * 删除组织
   * @param orgId
   */
  handleChangeValidFlagByOrgId = (orgId,validFlag) => {
    const params = {
      id: orgId,
      valid: validFlag,
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'org/changeValidFlag',
      payload: params,
    });
  };

  handleChangeOrgValidFlag = record => {
    const { orgName, orgId, validFlag } = record;
    if(validFlag === 1){
      Modal.confirm({
        title: '确认设置无效【'.concat(orgName).concat('】嘛?'),
        content: '设置无效【 '.concat(orgName).concat('】将该组织的子组织和人员信息设置无效！！！'),
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        onOk: () => this.handleChangeValidFlagByOrgId(orgId,validFlag),
      });
    }else{
      Modal.confirm({
        title: '确认设置有效【'.concat(orgName).concat('】嘛?'),
        content: '设置有效【 '.concat(orgName).concat('】将该组织的子组织和人员信息设置有效！！！'),
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',
        onOk: () => this.handleChangeValidFlagByOrgId(orgId,validFlag),
      });
    }
  };

  /**
   * 新增组织方法
   * @param fields
   */
  handleAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'org/add',
      payload: {
        desc: fields,
      },
    });
    message.success('添加组织成功');
    this.handleModalVisible();
  };

  /**
   * 更新组织方法
   * @param fields
   */
  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'org/update',
      payload: {
        desc: fields,
      },
    });
    message.success('更新成功');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem label="组织名称">
              {getFieldDecorator('orgName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
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
      org: { data },
      orgTree,
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, editOrgRecord } = this.state;

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
              <Tree onSelect={event => this.handleSelectTree(event)} defaultExpandAll>
                {this.renderTreeNodes(orgTree)}
              </Tree>
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
            <CreateOrgForm {...parentMethods} modalVisible={modalVisible} orgTree={orgTree} />
            <UpdateOrgForm
              {...updateMethods}
              editOrgRecord={editOrgRecord}
              updateModalVisible={updateModalVisible}
              orgTree={orgTree}
            />
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Org;
