/**
 * TODO:选择使用jQuery是无奈之举，因为违反了Vue本身原则
 * 但是桌面端关于Vue的UI组件选择太少，而且样式没有bootstrap好看，暂时先使用它吧
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import ConfigRouter from './router';
import 'bootstrap/dist/css/bootstrap';
import 'bootstrap/dist/js/bootstrap';

// Vue.config.debug = true;
Vue.use(VueRouter);
const router = new VueRouter({});

ConfigRouter(router);
