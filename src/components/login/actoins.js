/**
 * Created by Julian on 2016/8/21.
 */
import types from '../../vuex/types';
import {LoginResource} from '../../resources';

export function login ({dispatch, router, state}, loginUser) {
    this.$Loading.start();
    LoginResource.save(loginUser).then(response => {
        if (response.json().code === 200) {
            this.$Loading.finish();
            let data = response.json().data;
            dispatch(types.ADD_USER, data.user);
            dispatch(types.ADD_TOKEN, data.token);
            router.go({name: 'home'});
        } else {
            this.$Loading.error();
            this.$Notice.error({
                title: '用户名或密码错误',
                desc: ''
            });
        }
    });
}

export function logout ({dispatch, router}) {
    dispatch(types.LOG_OFF);
    router.go('/login');
}
