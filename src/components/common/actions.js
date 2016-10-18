/**
 * Created by Julian on 2016/8/30.
 */
import types from '../../vuex/types';

export function toggleTab (index) {
    let tabs = this.tabs;
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].isActive = i === index;
    }
}

export function showMessage ({dispatch}, content, type = 'error') {
    dispatch(types.SHOW_MESSAGE, {content: content, type: type});
}

export function hideMessage ({dispatch}) {
    dispatch(types.HIDE_MESSAGE);
}
