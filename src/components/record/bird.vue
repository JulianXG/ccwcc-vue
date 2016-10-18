<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <form class="form-horizontal" role="form">
                <!--鸟种编号-->
                <div class="form-group">
                    <label class="col-xs-2 control-label">鸟种编号
                        <span data-toggle="tooltip" data-placement="right" title="{{tooltip.code}}" class="glyphicon glyphicon-exclamation-sign"></span>
                    </label>
                    <div class="col-xs-5">
                        <input v-model="bird.code" type="text" class="form-control" placeholder="请输入鸟种编号">
                    </div>
                </div>
                <!--鸟种数量-->
                <div class="form-group">
                    <label class="col-xs-2 control-label">鸟种数量</label>
                    <div class="col-xs-5">
                        <input v-model="bird.birdQuantity" type="text" class="form-control" placeholder="请输入鸟种鸟种数量">
                    </div>
                </div>
                <!--经纬度-->
                <div class="form-group">
                    <label class="col-xs-2 control-label">经度</label>
                    <div class="col-xs-5">
                        <input v-model="bird.lat" type="text" class="form-control" placeholder="请输入经度">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-2 control-label">纬度</label>
                    <div class="col-xs-5">
                        <input v-model="bird.lon" type="text" class="form-control" placeholder="请输入纬度">
                    </div>
                </div>
                <!--位置-->
                <div class="form-group">
                    <label class="col-xs-2 control-label">位置</label>
                    <div class="col-xs-5">
                        <input v-model="bird.position" type="text" class="form-control" placeholder="请输入发现位置">
                    </div>
                </div>
                <!--天气-->
                <div class="form-group">
                    <label class="col-xs-2 control-label">天气</label>
                    <div class="col-xs-5">
                        <input v-model="bird.weather" type="text" class="form-control" placeholder="请输入发现时的天气">
                    </div>
                </div>
                <!--日期-->
                <div class="form-group">
                    <label class="col-xs-2 control-label">日期
                        <span data-toggle="tooltip" data-placement="right" title="{{tooltip.datetime}}" class="glyphicon glyphicon-exclamation-sign"></span>
                    </label>
                    <div class="col-xs-5">
                        <input v-model="bird.datetime" type="text" class="form-control" placeholder="请输入日期">
                    </div>
                </div>

                <button @click="addBird(bird)" @keydown.enter="addBird(bird)" class="col-sm-offset-1 btn btn-primary" type="submit">增加</button>
            </form>
        </div>

    </div>
</template>

<script>
    import {addBird} from './actions';
    export default{
        data () {
            return {
                tooltip: {
                    code: '如：0064#对应栗树鸭',
                    datetime: '如其格式如：2016-1-1 1:11:11'
                },
                bird: {
                    code: '',
                    quantity: '',
                    lat: '',
                    lon: '',
                    position: '',
                    detail: '',
                    weather: '',
                    datetime: '',
                    recordIndex: ''
                }
            };
        },
        ready () {
            $('[data-toggle = tooltip]').tooltip();
        },
        vuex: {
            actions: {addBird}
        }
    };
</script>

<style>
    .panel{
        margin-top:20px;
    }
</style>
