import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DashboardFilled,
  MailFilled,
  NotificationFilled,
  UserOutlined,
} from "@ant-design/icons";
import Header from "./Header";
import { SidebarIcon } from "../components/UI/GeneralStyle";
import Summary from "./assets/icons8-summary-list-96.png";
import Variable from "./assets/icons8-variable-96.png";
import SendMail from "./assets/icons8-email-send-96.png";
import Domain from "./assets/icons8-domain-name-96.png";
import Sender from "./assets/icons8-customer-96.png";
import Contact from "./assets/icons8-list-96.png";
import Specific from "./assets/icons8-ratings-96.png";
import TestMail from "./assets/document.png";
import { useLocation } from "react-router-dom";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const LayoutCover = (props) => {
  let location = useLocation();
  const key = location.pathname.slice(9);
  console.log(key);
  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={key}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
            >
              <SubMenu key="sub1" icon={<DashboardFilled />} title="Dashboard">
                <Menu.Item key="dashboard">
                  <Link to="/zmailer/dashboard">
                    <SidebarIcon src={Summary}></SidebarIcon>
                    Summary
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<MailFilled />} title="Marketing">
                <Menu.Item key="sendemail">
                  <Link to="/zmailer/sendemail">
                    <SidebarIcon src={SendMail} />
                    Send Email
                  </Link>
                </Menu.Item>
                <Menu.Item key="contact">
                  <Link to="/zmailer/contact">
                    <SidebarIcon src={Contact} />
                    Contacts
                  </Link>
                </Menu.Item>
                <Menu.Item key="sender">
                  <Link to="/zmailer/sender">
                    <SidebarIcon src={Sender} />
                    Sender
                  </Link>
                </Menu.Item>
                <Menu.Item key="domain">
                  <Link to="/zmailer/domain">
                    <SidebarIcon src={Domain} />
                    Domain
                  </Link>
                </Menu.Item>
                <Menu.Item key="testmail">
                  <Link to="/zmailer/testmail">
                    <SidebarIcon src={TestMail} />
                    Test Mail
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationFilled />} title="Stats">
                <Menu.Item key="overview">
                  <Link to="/zmailer/overview">Overview</Link>
                </Menu.Item>
                <Menu.Item key="specificcamp">
                  <Link to="/zmailer/specificcamp">
                    <SidebarIcon src={Specific} />
                    Specific Campaign
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" icon={<UserOutlined />} title="Admin">
                <Menu.Item key="tracking">
                  <Link to="/zmailer/tracking">Tracking</Link>
                </Menu.Item>
                <Menu.Item key="variable">
                  <Link to="/zmailer/variable">
                    <SidebarIcon src={Variable} />
                    Variables
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutCover;
