<template>
    <i-form v-ref:flag :model="flag" :rules="rules" :label-width="100">
        <Form-item label="鸟种" prop="birdId">
            <i-select :model.sync="flag.birdId" filterable clearable
                      placeholder="所搜关键字" style="width: 200px">
                <i-option v-for="item in briefBirds"
                          :value="item.id">{{item.nameZh}}</i-option>
            </i-select>
        </Form-item>
        <Form-item label="旗标编码" prop="code">
            <i-input :value.sync="flag.code" placeholder="请输入旗标编码" style="width: 200px;"></i-input>
        </Form-item>
        <Form-item label="旗标颜色组合" prop="flagColorCombination">
            <i-select :model.sync="flag.flagColorCombination" multiple clearable
                      placeholder="请选择旗标颜色组合" style="width: 200px">
                <i-option v-for="color in flagColors"
                          :value="color.value" :label="color.name">
                    <Icon type="flag" :color="color.color"></Icon>
                    <span style="float:right;color:#ccc">{{color.name}}</span>
                </i-option>
            </i-select>
        </Form-item>
        <Form-item label="胫部" style="width: 400px">
            <Row>
                <i-col span="12">
                    <Form-item label="左胫" prop="lu">
                        <i-select :model.sync="flag.lu" multiple clearable
                                  placeholder="请选择左胫颜色" style="margin: 0 4px">
                            <i-option v-for="color in loopColors"
                                      :value="color.value" :label="color.name">
                                <Icon type="android-radio-button-off" :color="color.color"></Icon>
                                <span style="float:right;color:#ccc">{{color.name}}</span>
                            </i-option>
                        </i-select>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="右胫" prop="ru">
                        <i-select :model.sync="flag.ru" multiple clearable
                                  placeholder="请选择右胫颜色" style="margin: 0 4px">
                            <i-option v-for="color in loopColors"
                                      :value="color.value" :label="color.name">
                                <Icon type="android-radio-button-off" :color="color.color"></Icon>
                                <span style="float:right;color:#ccc">{{color.name}}</span>
                            </i-option>
                        </i-select>
                    </Form-item>
                </i-col>
            </Row>
        </Form-item>
        <Form-item label="跗部" style="width: 400px">
            <Row>
                <i-col span="12">
                    <Form-item label="左跗" prop="ld">
                        <i-select :model.sync="flag.ld" multiple clearable
                                  placeholder="请选择左跗颜色" style="margin: 0 4px">
                            <i-option v-for="color in loopColors"
                                      :value="color.value" :label="color.name">
                                <Icon type="android-radio-button-off" :color="color.color"></Icon>
                                <span style="float:right;color:#ccc">{{color.name}}</span>
                            </i-option>
                        </i-select>
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="右跗" prop="rd">
                        <i-select :model.sync="flag.rd" multiple clearable
                                  placeholder="请选择右跗颜色" style="margin: 0 4px">
                            <i-option v-for="color in loopColors"
                                      :value="color.value" :label="color.name">
                                <Icon type="android-radio-button-off" :color="color.color"></Icon>
                                <span style="float:right;color:#ccc">{{color.name}}</span>
                            </i-option>
                        </i-select>
                    </Form-item>
                </i-col>
            </Row>
        </Form-item>
        <Form-item label="发现时间" prop="discoveredTime">
            <Date-picker type="datetime" placeholder="选择发现日期和时间"
                         :value="flag.discoveredTime"
                         style="width: 216px;" format="yyyy-MM-dd HH:mm:ss"></Date-picker>
        </Form-item>
        <Form-item label="备注" prop="note">
            <i-input type="textarea" placeholder="请填写备注"
                     :value.sync="flag.note" :rows="4"
                     style="width: 400px;"></i-input>
        </Form-item>
        <Form-item>
            <i-button type="primary" @click="save('flag')">保存</i-button>
        </Form-item>
    </i-form>
</template>

<script>
    import {BirdBriefResource, FlagSubmitResource} from '../../resources/index';
    import Config from '../../config';

    export default{
        data () {
            return {
                briefBirds: [],
                flagColors: [
                    { name: '红旗标', value: 'R', color: 'red' },
                    { name: '绿旗标', value: 'G', color: 'green' },
                    { name: '黑旗标', value: 'B', color: 'black' },
                    { name: '橙旗标', value: 'O', color: 'orange' },
                    { name: '白旗标', value: 'W', color: 'white' },
                    { name: '黄旗标', value: 'Y', color: 'yellow' }
                ],
                loopColors: [
                    { name: '红环', value: 'r', color: 'red' },
                    { name: '绿环', value: 'g', color: 'green' },
                    { name: '蓝环', value: 'b', color: 'blue' },
                    { name: '石灰绿环', value: 'l', color: '#228B22' },
                    { name: '黄环', value: 'y', color: 'yellow' },
                    { name: '白环', value: 'w', color: 'white' }
                ],
                flag: {
                    birdId: null,
                    code: '',
                    flagColorCombination: [],
                    lu: [],
                    ru: [],
                    ld: [],
                    rd: [],
                    discoveredTime: new Date(),
                    note: ''
                },
                rules: {
                    birdId: [{required: true, type: 'number', message: '必须选择一个鸟种', trigger: 'blur'}],
                    flagColorCombination: [{required: true, type: 'array', message: '至少选择一种颜色', trigger: 'change'}],
//                    lu: [
//                        {required: true, type: 'array', message: '至少选择一种颜色', trigger: 'change'}
//                    ],
//                    ru: [
//                        {required: true, type: 'array', message: '至少选择一种颜色', trigger: 'change'}
//                    ],
//                    ld: [
//                        {required: true, type: 'array', message: '至少选择一种颜色', trigger: 'change'}
//                    ],
//                    rd: [
//                        {required: true, type: 'array', message: '至少选择一种颜色', trigger: 'change'}
//                    ],
                    discoveredTime: [
                        {required: true, type: 'date', message: '必须选择发现日期', trigger: 'blur'}
                    ],
                    code: [{required: true, message: '必须填写旗标编码', trigger: 'blur'}]
                }
            };
        },
        methods: {
            save (flag) {
                this.$refs[flag].validate((valid) => {
                    if (valid) {
                        this.$Modal.info({content: Config.MSG_SUBMITTING});
                        this.flag.flagColorCombination = this.flag.flagColorCombination.join(',');
                        this.flag.lu = this.flag.lu.join(',');
                        this.flag.ru = this.flag.ru.join(',');
                        this.flag.ld = this.flag.ld.join(',');
                        this.flag.rd = this.flag.rd.join(',');
                        FlagSubmitResource.save(this.flag)
                            .then(() => {
                                this.$Message.success(Config.MSG_SUBMIT_SUCCESS);
                                this.$refs[flag].resetFields();
                                this.$Modal.remove();
                            }, () => {
                                this.$Modal.remove();
                                this.$Message.error(Config.MSG_SUBMIT_ERROR);
                            });
                        this.flag.flagColorCombination = [];
                        this.flag.lu = [];
                        this.flag.ru = [];
                        this.flag.ld = [];
                        this.flag.rd = [];
                    } else {
                        this.$Message.error(Config.MSG_VALIDATE_ERROR);
                    }
                });
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
