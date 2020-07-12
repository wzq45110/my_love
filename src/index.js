import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import axios from 'axios';
// import store from './store/store.js'  //redux需要一个仓库进行存储
import './style/base.css';
import App from "./pages/App";
import * as serviceWorker from './serviceWorker';
// React.Component.prototype.$axios = axios;
axios.defaults.baseURL = 'http://192.168.0.105:8000/'  //根据项目自己更改(跟组件全局)
// 引入axios的配置文件 暂时先不用
// import './server.js'
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
