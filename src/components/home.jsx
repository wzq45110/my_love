import React, { Component } from "react";
import "../style/home.scss";
// 导入修改默认样式
import styles from "../style/modcs.scss"; // 导出对象的格式是键值对
import { Drawer, Button, Layout } from "antd";
import {
  OrderedListOutlined,
  HeartFilled,
  CloseOutlined,
} from "@ant-design/icons";
const { Header, Footer, Content } = Layout;
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "large",
      numbers: ["1", "2", "3", "4"],
      visible: false,
      placement: "left",
      kongzhianniu: true,
    };
  }

  // 侧边抽屉控制
  showDrawer = () => {
    this.setState({
      visible: true,
      kongzhianniu: false,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      kongzhianniu: true,
    });
  };
  render() {
    const itemsmei = this.state.numbers.map((number) => (
      <div className="contli" key={number.toString()}>
        <ul>
          <li>
            <img src={require("../asstes/img/home1.jpg")} alt="" />
          </li>
          <li>
            <h1>
              <span>准备潜水了嘛?</span>
            </h1>
            <div className="direshu">
              欢迎使用世界上最大的约会平台之一的大量鱼类。立即注册，结识您附近的单身人士。如果您已经有一个帐户，请在上面登录。钓鱼愉快！
            </div>
            <div>
              <Button type="primary" shape="round" size={this.state.size}>
                加入大量的鱼鱼
              </Button>
            </div>
          </li>
        </ul>
      </div>
    ));
    return (
      <div className="Home">
        <Layout>
          <Header>
            <div className="homleft">
              {this.state.kongzhianniu ? (
                <OrderedListOutlined onClick={this.showDrawer} />
              ) : (
                <CloseOutlined onClick={this.onClose} />
              )}
            </div>
            <div className="homcen">
              <HeartFilled />
              LoveLove
            </div>
            <div className="homrig">
              <ul>
                <li className={styles.color}>登录</li>
                <li>帮助</li>
                <li>
                  <Button type="primary" shape="round">
                    注册
                  </Button>
                </li>
              </ul>
            </div>
          </Header>
          <Content>{itemsmei}</Content>
          <Footer>Footer</Footer>
        </Layout>
        {/* 侧边抽屉 */}
        <Drawer
          title="
          今天结识当地人"
          placement={this.state.placement}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          key={this.state.placement}
          mask={false}
          width={500}
          drawerStyle={{
            background: "#182D77",
            paddingTop: "64px",
            color: "#fff",
          }}
          headerStyle={{ color: "#fff" }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

export default home;
