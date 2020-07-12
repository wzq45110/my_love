import React, { Component } from "react";
import { Tabs, Card, Modal, Result, Button, message, Pagination } from "antd";
import { SmileOutlined } from "@ant-design/icons";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
import styles from "../style/Online.module.scss";
import Axios from "axios";
const { TabPane } = Tabs;
const { Meta } = Card;
export class Online extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 图片根路径
      imgpath: "http://192.168.0.105:8000/",
      peoplelist: [],
      //用状态码来控制元素是否渲染
      showElem: true,
      // modle框弹框
      visible: false,
      id: 0,
    };
  }
  // 页面数据挂载
  componentDidMount() {
    // 当前用户信息的确认根据状态码来判断是否填写个人资料
    this.onedangget();
  }
  // 当前登录用户接口
  onedangget = async () => {
    let userk = window.sessionStorage.getItem("pk");
    // console.log(userk);
    const { data: res } = await Axios.get("/user/user_info/", {
      params: {
        user_pk: userk,
      },
    });
    // console.log(res);
    // 当状态码为2 时 就说明用户们没有填写个人信息
    if (res.status !== 1) {
      // 此时就控制用户列表不显示 并且终止 不发起用户列表请求
      this.setState({
        showElem: false,
        // 显示弹框
        visible: true,
      });
      return;
    }
    // console.log("1");
    // 用户列表获取
    // this.getpeoplelist();
    // console.log("1");
    // 默认第一页
    this.onChange(1);
  };
  // 用户列表获取
  getpeoplelist = async (num) => {
    console.log(num);
    let usepk = window.sessionStorage.getItem("pk");
    const { data: res } = await Axios.post("user/user_info/list/", {
      user_pk: usepk,
      page: num,
    });
    console.log(res.results);
    console.log(res.results.data);
    if (res.status !== 1) return message.warning(res.msg);
    // 判断其中的某项的个人详情为空的时候给删除掉
    // for (let i = 0; i < res.results.data.length; i++) {
    //   if (res.results.data[i].User_Info_to_User.length === 0) {
    //     res.results.data.splice(i, 1);
    //   }
    // console.log(res.results.data[i].User_Info_to_User.length);
    // }
    // console.log(res.results.data);
    this.setState({
      peoplelist: res.results.data,
    });
  };
  // 对获取到的用户列表图像进行判断
  getlipicc = (item) => {
    // console.log();
    if (item.User_Info_price.length === 0) {
      return `${this.state.imgpath}${item.avatar}`;
    } else {
      for (let i = 0; i < item.User_Info_price.length; i++) {
        if (item.User_Info_price[i].is_delete === false) {
          return `${this.state.imgpath}/media/${item.User_Info_price[i].user_info_price}`;
        } else if (item.User_Info_price.length - 1 === i) {
          console.log(item.User_Info_price[i].is_delete);
          return `${this.state.imgpath}${item.avatar}`;
        }
      }
    }
  };
  // 弹框功能
  handleOk = (e) => {
    // 点击完善个人资料跳转到编辑资料页面tab栏
    this.props.history.push("/myresume2");
    console.log(e);
    // this.setState({
    //   visible: false,
    // });
  };

  handleCancel = (e) => {
    // 先清除token 再返回到登录页面
    window.sessionStorage.removeItem("token");
    // 将用户的昵称先清除
    window.sessionStorage.removeItem("nicheng");
    // 将用户的pk先清除
    window.sessionStorage.removeItem("pk");
    // 点击退出登录
    this.props.history.push("/login");
    console.log(e);
    // this.setState({
    //   visible: false,
    // });
  };
  callback = (key) => {
    console.log(key);
  };
  // 分页功能
  onChange = (page) => {
    console.log(page);
    // console.log(pageSize);
    // 调用分页接口
    this.getpeoplelist(page);
  };
  // 点击照片去详情页面
  goinfo = (value) => {
    console.log(value);
    this.props.history.push({ pathname: "/personinfo", state: { name: value } });
  };
  render() {
    return (
      <div className={styles.onlineall}>
        {/* 顶头部 */}
        <header className={styles.onheafirst}>
          {/*插入组件 */}
          <LineHeader></LineHeader>
        </header>
        {/* nav部分 */}
        <nav className={styles.nav}>
          {/* 插入nav组件 */}
          <Olinenav idval={this.state.id}></Olinenav>
        </nav>
        {/* 内容区域 */}
        <div className={styles.contentquyu}>
          {this.state.showElem ? (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="用户列表" key="1">
                <ul className={styles.tabul}>
                  {this.state.peoplelist.map((item) => {
                    return (
                      <li
                        className={styles.tabulli}
                        key={item.id}
                        onClick={() => this.goinfo(item.id)}
                      >
                        <Card
                          hoverable
                          style={{ width: 240 }}
                          cover={
                            <img
                              className={styles.coimg}
                              style={{ height: "260px" }}
                              alt=""
                              src={this.getlipicc(item)}
                            />
                          }
                        >
                          <Meta
                            title={item.username}
                            description={`${item.User_Info_to_User[0].user_age}岁${item.User_Info_to_User[0].user_height}cm`}
                          />
                        </Card>
                      </li>
                    );
                  })}
                </ul>
              </TabPane>
            </Tabs>
          ) : (
            <div>
              <Modal
                maskClosable={false}
                cancelText="退出登录"
                okText="完善个人资料"
                width={1000}
                centered="ture"
                title="温馨提示"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Result
                  icon={<SmileOutlined />}
                  title="太好了，你已完成登录操作！请继续完善个人资料。"
                  extra={
                    <Button type="primary" onClick={() => this.handleOk}>
                      Next
                    </Button>
                  }
                />
                ,
              </Modal>
            </div>
          )}
          <div className={styles.pagee}>
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Online;
