/**
 * Created by Julian on 2016/8/30.
 */
import types from '../../vuex/types';
import {UserTotalResource,RemoveUserResource,UserUpdateResource,UserAddResource} from '../../resources';

export const initUsers = ({dispatch,}) => {
    UserTotalResource.get().then(response => {
        if (response.json().status.code == 666) {
            let data = response.json().data;
            dispatch(types.SET_USERS, data);
        } else {
            console.log('请求出错');
        }

    });

};

export const removeUser = ({dispatch}, userId) => {
    console.log('removeUser');
    RemoveUserResource.delete({id: userId}).then(response =>{
        if(response.json().status.code == 666) {
            console.log('删除成功');
            initUsers({dispatch});
        }
    });
};

export function updateUser({dispatch},user,id){

    UserUpdateResource.save({id: id},user).then(response => {
       if(response.json().status.code == 666) {
           console.log('更新用户信息成功');
           initUsers({dispatch});
       }
    });
};

export function addUser({dispatch},user) {
    UserAddResource.update(user).then(response => {
        if(response.json().status.code == 666) {
            console.log('插入新用户成功');
            initUsers({dispatch});
        }
    });
};