/**
 * Created by Julian on 2016/8/21.
 */

export const getCount = state => state.home.count;

export const isLogin = state => state.login.user != null;

export const getUser = state => state.login.user;

export const getUserList = state => state.management.users;

export const getToken = state => state.login.user.token;

export const getMessage = state => state.common.message;
