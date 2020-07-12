import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../style/login.module.scss";
import { message, Form, Input, Button, Checkbox } from "antd";
import Hea from "../components/header/head";
export class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 鼠标滑过
      // hover: false,
      layout: {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      },
      tailLayout: {
        wrapperCol: {
          offset: 8,
          span: 16,
        },
      },
    };
  }
  render() {
    // 信息验证通过后发送登录请求
    const onFinish = async (values) => {
      console.log("Success:", values);
      const { data: res } = await axios.post("user/login/", values);
      console.log(res);
      if (res.status !== 1) return message.error(res.msg);
      message.success("登录成功");
      // 将返回数据进行存储
      window.sessionStorage.setItem("token", res.results.token);
      // 将用户的昵称进行存储
      window.sessionStorage.setItem('nicheng',res.results.username)
       // 将用户的pk进行存储
       window.sessionStorage.setItem('pk',res.results.pk)
      // 然后跳转到登录后的首页online
      this.props.history.push("/online");
    };

    // const onFinishFailed = (errorInfo) => {
    //   console.log("Failed:", errorInfo);
    // };
    return (
      <div className={styles.log}>
        <div className={styles.her}>
          {/* 头部组件 */}
          <Hea></Hea>
        </div>
        {/* 内容 */}
        <article className={styles.art}>
          <p className={styles.p}>
            <span
              style={{
                display: "block",
                width: "60px",
                height: "20px",
                lineHeight: "10px",
                backgroundColor: "#1DA57A",
                borderRadius: "6px",
              }}
            >
              登录
            </span>
          </p>
          <div className={styles.bloc}>
            <Form
              hideRequiredMark="true"
              colon="false"
              {...this.state.layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="用户"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入正确用户名或者邮箱",
                    pattern: new RegExp(
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      "g"
                    ),
                  },
                ]}
              >
                <Input placeholder="请输入用户名或者邮箱 " />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入正确的密码",
                    pattern: new RegExp(
                      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
                      "g"
                    ),
                  },
                ]}
              >
                <Input.Password placeholder="请输入您的密码" />
              </Form.Item>

              <Form.Item
                {...this.state.tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>记住用户密码</Checkbox>
              </Form.Item>

              <Form.Item {...this.state.tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  shape="round"
                  size="large"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </article>
      </div>
    );
  }
}

export default login;
