<template>
    <div>
        <div>
            <!-- 模态弹出窗内容 -->
            <div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title">详细</h4>
                        </div>
                        <div class="modal-body">

                            <form class="form-horizontal" role="form">

                                <div class="form-group">
                                    <label for="userName" class="col-xs-2 control-label">用户名</label>
                                    <div class="col-xs-5">
                                        <input id="userName" v-model="user.userName" class="form-control" type="text" placeholder="请输入用户名">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="nickname" class="col-xs-2 control-label">昵称</label>
                                    <div class="col-xs-5">
                                        <input id="nickname" v-model="user.nickname" class="form-control" type="text" placeholder="请输入昵称">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-xs-2 control-label">密码</label>
                                    <div class="col-xs-5">
                                        <input id="password" v-model="user.password" class="form-control" type="password" placeholder="请输入密码">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="nickname" class="col-xs-2 control-label">权限
                                        <span data-toggle="tooltip" data-placement="right"
                                              title="注:233为管理员，100为普通人员" class="glyphicon glyphicon-exclamation-sign"></span>
                                    </label>
                                    <div class="col-xs-3">
                                        <input class="form-control" v-model="user.permission" type="number" placeholder="请输入权限">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="checkPoint" class="col-xs-2 control-label">检查地</label>
                                    <div class="col-xs-5">
                                        <input id="checkPoint" v-model="user.checkPoint" class="form-control" type="text" placeholder="请输入检查地">
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <button type="button" @click="addUser(user)" class="btn btn-primary" data-dismiss="modal">添加</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {addUser} from './actions';

    export default{
        data () {
            return {
                user: {
                    nickname: '',
                    userName: '',
                    permission: '',
                    checkPoint: '',
                    password: ''
                }
            };
        },
        vuex: {
            actions: {addUser}
        }
    };
</script>

<style>

</style>
