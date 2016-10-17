/**
 * Created by Julian on 2016/8/21.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import home from '../components/home/store';
import login from '../components/login/store';
import common from '../components/common/store';
import management from '../components/management/store';

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        home,
        login,
        common,
        management,
    },
    strict: true,
});