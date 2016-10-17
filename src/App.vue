<template>
    <!--这里的App.vue是一个root级别的组件,所以特意制空,这是一个空的组件-->
    <!--是因为这是SPA,之后的所有渲染都是以这个组件为基础的-->
    <div>
        <router-view></router-view>
    </div>
</template>


<script>
    import store from './vuex/store';

    //根组件注册store
    export default{
        store,
    };
</script>