<template>
    <p>鸟种记录数据查询</p>
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
            <i-button type="primary" @click="search(timeRange,  keyword, 1)" style="margin-left: 8px;">搜索</i-button>
        </i-col>
    </Row>

    <i-button type="success" icon="archive" size="large"
              style="margin-top: 16px" @click="download(timeRange, keyword)">将搜索结果导出为Excel表</i-button>

    <i-table :columns="columns" :data="data" stripe border
             style="margin-top: 16px; margin-bottom: 8px"></i-table>
    <Page :total="total" :current="current" @on-change="changePage"></Page>
</template>

<script>
    import {SearchResource} from '../resources';
    import API from '../resources/ServerAPI';

    export default {
        data () {
            return {
                self: this,
                keyword: '',
                data: [],
                current: 1,
                pageSize: 10,
                total: 10,
                timeRange: [],
                columns: [
                    {title: '鸟种名称', key: 'name'}
                ],
                options: {
                    shortcuts: [
                        {
                            text: '近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30 * 3);
                                return [start, end];
                            }
                        },
                        {
                            text: '近六个月',
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
            search (timeRange, keyword, page) {
                this.$Loading.start();
                let body = {keyword: keyword};
                if (timeRange.length !== 0) {
                    body.startTime = timeRange[0].toLocaleString();
                    body.endTime = timeRange[1].toLocaleString();
                }
                SearchResource.save({page: page, pageSize: this.pageSize}, body)
                    .then(response => {
                        let rows = response.json().data.rows;
                        if (rows !== null) {
                            let time = rows[0].timeRange;
                            this.columns = [
                                {title: '鸟种名称', key: 'name'}
                            ];
                            time.forEach(element => {
                                this.columns.push({title: element, key: element});
                            });
                            this.data = rows.slice(1);
                            this.total = response.json().data.total;
                        } else {
                            this.data = [];
                        }
                        this.$Loading.finish();
                    }, () => {
                        this.$Loading.error();
                    });
            },
            download (timeRange, keyword) {
                let url = API.RECORD_DOWNLOAD_RESOURCE + '?keyword=' + keyword;
                if (timeRange.length !== 0) {
                    let startTime = timeRange[0].toLocaleString();
                    let endTime = timeRange[1].toLocaleString();
                    url += '&startTime=' + startTime;
                    url += '&endTime=' + endTime;
                }
                url = encodeURI(url);
                console.log(url);
                // 直接在新标签中打开
                window.open(url);
            },
            changePage (page) {
                this.search(this.timeRange, this.keyword, page);
            }
        },
        ready () {
            this.changePage(1);
        }
    };
</script>
