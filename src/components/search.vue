<template>
    <Row>
        <i-col :sm="10" :md="8" :lg="6">
            <i-input :value.sync="keyword" icon="ios-search"
                     placeholder="请输入关键词进行搜索记录"></i-input>
        </i-col>
        <i-col :sm="10" :md="8" :lg="6" offset="1">
            <Date-picker type="daterange" placement="bottom-end" :options="options"
                         :value.sync="timeRange" placeholder="选择搜索的日期范围"></Date-picker>
        </i-col>
        <i-col :sm="3" md="2" :lg="6">
            <i-button type="primary" @click="search(timeRange,  keyword)" style="margin-left: 8px;">搜索</i-button>
        </i-col>
    </Row>

    <i-button type="success" icon="archive" size="large" style="margin-top: 16px">将搜索结果导出为Excel表</i-button>

    <i-table :colunms="columns" :data="data" style="margin-top: 16px"></i-table>
</template>

<script>
    import {DownloadResource, SearchResource} from '../resources';

    export default {
        data () {
            return {
                keyword: '',
                data: [],
                current: 1,
                pageSize: 10,
                baseColumns: [
                    {title: '类别', key: 'category'},
                    {title: '鸟种名称', key: 'nameZh'}
                ],
                timeRange: [],
                columns: [],
                options: {
                    shortcuts: [
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近六个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 6);
                                return [start, end];
                            }
                        }
                    ]
                }
            };
        },
        methods: {
            search (timeRange, keyword) {
                let body = {
                    startTime: timeRange[0],
                    endTime: timeRange[1],
                    keyword: keyword
                };
                console.log(body);
                SearchResource.save({page: 1, pageSize: this.pageSize}, body)
                    .then(response => {
                        console.log(response);
                    });
            }
        }
    };
</script>
