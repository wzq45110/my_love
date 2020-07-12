import React, { Component } from "react";
import { Link } from "react-router-dom";
// 引入头部组件
import Toubu from "../components/toubu/toubu";
// 引入侧边栏组件
// import Artce from "../components/artce/Artce";
import "../style/home.scss";
import "../style/modcs.module.scss";
import { Button, Layout, Drawer } from "antd";
import {
  UserDeleteOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  TeamOutlined,
  CommentOutlined,
  CompassOutlined,
  ImportOutlined,
  HeartOutlined,
} from "@ant-design/icons";
const { Header, Footer, Content } = Layout;
class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "large",
      numbers: ["1", "2", "3", "4"],
      // 侧边栏的项
      listnum: [
        {
          id: 1,
          raticon: <ImportOutlined />,
          rattext: "登入",
          ratpath: "/login",
        },
        {
          id: 2,
          raticon: <CompassOutlined />,
          rattext: "探索约会想法",
          ratpath: "/dating",
        },
        {
          id: 3,
          raticon: <CommentOutlined />,
          rattext: "收件箱",
          ratpath: "/inbox",
        },
        {
          id: 4,
          raticon: <TeamOutlined />,
          rattext: "碰碰面",
          ratpath: "/meetyou",
        },
        {
          id: 5,
          raticon: <SearchOutlined />,
          rattext: "搜素",
          ratpath: "/search",
        },
        {
          id: 6,
          raticon: <EnvironmentOutlined />,
          rattext: "附近",
          ratpath: "/mycity",
        },
        {
          id: 7,
          raticon: <ClockCircleOutlined />,
          rattext: "最后注册",
          ratpath: "/lastsignup",
        },
        {
          id: 8,
          raticon: <UserDeleteOutlined />,
          rattext: "谁看了我",
          ratpath: "/witheme",
        },
      ],
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
    // // 图标变量
    const lovetu = (
      <span>
        <HeartOutlined />
        &nbsp;&nbsp;今天你认识的人
      </span>
    );
    // 侧边栏的项目
    const listart = this.state.listnum.map((item) => (
      <p key={item.id} className="reticoon">
        <Link to={item.ratpath} className="retlink">
          {item.raticon}
          &nbsp;&nbsp;{item.rattext}
        </Link>
      </p>
    ));
    return (
      <div className="hom">
        <Layout>
          <Header>
            {/* 插入头部组件 */}
            <Toubu
              msg={this.state.kongzhianniu}
              changeshow={this.showDrawer}
              changeclose={this.onClose}
            ></Toubu>
          </Header>
          <Content>{itemsmei}</Content>
          <Footer>Footer</Footer>
        </Layout>
        {/* 侧边抽屉 */}
        <Drawer
          title={lovetu}
          placement={this.state.placement}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          key={this.state.placement}
          mask={false}
          // maskClosable={true}
          width={500}
          drawerStyle={{
            background: "#0CAEB1",
            paddingTop: "64px",
            color: "#fff",
          }}
          headerStyle={{ background: "#1A5F78", borderBottom: "none" }}
        >
          {/* 侧边栏内容 */}
          {listart}
        </Drawer>
      </div>
    );
  }
}

export default home;
