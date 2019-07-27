import React, { useState, Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import fetch from 'cross-fetch';
import { Input, Button, Checkbox, Grid, Message } from '@alifd/next';
import connect from '@/connect/user';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError
} from '@icedesign/form-binder';
import Icon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';

const { Row, Col } = Grid;

let form;
@connect
class UserLogin extends Component {
  constructor(props) {
    super(props);
    // const [value, setValue] = useState({
    //   username: '',
    //   password: '',
    //   checkbox: false
    // });
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false
      }
    };
  }

  formChange = formValue => {
    this.setState({ value: { ...formValue } });
  };

  handleSubmit = e => {
    e.preventDefault();
    form.validateAll((errors, values) => {
      if (errors) {
        console.log('errors', errors);
        return;
      }
      console.log({ ...values });
      console.log('props', this.props);
      let { dispatchLogin, fetchLogin } = this.props;
      fetchLogin(values);
      // fetch('https://api.github.com/users/wenfangwen')
      //   .then(response => response.json())
      //   .then(json => {
      //     console.log('登录结果', json);
      //     if (json.login === 'wenfangwen') {
      //       Message.success('登录成功');
      //       dispatchLogin(json);
      //       this.props.history.push('/');
      //     } else {
      //       Message.error('登录失败');
      //     }
      //   });
    });
  };

  render() {
    let { value } = this.state;
    let { isFetching } = this.props;
    return (
      <div className={styles.formContainer}>
        <h4 className={styles.formTitle}>登 录</h4>
        <IceFormBinderWrapper value={value} onChange={this.formChange} ref={formRef => (form = formRef)}>
          <div className={styles.formItems}>
            <Row className={styles.formItem}>
              <Col className={styles.formItemCol}>
                <Icon type="person" size="small" className={styles.inputIcon} />
                <IceFormBinder name="username" required message="请输入用户名">
                  <Input className={styles.nextInputSingle} maxLength={20} placeholder="用户名" />
                </IceFormBinder>
              </Col>
              <Col>
                <IceFormError name="username" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col className={styles.formItemCol}>
                <Icon type="lock" size="small" className={styles.inputIcon} />
                <IceFormBinder name="password" required message="请输入密码">
                  <Input className={styles.nextInputSingle} htmlType="password" placeholder="密码" />
                </IceFormBinder>
              </Col>
              <Col>
                <IceFormError name="password" />
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Col>
                <IceFormBinder name="checkbox">
                  <Checkbox className={styles.checkbox}>记住账号</Checkbox>
                </IceFormBinder>
              </Col>
            </Row>

            <Row className={styles.formItem}>
              <Button type="primary" onClick={this.handleSubmit} className={styles.submitBtn}>
                {isFetching ? '登录中...' : '登 录'}
              </Button>
              {/* <p className={styles.account}>
                <span className={styles.tipsText} style={{ marginRight: '20px' }}>
                  管理员登录：admin/admin
                </span>
                <span className={styles.tipsText}>学生登录：user/user</span>
              </p> */}
            </Row>

            <Row className={styles.tips}>
              <Link to="/user/register" className={styles.tipsText}>
                立即注册
              </Link>
            </Row>
          </div>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

export default withRouter(UserLogin);
