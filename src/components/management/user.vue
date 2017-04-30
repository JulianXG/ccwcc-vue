<template>
    <div>
        <i-button type="primary" @click="isAddOpen = true">新增用户</i-button>
        <i-table :content="self" :data="data" border
                 style="width:100%;margin: 8px 0;" :columns="columns" stripe></i-table>
        <Page :total="total" :current="current"
              @on-change="changePage"
              @on-page-size-change="changePageSize"></Page>

        <Modal :visible.sync="isAddOpen" title="添加用户" :mask-closable="false"
               :scrollable="true" @on-ok="addUser(user)">
            <i-form v-ref:user :model="user" :rules="addUserRules" :label-width="80">
                <Form-item label="用户名" prop="username">
                    <i-input :value.sync="user.username" placeholder="请输入用户名"></i-input>
                </Form-item>
                <Form-item label="昵称" prop="nickname">
                    <i-input :value.sync="user.nickname" placeholder="请输入昵称"></i-input>
                </Form-item>
                <Form-item label="密码" prop="password">
                    <i-input :value.sync="user.password" type="password" placeholder="请输入密码"></i-input>
                </Form-item>
                <Form-item label="用户角色" prop="roleId">
                    <i-select :model.sync="user.roleId" placeholder="请选择用户角色">
                        <i-option v-for="role in roles" :value="role.id">{{role.name}}</i-option>
                    </i-select>
                </Form-item>
                <Form-item label="性别" prop="sex">
                    <i-select :model.sync="user.sex" placeholder="请选择用户性别">
                        <i-option value="MAN">男</i-option>
                        <i-option value="WOMAN">女</i-option>
                    </i-select>
                </Form-item>
            </i-form>
        </Modal>

        <Modal :visible.sync="isEditOpen" title="编辑" :mask-closeable="false" :loading="editLoading"
               :scrollable="true" @on-ok="edit(user)">
            <i-form v-ref:user :model="user" :rules="editUserRules" :label-width="80">
                <Form-item label="用户名" prop="username">
                    <i-input :value.sync="user.username" disabled placeholder="请输入用户名"></i-input>
                </Form-item>
                <Form-item label="昵称" prop="nickname">
                    <i-input :value.sync="user.nickname" placeholder="请输入昵称"></i-input>
                </Form-item>
                <Form-item label="用户角色" prop="roleId">
                    <i-select :model.sync="user.roleId" placeholder="请选择用户角色">
                        <i-option v-for="role in roles" :value="role.id">{{role.name}}</i-option>
                    </i-select>
                </Form-item>
                <Form-item label="性别" prop="sex">
                    <i-select :model.sync="user.sex" placeholder="请选择用户性别">
                        <i-option value="MAN">男</i-option>
                        <i-option value="WOMAN">女</i-option>
                    </i-select>
                </Form-item>
                <Form-item label="QQ" prop="qq">
                    <i-input :value.sync="user.qq" placeholder="请输入QQ"></i-input>
                </Form-item>
                <Form-item label="手机号码" prop="tel">
                    <i-input :value.sync="user.tel" placeholder="请输入手机号码"></i-input>
                </Form-item>
                <Form-item label="电子邮箱" prop="email">
                    <i-input :value.sync="user.email" placeholder="请输入邮箱地址"></i-input>
                </Form-item>
            </i-form>
        </Modal>

    </div>
</template>

