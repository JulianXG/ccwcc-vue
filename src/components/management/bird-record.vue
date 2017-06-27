<template>
    <Breadcrumb style="padding: 8px;">
        <Breadcrumb-item>{{title}}</Breadcrumb-item>
    </Breadcrumb>
    <i-form v-ref:record :model="record"
            :rules="rules" :label-width="90">
        <Form-item label="鸟种和数量" prop="birds">
            <Row>
                <i-col span="4" v-for="(index, bird) in record.birds" style="margin-right: 8px">
                    <Card>
                        <p slot="title">{{index + 1}}</p>
                        <a slot="extra" @click="clearBird(record, index)">
                            <Icon type="close-round"></Icon>
                        </a>
                        <i-select :model.sync="bird.id" filterable clearable
                                  placeholder="所搜关键字">
                            <i-option v-for="item in briefBirds"
                                      :value="item.id">{{item.nameZh}}</i-option>
                        </i-select>
                        <Input-number :min="1" :value.sync="bird.count"></Input-number>
                    </Card>
                </i-col>
                <i-col span="2">
                    <i-button icon="ios-plus-empty" @click="addBird(record)"
                              type="dashed">添加</i-button>
                </i-col>
            </Row>
        </Form-item>
        <Form-item label="检查地" prop="checkpointId">
            <i-select :model.sync="record.checkpointId" placeholder="请选择检查地" style="width: 200px;">
                <i-option v-for="checkpoint in checkpoints" :value="checkpoint.id">{{checkpoint.name}}</i-option>
            </i-select>
        </Form-item>
        <Form-item label="记录时间" prop="recordTime">
            <Date-picker type="datetime" placeholder="选择记录日期和时间"
                         :value="record.recordTime"
                         style="width: 216px;" format="yyyy-MM-dd HH:mm:ss"></Date-picker>
        </Form-item>
        <Form-item label="天气" prop="weather">
            <i-input :value.sync="record.weather" placeholder="请填写天气"
                     style="width: 400px;"></i-input>
        </Form-item>
        <Form-item label="记录详情" prop="detail">
            <i-input type="textarea" placeholder="请填写记录详情"
                     :value.sync="record.detail" :rows="4"
                     style="width: 400px;"></i-input>
        </Form-item>
        <Form-item>
            <i-button type="primary" @click="save('record')">保存</i-button>
        </Form-item>
    </i-form>
</template>

<script>
    import {BirdRecordResource, BirdBriefResource} from '../../resources/index';
    import Config from '../../config';
    import Util from '../../util';

    export default{
        data () {
            return {
                title: '添加鸟类记录',
                record: {
                    birds: [],
                    checkpointId: null,
                    detail: '',
                    weather: '',
                    recordTime: new Date()
                },
                checkpoints: Config.CHECKPOINTS,
                briefBirds: [],
                rules: {
                    birds: [{required: true, type: 'array', message: '至少选择一个鸟种', trigger: 'change'}],
                    checkpointId: [{required: true, type: 'number', message: '必须选择检查地', trigger: 'blur'}],
                    recordTime: [{required: true, type: 'date', trigger: 'change'}]
                }
            };
        },
        methods: {
            save (record) {
                this.$refs[record].validate((valid) => {
                    if (valid) {
                        this.$Modal.info({content: '正在向服务器提交数据……'});
                        let recordCopy = JSON.parse(JSON.stringify(this.record));
                        recordCopy.recordTime = Util.formatDate(this.record.recordTime);
                        console.log(recordCopy);
                        BirdRecordResource.save(JSON.stringify(recordCopy))
                            .then(response => {
                                this.$Message.success('提交成功，成功插入' +
                                    response.json().data + '条数据');
                                this.$refs[record].resetFields();
                                this.$Modal.remove();
                            }, () => {
                                this.$Modal.remove();
                            });
                    } else {
                        this.$Message.error('表单验证失败');
                    }
                });
            },
            addBird (record) {
                record.birds.push({
                    count: 1,
                    id: null
                });
            },
            clearBird (record, index) {
                record.birds.splice(index, 1);
            }
        },
        ready () {
            BirdBriefResource.get()
                .then(response => {
                    this.briefBirds = response.json().data;
                });
        }
    };
</script>
