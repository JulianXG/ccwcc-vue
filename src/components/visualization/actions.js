/**
 * Created by Julian on 2016/9/4.
 */
import {CheckpointBrief} from '../../resources';

export function initCharts (chart) {
    //
    // StatisticsResource.get().then(response => {
    //     let titles = [];
    //     let species = [];
    //     let quantity = [];
    //     console.log(JSON.stringify(response.json()));
    //     if (response.json().status.code === 666) {
    //         let data = response.json().data;
    //         console.log(JSON.stringify(data));
    //         for (let i in data) {
    //             console.log(JSON.stringify(data[i]));
    //             titles.push(data[i].category);
    //             species.push(data[i].speciesCount);
    //             quantity.push(data[i].quantity);
    //         }
    //         console.log(JSON.stringify(titles));
    //         console.log(JSON.stringify(species));
    //         console.log(JSON.stringify(quantity));
    //         chart.setOption({
    //             xAxis: {data: titles},
    //             series: [
    //                 {name: '物种种类', data: species},
    //                 {name: '数量', data: quantity}
    //             ]
    //         });
    //     }
    // });
}

export function mockData (base = 10000) {
    return Math.random() * base;
}

export function getCheckpointBrief () {
    CheckpointBrief.get()
        .then(response => {
            this.checkpointBrief = response.json().data;
        });
}
