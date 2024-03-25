import React from "react";
import { Avatar, Badge, Button, Flex, Layout, Space } from "antd";
import {
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Logo from "../assets/image/prolog.svg";
import { RiMenuLine,RiNotification3Line } from "react-icons/ri";

const { Header } = Layout;

const AppHeader = ({ collapsed, toggleSidebar }) => {
  return (
    <Header
      style={{
        padding: 0,
        background: "#fff",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      {/* <Flex  align='center' justify='space-between'> */}
      {/* <Flex align='center' justify='space-between' > */}
      <Space align="baseline" size={[20]}>
      <Flex justify="flex-start" align="center">
        <Button
          type="text"
          icon={collapsed ? <RiMenuLine /> : <MenuFoldOutlined />}
          onClick={toggleSidebar}
          style={{
            fontSize: "16px",
            width: 36,
            height: 36,
            marginLeft: 20 ,
            display:collapsed? 'inline' : 'none',
          }}
        />
        <img src={Logo} alt="Logo" style={{ marginLeft: 10 ,display:collapsed? 'inline' : 'none',}} />
      </Flex>
    </Space>
      <Space
        align="center"
        size={[20]}
        style={{ marginLeft: "auto", marginRight: "20px" }}
      >
        <Badge count={1}>
          <RiNotification3Line style={{fontSize:'20px'}}/>
        </Badge>
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      </Space>

      {/* </Flex> */}
    </Header>
  );
};

export default AppHeader;
