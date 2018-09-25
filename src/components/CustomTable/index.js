import React, {PureComponent} from 'react';
import {Table} from 'antd';
import styles from './index.less';

class CustomTable extends PureComponent {

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  render() {
    const {
      data: { list, pagination },
      loading,
      columns,
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    return (
      <div className={styles.customTable}>
        <Table
          loading={loading}
          rowKey="key"
          dataSource={list}
          columns={columns}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default CustomTable;
