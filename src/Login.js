import { useEffect,useCallback } from 'react';
import './css/Login.css';
import {Form, Input, Button} from 'antd';
import 'antd/dist/antd.min.css';
import {FireOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {login} from './actions';
import {url} from './properties';
import {useNavigate} from "react-router-dom";
import cookie from 'react-cookies';

function Login() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleFinish=useCallback((id,password)=>{
    axios.get(`${url}/user/${id}/${password}`)
         .then((res)=>{
           if(res.data.id!==0){
            dispatch(login(res.data));
            if(res.data.type==='0'){
              navigate('./workspace/create_course');
            }
            cookie.save('id',id,{path:'/'});
            cookie.save('password',password,{path:'/'});
            }
            else{
              alert("ID或密码错误！");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
  },[dispatch,navigate]);

  useEffect(() => {
    if(cookie.load('id')&&cookie.load('password')){
      handleFinish(cookie.load('id'),cookie.load('password'));
    }
  }, [handleFinish]);

  return (
    <div className="Login">
      <div className="login_form">
        <Form labelCol={{span: 8}} wrapperCol={{span: 12}} initialValues={{}} onFinish={value=>handleFinish(value.id,value.password)}>
          <FireOutlined className="icon" style={{fontSize: "80px",color:"#800000"}} />
          <div className="title">Lava</div>
          <Form.Item label="用户ID" name="id" rules={[{required: true,message: '请输入用户ID'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{required: true,message: '请输入密码'}]}>
            <Input.Password />
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
