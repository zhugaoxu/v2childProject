<template>
  <div>
    <el-dialog
      :title="title"
      :visible="true"
      @close="close"
      :close-on-click-modal="false"
      custom-class="addDialogComponent"
      width="660px"
    >
      <div>
        <div>
          <fen-form v-model="queryForm" :formConfig="formConfig" ref="submit"/>
        </div>
      </div>
      <div slot="footer" style="text-align: center">
        <el-button @click="close">取 消</el-button>
        <el-button @click="submit">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //当前编辑条件
      queryForm: {},
    };
  },
  computed: {},
  props: {
    title: {
      type: String,
      default: () => ''
    },
    editData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {
    this.initData();

  },
  methods: {
    /**
     * @desc 初始化数据
     */
    initData() {
      this.queryForm = JSON.parse(JSON.stringify(this.editData));
    },
    /**
     * @desc 修改当前部分数据
     */
    updateData(data = {}) {
      this.queryForm = {
        ...this.queryForm,
        ...data,
      };
    },
    /**
     * @desc 关闭弹窗
     */
    close() {
      this.$emit("update:visible", false);
    },
    /**
     * @desc 点击保存
     */
    submit() {
      let isTrue = this.$refs.submit.submitShowForm(); //布尔值 true的话验证成功 false验证失败 所有信息同步在queryForm
      if (isTrue) {
        this.$emit('submit',this.queryForm)
      }
    },
  },
};
</script>
<style scoped lang="less" src="./index.less"></style>