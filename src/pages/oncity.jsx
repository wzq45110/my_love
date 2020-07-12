import React, { Component } from "react";
import { Tabs, message } from "antd";
import styles from "../style/oncity.module.scss";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
import Axios from "axios";
const { TabPane } = Tabs;
export class oncity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 3,
      lilistall: [],
      // 根路径
      // 图片根路径
      imgpath: "http://192.168.0.105:8000/",
    };
  }
  // 页面初次渲染页面
  componentDidMount() {
    this.getcitypeo();
  }

  // /获取我的城市的接口
  getcitypeo = async () => {
    let usepk = window.sessionStorage.getItem("pk");
    const { data: res } = await Axios.post("user/same_city/", {
      user_pk: usepk,
    });
    console.log(res);
    if (res.status !== 1) return message.warning(res.msg);
    // 对返回的数据进行操作
    let newdatall = res.results.same_data;
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
  render() {
    //  我的城市用户结果列表
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
            <TabPane tab="我的城市" key="1">
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

export default oncity;
