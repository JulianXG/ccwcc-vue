<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                        <span class="sr-only">切换导航栏</span>
                        <span class="icon-bar" v-for="n in 3"></span>
                    </button>
                    <a v-link="{name: 'index'}" class="navbar-brand">后台管理系统</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <!--导航的tab选项卡-->
                        <li v-for="tab in tabs"
                            :class="{'active':tab.isActive}"
                            track-by="$index" @click="toggleTab($index)">
                            <a v-link="tab.path">{{tab.name}}</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">
                                <span class="glyphicon glyphicon-user"></span> {{user.nickname}}<span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="index.html#/index/user">用户中心</a></li>
                                <li role="separator" class="divider"></li>
                                <li @click="logoff"><a href="javascript:void(0)">退出</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import {logoff} from '../login/actoins';
    import {getUser} from '../../vuex/getters';
    import {toggleTab} from './actions';

    export default{
        data () {
            return {
                tabs: [
                    {isActive: true, path: '/index/home', name: '主页'},
                    {isActive: false, path: '/index/statistics', name: '统计'},
                    {isActive: false, path: '/index/record/bird', name: '数据录入'},
                    {isActive: false, path: '/index/management', name: '人员管理'}
                ]
            };
        },
        vuex: {
            getters: {
                user: getUser
            },
            actions: {logoff}
        },
        methods: {
            toggleTab
        }
    };
</script>

<style>

</style>
