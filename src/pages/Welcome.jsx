import React, { PureComponent } from 'react';
import { Card, Typography, Alert, Col,Row, Form, Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';


const FormeItem = Form.Item;

@connect((user,loading)=>({
  user: user,
  loading: loading.models.user
}))
@Form.create()
export default class Welcome extends PureComponent{

  componentDidMount(){
    this.props.dispatch({
      type:'user/fetchCurrent'
    })
  }


  render(){
    const {user: {currentUser},} = this.props;
    const { getFieldsDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col>
            <FormItem label="用户名">
              {getFieldsDecorator('username',{
                initialValue: currentUser.username
              })(
                <Input  />
              )

              }
            </FormItem>
          </Col>
          <Col>
            <FormItem label="密码">
              {getFieldsDecorator('password',{
                initialValue: currentUser.password
              })(
                <Input  />
              )

              }
            </FormItem>
          </Col>
        </Row>


      </div>
    )
  }
}
