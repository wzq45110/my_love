import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import styles from "../style/inSearch.module.scss";
// 引入头部组件
import Toubu from "../components/toubu/toubu";
// 引入侧边栏组件
import Artce from "../components/artce/Artce";
import { Layout, Button } from "antd";
const { Header, Footer, Content } = Layout;
let inSearch = () => {
  // 控制左边的按钮是否变化
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isshow, setIsshow] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const pchildref = useRef();
  function parentDivClick() {
    setIsshow(false);
    // 父组件调用子组件方法
    pchildref.current._childFn();
  }
  function parentDivClick2() {
    setIsshow(true);
    // 父组件调用子组件方法
    pchildref.current._haiZi();
  }
  // 跳转注册页面
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory();
  function handleClick() {
    history.push("/regist");
  }
  return (
    <div className={styles.inboxall}>
      <Layout>
        <Header className={styles.inboxhead}>
          <Toubu
            msg={isshow}
            changeshow={parentDivClick}
            changeclose={parentDivClick2}
          ></Toubu>
        </Header>
        <Content className={styles.inboconte}>
          <div className={styles.incleft}>
            <h1 className={styles.inbh1}>搜索 淘汰那个 滴答声 好吧 盒子。</h1>
            <p className={styles.inb}>
              <Button
                type="primary"
                shape="round"
                block
                className={styles.inbottom}
                onClick={handleClick}
              >
                现在注册
              </Button>
            </p>
            <h3 className={styles.inph3}>
              在“丰盛的鱼类”中找到可以分享您的爱好，生活方式和理想的人。
            </h3>
          </div>
          <div className={styles.inbright}>
            <img
              className={styles.inbimg}
              src={require("../asstes/img/graphic_search.png")}
              alt=""
            />
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
      {/* 导入侧边栏 */}
      <Artce
        ref={pchildref}
        pramesclickhand={() => {
          setIsshow(true);
        }}
      ></Artce>
    </div>
  );
};

export default inSearch;
