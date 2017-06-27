<template>
    <Row>
        <i-col span="24" style="background-color: #ffffff; padding: 4px">
            <img class="frame-logo" src="../../assets/img/favicon.png">
            <span class="frame-system-name">{{systemName}}-找回密码</span>
        </i-col>
    </Row>

    <Card style="height: 56px;margin: 24px;">
        <Steps :current="step">
            <Step v-for="item in steps" :title="item"></Step>
        </Steps>
    </Card>

    <Card style="text-align: center;margin:24px;min-height: 480px">
        <div v-show="step == 0" style="width: 400px;margin-left: 240px">
            <p style="margin-top: 24px;margin-bottom: 24px">验证你的用户名和邮箱是否匹配</p>
            <i-input :value.sync="username" size="large" style="margin: 8px;" placeholder="请输入你的用户名"></i-input>
            <i-input :value.sync="email" size="large" style="margin: 8px;" placeholder="请输入你账号邮箱"></i-input>
            <i-button type="primary" style="margin: 8px;" long @click="confirmAccount">确认</i-button>
        </div>

        <div v-show="step == 1" style="width: 480px;margin-left: 240px">
            <p style="margin-top: 24px;margin-bottom: 24px">一会有一封带有验证码的邮件发到目标邮箱，请你输入里面的验证码</p>
            <i-input :value.sync="validateCode" size="large" style="margin: 8px;" placeholder="请输入验证码"></i-input>
            <i-button type="primary" style="margin: 8px;" long @click="confirmValidateCode">确认</i-button>
        </div>

        <div v-show="step == 2" style="width: 480px;margin-left: 240px">
            <p style="margin-top: 24px;margin-bottom: 24px">确认你的新密码</p>
            <i-input :value.sync="password" size="large" style="margin: 8px;" type="password" placeholder="请输入你的新密码"></i-input>
            <i-button type="primary" style="margin: 8px;" long @click="confirmPassword">确认</i-button>
        </div>
        <div v-show="step == 3" style="margin-top: 120px">
            <p>
                恭喜你密码修改成功！<a v-link="{path: '/login'}">去登录</a>
            </p>
        </div>
    </Card>
</template>

<script>
    import Config from '../../config';
    import {CheckEmailResource, VerifyValidateCodeResource, ChangePasswordResource} from '../../resources';
    import MD5 from 'md5';

    export default {
        data () {
            return {
                steps: ['验证用户邮箱', '输入验证码', '更改密码', '更改结果'],
                username: '',
                email: '',
                step: 0,
                systemName: Config.SYSTEM_NAME,
                validateCode: '',
                password: '',
                userId: ''
            };
        },
        methods: {
            confirmAccount () {
                this.$Loading.start();
                CheckEmailResource.save({username: this.username, email: this.email})
                    .then(response => {
                        this.$Loading.finish();
                        if (response.json().data > 0) {
                            this.step++;
                            this.userId = response.json().data;
                        } else {
                            this.$Message.error(Config.CHECK_ERROR);
                        }
                    }, () => {
                        this.$Loading.error();
                    });
            },
            confirmValidateCode () {
                this.$Loading.start();
                VerifyValidateCodeResource.get({userId: this.userId, code: this.validateCode})
                    .then(response => {
                        this.$Loading.finish();
                        if (response.json().data) {
                            this.step++;
                        } else {
                            this.$Message.error(Config.CHECK_ERROR);
                        }
                    }, () => {
                        this.$Loading.error();
                    });
            },
            confirmPassword () {
                let password = MD5(this.password);
                this.$Loading.start();
                ChangePasswordResource.get({userId: this.userId, password: password})
                    .then(response => {
                        this.$Loading.finish();
                        if (response.json().data) {
                            this.step++;
                        } else {
                            this.$Message.error(Config.CHANGE_PASSWORD_ERROR);
                        }
                    }, () => {
                        this.$Loading.error();
                    });
            }
        }
    };
</script>
