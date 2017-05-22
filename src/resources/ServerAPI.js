/**
 * Created by Julian on 2016/8/20.
 */
// const API_ROOT = 'http://ccwcc.kalyter.cn/api';
const API_ROOT = 'http://localhost:8080/api';
// const API_ROOT = 'http://172.16.124.50:8080/api';

export default {
    LOGIN: API_ROOT + '/login',

    REGISTER: API_ROOT + '/register',

    USERS: API_ROOT + '/role_root/users{/id}',

    DELETE_USER: API_ROOT + '/role_root/users/delete{/id}',

    USER_PAGINATION: API_ROOT + '/role_root/user/pagination{/page}{/pageSize}',

    BIRD_SUBMIT: API_ROOT + '/role_admin/bird',

    BIRD_RECORD_SUBMIT: API_ROOT + '/role_user/record/bird',

    BIRD_RECORD_PAGINATION: API_ROOT + '/record/bird/pagination{/page}{/pageSize}',

    BIRD_BRIEF: API_ROOT + '/role_user/bird/brief',

    FLAG_RECORD_SUBMIT: API_ROOT + '/role_user/record/flag',

    FLAG_RECORD_PAGINATION: API_ROOT + '/record/flag/pagination{/page}{/pageSize}',

    CHECKPOINT_BRIEF: API_ROOT + '/checkpoint/brief',

    RECORD_DOWNLOAD_RESOURCE: API_ROOT + '/excel/download',

    SEARCH_RESOURCE: API_ROOT + '/role_user/excel/search{/page}{/pageSize}',

    CHECKPOINT_USER: API_ROOT + '/checkpoints/user{/userId}'
};
