import { UploadOutlined, UserOutlined, VideoCameraOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Menu, Layout, Button } from 'antd';
import { useState } from 'react';


const Nav = () => {

    const [collapsed, setCollapsed] = useState(false);


    return (
        <Layout style={{minHeight: '100vh'}}>
            <Layout.Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0} theme='light'>
                <Menu
                    theme='light'
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
                 <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
            </Layout.Sider>
            <Layout>
                <Layout.Header
                    style={{
                        padding: 0,
                        background: '#fff',
                    }}
                >
                    {collapsed ? 
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    /> : <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                       display:'none',
                    }}
                />
                }
                </Layout.Header>
                <Layout.Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#fff',
                    }}
                >
                    Content
                </Layout.Content>
            </Layout>
        </Layout>
    );
};
export default Nav;