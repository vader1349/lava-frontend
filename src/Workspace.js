import React, { useState} from 'react';
import './css/Workspace.css';
import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import {
  FireOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import {logout} from './actions';
import {useDispatch,useSelector} from 'react-redux';
import AdminBar from './AdminBar';
import { Outlet} from "react-router-dom";
import cookie from 'react-cookies';

function Workspace(){

  const [collapsed,setCollapesd]=useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const dispatch=useDispatch();
  const userType=useSelector(state=>state.user.type);

  const exit=()=>{
    cookie.remove('id',{path:'/'});
    cookie.remove('password',{path:'/'});
    dispatch(logout());
  }

  return(
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={()=>setCollapesd(!collapsed)} style={{backgroundColor:'#800000'}}>
        <div className='logo'>
          <FireOutlined className="icon" style={{fontSize: "50px",color:'white',margin:0}} />
        </div>
      {userType==='0'&&<AdminBar/>}
      </Sider>
      <Layout>
        <Header className="site-header" style={{ padding:0,backgroundColor:'#f0f2f5',height:'80px',boxShadow:'3px 3px 3px #800000'}}>
          <div className='header'>
            Lava
            <LogoutOutlined className='exit' onClick={()=>exit()}/>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
        <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2022 Created by Vader1349</Footer>
      </Layout>
    </Layout>
  );
}

export default Workspace;