<script>
    import {UserPaginationResource, UsersResource, DeleteUserResource} from '../../resources/index';
    import Config from '../../config';
    import MD5 from 'md5';

    export default{
        data () {
            return {
                self: this,
                isAddOpen: false,
                isEditOpen: false,
                addUserLoading: true,
                editLoading: true,
                columns: [
                    {
                        title: '用户名',
                        key: 'username',
                        fixed: 'left',
                        width: 100
                    },
                    {
                        title: '昵称',
                        key: 'nickname',
                        width: 100
                    },
                    {
                        title: '角色',
                        key: 'roleId',
                        width: 100,
                        render (row) {
                            let role = '';
                            let roles = Config.ROLES;
                            for (let i = 0; i < roles.length; i++) {
                                let element = roles[i];
                                if (element.id === row.roleId) {
                                    role = element.name;
                                    break;
                                }
                            }
                            return role;
                        }
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        width: 60,
                        render (row) {
                            let sex;
                            if (row.sex === 'MAN') {
                                sex = '男';
                            } else if (row.sex === 'WOMAN') {
                                sex = '女';
                            } else {
                                sex = '';
                            }
                            return sex;
                        }
                    },
                    {
                        title: 'QQ',
                        key: 'qq'
                    },
                    {
                        title: '手机号码',
                        key: 'tel',
                        width: 120
                    },
                    {
                        title: '电子邮箱',
                        key: 'email',
                        width: 120
                    },
                    {
                        title: '上次登录时间',
                        key: 'lastLoginTime',
                        width: 120,
                        render (row) {
                            if (row.lastLoginTime === null) {
                                return '未登录过';
                            } else {
                                return new Date(row.lastLoginTime).toLocaleDateString();
                            }
                        }
                    },
                    {
                        title: '登录次数',
                        key: 'loginCount',
                        render (row) {
                            let count = row.loginCount === null ? 0 : row.loginCount;
                            return `<Tag type="border">${count}</Tag>`;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render (row) {
                            return `<i-button type="primary" size="small" @click="openEdit(${row.id})">编辑</i-button>
                                    <i-button type="error" size="small" @click="remove(${row.id})">删除</i-button>`;
                        }
                    }
                ],
                total: 0,
                pageSize: 10,
                current: 1,
                data: [],
                user: {},
                roles: Config.ROLES,
                checkpoints: Config.CHECKPOINTS,
                addUserRules: {
                    username: [{required: true, message: '请填写用户名', trigger: 'blur'}],
                    nickname: [{required: true, min: 2, max: 20, message: '请填写昵称，最短2个字符，最长20个字符', trigger: 'blur'}],
                    password: [{required: true, min: 6, max: 20, message: '请填写密码，长度为6~20', trigger: 'blur'}],
                    roleId: [{required: true, type: 'number', message: '请选择用户角色', trigger: 'blur'}]
                },
                editUserRules: {
                    email: [{required: false, type: 'email', min: 6, max: 20, message: '请填写正确的邮箱地址', trigger: 'blur'}],
                    nickname: [{required: true, message: '请填写昵称', trigger: 'blur'}],
                    tel: [{required: false, pattern: /^1[34578]\d{9}$/, message: '请填写正确的手机号码', trigger: 'blur'}],
                    qq: [{required: false, pattern: /^\d{5,10}$/, message: '请填写正确的QQ号码', trigger: 'blur'}],
                    roleId: [{required: true, type: 'number', message: '请选择用户角色', trigger: 'blur'}]
                }
            };
        },
        methods: {
            changePage (page) {
                this.refreshPage(page, this.pageSize);
            },
            changePageSize (pageSize) {
                this.pageSize = pageSize;
            },
            openEdit (id) {
                this.$Message.info(Config.MSG_LOADING);
                this.$Loading.start();
                UsersResource.get({id: id})
                    .then(response => {
                        this.user = response.json().data.result;
                        this.isEditOpen = true;
                        this.$Loading.finish();
                    }, () => this.$Loading.error());
            },
            edit (user) {
                this.$refs['user'].validate(valid => {
                    if (valid) {
                        this.editLoading = false;
                        this.$Modal.info({content: Config.MSG_SUBMITTING});
                        UsersResource.save({id: user.id}, user)
                            .then(() => {
                                this.editLoading = false;
                                this.isEditOpen = false;
                                this.$Message.success(Config.MSG_SUBMIT_SUCCESS);
                                this.$Modal.remove();
                                this.refreshPage(1, this.pageSize);
                            }, () => this.$Modal.remove());
                    } else {
                        setInterval(() => {
                            this.editLoading = true;
                        }, 50);
                    }
                });
                this.user = {};
            },
            remove (id) {
                this.$Modal.confirm({
                    content: '确认删除？',
                    onOk: () => {
                        DeleteUserResource.get({id: id})
                            .then(() => {
                                this.$Message.success(Config.MSG_SUCCESS);
                                this.refreshPage(1, this.pageSize);
                            });
                    }
                });
            },
            refreshPage (page, pageSize) {
                this.$Message.loading('正在加载中...');
                this.$Loading.start();
                UserPaginationResource.get({page: page, pageSize: pageSize})
                    .then(response => {
                        this.$Message.destroy();
                        let data = response.json().data;
                        this.data = data.rows;
                        this.total = data.total;
                        this.pageSize = data.pageSize;
                        this.current = data.page;
                        this.$Loading.finish();
                    });
            },
            addUser (user) {
                this.$refs['user'].validate(valid => {
                    this.addUserLoading = false;
                    if (valid) {
                        this.isAddOpen = false;
                        this.$Modal.info({content: Config.MSG_SUBMITTING});
                        user.password = MD5(user.password);
                        UsersResource.save(user)
                            .then(response => {
                                if (response.json().code === Config.CODE_USERNAME_EXISTS) {
                                    this.$Message.error('新增用户失败，用户名已经存在');
                                } else {
                                    this.$Message.success('插入新用户成功');
                                    this.refreshPage(1, this.pageSize);
                                }
                                this.$Modal.remove();
                            }, () => {
                                this.$Modal.remove();
                            });
                    } else {
                        setInterval(() => {
                            this.addUserLoading = true;
                        }, 50);
                    }
                });
                this.user = {};
            }
        },
        ready () {
            this.refreshPage(1, this.pageSize);
        }
    };
</script>
