import React, { Component } from "react";
import { Divider, message } from "antd";
import styles from "../style/peroseninfo.module.scss";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
import Axios from "axios";
// const { TabPane } = Tabs;
import {
  GiftOutlined,
  HeartOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
export class peroseninfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   id: 3,
      //  显示图片单独显示出来
      isfalsepic: [],
      peolistall: [],
      nicheng: "",
      hoball: [],
      // 根路径
      // 图片根路径
      imgpath: "http://192.168.0.105:8000/",
    };
  }
  // 页面渲染
  componentDidMount() {
    //传递过来的所有参数
    console.log(this.props.location.state);
    // let chuanzhi = this.props.location.state.name;
    if (this.props.location.state === undefined) {
      return this.getpeopleinfo(sessionStorage.getItem("infoval"));
    } else {
      sessionStorage.setItem("infoval", this.props.location.state.name);
      this.getpeopleinfo(sessionStorage.getItem("infoval"));
    }
  }
  //  页面卸载之前
  //   componentWillUnmount() {
  //     // sessionStorage.removeItem("infoval");
  //   }
  //   发起个人的详情页面
  getpeopleinfo = async (value) => {
    // let pk = 1;
    const { data: res } = await Axios.get(`user/user_info/detailed/${value}`);
    console.log(res);
    if (res.status !== 1) return message.warning(res.msg);
    console.log(res.results.data.User_Info_price);
    console.log(res.results.data.User_Info_to_User);
    //   定义一个爱好数组变量
    let hoball = res.results.data.User_Info_to_User[0].user_hobbies;
    // 此时的数组为字符串转化为数组
    // eslint-disable-next-line no-eval
    let  hobyarr = eval("(" + hoball + ")");
    // console.log(hoball[0]);
    //将图片数组挑出来
    let isfalsepicall = res.results.data.User_Info_price;
    let isfalsepic = [];
    for (let i = 0; i < isfalsepicall.length; i++) {
      if (isfalsepicall[i].is_delete === false) {
        isfalsepic.push(isfalsepicall[i]);
      }
    }
    this.setState({
      hoball: hobyarr,
      isfalsepic: isfalsepic,
      peolistall: res.results.data.User_Info_to_User,
      nicheng: res.results.data.username,
    });
  };
  render() {
    return (
      <div className={styles.onlikeall}>
        {/* 顶头部 */}
        <header className={styles.onlikefirst}>
          {/*插入组件 */}
          <LineHeader></LineHeader>
        </header>
        {/* nav部分 */}
        <nav className={styles.likenav}>
          {/* 插入nav组件 */}
          <Olinenav></Olinenav>
        </nav>
        {/* 主要内容 */}
        <div className={styles.containlike}>
          <ul className={styles.resul}>
            {this.state.isfalsepic &&
              this.state.isfalsepic.map((item) => {
                return (
                  <li className={styles.resli} key={item.id}>
                    <img
                      className={styles.resimg}
                      alt="example"
                      src={`${this.state.imgpath}media/${item.user_info_price}`}
                    />
                  </li>
                );
              })}
          </ul>
          <div className={styles.tabsercon}>
            <div className={styles.tabserconleft}>
              <p>
                <span
                  style={{
                    color: "#212B36",
                    fontWeight: 900,
                    fontSize: "30px",
                  }}
                >
                  {this.state.nicheng}
                </span>
                <i
                  style={{
                    color: "#212B36",
                    fontSize: "20px",
                    fontWeight: 400,
                  }}
                >
                  &nbsp;&nbsp;
                  {this.state.peolistall[0] &&
                    this.state.peolistall[0].user_intro}
                </i>
              </p>
              <p
                style={{
                  color: "#212B36",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                <span>
                  {this.state.peolistall[0] &&
                    this.state.peolistall[0].user_age}
                </span>
                岁
                <span>
                  {this.state.peolistall[0] &&
                    this.state.peolistall[0].user_sex}
                </span>
                性
              </p>
              <Divider style={{ color: "red" }} />
              <p
                style={{
                  color: "rgb(69, 79, 91)",
                  fontSize: "16px",
                  fontWeight: 900,
                }}
              >
                基本
              </p>
              <ul className={styles.jibenul}>
                <li
                  className={styles.jibenlileft}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "25px",
                      color: "#212b36",
                    }}
                  >
                    <GiftOutlined />
                  </span>
                  <span
                    style={{
                      marginLeft: "40px",
                      fontSize: "18px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_info_date_birth}
                    {/* {this.state.birth} */}
                  </span>
                </li>
                <li
                  className={styles.jibenliright}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "25px",
                      color: "#212b36",
                    }}
                  >
                    <HeartOutlined />
                  </span>
                  <span
                    style={{
                      marginLeft: "40px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_sex}
                    ，正在寻求一个
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_like_sex}
                    性
                  </span>
                </li>
              </ul>
              <ul className={styles.jibenul}>
                <li
                  className={styles.jibenlileft}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>
                    <i
                      className="iconfont"
                      style={{
                        fontSize: "25px",
                        color: "#212b36",
                        fontWeight: 500,
                      }}
                    >
                      &#xe642;
                    </i>
                    {/* <i className="icon iconfont icon-shengao"></i> */}
                  </span>
                  <span
                    style={{
                      marginLeft: "40px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].educational_background}
                  </span>
                </li>
                <li
                  className={styles.jibenliright}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "25px",
                      color: "#212b36",
                    }}
                  >
                    <EnvironmentOutlined />
                  </span>
                  <span
                    style={{
                      marginLeft: "40px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      `${this.state.peolistall[0].user_site_province}*${this.state.peolistall[0].user_site_city}*${this.state.peolistall[0].user_site_area}`}
                  </span>
                </li>
              </ul>
              <Divider style={{ color: "red" }} />
              <p
                style={{
                  color: "rgb(69, 79, 91)",
                  fontSize: "16px",
                  fontWeight: 900,
                }}
              >
                形态
              </p>
              <ul className={styles.jibenul}>
                <li
                  className={styles.jibenlileft}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "2px",
                  }}
                >
                  <span>
                    <i
                      className="iconfont"
                      style={{
                        fontSize: "25px",
                        color: "#212B36",
                        fontWeight: 700,
                      }}
                    >
                      &#xe637;
                    </i>
                  </span>
                  <span
                    style={{
                      marginLeft: "38px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_height}
                    cm
                  </span>
                </li>
                <li
                  className={styles.jibenliright}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span>
                    <i
                      className="iconfont"
                      style={{
                        fontSize: "25px",
                        color: "#212B36",
                        fontWeight: 700,
                      }}
                    >
                      &#xe7b2;
                    </i>
                  </span>

                  <span
                    style={{
                      marginLeft: "35px",
                      fontSize: "16px",
                      color: "#212b36",
                    }}
                  >
                    {this.state.peolistall[0] &&
                      this.state.peolistall[0].user_race}
                  </span>
                </li>
              </ul>
              <Divider style={{ color: "red" }} />
              <p
                style={{
                  color: "rgb(69, 79, 91)",
                  fontSize: "16px",
                  fontWeight: 900,
                  marginBottom: "28px",
                }}
              >
                兴趣爱好
              </p>
              <ul className={styles.hobylink}>
                {this.state.hoball &&
                  this.state.hoball.map((item) => {
                    return (
                      <li key={item} className={styles.hobyli}>
                        {item}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <aside className={styles.tabserconright}></aside>
          </div>
        </div>
      </div>
    );
  }
}

export default peroseninfo;
