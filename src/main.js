import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './assets/css/style.css';
import ConfigRouter from './router';

Vue.use(iView);
Vue.use(VueRouter);
const router = new VueRouter();

ConfigRouter(router);
