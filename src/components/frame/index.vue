<template>
  <!--上方系统信息栏-->
    <Menu mode="horizontal" :theme="{{theme}}">
        <Row>
            <i-col span="22">
                <img class="frame-logo" src="../../assets/img/favicon.png">
                <span class="frame-system-name">{{systemName}}</span>
            </i-col>
            <i-col span="2">
                <Submenu key="1">
                    <template slot="title">
                        <Icon type="android-person"></Icon>{{user.nickname}}
                    </template>
                    <Menu-item key="1-1" @click="logout">退出登录</Menu-item>
                </Submenu>
            </i-col>
        </Row>
    </Menu>

    <!--左侧导航栏-->
    <Row>
        <i-col span="5">
            <Menu :theme="{{theme}}" active-key="1">
                <Menu-item key="1" v-link="/index/home">
                    <Icon type="home"></Icon>首页
                </Menu-item>
                <Menu-group title="数据收集">
                    <Menu-item key="2" v-link="/index/dc/bird">
                        <Icon type="android-list"></Icon>鸟类数据
                    </Menu-item>
                    <Menu-item key="3" v-link="/index/dc/flag">
                        <Icon type="flag"></Icon>旗标数据
                    </Menu-item>
                </Menu-group>
                <Menu-group title="数据统计">
                    <Menu-item key="4" v-link="/index/statistics">
                        <Icon type="stats-bars"></Icon>近期统计
                    </Menu-item>
                </Menu-group>
                <Menu-group title="数据列表">
                    <Menu-item key="5">
                        <Icon type="search"></Icon>快捷查询
                    </Menu-item>
                    <Menu-item key="6">
                        <Icon type="document-text"></Icon>鸟种数据
                    </Menu-item>
                    <Menu-item key="7">
                        <Icon type="document-text"></Icon>鸟类记录
                    </Menu-item>
                    <Menu-item key="7">
                        <Icon type="flag"></Icon>旗标记录
                    </Menu-item>
                </Menu-group>
                <Menu-group title="用户管理">
                    <Menu-item key="6" v-link="/index/management">
                        <Icon type="android-person"></Icon>新增用户
                    </Menu-item>
                </Menu-group>
            </Menu>
        </i-col>
        <i-col span="19">
            <router-view keep-alive></router-view>
        </i-col>
    </Row>
    <footer-bar></footer-bar>
</template>

<script>
    import FooterBar from '../common/FooterBar';
    import {logout} from '../login/actoins';
    import {getUser} from '../../vuex/getters';

    export default{
        components: {FooterBar},
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
        ready () {
            document.title = this.systemName;
        }
    };
</script>

<style>
    .frame-logo {
        vertical-align: middle;
    }
    .frame-system-name {
        text-align: center;
        margin-left: 8px;
        font-size: 20px;
    }
</style>
