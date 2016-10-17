/**
 * Created by Julian on 2016/8/30.
 */
import types from '../../vuex/types';

export function toggleTab(index) {
    let tabs = this.tabs;
    for(let i = 0;i < tabs.length;i++) {
        if(i == index){
            tabs[i].isActive = true;
        }else {
            tabs[i].isActive = false;
        }
    }
}

export function showMessage({dispatch},content,type = 'error') {
    dispatch(types.SHOW_MESSAGE, {content: content, type: type});
};

export function hideMessage({dispatch}) {
    dispatch(types.HIDE_MESSAGE);
};