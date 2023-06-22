import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Get = () => {
    const [data, setData] = React.useState(null)
    // console.log(data, 'data')
    useEffect(() => {
        axios.get('https://reqres.in/api/users')
            .then(function (response) {
                // handle success
                // console.log(response?.data?.data);
                setData(response?.data?.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [])
    const columns = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width: 20,
            align: "center"
        },
        {
            title: 'Name',
            dataIndex: 'first_name',
            key: 'name',
            render: (text, record) => <Link to={`/view/${record && record.id}`}>{record.first_name} {record.last_name}</Link>,
            width: 150,
            align: "center"
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'Age',
            width: 150,
            align: "center"
        },

        {
            title: 'Image',
            dataIndex: 'avatr',
            key: 'address 1',
            ellipsis: true,
            width: 150,
            render: (t, r) => (<img src={r.avatar} />),
            align: "center"
        },

    ];
    return (
        <>
            <Table columns={columns} dataSource={data}
                rowKey={(r) => (r.id)}
                size="middle"
            />
        </>
    )
}
export default Get;