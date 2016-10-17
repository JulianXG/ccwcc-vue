/**
 * TODO:选择使用jQuery是无奈之举，因为违反了Vue本身原则
 * 但是桌面端关于Vue的UI组件选择太少，而且样式没有bootstrap好看，暂时先使用它吧
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import {sync} from 'vuex-router-sync';
import 'bootstrap/dist/css/bootstrap.min';
import 'bootstrap/dist/js/bootstrap.min';

import ConfigRouter from './router';
import store from './vuex/store';

Vue.use(VueRouter);
const router = new VueRouter();

ConfigRouter(router);
sync(store, router);