/**
 * Created by Julian on 2016/8/20.
 */
// const API_ROOT = 'http://ccwcc.kalyter.cn/api';
const API_ROOT = 'http://localhost:8080/api';

export default {

    // API_ROOT,
    //
    // LOGIN: API_ROOT + '/user/login',
    //
    // STATISTICS_TOTAL: API_ROOT + '/statistics/total',
    //
    // USER_TOTAL: API_ROOT + '/user/total',
    //
    // UPDATE_USER: API_ROOT + '/user',
    //
    // REMOVE_USER: API_ROOT + '/user',
    //
    // BIRD_RECORD_SUBMIT: API_ROOT + '/record/submit',
    //
    // FLAG_RECORD_SUBMIT: API_ROOT + '/flag/submit',
    //
    // USER_ADD: API_ROOT + '/user',

    LOGIN: API_ROOT + '/role_user/user/login',

    STATISTICS_TOTAL: '/api/statistics/total',

    USER_TOTAL: '/api/user/total',

    UPDATE_USER: '/api/user',

    REMOVE_USER: '/api/user',

    BIRD_RECORD_SUBMIT: '/api/record/submit',

    FLAG_RECORD_SUBMIT: '/api/flag/submit',

    USER_ADD: '/api/user'
};
