import { createStore } from 'redux';
import reducers from './reducers.js';   //用来存放store仓库的逻辑代码和state数据

const store = createStore(reducers);

export default store;