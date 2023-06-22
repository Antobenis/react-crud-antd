import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate()
    const onFinish = (e) => {
        const { email, password } = e
        console.log(email, password, 'event')
        axios.post('https://reqres.in/api/register', {
            email,
            password
        })
            .then(function (response) {
                console.log(response);
                message.success('Created !')
                navigate('/login')
            })
            .catch(function (error) {
                console.log(error);
                message.error('Somthing wrong ?')
            });
    };
    return (
        <>
            <div className="login">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button-danger" block danger>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    )
}
export default Register;