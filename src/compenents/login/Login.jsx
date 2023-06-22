import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()

    const onFinish = (e) => {
        const { email, password } = e
        // console.log(email, password, 'event')
        axios.post('https://reqres.in/api/login', {
            email,
            password
        })
            .then(function (response) {
                // console.log(response?.data?.token);
                const { token } = response?.data
                // console.log(token,'tokeeeeen')
                message.success('Success !')
                localStorage.setItem('token', token)
                navigate('/get')
            })
            .catch(function (error) {
                console.log(error);
                message.error('Failed?')
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
                            Log in
                        </Button>
                    </Form.Item>
                    or <Link to ={'/register'}>Register Now</Link>

                </Form>
            </div>
        </>
    )
}
export default Login;
