import { Form, Input, message, Button, Modal, Upload } from 'antd';
import { useParams } from 'react-router-dom'
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'antd/es/form/Form';
const View = () => {
    const { id } = useParams()
    const [form] = useForm()
    const [info, setInfo] = useState(null)
    // console.log(info, "<--------------info")
    // modal ............
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    // Upload ............

    const avatar = info && info
    const [fileList, setFileList] = useState([
        {
            // thumbUrl: "https://reqres.in/img/faces/6-image.jpg",
            thumbUrl: avatar,
            name: 'Uploade',
            url: avatar
        },
    ]);
    console.log(fileList[0], 'file list ............')
    const onChange = ({ fileList: newFileList }) => {
        // console.log(newFileList[0], 'imageconsoel')
        setFileList(newFileList);
    };

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    // get By  Id ...................
    useEffect(() => {

        axios.get(`https://reqres.in/api/users/${id}`)
            .then(function (response) {
                // handle succes
                console.log(response?.data);
                setInfo(response?.data?.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [id]);
    // Put Method................
    const onFinish = (values) => {
        console.log('Success:', values);

        const { email, password, first_name, last_name } = values
        // const formData = new FormData()
        // formData.append('avatar', uploadImage)
        // formData.append('email', email)
        // formData.append('password', password)
        // formData.append('first_name', first_name)
        // formData.append('last_name', last_name)

        const data = {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            avatar: fileList[0].thumbUrl,
        }
        axios
            .put(`https://reqres.in/api/users/${id}`, data)
            .then((response) => {
                console.log(response?.data, 'uploaded data');
                setInfo(response?.data)
                message.success('Updated')
            });
    };
    console.log(info, 'infooo')
    //   modall
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setIsDeleteOpen(false)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsDeleteOpen(false)
    };
    const showDelete = () => {
        setIsDeleteOpen(true)
    }
    const initialValues = {
        first_name: info?.first_name,
        last_name: info?.last_name,
        email: info?.email,
        password: '12345678',
        avatar: info && info?.avatar
    }
    // Delete /////
    const deletes = (data) => {
        axios.delete(`https://reqres.in/api/users/${data}`, {

        })
            .then(response => {
                console.log(response, 'esponse')
                setInfo(null)
                message.warning('Deleted')
                //handle success
            })
            .catch(error => {
                //handle failure
            });
    }
    return (
        <>
            <div className="view-page">
                <div className="card">
                    <div className="card-img">
                        <img src={info && info.avatar} />
                    </div>
                    <div className="desc">
                        <h6 className="primary-letter">{info && info.first_name} {info && info.last_name}</h6>
                        <h6 className="secondary-letter">{info && info.email}</h6>
                    </div>
                    <button className="primary-letter btn-view">Full Stack Developer</button>
                    <div className="details">
                        <div className="rating">
                            <Button onClick={showModal} className='glow-on-hover'>
                                Edit
                            </Button>
                        </div>
                        <div className="activity">
                            <Button onClick={showDelete} className='glow-on-hover'>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal title="Basic Modal" open={isModalOpen} onOk={() => { form.submit(); handleOk() }} onCancel={handleCancel}
            >
                <Form
                    onFinish={onFinish}
                    form={form}
                    initialValues={
                        initialValues
                    }
                >

                    <Form.Item
                        label="First Name"
                        name="first_name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="last_name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='avatar'
                        label='profile'
                        // getValueFromEvent={(file) => (file.originFileObj)}
                        getValueFromEvent={(file) => (file.originfileObj)}
                    >
                        <ImgCrop>
                            <Upload
                                name='avatar'
                                accept="image/png, image/jpeg"
                                listType="picture-circle"
                                onChange={onChange}
                                maxCount={1}
                                customRequest={dummyRequest}
                                fileList={fileList}
                            >
                                {fileList.length >= 1 && 'Edit'}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                </Form>

            </Modal>
            <Modal title="Basic Modal" open={isDeleteOpen} onOk={() => { deletes(); handleOk() }} onCancel={handleCancel}>
                <h4>
                    Are You Realy Want Delete ?
                </h4>
            </Modal>

        </>
    )
}
export default View;