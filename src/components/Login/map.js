import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

export default {
  UserName: {
    props: {
      size: 'large',
      prefix: <Icon type="user" className={styles.prefixIcon} />,
      placeholder: '账户名',
    },
    rules: [
      {
        required: true,
        message: '请输入账户名!',
      },
      {
        max:15,
        message: '账户名最大长度为15',
      },
      {
        min:4,
        message: '账户名最小长度为4',
      },
    ],
  },
  Password: {
    props: {
      size: 'large',
      prefix: <Icon type="lock" className={styles.prefixIcon} />,
      type: 'password',
      placeholder: '密码',
    },
    rules: [
      {
        required: true,
        message: '请输入密码!',
      },
      {
        max:30,
        message: '密码最大长度为15',
      },
      {
        min:1,
        message: '密码最小长度为4',
      },
    ],
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: <Icon type="mobile" className={styles.prefixIcon} />,
      placeholder: '手机号',
    },
    rules: [
      {
        required: true,
        message: '请输入手机号!',
      },
      {
        pattern: /^1\d{10}$/,
        message: '手机号码格式错误!',
      },
    ],
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: <Icon type="mail" className={styles.prefixIcon} />,
      placeholder: '验证码',
    },
    rules: [
      {
        required: true,
        message: '请输入验证码!',
      },
    ],
  },
};
