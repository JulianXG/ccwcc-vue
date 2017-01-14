<template>
    <div>

        <!--人员表格-->
        <div id="tableContainer" class="panel panel-default col-xs-12 col-sm-6 col-md-8 col-md-offset-2">
            <div class="panel-heading">所有人员列表</div>
            <div class="panel-body">
                <button @click="add" class="btn btn-success btn-sm" type="button" data-toggle="modal" data-target="#addUser">
                    <span class="glyphicon glyphicon-plus-sign"></span> 增加
                </button>
                <p></p>
                <p>下面展示的是所有的用户的所有资料，包括管理员。</p>

            </div>
            <user-info :user="selectedUser"></user-info>
            <add-user></add-user>

            <table class="table table-stripped table-hover">
                <tr>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>昵称</th>
                    <th>权限
                        <span data-toggle="tooltip"
                              data-placement="right"
                              title="注:233为管理员，100为普通人员"
                              class="glyphicon glyphicon-exclamation-sign"></span>
                    </th>
                    <th>检查地</th>
                    <th>操作</th>
                </tr>
                <tr v-for="user in users">
                    <td>{{user.id}}</td>
                    <td>{{user.userName}}</td>
                    <td>{{user.nickname}}</td>
                    <td>{{user.permission}}</td>
                    <td>{{user.checkPoint}}</td>
                    <td>
                        <button @click="edit($index)"
                                type="button" class="btn-primary btn btn-xs"
                                data-toggle="modal" data-target="#userInfo">
                            <span class="glyphicon glyphicon-pencil"></span> 编辑
                        </button>
                        <button @click="removeUser(user.id)"
                                type="button" class="btn-danger btn btn-xs">
                            <span class="glyphicon glyphicon-remove"></span> 删除
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import {initUsers, removeUser} from './actions';
    import {getUserList} from '../../vuex/getters';
    import UserInfo from './UserInfo.vue';
    import AddUser from './AddUser.vue';

    export default{
        data () {
            return {
                selectedUser: null
            };
        },
        components: {UserInfo, AddUser},
        vuex: {
            actions: {initUsers, removeUser},
            getters: {
                users: getUserList
            }
        },
        ready () {
            this.initUsers();
        },
        methods: {
            edit (userId) {
                this.selectedUser = this.users[userId];
            },
            add () {

            }
        }

    };
</script>

<style>
    #tableContainer{
        margin-top: 50px;
    }
</style>
