import React, {Fragment} from 'react';
import Link from 'umi/link';
import {Icon} from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';


const copyright = (
  <Fragment>
    Copyright  <Icon type="copyright" /> 2016-1018 XWBank All Rights Reserved
  </Fragment>
);

class UserLayout extends React.PureComponent {

  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <DocumentTitle title="XTXN PORTAL" />
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>XTXN PORTAL</span>
              </Link>
            </div>
            <div className={styles.desc}>消费信贷核心门户系统</div>
          </div>
          {children}
        </div>
        <GlobalFooter copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
