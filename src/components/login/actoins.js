/**
 * Created by Julian on 2016/8/21.
 */
import types from '../../vuex/types';
import {LoginResource} from '../../resources';
import {getToken} from '../../vuex/getters';

export function login ({dispatch, router, state}, loginUser) {
    LoginResource.save(loginUser).then(response => {
        if (response.json().status.code === 666) {
            let data = response.json().data;
            dispatch(types.ADD_USER, data);
            router.go({name: 'home'});
            document.cookie = 'jsessionid=' + getToken(state);
            // let action = {
            //     type: 'success',
            //     content: '登录成功',
            //     title: '信息',
            // };
            dispatch(types.SHOW_MESSAGE, '登陆成功');
        } else {
            console.log('用户名或密码错误');
        }
    });
}

export function logoff ({dispatch, router}) {
    dispatch(types.LOG_OFF);
    router.go('/login');
}

export function testLogin ({dispatch, router}) {
    dispatch(types.ADD_USER, {nickname: 'kalyter'});
    router.go({path: '/index/home'});
}
