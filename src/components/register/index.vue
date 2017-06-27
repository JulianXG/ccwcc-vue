<template>
    <Row>
        <i-col span="24" style="background-color: #ffffff; padding: 4px">
            <img class="frame-logo" src="../../assets/img/favicon.png">
            <span class="frame-system-name">{{systemName}}-用户注册</span>
        </i-col>
    </Row>
    <Card style="height: 56px;margin: 24px;">
        <Steps :current="step">
            <Step v-for="item in steps" :title="item"></Step>
        </Steps>
    </Card>

    <Card style="text-align: center;margin:24px;min-height: 480px">
        <div v-show="step == 0">
            <i-form v-ref:registerUser :model="registerUser"
                    style="width: 400px; margin-left: 80px"
                    :rules="rules" :label-width="80">
                <Form-item label="用户名" prop="username">
                    <i-input :value.sync="registerUser.username" placeholder="请输入用户名"
                             @on-blur="checkUsername(registerUser.username)"></i-input>
                </Form-item>
                <Form-item label="昵称" prop="nickname">
                    <i-input :value.sync="registerUser.nickname" placeholder="请输入昵称"></i-input>
                </Form-item>
                <Form-item label="电子邮箱" prop="email">
                    <i-input :value.sync="registerUser.email" placeholder="请输入电子邮箱"></i-input>
                </Form-item>
                <Form-item label="检查地" prop="allCheckpoints">
                    <i-select :model.sync="registerUser.allCheckpoints" filterable multiple>
                        <i-option v-for="checkpoint in checkpoints" :value="checkpoint.id">
                            {{checkpoint.name}}
                        </i-option>
                    </i-select>
                </Form-item>
                <Form-item label="密码" prop="password">
                    <i-input :value.sync="registerUser.password" type="password" placeholder="请输入密码"></i-input>
                </Form-item>
                <Form-item label="用户角色" prop="roleId">
                    <i-select :model.sync="registerUser.roleId" disabled placeholder="请选择用户角色">
                        <i-option v-for="role in roles" :value="role.id">{{role.name}}</i-option>
                    </i-select>
                </Form-item>
                <Form-item label="性别" prop="sex">
                    <i-select :model.sync="registerUser.sex" placeholder="请选择用户性别">
                        <i-option value="MAN">男</i-option>
                        <i-option value="WOMAN">女</i-option>
                    </i-select>
                </Form-item>

                <i-button type="primary" long @click="register(registerUser)">注册</i-button>
            </i-form>
        </div>
        <div v-show="step == 1" style="margin-top: 120px">
            <p>
                恭喜你账号创建成功，一会你会收到我们发来的账号激活邮件，访问链接进行激活，账号即可开始使用！
                <a v-link="{path: '/login'}">去登录</a>
            </p>
        </div>
    </Card>
</template>

<script>
    import Config from '../../config';
    import {UsersResource, CheckUsernameResource} from '../../resources/index';
    import MD5 from 'md5';

    export default {
        data () {
            return {
                steps: ['用户注册', '注册结果'],
                props: ['isOpen'],
                user: {},
                isOpen: false,
                step: 0,
                userId: 10,
                systemName: Config.SYSTEM_NAME,
                registerUser: {
                    allCheckpoints: [],
                    roleId: 3
                },
                checkpoints: Config.CHECKPOINTS,
                roles: Config.ROLES,
                rules: {
                    email: [{
                        required: true,
                        type: 'email',
                        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                        message: '请填写正确的邮箱地址',
                        trigger: 'blur'
                    }],
                    username: [{required: true, message: '请填写用户名', trigger: 'blur'}],
                    nickname: [{required: true, min: 2, max: 20, message: '请填写昵称，最短2个字符，最长20个字符', trigger: 'blur'}],
                    password: [{required: true, min: 6, max: 20, message: '请填写密码，长度为6~20', trigger: 'blur'}],
                    roleId: [{required: true, type: 'number', message: '请选择用户角色', trigger: 'blur'}]
                }
            };
        },
        methods: {
            checkUsername (username) {
                CheckUsernameResource.get({username: username})
                    .then(response => {
                        if (response.json().data) {
                            this.$Message.success('当前用户名可以用');
                        } else {
                            this.$Message.error('用户名相同，请更换用户名');
                        }
                    });
            },
            register (user) {
                this.$refs['registeruser'].validate(valid => {
                    if (valid) {
                        CheckUsernameResource.get({username: user.username})
                            .then(response => {
                                if (!response.json().data) {
                                    this.$Message.error('用户名相同，请更换用户名');
                                } else {
                                    this.isRegisterOpen = false;
                                    this.$Modal.info({content: Config.MSG_SUBMITTING});
                                    user.password = MD5(user.password);
                                    let checkpoints = [];
                                    for (let c in user.allCheckpoints) {
                                        let checkpoint = {checkpointId: c};
                                        checkpoints.push(checkpoint);
                                    }
                                    user.allCheckpoints = checkpoints;
                                    UsersResource.save(user)
                                        .then(response => {
                                            this.userId = response.json().data.user.id;
                                            this.step++;
                                            console.log('step:' + this.step);
                                            this.$Modal.remove();
                                            this.registerUser = {};
                                        }, () => {
                                            this.$Modal.remove();
                                        });
                                }
                            });
                    }
                });
            }
        }
    };
</script>
