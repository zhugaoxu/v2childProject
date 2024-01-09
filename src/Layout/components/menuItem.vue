<template>
  <div>
    <el-submenu
      :key="route.id"
      :index="route.id"
      v-if="route.children && route.children.length > 0"
    >
      <template slot="title">
        <span>{{ route.name }}</span>
      </template>
      <menu-item
        v-for="item in route.children"
        :key="item.id"
        :route="item"
      ></menu-item>
    </el-submenu>
    <el-menu-item
      :index="route.fullPath"
      v-else
      @click="
        () => {
          to(route);
        }
      "
    >
      {{ route.name }}
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "menuItem",
  props: {
    route: {
      type: Object,
    },
  },
  data() {
    return {
      options: [],
    };
  },
  created() {

  },
  computed: {},

  mounted() {},

  methods: {
    to(value) {
      this.$router.push(value.fullPath);
    },
  },
};
</script>

<style lang="scss" scoped>
li.el-submenu {
  ::v-deep .el-submenu__title {
    font-size: 14px;
    // font-weight: 700;
    color: white;
    * {
      color: white;
    }
    &:hover,
    &:focus {
      background-color: transparent;
    }
  }

  ::v-deep .el-menu .el-menu-item {
    font-size: 14px;
    // color: rgb(148, 147, 147);
    color: #f7f8ff;
    margin-top: 10px;
    margin-bottom: 10px;
 

    * {
      //
      color: #f7f8ff;
    }
  }

  ::v-deep.el-menu-item {
    min-width: auto;
    padding: 0 0;
    width: 180px;
    height: 32px;
    line-height: 32px;
    margin-left: 22px;
    border-radius: 6px;
    &:hover,
    &:focus {
      background-color: #ffffff;
      color: #4666be;
      * {
        color: #4666be;
      }
    }
    &.is-active {
      background-color: #ffffff;
      // color: rgb(193, 68, 73);
      color: #4666be;
      font-weight: 600;

      &::before {
        content: " ";
        width: 12px;
        height: 48px;
        position: absolute;
        top: -10px;
        // background-color: red;

        background-repeat: no-repeat;
        background-position-y: 1px;
        z-index: 100000;
        left: -22px;
        transform: scale(0.8);
      }

      // *{
      //     color: rgb(193, 68, 73);
      // }

      position: relative;
      // &::before{
      //     content: " ";
      //     width: 0;
      //     height: 0;
      //     border-top: 16px solid transparent;
      //     border-bottom: 16px solid transparent;
      //     border-left: 16px solid rgb(193, 68, 73);
      //     position: absolute;
      //     left: 0;
      //     top: 0;
      //     bottom: 0;
      //     margin: auto;
      // }
    }
    i {
      width: 20px;
      vertical-align: middle;
      margin-right: 5px;
      text-align: center;
      font-size: 20px;
    }
  }
}
::v-deep .setbackweight > div {
  font-weight: 900 !important;
}
::v-deep .setone > div {
  font-size: 16px !important;
}
</style>
