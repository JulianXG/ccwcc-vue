<template>
    <div>
        <nav-bar></nav-bar>
        <router-view keep-alive></router-view>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import NavBar from './common/NavBar';
    import FooterBar from './common/FooterBar';
    import {isLogin} from '../vuex/getters';
    import VueRouter from 'vue-router';

    export default{
        components: { NavBar,FooterBar },
        vuex: {
            getters: {
                isLogin
            }
        }
    };
</script>

<style>
    html{
        position: relative;
        min-height:100%;
    }
</style>