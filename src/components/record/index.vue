<template>
    <div class="row">
        <!--附加导航，左侧边栏-->
        <div id="sidebar" data-spy="affix">
            <div class="col-xs-2">
                <ul class="nav nav-tabs nav-stacked">
                    <li v-for="tab in tabs" :class="{'active':tab.isActive}">
                        <a v-link="tab.path" @click="toggleTab($index)">{{tab.name}}</a>
                    </li>
                </ul>
            </div>
        </div>

        <router-view class="col-xs-9"></router-view>
    </div>
</template>

<script>
    import {toggleTab} from '../common/actions';

    export default{
        data () {
            return {
                tabs: [
                    {isActive: true, path: '/index/record/bird', name: '鸟类数据'},
                    {isActive: false, path: '/index/record/flag', name: '旗标数据'}
                ]
            };
        },
        methods: {
            toggleTab
        }
    };
</script>

<style>
    #sidebar{
        margin-top:20px;
        margin-left:20px;
    }
    /* Custom Styles */
    ul.nav-tabs{
        width: 140px;
        margin-top: 20px;
        border-radius: 4px;
        border: 1px solid #ddd;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);
    }
    ul.nav-tabs li{
        margin: 0;
        border-top: 1px solid #ddd;
    }
    ul.nav-tabs li:first-child{
        border-top: none;
    }
    ul.nav-tabs li a{
        margin: 0;
        padding: 8px 16px;
        border-radius: 0;
    }
    ul.nav-tabs li.active a, ul.nav-tabs li.active a:hover{
        color: #fff;
        background: #0088cc;
        border: 1px solid #0088cc;
    }
    ul.nav-tabs li:first-child a{
        border-radius: 4px 4px 0 0;
    }
    ul.nav-tabs li:last-child a{
        border-radius: 0 0 4px 4px;
    }
    ul.nav-tabs.affix{
        top: 30px; /* Set the top position of pinned element */
    }
</style>
