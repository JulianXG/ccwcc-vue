<template>
    <div>
        <div id="allChart" class=""></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import {initCharts} from './actions';

    export default{
        data () {
            return {
            };
        },
        vuex: {
            actions: {initCharts}
        },
        ready () {
            var allChart = echarts.init(document.getElementById('allChart'));
            initCharts(allChart);
        }
    };
</script>

<style>
    #allChart{
        height:400px;
        width:100%;
        padding-top:60px;
    }

</style>
