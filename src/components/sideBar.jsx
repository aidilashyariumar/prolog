import React from 'react';
import { Menu, Button, Layout, Flex, Space } from 'antd';
import Logo from '../assets/image/prolog.svg';
import { RiExpandLeftLine,
        RiDashboardLine,
        RiFolder2Line,
        RiShoppingBag3Line,
        RiTeamLine,
        RiShoppingBasketLine,
        RiBarChart2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';



const { Sider } = Layout;

const Sidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}  collapsedWidth={0} theme='light' width={250}>
     <Flex justify='space-between' align='center' style={{marginTop:-0,width:250,height:68}}>
      <Space size={[50]} style={{marginLeft:20}}>
        <img src={Logo} alt="none" />
        <Button
          type="text"
          icon={<RiExpandLeftLine style={{width:20, height:20, color:'rgba(0,0,0,0.25)'}}/>}
          onClick={toggleSidebar}
          style={{
            fontSize: '20px',
            width: 36,
            height: 36,
          }}
        />
      </Space>
        <hr
          style={{
            height: '100%',
            margin: 0,
            marginTop:-10,
            marginLeft:20,
            border: '1px solid #F0F0F0',
            width: '1px', // Sesuaikan lebar garis sesuai kebutuhan
          }}
        />
      </Flex>
      <hr style={{marginTop:-5,  border: '1px solid #F0F0F0'}}/>
       
      <Menu
        theme='light'
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ textAlign: 'left', fontSize:'16px', fontWeight:500, color:'rgba(0,0,0,0.65)' }}
      >
        <Menu.Item key="1" icon={<RiDashboardLine size={20} />} style={{margin:'24px 0'}}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <p style={{  textAlign:'left', marginLeft:20, width:'200px',color: 'rgba(0, 0, 0, 0.25)', fontSize:12}}>MASTER</p>
        <Menu.Item key="unit-business"  icon={<RiTeamLine size={20} />}>
          <Link to="/unit-business">Unit Usaha</Link>
        </Menu.Item>
        <Menu.Item key="pengguna"  icon={<RiTeamLine size={20} />}>
          <Link to="/pengguna">Pengguna</Link>
        </Menu.Item>
        <Menu.Item key="category-product"  icon={<RiFolder2Line size={20} />}>
          <Link to="/category-product" style={{textAlign:'left'}}>Kategori Produk</Link>
        </Menu.Item>
        <Menu.Item key="produk"  icon={<RiShoppingBag3Line size={20} />}>
          <Link to="/product" style={{textAlign:'left'}}>Produk</Link>
        </Menu.Item>
        <p style={{ textAlign:'left', marginLeft:20, width:'200px',color: 'rgba(0, 0, 0, 0.65)'}}>TRANSAKSI</p>
        <Menu.Item key="6"  icon={<RiShoppingBasketLine size={20} />}>
          <Link to="/nav3">Penjualan</Link>
        </Menu.Item>
        <Menu.Item key="7"  icon={<RiBarChart2Line size={20} />}>
          <Link to="/nav3">Laporan</Link>
        </Menu.Item>
        </Menu>
    </Sider>
  );
};

export default Sidebar;
