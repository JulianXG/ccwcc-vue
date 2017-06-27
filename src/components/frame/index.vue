<template>
    <div class="frame-body">
        <div class="content">
            <!--上方系统信息栏-->
            <Menu mode="horizontal" :theme="theme">
                <Row>
                    <i-col span="20">
                        <img class="frame-logo" src="../../assets/img/favicon.png">
                        <span class="frame-system-name">{{systemName}}</span>
                        <i-select :model.sync="checkpoint"
                                  style="margin-left: 8px;width: 240px;"
                                  @on-change="changeCheckpoint">
                            <i-option v-for="item in allCheckpoints" :value="item">
                                {{item}}
                            </i-option>
                        </i-select>
                    </i-col>
                    <i-col span="4">
                        <Submenu v-if="nickname" key="1">
                            <template slot="title">
                                <Icon type="android-person"></Icon>{{nickname}}，您好
                            </template>
                            <!--<Menu-item key="1-1">-->
                                <!--个人中心-->
                            <!--</Menu-item>-->
                            <Menu-item key="1-2" @click="logout">
                                退出登录
                            </Menu-item>
                        </Submenu>
                        <div v-else>
                            <i-button type="primary" shape="circle"
                                      @click="navigate({path:'/login/'})">
                                登录
                            </i-button>
                            <!--<i-button type="ghost" shape="circle">注册</i-button>-->
                        </div>
                    </i-col>
                </Row>
            </Menu>

            <!--左侧导航栏-->
            <Row>
                <i-col class="frame-sidebar" span="5">
                    <Menu :theme="theme" active-key="1" width="auto">
                        <Menu-item key="1" @click="navigate({path:'/index/home'})">
                            <Icon type="home"></Icon>首页
                        </Menu-item>
                        <Submenu key="2">
                            <template slot="title">
                                <Icon type="stats-bars"></Icon>数据统计
                            </template>
                            <Menu-item key="2-1" @click="navigate({path:'/index/visual/data'})">
                                数量统计
                            </Menu-item>
                            <!--<Menu-item key="2-2" @click="navigate({path: '/index/visual/map'})">-->
                                <!--地图数据-->
                            <!--</Menu-item>-->
                        </Submenu>
                        <Submenu key="3">
                            <template slot="title">
                                <Icon type="search"></Icon>数据查询和文件导出
                            </template>
                            <Menu-item key="3-1" @click="navigate({path: '/index/search'})">
                                快捷查询
                            </Menu-item>
                        </Submenu>
                        <!--<Submenu key="4">-->
                            <!--<template slot="title">-->
                                <!--<Icon type="archive"></Icon>文件导出-->
                            <!--</template>-->
                            <!--<Menu-item key="4-1">-->
                                <!--导出为表格-->
                            <!--</Menu-item>-->
                            <!--<Menu-item key="4-2">-->
                                <!--导出为PDF-->
                            <!--</Menu-item>-->
                        <!--</Submenu>-->
                        <!--<Submenu key="5">-->
                            <!--<template slot="title">-->
                                <!--<Icon type="android-list"></Icon>数据收集-->
                            <!--</template>-->
                            <!--<Menu-item key="5-1" @click="navigate({path:'/index/dc/birdRecord'})">-->
                                <!--鸟类记录-->
                            <!--</Menu-item>-->
                            <!--<Menu-item key="5-2" @click="navigate({path:'/index/dc/flag'})">-->
                                <!--旗标记录-->
                            <!--</Menu-item>-->
                        <!--</Submenu>-->
                        <Submenu key="8">
                            <template slot="title">
                                <Icon type="android-settings"></Icon>管理中心
                            </template>
                            <Menu-item key="8-1" @click="navigate({path:'/index/management/user'})">
                                用户管理
                            </Menu-item>
                            <Menu-item key="8-2" @click="navigate({path:'/index/management/bird'})">
                                鸟种数据
                            </Menu-item>
                            <Menu-item key="8-3" @click="navigate({path:'/index/management/birdRecord'})">
                                鸟类记录
                            </Menu-item>
                            <Menu-item key="8-4" @click="navigate({path:'/index/management/flag'})">
                                旗标记录
                            </Menu-item>
                            <!--<Menu-item key="8-5">-->
                                <!--检查地管理-->
                            <!--</Menu-item>-->
                        </Submenu>
                    </Menu>
                </i-col>
                <i-col span="18" offset="1">
                    <Card class="card-content">
                        <router-view keep-alive></router-view>
                    </Card>
                </i-col>
            </Row>
        </div>
        <Back-top></Back-top>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import FooterBar from './FooterBar';
    import Util from '../../util';
    import Config from '../../config';

    export default{
        components: {FooterBar},
        data () {
            return {
                theme: 'light',
                systemName: Config.SYSTEM_NAME,
                checkpoint: '',
                nickname: '',
                allCheckpoints: []
            };
        },
        ready () {
            let checkpointName = Config.getCheckpointName(Util.getCookie(Config.COOKIE_CHECKPOINT));
            let nickname = Util.getCookie(Config.COOKIE_NICKNAME);
            this.checkpoint = checkpointName;
            this.nickname = nickname;
            let json = JSON.parse(Util.getCookie(Config.COOKIE_ALL_CHECKPOINT));
            this.allCheckpoints = Util.getCheckpoints(json);
            document.title = this.systemName;
        },
        methods: {
            navigate (config) {
                this.$router.go(config);
            },
            logout () {
                Util.deleteCookie(Config.COOKIE_CHECKPOINT);
                Util.deleteCookie(Config.COOKIE_NICKNAME);
                Util.deleteCookie(Config.COOKIE_TOKEN);
                this.$router.go('/login');
            },
            changeCheckpoint (value) {
                let checkpointId = Config.parseCheckpoint(value);
                Util.setCookie(Config.COOKIE_CHECKPOINT, checkpointId);
            }
        }
    };
</script>
