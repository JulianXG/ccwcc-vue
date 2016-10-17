/**
 * Created by Julian on 2016/9/4.
 */
import {StatisticsResource} from '../../resources';

export function initCharts(chart){

    chart.setOption({
        title: { text: '总统计情况图表' },
        tooltip: {},
        xAxis: {
            data: []
        },
        yAxis: {},
        legend: { data: ['物种种类','数量']},
        series: [
            {name: '物种种类', type: 'bar', data: []},
            {name: '数量', type: 'bar',data: []},
        ]
    });

    StatisticsResource.get().then(response =>{
        let titles = [];
        let species = [];
        let quantity = [];
        console.log(JSON.stringify(response.json()));
        if(response.json().status.code == 666) {
            let data = response.json().data;
            console.log(JSON.stringify(data));
            for(let i in data) {
                console.log(JSON.stringify(data[i]));
                titles.push(data[i].category);
                species.push(data[i].speciesCount);
                quantity.push(data[i].quantity);
            }
            console.log(JSON.stringify(titles));
            console.log(JSON.stringify(species));
            console.log(JSON.stringify(quantity));
            chart.setOption({
                xAxis: {data: titles},
                series: [
                    {name: '物种种类',data: species},
                    {name: '数量',data: quantity},
                ],
            });
        }
    });
};