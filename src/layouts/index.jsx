import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/sideBar';
import AppHeader from '../components/header';
import { Outlet } from 'react-router-dom';

// const { Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ maxHeight:'100vh', overflow:'hidden'  }}>
      <Sidebar collapsed={collapsed} style={{width:'250px !important',minWidth:'250px !important', maxWidth:'250px !important'}}  toggleSidebar={toggleSidebar} />
      <Layout>
        <AppHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Layout.Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            // background: '#fff',
          }}
          >
          <Outlet/>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
