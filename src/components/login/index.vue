<template>
    <div class="login-body">
        <form class="form-signin">
            <h1>中国水鸟调查</h1>
            <h2>后台管理系统</h2>
            <i-input :value.sync="user.username"
                     icon="person"
                     type="text"
                     placeholder="请输入用户名"
                     required autofocus></i-input>

            <i-input :value.sync="user.password"
                     icon="locked"
                     type="password"
                     id="inputPassword"
                     placeholder="请输入密码" required></i-input>

            <i-button @click="login(user)"
                      class="form-login"
                      style="width: 100%;"
                      @keyup.enter="login(user)"
                      type="primary">登录</i-button>
        </form>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import {login} from './actoins';
    import {isLogin} from '../../vuex/getters';
    import store from '../../vuex/store';
    import FooterBar from '../common/FooterBar.vue';

    export default{
        components: { FooterBar },
        data () {
            return {
                user: {username: '', password: ''},
                loginStatus: true
            };
        },
        vuex: {
            actions: {
                login
            },
            getters: {isLogin}
        },
        route: {
            canActivate: transition => {
                if (isLogin(store.state)) {
                    transition.redirect('/index/home');
                } else {
                    transition.next();
                }
            },
            data: () => {
                document.title = '登录';
            }
        }
    };
</script>

<style>
    .login-body {
        width:100%;
        height:100%;
        position: fixed;
        background: #0099CC;
    }
    h1, h2{
        text-align: center;
        margin-bottom: 20px;
    }
    .form-signin {
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.95);
        width: 375px;
        padding: 35px;
        margin: 100px 100px 0 0;
        float: right;
        height: 400px;
    }
    .form-signin input{
        height: 36px;
    }
    .form-signin input[type="text"] {
        margin-bottom: 8px;
    }
    .form-signin input[type="password"] {
        margin-bottom: 20px;
    }
    .form-login {
        width:100%;
        height:40px;
    }
</style>
