/**
 * Created by Julian on 2016/8/30.
 */
import types from '../../vuex/types';

export default {
    state: {
        users: null
    },
    mutations: {
        [types.SET_USERS] (state, users) {
            state.users = users;
        }
    }
};
