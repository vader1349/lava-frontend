import {Menu} from 'antd';
import {
    UserOutlined,
    BookOutlined
  } from '@ant-design/icons';
  import { useNavigate} from "react-router-dom";

function AdminBar(){

    const { SubMenu } = Menu;
    const navigate=useNavigate();
    const changeKey=event=>{
      navigate(event.key);
    }

    return(
        <Menu theme="dark" defaultSelectedKeys={['create_course']} mode="inline" defaultOpenKeys={['sub1']} style={{backgroundColor:'#800000'}} onClick={event=>changeKey(event)}>
            <SubMenu key="sub1" icon={<BookOutlined />} title="课程管理" style={{backgroundColor:'#B22222'}}>
              <Menu.Item key="create_course">创建课程</Menu.Item>
              <Menu.Item key="edit_course">编辑课程</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="用户管理" style={{backgroundColor:'#B22222'}}>
              <Menu.Item key="create_user">创建用户</Menu.Item>
              <Menu.Item key="edit_user">编辑用户</Menu.Item>
            </SubMenu>
        </Menu>
    );
}

export default AdminBar;