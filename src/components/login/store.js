/**
 * Created by Julian on 2016/8/21.
 */
import types from '../../vuex/types';

export default {
    state: {
        user: null,
    },
    mutations: {
        [types.ADD_USER] (state, user) {
            state.user = user;
        },
        [types.LOG_OFF] (state){
            state.user = null;
        }
    }
};