import { Breadcrumb } from 'antd';
import {useSelector} from 'react-redux';
import {Form, Input, Button, Select} from 'antd';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {url} from './actions';

function CreateCourse(){

    const userName=useSelector(state=>state.user.name);
    const [type,setType]=useState('-1');
    const [programType,setProgramType]=useState('-1');
    const [programs,setPrograms]=useState([]);
    const [departments,setDepartments]=useState([]);
    const [form] = Form.useForm();

    const selectType=value=>{
        setType(value);
    }

    const selectProgramType=value=>{
        setProgramType(value);
    }

    const handleFinish=value=>{
        var types=["administrator","student","instructor"];
        axios.post(`${url}/${types[parseInt(type)]}`, {
            name:value.name,
            email:value.email,
            password:value.email,
            type:type,
            departmentId:value.departmentId,
            position:value.position,
        })
        .then(res=>{
            if(res.data!==0){
                alert("注册成功！用户初始密码位E-mail地址。");
                if(type==='1'){
                    axios.post(`${url}/student_program`,{
                        programId:value.programId,
                        studentId:res.data,
                    })
                    .catch(function (error) {
                        alert("注册攻读项目失败！请检查稍后再试。");
                        console.log(error);
                    });
                }
                form.setFieldsValue({type:type});
            }
        })
        .catch(function (error) {
            alert("注册失败！请检查E-mail地址等信息是否正确。");
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get(`${url}/program`)
         .then((res)=>{
           setPrograms(res.data);
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.get(`${url}/department`)
         .then((res)=>{
           setDepartments(res.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    return(
        <div className='main'>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{userName}</Breadcrumb.Item>
                <Breadcrumb.Item>创建课程</Breadcrumb.Item>
            </Breadcrumb>
            <div className='main-content'>
                <div className='main-content-area'>
                    <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 8}} initialValues={{}} onFinish={value=>handleFinish(value)}>
                        <Form.Item label="用户类型" name="type" rules={[{required: true,message: '请选择用户类型'}]}>
                            <Select onChange={value=>selectType(value)}>
                                <Select.Option value="0">管理员</Select.Option>
                                <Select.Option value="1">学生</Select.Option>
                                <Select.Option value="2">讲师</Select.Option>
                            </Select>
                        </Form.Item>
                        {type!=='-1'&&<Form.Item label="姓名" name="name" rules={[{required: true,message: '请输入姓名'}]}>
                            <Input/>
                        </Form.Item>}
                        {type!=='-1'&&<Form.Item label="E-mail" name="email" rules={[{required: true,message: '请输入E-mail地址'}]}>
                            <Input/>
                        </Form.Item>}
                        {type==='1'&&<Form.Item label="学位类型" name="program_type" rules={[{required: true,message: '请选择学位类型'}]}>
                            <Select onChange={value=>selectProgramType(value)}>
                                <Select.Option value="0">学士</Select.Option>
                                <Select.Option value="1">硕士</Select.Option>
                                <Select.Option value="2">博士</Select.Option>
                            </Select>
                        </Form.Item>}
                        {type==='1'&&<Form.Item label="项目" name="programId" rules={[{required: true,message: '请选择攻读项目'}]}>
                            <Select>
                                {programs.filter(p=>p.programType===programType).map(p=><Select.Option key={p.programId} value={p.programId}>{p.programName}</Select.Option>)}
                            </Select>
                        </Form.Item>}
                        {type==='2'&&<Form.Item label="所属学院" name="departmentId" rules={[{required: true,message: '请选择所属学院'}]}>
                            <Select>
                                {departments.map(d=><Select.Option key={d.departmentId} value={d.departmentId}>{d.departmentName}</Select.Option>)}
                            </Select>
                        </Form.Item>}
                        {type==='2'&&<Form.Item label="职称" name="position" rules={[{required: true,message: '请选择职称'}]}>
                            <Select>
                                <Select.Option value="0">讲师</Select.Option>
                                <Select.Option value="1">副教授</Select.Option>
                                <Select.Option value="2">教授</Select.Option>
                                <Select.Option value="3">荣誉教授</Select.Option>
                                <Select.Option value="4">副院长</Select.Option>
                                <Select.Option value="5">院长</Select.Option>
                            </Select>
                        </Form.Item>}
                        <Form.Item wrapperCol= {{offset: 4,span: 8}}>
                            <Button type="primary" htmlType="submit" size="large" shape="round" style={{backgroundColor:"#800000"}}>确认创建</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default CreateCourse;