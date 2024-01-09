<template>
  <div>
    <div class="mainContain">
      <el-card class="mainCardPage">
        <div style="display: flex;margin-bottom: 10px;" >
          <div v-if="isMicro" >子项目展示内容:</div>
          <div>朱大帅来啦</div>
        </div>
        <div class="setFlexB">
          <fen-search
            :searchArr="searchArr"
            :initData="initData"
            @searchMethod="searchMethod"
            :isShowReset="true"
          />
          <div>
            <el-button-group>
              <el-button @click="() => (openModal = true)"> 新增 </el-button>
              <el-button> 复制 </el-button>
            </el-button-group>
          </div>
        </div>
        <div ref="suixin" class="setTableStyle">
          <fen-table
            v-if="tableAttrs.height"
            :tableColumn="tableColumn"
            :tableData="tableData"
            :tableAttrs="tableAttrs"
            :isSelection="true"
            :tableMethods="tableMethods"
            :paginationObj.sync="paginationObj"
            @changePage="changePage"
          />
        </div>
      </el-card>
    </div>
    <div v-if="openModal">
      <AddDialog
        :visible.sync="openModal"
        :formConfig="formConfig"
        :editData="editData"
        @submit="submit"
        :title="'展示标题'"
      />
    </div>
  </div>
</template>

<script>
import { tablecol, searchA, formConfigShow } from "./form";
import { initData, searchMethod } from "./method";
export default {
  data() {
    return {
      isMicro: window.microApp,

      height: 0,
      receiveType: [{ id: 1, dictValue: "你们啊" }],
      initData: {
        testA: "随心",
      },
      tableData: [],
      tableColumn: tablecol(this),
      tableAttrs: {
        border: true,
        "row-key": "id",
        height: 0,
      },
      tableMethods: {
        "selection-change": (value) => {
          // 选中事件的值
          console.log(value);
        },
      },
      paginationObj: {
        currentPage: 1,
        pageSize: 30,
        total: 100,
      },
      openModal: false,
      editData: {},
    };
  },

  mounted() {
    this.initTableData();
    // 外层设置下表格的高度  当前表格标签具体浏览器最上的高度
    let { top = 0 } = this.$refs.suixin.getBoundingClientRect();
    let trueHeight = window.innerHeight - top;

    this.tableAttrs.height = trueHeight > 200 ? trueHeight - 70 : 200;
  },
  computed: {
    searchArr() {
      return searchA(this);
    },
    formConfig() {
      return formConfigShow(this);
    },
  },
  methods: {
    initTableData() {
      initData(this);
    },
    changePage() {
      this.searchMethod(this.initData);
    },
    searchMethod(value) {
      searchMethod(this, value);
    },
    submit(value) {
      console.log(value);
      this.openModal = false;
    },
  },
};
</script>
<style scoped lang="less" src="./index.less"></style>
