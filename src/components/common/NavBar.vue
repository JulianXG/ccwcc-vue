<template>
    <!--上方系统信息栏-->
    <Menu mode="horizontal" :theme="{{theme}}">
        <Row>
            <i-col span="18">
                <img src="../../assets/img/favicon.png">
                {{systemName}}
            </i-col>
            <i-col span="6">
                <Submenu key="1">
                    <template slot="title">
                        <Icon type="android-person"></Icon>
                        {{user.nickname}}
                    </template>
                    <Menu-item key="1-1" @click="logout">
                        退出登录
                    </Menu-item>
                </Submenu>
            </i-col>
        </Row>
    </Menu>

    <!--左侧导航栏-->
    <Row>
        <i-col span="8">
            <Menu :theme="{{theme}}" active-key="1">
                <Menu-item key="1" v-link="/index/home">
                    <Icon type="home"></Icon>
                    首页
                </Menu-item>
                <Menu-group title="数据收集">
                    <Menu-item key="2" v-link="/index/dc/bird">
                        <Icon type="android-list"></Icon>
                        鸟类数据
                    </Menu-item>
                    <Menu-item key="3" v-link="/index/dc/flag">
                        <Icon type="flag"></Icon>
                        旗标数据
                    </Menu-item>
                </Menu-group>
                <Menu-group title="数据可视化">
                    <Menu-item key="4" v-link="/index/statistics">
                        <Icon type="stats-bars"></Icon>
                        近期统计
                    </Menu-item>
                </Menu-group>
                <Menu-group title="用户管理">
                    <Menu-item key="5" v-link="/index/management">
                        <Icon type="android-person"></Icon>
                        新增用户
                    </Menu-item>
                </Menu-group>
            </Menu>
        </i-col>
        <div>这是测试的正文内容</div>
    </Row>
</template>

<script>
    import {logout} from '../login/actoins';
    import {getUser} from '../../vuex/getters';
    import {toggleTab} from './actions';

    export default{
        data () {
            return {
                theme: 'light',
                systemName: '中国水鸟调查后台管理系统'
            };
        },
        vuex: {
            getters: {
                user: getUser
            },
            actions: {logout}
        },
        methods: {
            toggleTab
        }
    };
</script>

<style>

</style>
