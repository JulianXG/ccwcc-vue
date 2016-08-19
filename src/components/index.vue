<template>
    <div>
        <nav-bar></nav-bar>
        <router-view></router-view>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import NavBar from './common/NavBar';
    import FooterBar from './common/FooterBar';

    export default{
        components: { NavBar,FooterBar }
    };
</script>

<style>
    html{
        position: relative;
        min-height:100%;
    }
</style>