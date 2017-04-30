/**
 * Created by Julian on 2016/8/17.
 */
import Util from './util';
import Config from './config';

export default function (router) {
    router.map({
        '/index': {
            name: 'index',
            component: require('./components/frame/index.vue'),
            auth: true,         //标记是否需要登录验证的属性
            subRoutes: {
                '/home': {
                    name: 'home',
                    component: require('./components/home.vue')
                },
                '/visual/data': {
                    name: 'visualization',
                    component: require('./components/visualization/statistics.vue')
                },
                '/visual/map': {
                    name: 'mapVisual',
                    component: require('./components/visualization/mapVisual.vue')
                },
                '/management/birdRecord': {
                    name: 'birdRecord',
                    component: require('./components/management/bird-record.vue')
                },
                '/management/bird': {
                    name: 'bird',
                    component: require('./components/management/bird.vue')
                },
                '/management/flag': {
                    name: 'flag',
                    component: require('./components/management/flag-record.vue')
                },
                '/management/user': {
                    name: 'user',
                    component: require('./components/management/user.vue')
                },
                '/authError': {
                    name: 'authError',
                    component: require('./components/error/AuthError.vue')
                },
                '/serverError': {
                    name: 'serverError',
                    component: require('./components/error/ServerError.vue')
                },
                '/changeLog': {
                    component: require('./components/change-log.vue')
                },
                '/search': {
                    name: 'search',
                    component: require('./components/search')
                }
            }
        },
        '/login': {
            name: 'login',
            component: require('./components/login.vue')
        },
        '*': {
            component: require('./components/error/NotFound.vue')
        }
    });

    // 做验证跳转，判断是否登录
    router.beforeEach((transition) => {
        let token = Util.getCookie(Config.COOKIE_TOKEN);
        if (token !== '') {
            // 暂时认为cookie过期由游览器主动控制
            // 请求需要登录验证页面，cookie中包含登录信息
            if (transition.to.path === '/login') {
                transition.redirect({name: 'home'});
            } else {
                transition.next();
            }
        } else {
            //没有登录，重定向到登录界面
            // let redirect = encodeURIComponent(transition.to.path);
            if (transition.to.path !== '/login') {
                transition.redirect({path: '/login'});
            } else {
                transition.next();
            }
        }
    });

    router.start(require('./App.vue'), '#app');
};
