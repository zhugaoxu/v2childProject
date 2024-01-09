<template>
  <div>
    <div class="logo">
      <img src="@/assets/images/whiteicon.png" />
    </div>
    <div class="setSearchTop">
      <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        placeholder=""
        @select="handleSelect"
      />
    </div>
    <el-menu
      class="menu"
      ref="menunow"
      :default-active="$route.path"
      :unique-opened="true"
    >
      <menu-item
        v-for="item in allRoters"
        :key="item.id"
        :route="item"
      ></menu-item>
    </el-menu>
  </div>
</template>

<script>
import menuItem from "./menuItem";

export default {
  components: {
    menuItem,
  },
  props: {
    routes: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      allRoters: [],
      state1: "",
    };
  },

  mounted() {
    this.allRoters = this.$store.state.user.sidebarRouters.filter(
      (item) => item.id
    );
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.$store.state.user.onecengroute.map((item) => {
        return {
          path: item.value,
          value: item.label,
        };
      });
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(record) {
      console.log(record);
      console.log(2333)
      this.$router.push(record.fullPath);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-menu {
  background-color: transparent !important;
  border-right: none !important;

  .el-sub-menu__title {
    color: white !important;
  }

  .el-sub-menu__title:hover {
    background-color: transparent !important;
  }

  .el-menu-item {
    color: white;

    &.is-active {
      color: #4666be !important;
      background-color: white;
    }

    &:hover {
      color: #4666be !important;
    }
  }
}
.setSearchTop {
    border-bottom: 1px solid rgba(255,255,255,0.22);
    padding-bottom:20px;
    margin-bottom: 10px;
  /deep/ .el-input {
    width: 180px !important;
    margin-left: 20px !important;
   

   

    .el-input__inner {
      height: 32px;
      line-height: 32px;
      background: rgba(255, 255, 255, 0.22);
      border-radius: 4px;
      border: none;
      color: white;
    }
  }
}
.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 150px;
    margin-left: -32px;
  }
}
</style>
