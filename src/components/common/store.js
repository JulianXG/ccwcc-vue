/**
 * Created by Julian on 2016/8/30.
 */
import types from '../../vuex/types';

export default {
    state: {
        message: {
            type: '',
            content: '',
            title: ''
        }
    },
    mutations: {
        [types.SHOW_MESSAGE] (state, action) {
            state.message = {action};
        },
        [types.HIDE_MESSAGE] (state) {
            state.message = {
                type: '',
                content: '',
                title: ''
            };
        }
    }
};
