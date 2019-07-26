import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// 载入默认全局样式 normalize 、.clearfix 和一些 mixin 方法等
import '@alifd/next/reset.scss';
import RootRouter from './router';
import configStore from './store';
const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}
const store = configStore();
ReactDOM.render(
  <Provider store={store}>
    <RootRouter />
  </Provider>,
  ICE_CONTAINER
);
