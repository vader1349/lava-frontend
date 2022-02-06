import { Breadcrumb } from 'antd';
import {useSelector} from 'react-redux';
import {Form, Input, Button, Select} from 'antd';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {url,courseFormats} from './properties';

function CreateCourse(){

    const userName=useSelector(state=>state.user.name);
    const [form] = Form.useForm();
    const [departmentId,setDepartmentId]=useState(0);
    const [departments,setDepartments]=useState([]);
    const [instructors,setInstructors]=useState([]);
    
    useEffect(() => {
        axios.get(`${url}/department`)
         .then((res)=>{
           setDepartments(res.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    const selectDepartment=(id)=>{
        setDepartmentId(id);
        axios.get(`${url}/instructor/${id}`)
         .then((res)=>{
           setInstructors(res.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleFinish=value=>{
        axios.post(`${url}/course`, {
            instructorId:value.instructorId,
            code:value.code,
            format:value.format
        })
        .then(res=>{
            if(res.data.courseId!==0){
                alert("课程创建成功！");
                form.setFieldsValue({code:''});
            }
        })
        .catch(function (error) {
            alert("注册失败！请检查课程代码是否正确或稍后再试。");
            console.log(error);
        });;
    }

    return(
        <div className='main'>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{userName}</Breadcrumb.Item>
                <Breadcrumb.Item>创建课程</Breadcrumb.Item>
            </Breadcrumb>
            <div className='main-content'>
                <div className='main-content-area'>
                <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 8}} initialValues={{}} onFinish={value=>handleFinish(value)}>
                        <Form.Item label="开设院系" name="departmentId" rules={[{required: true,message: '请选择开设院系'}]}>
                            <Select onChange={value=>selectDepartment(value)}>
                                {departments.map(department=><Select.Option key={department.departmentId} value={department.departmentId}>{department.departmentName}</Select.Option>)}
                            </Select>
                        </Form.Item>
                        {departmentId!==0&&<Form.Item label="讲师" name="instructorId" rules={[{required: true,message: '请选择任课讲师'}]}>
                            <Select>
                                {instructors.map(instructor=><Select.Option key={instructor.id} value={instructor.id}>{instructor.name}</Select.Option>)}
                            </Select>
                        </Form.Item>}
                        {departmentId!==0&&<Form.Item label="课程代码" name="code" rules={[{required: true,message: '请输入课程代码'}]}>
                            <Input/>
                        </Form.Item>}
                        {departmentId!==0&&<Form.Item label="授课形式" name="format" rules={[{required: true,message: '请选择授课形式'}]}>
                            <Select>
                                {courseFormats.map((format,index)=><Select.Option key={index} value={index.toString()}>{format}</Select.Option>)}
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