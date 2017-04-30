<template>
  <i-form v-ref:bird :model="bird"
          :rules="ruleValidate" :label-width="100" class="form-container">
      <Form-item label="鸟种编号" prop="code">
          <i-input :value.sync="bird.code" placeholder="请输入鸟种编号"></i-input>
      </Form-item>
      <Form-item label="中文名称" prop="nameZh">
          <i-input :value.sync="bird.nameZh" placeholder="请输入鸟类中文名"></i-input>
      </Form-item>
      <Form-item label="英文名称" prop="nameEn">
          <i-input :value.sync="bird.nameEn" placeholder="请输入鸟类英文名"></i-input>
      </Form-item>
      <Form-item label="拉丁名称" prop="nameLt">
          <i-input :value.sync="bird.nameLt" placeholder="请输入鸟类拉丁名"></i-input>
      </Form-item>
      <Form-item label="国家" prop="nation">
          <Checkbox-group :model.sync="bird.nation">
              <Checkbox value="中"></Checkbox>
              <Checkbox value="日"></Checkbox>
              <Checkbox value="奥"></Checkbox>
          </Checkbox-group>
      </Form-item>
      <Form-item label="目" prop="order">
          <i-input :value.sync="bird.order" placeholder="请输入目名称"></i-input>
      </Form-item>
      <Form-item label="科" prop="family">
          <i-input :value.sync="bird.family" placeholder="请输入科名称"></i-input>
      </Form-item>
      <Form-item label="属" prop="genus">
          <i-input :value.sync="bird.genus" placeholder="请输入种名称"></i-input>
      </Form-item>
      <Form-item label="分类" prop="category">
          <i-select :model.sync="bird.category" placeholder="请选择分类">
              <i-option v-for="item in category" :value="item">{{item}}</i-option>
          </i-select>
      </Form-item>
      <Form-item label="1%标准" prop="onePercentStandard">
          <i-input :value.sync="bird.onePercentStandard"
                   placeholder="填写1%标准值"></i-input>
      </Form-item>
      <Form-item label="水鸟" prop="isWaterBird">
          <Switch :checked.sync="bird.isWaterBird" size="large">
              <span slot="open">是</span>
              <span slot="close">否</span>
          </Switch>
      </Form-item>
      <Form-item label="湿地依赖鸟类" prop="isWetlandDependBird">
          <Switch :checked.sync="bird.isWetlandDependBird" size="large">
              <span slot="open">是</span>
              <span slot="close">否</span>
          </Switch>
      </Form-item>
      <Form-item label="现在存活" prop="isAlive">
          <Switch :checked.sync="bird.isAlive" size="large">
              <span slot="open">是</span>
              <span slot="close">否</span>
          </Switch>
      </Form-item>
      <Form-item>
          <i-button type="primary" @click="save('bird')">保存</i-button>
      </Form-item>
  </i-form>
</template>

<script>
    import {BirdSubmitResource} from '../../resources/index';

    export default {
        data () {
            return {
                bird: {
                    code: '',
                    nameZh: '',
                    nameEn: '',
                    nameLt: '',
                    protectClass: '',
                    nation: [],
                    order: '',
                    family: '',
                    genus: '',
                    category: '',
                    onePercentStandard: '',
                    isWaterBird: true,
                    isWetlandDependBird: false,
                    zhPinyin: '',
                    isAlive: true
                },
                ruleValidate: {
                    code: [
                        { required: true, message: '编号不能为空', trigger: 'blur' }
                    ],
                    nameZh: [
                        { required: true, message: '中文名不能为空', trigger: 'blur' }
                    ],
                    category: [
                        { required: true, message: '必须选择一个分类', trigger: 'change' }
                    ]
                },
                category: [
                    '雁鸭类',
                    '鹤鹳类',
                    '秧鸡类',
                    '鸻鹬类',
                    '鸥类',
                    '海洋鸟类',
                    '鸬鹚类',
                    '鹭类',
                    '尚未归类'
                ]
            };
        },
        methods: {
            save (bird) {
                this.$refs[bird].validate((valid) => {
                    if (valid) {
                        this.$Modal.info({
                            content: '正在向服务器提交数据……'
                        });
                        this.bird.nation = this.bird.nation.join('');
                        BirdSubmitResource.save(this.bird)
                            .then(response => {
                                if (response.json().code === 200) {
                                    this.$Message.success('提交成功');
                                    this.$refs[bird].resetFields();
                                } else {
                                    this.$Message.error('提交出错，请重试');
                                }
                                this.$Modal.remove();
                            });
                        this.bird.nation = [];
                    } else {
                        this.$Message.error('表单验证失败');
                    }
                });
            }
        }
    };
</script>

<style>
    .form-container {
        margin: 8px;
        width: 400px;
    }
</style>
