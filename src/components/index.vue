<template>
    <div>
        <router-view keep-alive></router-view>
        <nav-bar :system-name="systemName"></nav-bar>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import NavBar from './common/NavBar';
    import FooterBar from './common/FooterBar';

    export default{
        data () {
            return {
                systemName: '中国水鸟调查后台管理系统'
            };
        },
        components: { NavBar, FooterBar },
        ready () {
            document.title = this.systemName;
        }
    };
</script>
