/**
 * Created by Julian on 2016/8/31.
 */
import ServerAPI from './ServerAPI';
import Vue from 'vue';
import VueResource from 'vue-resource';
import store from '../vuex/store';
import {isLogin, getToken} from '../vuex/getters';

let token = null;
Vue.use(VueResource);

//vue-resource拦截器
Vue.http.interceptors.push((request, next) => {
    if (!isLogin(store.state)) {
        request.headers = {
            'Content-Type': 'application/json'
        };
    } else {
        token = getToken(store.state);
        console.log('token:' + token);
        request.headers = {
            'Content-Type': 'application/json',
            'token': token
        };
    }

    next(response => {
        if (response.status !== 200 || response.json().code !== 200) {
            console.log('服务器请求失败，请联系开发人员。');
        }
    });
});

Vue.http.options.xhr = { withCredentials: true };

export const UserTotalResource = Vue.resource(ServerAPI.USER_TOTAL);

export const LoginResource = Vue.resource(ServerAPI.LOGIN);

export const RemoveUserResource = Vue.resource(ServerAPI.REMOVE_USER + '{/id}');

export const StatisticsResource = Vue.resource(ServerAPI.STATISTICS_TOTAL);

export const BirdSubmitResource = Vue.resource(ServerAPI.BIRD_RECORD_SUBMIT);

export const FlagSubmitResource = Vue.resource(ServerAPI.FLAG_RECORD_SUBMIT);

export const UserUpdateResource = Vue.resource(ServerAPI.UPDATE_USER + '{/id}');

export const UserAddResource = Vue.resource(ServerAPI.USER_ADD);
