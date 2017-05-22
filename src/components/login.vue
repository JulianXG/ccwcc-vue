<template>
    <div class="login-body">
        <form class="form-signin">
            <p class="form-login-title">中国水鸟调查</p>
            <p class="form-login-title">后台管理系统</p>
            <i-input :value.sync="user.username"
                     icon="person"
                     type="text"
                     placeholder="请输入用户名"
                     required autofocus></i-input>

            <i-input :value.sync="user.password"
                     icon="locked"
                     type="password"
                     placeholder="请输入密码" required></i-input>

            <p style="text-align: center;padding: 4px;">请选择检查点</p>
            <i-select :model.sync="selectCheckpoint" placeholder="请选择检查点"
                      style="margin-bottom: 20px;">
                <i-option v-for="item in checkpoints" :value="item.id">
                    {{item.name}}
                </i-option>
            </i-select>

            <i-button @click="login(user, selectCheckpoint)"
                      class="form-login"
                      style="width: 100%;"
                      @keyup.enter="login(user, selectCheckpoint)"
                      type="primary">登录</i-button>
        </form>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import FooterBar from './frame/FooterBar.vue';
    import Config from '../config';
    import Util from '../util';
    import MD5 from 'md5';
    import {LoginResource} from '../resources/index';

    export default{
        components: { FooterBar },
        data () {
            return {
                user: {username: '', password: ''},
                loginStatus: true,
                selectCheckpoint: 12,
                checkpoints: Config.CHECKPOINTS
            };
        },
        methods: {
            login (loginUser, checkpoint) {
                if (loginUser.username === '' || loginUser.password === '') {
                    this.$Message.error('请填写用户名密码');
                } else {
                    this.$Message.loading('正在登录中...', 0);
                    let userCopy = JSON.parse(JSON.stringify(loginUser));
                    userCopy.password = MD5(loginUser.password);
                    userCopy.checkpointId = checkpoint;
                    LoginResource.save(userCopy).then(response => {
                        this.$Message.destroy();
                        if (response.json().code === 200) {
                            this.$Message.success('登录成功');
                            let data = response.json().data;
                            Util.setCookie(Config.COOKIE_NICKNAME, data.user.nickname, 3);
                            Util.setCookie(Config.COOKIE_TOKEN, data.token.token, 1);
                            Util.setCookie(Config.COOKIE_CHECKPOINT, checkpoint, 3);
                            this.$router.go({name: 'home'});
                        } else if (response.json().code === Config.CODE_USERNAME_OR_PASSWORD_ERROR) {
                            this.$Message.error('用户名或密码错误');
                        } else if (response.json().code === Config.CODE_CHECKPOINT_ERROR) {
                            this.$Message.error('检查地选择错误，此用户不属于此检查地');
                        }
                    });
                }
            }
        }
    };
</script>

<style>
    .form-login-title {
        text-align: center;
        margin-bottom: 20px;
        font-weight:bold;
        font-size: 20px;
    }
    .login-body {
        width:100%;
        height:100%;
        min-height: 640px;
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
        margin: 40px auto 0;
        height: 380px;
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
