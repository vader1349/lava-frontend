import React, { useState } from 'react';
import './css/Frame.css';
import 'antd/dist/antd.min.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  FireOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import cookie from 'react-cookies';
import {logout} from './actions';
import {useDispatch} from 'react-redux';


function Frame(){

  const [collapsed,setCollapesd]=useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const dispatch=useDispatch();

  const exit=()=>{
    cookie.remove('id');
    cookie.remove('password');
    dispatch(logout());
  }

  return(
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={()=>setCollapesd(!collapsed)} style={{backgroundColor:'#800000'}}>
        <div className='logo'>
          <FireOutlined className="icon" style={{fontSize: "50px",color:'white',margin:0}} />
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{backgroundColor:'#B22222'}}>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding:0,borderWidth:'0 0 2px 0',borderStyle:'solid',borderColor:'#800000',backgroundColor:'#f0f2f5',height:'80px'}}>
          <div className='header'>
            Lava
            <LogoutOutlined className='exit' onClick={()=>exit()}/>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default Frame;