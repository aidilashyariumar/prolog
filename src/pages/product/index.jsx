import { Breadcrumb, Button, Flex, Space, Table, Popconfirm, message, Avatar } from "antd";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";
import { RiAddLine, RiDeleteBin6Line, RiEdit2Line,RiDownload2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { deleteProduct, getAllProduct } from "../../services/product";

const Pengguna = () => {
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const pengguna = await getAllProduct();
            const dataArray = Object.values(pengguna.data.items);
            const formattedData = dataArray.map((item, index) => ({
                ...item,
                key: index + 1,
            }));
            setDataSource(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            message.success('Pengguna berhasil dihapus');
            getData();
        } catch (error) {
            console.error('Error deleting pengguna:', error);
            message.error('Gagal menghapus pengguna');
        }
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
        },
        {
            title: 'UNIT USAHA',
            dataIndex: 'business_unit',
        },
        {
            title: 'KATEGORI',
            dataIndex: 'product_category',
        },
        {
            title: 'KODE',
            dataIndex: 'product_code',
        },
        {
            title: 'PRODUK',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {/* <Image src={record.photo} alt={record.name} width={50}  style={{borderRadius:50,}}/> */}
                    <Avatar src={record.photo} alt={record.name} size={35}/>
                    {text}
                </span>
            ),
        },
        {
            title: 'BIAYA ADMIN',
            dataIndex: 'admin_fees',
        },
        {
            title: 'STOK',
            dataIndex: 'stock',
        },
        {
            title: 'HARGA',
            dataIndex: 'price',
        },
        {
            title: 'HARGA GROSIR',
            dataIndex: 'grocery_price',
        },
        {
            title: 'AKSI',
            dataIndex: 'action',
            render: (text, record) => (
                <Space>
                    <Popconfirm
                        title="Apakah Anda yakin ingin menghapus pengguna ini?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Ya"
                        cancelText="Tidak"
                    >
                        <Button type="submit" icon={<RiDeleteBin6Line />} />
                    </Popconfirm>
                    <Button type="submit" icon={<RiEdit2Line />} />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Breadcrumb style={{ marginTop: -30 }}>
                <Breadcrumb.Item><Link to="/">Dashboard</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/product">Product</Link></Breadcrumb.Item>
            </Breadcrumb>
            
            <p style={{ textAlign: 'left', fontSize: 24, fontWeight: 600, marginTop: 8 }}>Product</p>
            <div className='table'>
                <Flex justify='space-between' style={{ padding: 10 }}>
                    <Search placeholder='cari apa' style={{ width: 200, border: 'none', background: 'transparent', borderBlock:'none', }} />
                    <Space size={10} style={{ marginLeft: 'auto', width: 220 }}>
                        <Button icon={<RiDownload2Line/>}>Ekspor</Button>
                        <Button type='primary' icon={<RiAddLine />}><Link to="add-product">Pengguna</Link></Button>
                    </Space>
                </Flex>
                <Table
                    style={{ height: '50vh', overflowY: 'auto' }}
                    columns={columns}
                    dataSource={dataSource}
                    rowClassName={(record, index) => (index % 5 === 0 ? 'odd-row' : 'even-row')}
                />
            </div>
        </>
    )
}
export default Pengguna;
