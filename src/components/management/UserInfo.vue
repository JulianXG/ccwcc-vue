<template>
    <div>
        <!-- 模态弹出窗内容 -->
        <div class="modal fade" id="userInfo" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
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
                                    <input id="userName" class="form-control" type="text" value="{{user.userName}}" placeholder="请输入用户名">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="nickname" class="col-xs-2 control-label">昵称</label>
                                <div class="col-xs-5">
                                    <input id="nickname" v-model="currentUser.nickname" class="form-control" type="text" value="{{user.nickname}}" placeholder="请输入昵称">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="nickname" class="col-xs-2 control-label">权限
                                    <span data-toggle="tooltip" data-placement="right"
                                          title="注:233为管理员，100为普通人员" class="glyphicon glyphicon-exclamation-sign"></span>
                                </label>
                                <div class="col-xs-3">
                                    <input class="form-control" v-model="currentUser.permission" type="number" value="{{user.permission}}" placeholder="请输入权限">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="checkPoint" class="col-xs-2 control-label">检查地</label>
                                <div class="col-xs-5">
                                    <input id="checkPoint" v-model="currentUser.checkPoint" class="form-control" type="text" value="{{user.checkPoint}}" placeholder="请输入检查地">
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" @click="updateUser(currentUser,user.id)" class="btn btn-primary" data-dismiss="modal">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {updateUser, addUser} from './actions';

    export default{
        data () {
            return {
                currentUser: {
                    nickname: '',
                    permission: '',
                    checkPoint: '',
                    password: ''
                }
            };
        },
        props: ['user'],
        vuex: {
            actions: {updateUser, addUser}
        }
    };
</script>
