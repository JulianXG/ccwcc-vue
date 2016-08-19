/**
 * Created by Julian on 2016/8/17.
 */
export default function (router) {
    router.map({
        '/login': {
            name: 'login',
            component: require('./components/login')
        },
        '/index': {
            name: 'index',
            component: require('./components'),
            subRoutes: {
                '/home': {
                    component: require('./components/home')
                },
                '/statistics':{
                    component: require('./components/statistics')
                },
                'record': {
                    component: require('./components/record')
                },
                '/management': {
                    component: require('./components/management')
                },
                '/user': {
                    component: require('./components/user')
                }
            }
        },
        '*': {
            name: 'not-found',
            component: require('./components/common/NotFound')
        },

    });

    router.redirect({
        '/index': '/index/home'
    });

    router.start(require('./App.vue'), '#app');
}