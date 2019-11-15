import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input } from 'antd';

const FormItem = Form.Item;

@connect((user, loading) => ({
  currentUser: user.currentUser,
  loading: loading,
}))
@Form.create()
export default class Welcome extends PureComponent {
  render() {
    const { currentUser = {} } = this.props;
    console.log(this);
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col>
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                initialValue: currentUser.username,
              })(<Input />)}
            </FormItem>
          </Col>
          <Col>
            <FormItem label="密码">
              {getFieldDecorator('password', {
                initialValue: currentUser.password,
              })(<Input />)}
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  }
}
