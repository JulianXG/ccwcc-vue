<template>
    <div class="panel panel-default">
        <div class="panel-body">
            <form class="form-horizontal" role="form">
                <!--鸟种名称-->
                <div class="form-group">
                    <label class="col-xs-2 control-label">鸟种编码</label>
                    <div class="col-xs-5">
                        <input v-model="flag.code" type="text" class="form-control" placeholder="请输入鸟种编码">
                    </div>
                </div>
                <!--旗标颜色-->
                <div class="form-group">
                    <label class="col-xs-2 control-label">旗标颜色
                        <span data-toggle="tooltip" data-placement="right" title="{{tooltip.flagColor}}" class="glyphicon glyphicon-exclamation-sign"></span>
                    </label>
                    <div class="col-xs-2">
                        <input v-model="flag.flagColor" type="text" class="form-control" placeholder="旗标颜色">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-2 control-label">左胫彩环
                        <span data-toggle="tooltip" data-placement="right" title="{{tooltip.colorBands}}" class="glyphicon glyphicon-exclamation-sign"></span>
                    </label>
                    <div class="col-xs-2">
                        <input v-model="flag.leftBandsColor" type="text" class="form-control" placeholder="左胫彩环">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-2 control-label">右胫彩环
                        <span data-toggle="tooltip" data-placement="right" title="{{tooltip.colorBands}}" class="glyphicon glyphicon-exclamation-sign"></span>
                    </label>
                    <div class="col-xs-2">
                        <input v-model="flag.rightBandsColor" type="text" class="form-control" placeholder="右胫彩环">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-xs-2 control-label">旗标编码</label>
                    <div class="col-xs-5">
                        <input v-model="flag.flagCode" type="text" class="form-control" placeholder="请输入鸟种旗标编码">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-2 control-label">发现时间
                        <span data-toggle="tooltip" data-placement="right" title="{{tooltip.datetime}}" class="glyphicon glyphicon-exclamation-sign"></span></label>
                    <div class="col-xs-5">
                        <input v-model="flag.discoveredTime" type="text" class="form-control" placeholder="请输入鸟种发现时间">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-2 control-label">旗标备注</label>
                    <div class="col-xs-5">
                        <input v-model="flag.note" type="text" class="form-control" placeholder="请输入鸟种旗标备注">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-xs-2 control-label">发现人</label>
                    <div class="col-xs-5">
                        <input v-model="flag.observer" type="text" class="form-control" placeholder="请输入鸟种发现人">
                    </div>
                </div>

                <button @click="addFlag(flag)" @keydown.enter="addFlag(flag)" class="col-sm-offset-1 btn btn-primary" type="submit">添加</button>
            </form>
        </div>

    </div>
</template>

<script>
    import {addFlag} from './actions';

    export default{
        data () {
            return {
                tooltip: {
                    colorBands: '填写对应颜色颜色单词的首字母：l=Lime Green band石灰绿环；g=Green band绿环；r=Red band红环；b=Blue band蓝环;y=Yellowband黄环；w=White band白环；',
                    flagColor: 'B=Black Flag黑旗标；O=Orange Flag 橙旗标；W=White flag白旗标；Y=Yellow flag黄旗标；R=Red flag红旗标；G=Green flag绿旗标',
                    datetime: '如其格式如：2016-1-1 1:11:11'
                },
                flag: {
                    code: '',
                    flagColor: '',
                    leftBandsColor: '',
                    rightBandsColor: '',
                    flagCode: '',
                    discoveredTime: '',
                    note: '',
                    observer: ''
                }
            };
        },
        vuex: {
            actions: {addFlag}
        },
        ready () {
            $('[data-toggle = tooltip]').tooltip();
        }
    };
</script>

<style>

</style>
