/**
 * Created by Kalyter on 2017-4-27 0027.
 * 配置文件
 */
export default {
    CODE_SUCCESS: 200,
    CODE_NO_PERMISSION: 403,
    CODE_USERNAME_EXISTS: 404,
    COOKIE_NICKNAME: 'user',
    COOKIE_TOKEN: 'token',
    COOKIE_CHECKPOINT: 'checkpoint',
    ROLES: [
        {id: 3, name: '普通用户'},
        {id: 2, name: '管理员'},
        {id: 1, name: '超级管理员'}
    ],
    CHECKPOINTS: [
        {id: 0, name: '所有检查点'},
        {id: 1, name: '辽宁丹东鸭绿江口'},
        {id: 2, name: '辽宁盘锦双台子河口'},
        {id: 3, name: '天津'},
        {id: 4, name: '河北沧州'},
        {id: 5, name: '山东黄河三角洲'},
        {id: 6, name: '连云港'},
        {id: 7, name: '江苏如东'},
        {id: 8, name: '上海南汇东滩'},
        {id: 9, name: '福建泉州湾'},
        {id: 10, name: '广东海丰鸟类自然保护区'},
        {id: 11, name: '广东深圳'},
        {id: 12, name: '香港米埔和后海湾'}
    ],
    getCheckpoint (id) {
        if (id !== '') {
            return this.CHECKPOINTS.filter(element => {
                if (element.id === parseInt(id)) {
                    return true;
                }
            })[0].name;
        }
    },
    MSG_SUBMITTING: '正在向服务器提交数据……',
    MSG_SUBMIT_SUCCESS: '提交成功',
    MSG_SUBMIT_ERROR: '提交失败，请重试',
    MSG_VALIDATE_ERROR: '表单验证失败！',
    MSG_SUCCESS: '操作成功',
    MSG_LOADING: '正在加载中……'
};
