/**
 * Created by Julian on 2016/8/17.
 */
import {isLogin,getToken} from './vuex/getters';
import store from './vuex/store';

export default function (router) {
    router.map({
        '/index': {
            name: 'index',
            component: require('./components'),
            auth: true,         //标记是否需要登录验证的属性
            subRoutes: {
                '/home': {
                    name: 'home',
                    component: require('./components/home')
                },
                '/statistics': {
                    name: 'statistics',
                    component: require('./components/statistics')
                },
                '/record': {
                    name: 'record',
                    component: require('./components/record'),
                    subRoutes: {
                        '/bird': {
                            name: 'bird',
                            component: require('./components/record/bird.vue')
                        },
                        '/flag': {
                            name: 'flag',
                            component: require('./components/record/flag.vue')
                        }
                    }
                },
                '/management': {
                    name: 'management',
                    component: require('./components/management')
                },
                '/user': {
                    name: 'user',
                    component: require('./components/user')
                }
            }
        },
        '/login': {
            name: 'login',
            component: require('./components/login'),
        },
        '*': {
            component: require('./components/common/NotFound')
        },

    });

    // 做验证跳转，判断是否需要验证登录
    router.beforeEach((transition)=> {
        if (transition.to.auth) {
            if(isLogin(store.state)){
                //请求需要登录验证页面，并已经登录
                transition.next();
            }else {
                //没有登录，重定向到登录界面
                let redirect = encodeURIComponent(transition.to.path);
                transition.redirect({name: 'login'});
            }
        }else {
            //请求不需要登录界面
            transition.next();
        }
    });

    router.start(require('./App.vue'), '#app');
};