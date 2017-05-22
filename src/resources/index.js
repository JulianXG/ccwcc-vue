/**
 * Created by Julian on 2016/8/31.
 */
import ServerAPI from './ServerAPI';
import Vue from 'vue';
import VueResource from 'vue-resource';
import Util from '../util';
import Config from '../config';
import { Modal } from 'iview';

Vue.use(VueResource);

//vue-resource拦截器
Vue.http.interceptors.push((request, next) => {
    let token = Util.getCookie(Config.COOKIE_TOKEN);
    let headers = {'Content-Type': 'application/json'};
    if (token !== null) {
        headers.token = token;
    }
    request.headers = headers;

    next(response => {
        if (response.json().code === Config.CODE_NO_PERMISSION) {
            Modal.error({
                title: '出错',
                content: '权限不够，请求出错！'
            });
        } else if (response.json().code !== Config.CODE_SUCCESS) {
            Modal.error({
                title: '出错',
                content: '服务器请求出错！'
            });
        }
    });
});

export const UserPaginationResource = Vue.resource(ServerAPI.USER_PAGINATION);

export const UsersResource = Vue.resource(ServerAPI.USERS);

export const DeleteUserResource = Vue.resource(ServerAPI.DELETE_USER);

export const LoginResource = Vue.resource(ServerAPI.LOGIN);

export const BirdBriefResource = Vue.resource(ServerAPI.BIRD_BRIEF);

export const BirdRecordResource = Vue.resource(ServerAPI.BIRD_RECORD_SUBMIT);

export const BirdSubmitResource = Vue.resource(ServerAPI.BIRD_SUBMIT);

export const FlagSubmitResource = Vue.resource(ServerAPI.FLAG_RECORD_SUBMIT);

export const CheckpointBrief = Vue.resource(ServerAPI.CHECKPOINT_BRIEF);

export const DownloadResource = Vue.resource(ServerAPI.RECORD_DOWNLOAD_RESOURCE);

export const SearchResource = Vue.resource(ServerAPI.SEARCH_RESOURCE);

export const CheckpointUserResource = Vue.resource(ServerAPI.CHECKPOINT_USER);
