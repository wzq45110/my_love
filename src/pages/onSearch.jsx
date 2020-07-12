import React, { Component } from "react";
import {
  Tabs,
  message,
  Collapse,
  Select,
  InputNumber,
  Cascader,
  Button,
} from "antd";
import Axios from "axios";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "../style/onSearch.module.scss";
// 引入在线顶部组件
import LineHeader from "../components/onlineheader/lineheader";
// 引入nva组件
import Olinenav from "../components/onlinenav/onlinenav";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;
export class onSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      lilistall: [],
      // 图片根路径
      imgpath: "http://192.168.0.105:8000/",
      // 控制点赞是否成功显示不一样的颜色
      iszanfa: false,
      // 用数组来接受该用户所喜欢的值
      islikeall: [],
      // 省市
      json: window.__CITY__,
      provincecity: [],
      xunsex: null,
      //年龄数组
      minage: null,
      maxage: null,
      // 国家
      country: null,
      // 种族
      race: null,
      // 教育
      educational: null,
      // 婚姻
      marital: null,
      //升高数组
      minheight: null,
      maxheight: null,
      // 个人信息进行保存
      peoplegeren: {},
    };
  }
  // 页面初次渲染页面
  componentDidMount() {
    this.chuli();
    // 初次渲染加载用户信息
    this.inforData();
    // 调用默认搜索接口
    this.searchgetall();
  }
  // 处理数据格式
  chuli = () => {
    // console.log(this.state.json);
    let updata = this.state.json;
    // console.log(updata);
    for (let i = 0; i < updata.length; i++) {
      updata[i]["value"] = updata[i].label;
      for (let j = 0; j < updata[i].children.length; j++) {
        // 在更换value属性及值
        updata[i].children[j]["value"] = updata[i].children[j].label;
        for (let k = 0; k < updata[i].children[j].children.length; k++) {
          // 在更换区属性及值
          updata[i].children[j].children[k]["value"] =
            updata[i].children[j].children[k].label;
        }
      }
    }
    //设置
    this.setState({
      json: updata,
    });
  };
  //获取个人信息的数据点赞了那些人
  // 发起获取信息接口
  inforData = async () => {
    // 获取用户pk
    let usepk = window.sessionStorage.getItem("pk");
    // console.log(usepk);
    const { data: res } = await Axios.get("user/user_info/", {
      params: {
        user_pk: usepk,
      },
    });
    // console.log(res.results.data);
    //  将本用户喜欢的人列出
    this.setState({
      peoplegeren: res.results.data,
      islikeall: res.results.like,
    });
  };

  callback = (key) => {
    console.log(key);
  };
  // 获取用户信息
  // getinfoall = async () => {
  //   let usepk = window.sessionStorage.getItem("pk");
  //   const { data: res } = await Axios.post("user/user_info/list/", {
  //     user_pk: usepk,
  //   });
  //   // console.log(res.results.data);
  //   if (res.status !== 1) return;
  //   this.setState({
  //     lilistall: res.results.data,
  //   });
  // };
  // // 对获取到的用户列表图像进行判断
  // getlipicc = (item) => {
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
  // 点赞 接口
  iszan = async (zanval) => {
    // console.log(zanval);
    let usepk = window.sessionStorage.getItem("pk");
    const { data: res } = await Axios.post("user/user_info/like/", {
      user_pk: usepk,
      like_user_pk: zanval,
    });
    if (res.status !== 1) return message.warning(res.msg);
    // 点击完从新获取个人用户列表
    this.inforData();
    // 获取好友列表
    this.searchgetall()
  };
  handleChange = (value) => {
    let num = parseInt(value);
    console.log(num);
    // 将值赋值
    this.setState({
      xunsex: num,
    });
  };
  // 年龄区间
  onChangeinptmin = (value) => {
    console.log("changed", value);
    this.setState({
      minage: value,
    });
  };
  onChangeinptmax = (value) => {
    this.setState({
      maxage: value,
    });
  };
  // 国家
  handleChangecotry = (value) => {
    console.log(value);
    this.setState({
      country: value,
    });
  };
  // 省市区
  onChangeare = (value) => {
    this.setState({
      provincecity: value,
    });
  };
  // 升高区间
  handleChangemax = (value) => {
    console.log(value);
    this.setState({
      maxheight: value,
    });
  };
  handleChangemin = (value) => {
    console.log(value);
    this.setState({
      minheight: value,
    });
  };
  // 背景
  handleChangebeijing = (value) => {
    this.setState({
      educational: value,
    });
  };
  // 种族
  handleChangezhongzu = (value) => {
    console.log(value);
    this.setState({
      race: value,
    });
  };
  // 婚姻
  handleChangemarital = (value) => {
    console.log(value);
    this.setState({
      marital: value,
    });
  };
  // 点击搜索发请求
  searchgetall = async () => {
    // console.log(this.state.xunsex)
    // console.log(this.state.minage)
    let xunsex = this.state.xunsex;
    let minage = this.state.minage;
    let maxage = this.state.maxage;
    let country = this.state.country;
    let provincecity = this.state.provincecity;
    let race = this.state.race;
    let minheight = this.state.minheight;
    let maxheight = this.state.maxheight;
    let marital = this.state.marital;
    let educational = this.state.educational;
    if (xunsex === null) {
      xunsex = this.state.peoplegeren.user_like_sex === "男" ? "0" : "1";
    }
    if (minage === null) {
      minage = 18;
    }
    if (maxage === null) {
      maxage = 99;
    }
    if (country === null) {
      country = this.state.peoplegeren.user_country;
    }
    if (provincecity.length === 0) {
      provincecity = [
        this.state.peoplegeren.user_site_province,
        this.state.peoplegeren.user_site_city,
      ];
    }
    if (race === null) {
      race = 6;
    }
    if (minheight === null) {
      minheight = 160;
    }
    if (maxheight === null) {
      maxheight = 180;
    }
    if (marital === null) {
      marital = this.state.peoplegeren.marital_status;
    }
    if (educational === null) {
      educational = this.state.peoplegeren.educational_background;
    }
    let usepk = window.sessionStorage.getItem("pk");
    const { data: res } = await Axios.post("user/user_info/filtration/", {
      user_pk: usepk,
      user_like_sex: xunsex,
      user_age: [minage, maxage],
      user_country: country,
      user_site_province: provincecity[0],
      user_site_city: provincecity[1],
      user_race: race,
      educational_background: educational,
      marital_status: marital,
      user_height: [minheight, maxheight],
    });
    console.log(res);
    if (res.status !== 1) return message.warning(res.msg);
    // 对返回的数据进行操作
    let newdatall = res.results.data;
    console.log(newdatall);
    let piclistall = res.results.price_list;
    console.log(piclistall);
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
    //  搜索用户结果列表
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
            {this.state.islikeall.indexOf(item.user_id) !== -1 ? (
              <i
                onClick={() => this.iszan(item.user_id)}
                className="icon iconfont icon-jurassic_love"
                style={{ fontSize: "30px", color: "#1DA57A" }}
              ></i>
            ) : (
              <i
                onClick={() => this.iszan(item.user_id)}
                className="icon iconfont icon-jurassic_love"
                style={{ fontSize: "30px" }}
              ></i>
            )}
          </div>
        </li>
      );
    });
    return (
      <div className={styles.onserall}>
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
        {/* content 正文内容*/}
        <div className={styles.contentquyu}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="搜索结果" key="1">
              <div className={styles.tabsercon}>
                <ul className={styles.tabserconleft}>{lilist}</ul>
                <aside className={styles.tabserconright}>
                  <Collapse
                    defaultActiveKey="1"
                    accordion
                    expandIconPosition="right"
                    className={styles.site}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined
                        rotate={isActive ? 90 : 0}
                        style={{ color: "#1DA57A", fontSize: "20px" }}
                      />
                    )}
                  >
                    <Panel header="默认筛选" key="1">
                      <div
                        className={styles.xunzheoa}
                        style={{ marginBottom: "20px" }}
                      >
                        <span>寻求一位</span>
                        <Select
                          size="large"
                          defaultValue={
                            this.state.peoplegeren.user_like_sex === "男"
                              ? "0"
                              : "1"
                          }
                          style={{ width: "72%" }}
                          onChange={this.handleChange}
                        >
                          <Option value="0">男</Option>
                          <Option value="1">女</Option>
                        </Select>
                      </div>
                      <div className={styles.xunzheoa}>
                        <span>年龄范围</span>
                        <InputNumber
                          size="large"
                          min={1}
                          defaultValue={18}
                          onChange={this.onChangeinptmin}
                        />
                        <span>至</span>
                        <InputNumber
                          size="large"
                          min={1}
                          defaultValue={99}
                          onChange={this.onChangeinptmax}
                        />
                      </div>
                    </Panel>
                    <Panel header="通过地区" key="2">
                      <div
                        className={styles.xunzheoa}
                        style={{ marginBottom: "20px" }}
                      >
                        <span>国家</span>
                        <Select
                          size="large"
                          defaultValue={this.state.peoplegeren.user_country}
                          style={{ width: "80%" }}
                          onChange={this.handleChangecotry}
                        >
                          <Option value="中国">中国</Option>
                          <Option value="外籍">外籍</Option>
                        </Select>
                      </div>
                      <div className={styles.xunzheoa}>
                        <span>省市</span>
                        <Cascader
                          defaultValue={[
                            this.state.peoplegeren.user_site_province,
                            this.state.peoplegeren.user_site_city,
                            this.state.peoplegeren.user_site_area,
                          ]}
                          size="large"
                          style={{ width: "80%" }}
                          options={this.state.json}
                          onChange={this.onChangeare}
                          placeholder="选择省市区"
                        />
                      </div>
                    </Panel>
                    <Panel header="通过体征" key="3">
                      <div
                        className={styles.xunzheoa}
                        style={{ marginBottom: "20px" }}
                      >
                        <span>种族</span>
                        <Select
                          size="large"
                          defaultValue="6"
                          style={{ width: "80%" }}
                          onChange={this.handleChangezhongzu}
                        >
                          <Option value="0">高加索人</Option>
                          <Option value="1">非洲</Option>
                          <Option value="2">西班牙裔</Option>
                          <Option value="3">印度人</Option>
                          <Option value="4">中东人</Option>
                          <Option value="5">美洲原住民</Option>
                          <Option value="6">亚洲人</Option>
                          <Option value="7">混血</Option>
                          <Option value="8">其他</Option>
                        </Select>
                      </div>
                      <div className={styles.xunzheoa}>
                        <span>身高</span>
                        <Select
                          size="large"
                          defaultValue="160"
                          style={{ width: "32%" }}
                          onChange={this.handleChangemin}
                        >
                          <Option value="160">160cm</Option>
                          <Option value="170">170cm</Option>
                          <Option value="180">180cm</Option>
                        </Select>
                        <span>至</span>
                        <Select
                          size="large"
                          defaultValue="180"
                          style={{ width: "32%" }}
                          onChange={this.handleChangemax}
                        >
                          <Option value="160">160cm</Option>
                          <Option value="170">170cm</Option>
                          <Option value="180">180cm</Option>
                        </Select>
                      </div>
                    </Panel>
                    <Panel header="通过背景" key="4" className={styles.panel}>
                      <div
                        className={styles.xunzheoa}
                        style={{ marginBottom: "20px" }}
                      >
                        <span>教育背景</span>
                        <Select
                          size="large"
                          defaultValue={
                            this.state.peoplegeren.educational_background
                          }
                          style={{ width: "72%" }}
                          onChange={this.handleChangebeijing}
                        >
                          <Option value="博士">博士</Option>
                          <Option value="硕士">硕士</Option>
                          <Option value="研究生">研究生</Option>
                          <Option value="本科">本科</Option>
                          <Option value="大专">大专</Option>
                          <Option value="中学">中学</Option>
                        </Select>
                      </div>
                      <div className={styles.xunzheoa}>
                        <span>婚姻状况</span>
                        <Select
                          size="large"
                          defaultValue={this.state.peoplegeren.marital_status}
                          style={{ width: "72%" }}
                          onChange={this.handleChangemarital}
                        >
                          <Option value="单身">单身</Option>
                          <Option value="已婚">已婚</Option>
                        </Select>
                      </div>
                    </Panel>
                    <div className={styles.serbtn}>
                      <Button
                        onClick={this.searchgetall}
                        type="primary"
                        shape="round"
                        icon={<SearchOutlined />}
                        size="large"
                      >
                        去钓鱼
                      </Button>
                    </div>
                  </Collapse>
                </aside>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default onSearch;
