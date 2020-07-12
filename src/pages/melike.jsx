import React, { Component } from "react";
import { Tabs, message } from "antd";
import styles from "../style/melike.module.scss";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
import Axios from "axios";
const { TabPane } = Tabs;
export class melike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
      lilistall: [],
      // 根路径
      // 图片根路径
      imgpath: "http://192.168.0.105:8000/",
    };
  }
  // 页面初次渲染页面
  componentDidMount() {
    this.getlikepeo();
    // // 初次渲染加载用户信息
    // this.inforData();
  }
  // /获取用户喜欢的接口
  getlikepeo = async (value) => {
    let usepk = window.sessionStorage.getItem("pk");
    const { data: res } = await Axios.post("user/user_like/", {
      user_pk: usepk,
    });
    console.log(res);
    if (res.status !== 1) return message.warning(res.msg);
    // 对返回的数据进行操作
    let newdatall = res.results.like_data;
    // console.log(newdatall);
    let piclistall = res.results.price_list;
    // console.log(piclistall);
    for (let i = 0; i < newdatall.length; i++) {
      for (let j = 0; j < piclistall.length; j++) {
        if (newdatall[i].user_id === piclistall[j][0]) {
          newdatall[i].newpic = piclistall[j][1];
        }
      }
    }
    console.log(newdatall);
    this.setState({
      lilistall: newdatall,
    });
  };

  //获取个人信息的数据点赞了那些人
  // 发起获取信息接口
  // inforData = async () => {
  //   // 获取用户pk
  //   let usepk = window.sessionStorage.getItem("pk");
  //   console.log(usepk);
  //   const { data: res } = await Axios.get("user/user_info/", {
  //     params: {
  //       user_pk: usepk,
  //     },
  //   });
  //   console.log(res);
  //   console.log(res.results.like);
  //   //  将本用户喜欢的人列出
  //   this.setState({
  //     islikeall: res.results.like,
  //   });
  //   // 调用其他用户信息
  //   this.getinfoall();
  // };
  // 获取其他用户信息
  // getinfoall = async () => {
  //   let usepk = window.sessionStorage.getItem("pk");
  //   const { data: res } = await Axios.post("user/user_info/list/", {
  //     user_pk: usepk,
  //   });
  //   console.log(res.results.data);
  //   if (res.status !== 1) return;
  //   // 将喜欢的用户项 push 到 空数组
  //   let newlikall = [];
  //   for (let i = 0; i < res.results.data.length; i++) {
  //     for (let j = 0; j < this.state.islikeall.length; j++) {
  //       if (res.results.data[i].id === this.state.islikeall[j]) {
  //         newlikall.push(res.results.data[i]);
  //       }
  //     }
  //   }
  //   this.setState({
  //     lilistall: newlikall,
  //   });
  // };
  // 对获取到的用户列表图像进行判断
  // getlipicc = (item) => {
  //   // console.log();
  //   if (item.User_Info_price.length === 0) {
  //     return `${this.state.imgpath}${item.avatar}`;
  //   } else {
  //     for (let i = 0; i < item.User_Info_price.length; i++) {
  //       if (item.User_Info_price[i].is_delete === false) {
  //         return `${this.state.imgpath}/media/${item.User_Info_price[i].user_info_price}`;
  //       } else if (item.User_Info_price.length - 1 === i) {
  //         console.log(item.User_Info_price[i].is_delete);
  //         return `${this.state.imgpath}${item.avatar}`;
  //       }
  //     }
  //   }
  // };
  render() {
    //  我喜欢的结果列表
    let lilistall = this.state.lilistall;
    let lilist = lilistall.map((item) => {
      return (
        <li className={styles.liserch} key={item.user_id}>
          <ul className={styles.tuwenulli}>
            <li className={styles.imglid}>
              <img
                className={styles.imgg}
                src={`${this.state.imgpath}/media/${item.newpic}`}
                alt=""
              />
            </li>
            <li className={styles.spanid}>
              <p className={styles.pando}>{item.username}</p>
              <p className={styles.pand}>{item.user_intro}</p>
              <p className={styles.pandora}>
                <span>{item.user_age}</span>-
                <span className="st-icon-pandora">{item.marital_status}</span>-
                <span className="st-icon-pandora">
                  {item.user_site_province}*{item.user_site_city}*
                  {item.user_site_area}
                </span>
              </p>
            </li>
          </ul>
          <div className={styles.likpeo}>
            {/* 注意render()自动调用点击事件 通过箭头函数来改变  */}
            {/* <Heart></Heart> */}
            {/* {this.state.islikeall.indexOf(item.id) !== -1 ? (
              <i
                onClick={() => this.iszan(item.id)}
                className="icon iconfont icon-jurassic_love"
                style={{ fontSize: "30px", color: "red" }}
              ></i>
            ) : (
              <i
                onClick={() => this.iszan(item.id)}
                className="icon iconfont icon-jurassic_love"
                style={{ fontSize: "30px" }}
              ></i>
            )} */}
          </div>
        </li>
      );
    });
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
          <Olinenav idval={this.state.id}></Olinenav>
        </nav>
        {/* 主要内容 */}
        <div className={styles.containlike}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="我喜欢的" key="1">
              <div className={styles.tabsercon}>
                <ul className={styles.tabserconleft}>{lilist}</ul>
                <aside className={styles.tabserconright}></aside>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default melike;
