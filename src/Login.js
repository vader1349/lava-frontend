import { useEffect,useCallback } from 'react';
import './css/Login.css';
import {Form, Input, Button, Checkbox} from 'antd';
import 'antd/dist/antd.min.css';
import {FireOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {url,login} from './actions';
import { useNavigate } from "react-router-dom";
import cookie from 'react-cookies';

function Login() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const submit=useCallback((id,password,remenber)=>{
    axios.get(`${url}/user/${id}/${password}`)
         .then((res)=>{
           if(res.data.id!==0){
            dispatch(login(res.data));
            navigate('/layout');
            if(remenber){
              cookie.save('id',id);
              cookie.save('password',password);
            }
          }
    });
  },[dispatch,navigate]);

  useEffect(() => {
    let id=cookie.load('id');
    let password=cookie.load('password');
    if(id!==undefined&&password!==undefined){
      submit(id,password,true);
    }
  }, [submit]);

  return (
    <div className="Login">
      <div className="login_form">
        <Form labelCol={{span: 8}} wrapperCol={{span: 12}} initialValues={{remember: false}} onFinish={value=>submit(value.id,value.password,value.remember)}>
          <FireOutlined className="icon" style={{fontSize: "80px",color:"#800000"}} />
          <div className="title">Lava</div>
          <Form.Item label="用户ID" name="id" rules={[{required: true,message: '请输入用户ID'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{required: true,message: '请输入密码'}]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{span: 24}}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{span: 24}}>
            <Button type="primary" htmlType="submit" size="large" shape="round" style={{backgroundColor:"#800000"}}>登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
