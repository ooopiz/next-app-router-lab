"use client";
import React from "react";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { ConfigProvider, Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import theme from "@/config/theme";


export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <Layout hasSider>
        <Sider breakpoint="lg" >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: `nav ${index + 1}`,
              }),
            )}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: '2px 2px 0' }}>
            <div style={{ padding: '6px 6px', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}