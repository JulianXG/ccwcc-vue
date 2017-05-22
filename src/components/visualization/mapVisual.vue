<template>
    <div id="map" class="map"></div>
</template>

<script>
    import echarts from 'echarts';
    import BMap from 'echarts/dist/extension/bmap';
    import {CheckpointBrief} from '../../resources';
    import Config from '../../config';

    export default {
        data () {
            return {
                mapChart: null
            };
        },
        methods: {
            renderMap (data) {
                this.mapChart.setOption({
                    animation: false,
                    bmap: {
                        zoom: 6,
                        roam: true
                    },
                    visualMap: {
                        show: false,
                        top: 'top',
                        min: 0,
                        max: 5,
                        seriesIndex: 0,
                        calculable: true,
                        inRange: {
                            color: ['blue', 'blue', 'green', 'yellow', 'red']
                        }
                    },
                    series: [{
                        type: 'heatmap',
                        coordinateSystem: 'bmap',
                        data: data,
                        pointSize: 5,
                        blurSize: 6
                    }]
                });
                let bmap = this.mapChart.getModel().getComponent('bmap').getBMap();
                bmap.addControl(new BMap.MapTypeControl());
            },
            getCheckpoint () {
                CheckpointBrief.get()
                    .then(response => {
                        if (response.json().code === Config.CODE_SUCCESS) {
                            let checkpoints = response.json().data;
                            this.handleCheckpoint(checkpoints);
                        }
                    });
            },
            handleCheckpoint (data) {
                console.log(data);
                let points = [];
                data.forEach(element => {
//                    for (let i = 0; i < 100; i++) {
//                        let x = element.latitude + Math.random() * i;
//                        let y = element.longitude + Math.random() * i;
//                    }
                    points.push(
    //                        name: element.name,
    //                        value: [element.latitude, element.lontitude, parseInt(Math.random() * 1000)]
                        [x, y, parseInt(Math.random() * 1000)]
                    );
                });
                console.log(points);
                this.renderMap(points);
            }
        },
        ready () {
            this.mapChart = echarts.init(document.getElementById('map'));
            this.getCheckpoint();
        }
    };
</script>

<style>
    .map {
        height:480px;
        width:100%;
    }
</style>
