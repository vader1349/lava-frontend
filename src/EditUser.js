import { Breadcrumb } from 'antd';
import {useSelector} from 'react-redux';

function EditUser(){

    const userName=useSelector(state=>state.user.name);

    return(
        <div className='main'>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{userName}</Breadcrumb.Item>
                <Breadcrumb.Item>编辑用户</Breadcrumb.Item>
            </Breadcrumb>
            <div className='main-content'>
                <div className='main-content-area'></div>
            </div>
        </div>
    );
}

export default EditUser;