import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./lineheader.module.scss";
import { Button, Badge, Menu, Dropdown } from "antd";
import {
  PoweroffOutlined,
  FolderOutlined,
  DownOutlined,
  HeartFilled,
  MailOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
let lineheader = () => {
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        我的简历
      </Menu.Item>
      <Menu.Item key="2" icon={<FolderOutlined />}>
        编辑个人资料
      </Menu.Item>
      <Menu.Item key="3" icon={<PoweroffOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let history = useHistory();
  function handleMenuClick(e) {
    // message.info("Click on menu item.");
    // 判断key值来确定逻辑
    console.log("click", e);
    if (e.key === "3") {
      // 先清除token 再返回到登录页面
      window.sessionStorage.removeItem("token");
      // 将用户的昵称先清除
      window.sessionStorage.removeItem("nicheng");
      // 将用户的pk先清除
      window.sessionStorage.removeItem("pk");
      history.push("/login");
    } else if (e.key === "1") {
      // 跳转到我的简历组件
      history.push("/myresume1");
    } else {
      // 跳转到个人资料修改组件
      history.push("/myresume2");
    }
  }
  return (
    <div className={styles.linezujian}>
      <div className={styles.healeft}>
        <Link to="/" className={styles.healin}>
          <HeartFilled />
          LoveLove
        </Link>
      </div>
      <ul className={styles.onright}>
        <li className={styles.lineli}>
          <Button
            shape="round"
            icon={<MailOutlined />}
            className={styles.bgcbtm}
          >
            收件箱
          </Button>
        </li>
        <li className={styles.lineli}>
          <Button
            shape="round"
            icon={<BellOutlined />}
            className={styles.bgcbtm}
          >
            <Badge count={25} />
          </Button>
        </li>
        <li className={styles.lineli}>
          <Dropdown overlay={menu}>
            <Button
              shape="round"
              icon={<UserOutlined />}
              className={styles.bgcbtm}
            >
              个人信息 <DownOutlined />
            </Button>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};

export default lineheader;
