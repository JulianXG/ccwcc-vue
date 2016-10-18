/**
 * Created by Julian on 2016/9/6.
 */
import {BirdSubmitResource, FlagSubmitResource} from '../../resources';
import {getToken} from '../../vuex/getters';

export function addBird ({state}, bird) {
    let token = getToken(state);

    BirdSubmitResource.save({jsessionid: token}, bird).then(response => {
        if (response.json().status.code === 666) {
            console.log('提交bird记录成功');
        } else {
            console.log('提交bird记录失败');
        }
    });
}

export function addFlag (flag) {
    FlagSubmitResource.save(flag).then(response => {
        if (response.json().status.code === 666) {
            console.log('提交bird记录成功');
        } else {
            console.log('提交bird记录失败');
        }
    });
}
