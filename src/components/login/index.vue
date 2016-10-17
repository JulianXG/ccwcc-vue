<template>
    <div>
        <toast></toast>
        <form class="form-signin">
            <h2>后台管理系统</h2>
            <input v-model="user.userName"
                   type="text"
                   class="form-control"
                   placeholder="用户名"
                   required autofocus>

            <input v-model="user.password"
                   type="password"
                   id="inputPassword"
                   class="form-control"
                   placeholder="密码" required>

            <button @click="login(user)" @keydown.enter="login(user)" class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
        </form>
    </div>
</template>

<script>
    import {login,testLogin} from './actoins';
    import {isLogin} from '../../vuex/getters';
    import store from '../../vuex/store';
    import toast from '../common/toast.vue';

    export default{
        components: {toast},
        data(){
            return{
                user:{ userName: '', password: '' }
            };
        },
        vuex: {
            actions: {login},
            getters: {isLogin}
        },
        route: {
            canActivate: transition => {
                if(isLogin(store.state)){
                    transition.redirect('/index/home');
                }else {
                    transition.next();
                }
            },
        },
    };
</script>

<style>
    h2{
        text-align: center;
        margin-bottom: 20px;
    }
    .form-signin{
        max-width: 330px;
        padding: 15px;
        margin:0 auto;
    }
    .form-signin .form-control{
        position: relative;
        height:auto;
        padding: 10px;
        font-size: 16px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .form-signin input[type="text"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 20px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    body{
        padding-top: 40px;
        padding-bottom: 40px;
        font-family:"Microsoft YaHei UI",serif;
    }
</style>