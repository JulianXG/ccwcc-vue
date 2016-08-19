<template>
    <div>
        <form class="form-signin">
            <h2>后台管理系统</h2>
            <input v-model="user.userName"
                   type="text" id="inputUsername"
                   class="form-control"
                   placeholder="用户名"
                   required autofocus>

            <input v-model="user.password"
                   type="password"
                   id="inputPassword"
                   class="form-control"
                   placeholder="密码" required>

            <button class="btn btn-lg btn-primary btn-block" type="submit">登录</button>
        </form>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                user:{
                    userName: '',
                    password: ''
                }
            };
        }
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