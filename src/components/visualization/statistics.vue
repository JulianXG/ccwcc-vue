<template>
    <div id="timeCategoryChart" class="amountChart"></div>
    <div id="categoryTimeChart" class="amountChart"></div>
    <div id="barLineChart" class="amountChart"></div>
</template>

<script>
    import echarts from 'echarts';

    export default{
        data () {
            return {
                tcTitle: '时间鸟种数量',
                ctTitle: '鸟种时间数量',
                blTitle: '鸟种种数和数量',
                tcChart: null,
                ctChart: null,
                blChart: null
            };
        },
        methods: {
            renderBarChart (chart, title, legends, xAxis, data) {
                chart.setOption({
                    title: {text: title, left: 'left', padding: 8},
                    tooltip: {trigger: 'item'},
                    xAxis: [{type: 'category', data: xAxis}],
                    yAxis: [{type: 'value'}],
                    legend: {data: legends},
                    series: data
                });
            },
            renderBarLineChart () {
                this.blChart.setOption({
                    title: {text: this.blTitle, left: 'left', padding: 8},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {type: 'cross', crossStyle: {color: '#999'}}
                    },
                    legend: {
                        data: [
                            '雁鸭类',
                            '鹤鹳类',
                            '雁鸭类种数',
                            '鹤鹳类种数'
                        ]
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                            axisPointer: {type: 'shadow'}
                        }
                    ],
                    yAxis: [
                        {type: 'value', name: '数量', min: 0, interval: 50},
                        {type: 'value', name: '数量', min: 0, interval: 5}
                    ],
                    series: [
                        {
                            name: '雁鸭类',
                            type: 'bar',
                            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name: '鹤鹳类',
                            type: 'bar',
                            data: [2.3, 5.1, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                        },
                        {
                            name: '雁鸭类种数',
                            type: 'line',
                            yAxisIndex: 1,
                            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                        },
                        {
                            name: '鹤鹳类种数',
                            type: 'line',
                            yAxisIndex: 1,
                            data: [2.2, 2.5, 3.7, 4, 5.3, 6.2, 15.3, 20.4, 23.0, 16.5, 12.0, 6.2]
                        }
                    ]
                });
            },
            mockData (type) {
                let ctData = {
                    sections: [
                        '雁鸭类',
                        '鹤鹳类',
                        '秧鸡类',
                        '鸻鹬类',
                        '鸥类',
                        '海洋鸟类',
                        '鸬鹚类',
                        '鹭类',
                        '尚未归类'
                    ],
                    data: [
                        {name: '2016年', data: [700, 400, 500, 300, 500, 400, 400, 800, 100]},
                        {name: '2015年', data: [800, 440, 630, 340, 550, 550, 555, 930, 30]},
                        {name: '2014年', data: [780, 480, 570, 420, 570, 480, 532, 840, 55]}
                    ]
                };
                let tcData = {
                    sections: [
                        '2016年',
                        '2015年',
                        '2014年'
                    ],
                    data: [
                        {name: '雁鸭类', data: [700, 800, 780]},
                        {name: '鹤鹳类', data: [400, 440, 480]},
                        {name: '秧鸡类', data: [500, 630, 570]},
                        {name: '鸻鹬类', data: [300, 340, 420]},
                        {name: '鸥类', data: [500, 550, 570]},
                        {name: '海洋鸟类', data: [400, 550, 480]},
                        {name: '鸬鹚类', data: [512, 555, 532]},
                        {name: '鹭类', data: [800, 930, 840]},
                        {name: '尚未归类', data: [53, 30, 55]}
                    ]
                };
                if (type === 'tc') {
                    return tcData;
                } else if (type === 'ct') {
                    return ctData;
                }
            },
            refreshTimeCategory () {
                let data = this.mockData('tc');
                let xAxis = data.sections;
                let seriesList = [];
                let legends = [];
                data.data.forEach(element => {
                    let series = {};
                    series.name = element.name;
                    series.type = 'bar';
                    series.data = element.data;
                    seriesList.push(series);
                    legends.push(series.name);
                });
                this.renderBarChart(this.tcChart, this.tcTitle, legends, xAxis, seriesList);
            },
            refreshCategoryTime () {
                let data = this.mockData('ct');
                let xAxis = data.sections;
                let seriesList = [];
                let legends = [];
                data.data.forEach(element => {
                    let series = {};
                    series.name = element.name;
                    series.type = 'bar';
                    series.data = element.data;
                    seriesList.push(series);
                    legends.push(series.name);
                });
                this.renderBarChart(this.ctChart, this.ctTitle, legends, xAxis, seriesList);
            }
        },
        ready () {
            this.tcChart = echarts.init(document.getElementById('timeCategoryChart'));
            this.ctChart = echarts.init(document.getElementById('categoryTimeChart'));
            this.blChart = echarts.init(document.getElementById('barLineChart'));
            this.refreshTimeCategory();
            this.refreshCategoryTime();
            this.renderBarLineChart();
        }
    };
</script>

<style>
    .amountChart{
        height:400px;
        width:100%;
        padding-top:60px;
    }
</style>
