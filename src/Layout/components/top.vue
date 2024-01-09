<template>
  <div class="tagList" ref="list">
    <div
      :class="active({ path: '/index' }) ? 'tag tag_active' : 'tag'"
      style=""
      @click="() => goIndex()"
    >
      主页
    </div>
    <el-divider direction="vertical"></el-divider>
    <div
      v-for="(item, index) in tags
        .filter((item) => item.path != '/index')
        .slice(0, num)"
      :key="index"
      @click="
        () => {
          go(item);
        }
      "
    >
      <div style="display: flex">
        <div :class="active(item) ? 'tag tag_active' : 'tag'">
          {{ item.name }}
          <div
            class="close el-icon-close"
            @click.stop="
              () => {
                close(item);
              }
            "
          ></div>
        </div>
        <div style="margin-top:4px" v-if="index != tags.length - 1"> 
          <el-divider direction="vertical"></el-divider>
        </div>
      </div>
    </div>
    <el-dropdown
      class="more"
      v-if="tags.length > num"
      :hide-on-click="false"
      trigger="click"
      @command="handleCommand"
    >
      <span class="el-dropdown-link">
        {{ tags.length - num }}+
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in tags.slice(num)"
          :key="index"
          :command="item"
        >
          <div class="tag">
            <span>{{ item.name }}</span>
            <div
              class="close el-icon-close"
              @click.stop="
                () => {
                  close(item);
                }
              "
            ></div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
      num: 0,
      isShowMenu: false,
      menuLeft: 0,
      menuTop: 0,
      itemRow: null,
    };
  },
  methods: {
    addTags() {
      const { name } = this.$route;
      let filter = ["/dashboard", "/index"];
      let check = filter.includes(this.$route.path);
      if (name && !check) {
        this.$store.dispatch("tagsView/addView", this.$route);
      }
      return false;
    },
    showMenu(e, item) {
      this.isShowMenu = true;
      this.menuLeft = e.pageX + "px";
      this.menuTop = e.pageY + "px";
      this.itemRow = item;
    },
    add(route) {
      let index = this.tags.findIndex((item) => {
        return item.path === route.path;
      });
      if (index === -1) {
        this.tags.push(route);
      }
    },
    goIndex() {
      this.$router.push("/index");
    },
    go(route) {
      if (this.$route.path == route.path) {
        return;
      }
      this.add(route);
      this.$router.push({
        path: route.path,
      });
    },
    close(route) {
      let index = this.tags.findIndex((item) => {
        return item.path === route.path;
      });
      // 这一段取得应该是关闭按钮点击关闭的  不是当前的
      let filter = ["/dashboard", "/index"];
      let check = filter.includes(route.path);
      if (route.name && !check) {
        this.$store.dispatch("tagsView/deleteView", route);
      }
      // 应该使用上面的方法
      if (this.tags.filter((item) => item.name).length > 1) {
        this.tags.splice(index, 1);
        if (this.$route.path === route.path) {
          if (this.tags[index]) {
            this.$router.push(this.tags[index].fullPath);
          } else {
            this.$router.push(this.tags[index - 1].fullPath);
          }
        }
      } else {
        this.tags = [];
        this.$router.push("/");
      }
    },
    active(route) {
     
      if (route.path === this.$route.path) {
        return true;
      } else {
        return false;
      }
    },
    handleCommand(command) {
      this.go(command);
    },
  },
  created() {
    document.addEventListener("click", () => {
      this.isShowMenu = false;
    });
    document.addEventListener("mousedown", (e) => {
      const { button } = e;
      if (button === 2) {
        this.isShowMenu = false;
      }
    });
  },
  watch: {
    $route(val) {
      this.add(val);
      let exclude = ["/menulist", "/index", "/dashboard"];
      if (!exclude.includes(this.$route.path)) {
        this.addTags();
      }
    },
  },
  mounted() {
    this.add(this.$route);
    this.addTags();
    this.num = parseInt(this.$refs.list.offsetWidth / 170) - 1;
    window.onresize = () => {
      this.num = parseInt(this.$refs.list.offsetWidth / 170) - 1;
    };
  },
};
</script>

<style lang="scss" scoped>
.tagList {
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 6px;

  flex: 1;
  // background-color: white;
  overflow: hidden;

  .tag_active {
    background: linear-gradient(128deg, #749aff 11%, #4d7deb 56%, #4f70d0 95%);
    color: white;
    border-radius: 16px;

    // border-bottom: 3px solid #1890ff !important;
  }
  .tag {
    text-align: center;
    height: 20px;
    font-size: 12px;
    padding: 8px 24px;

    position: relative;
    margin: 0 5px;
    cursor: pointer;

    &:nth-child(2) {
      margin-left: 0px !important;
    }

    white-space: nowrap;
    .close {
      height: 10px;
      position: absolute;
      top: -2px;
      bottom: 0;
      right: 6px;
      margin: auto;
      &:hover {
        color: rgb(193, 68, 73);
      }
    }
  }
  .more {
    border: 1px solid rgba(16, 0, 0, 0.1);
    border-radius: 24px;
    padding: 4px 8px;
    color: #3a3837;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    padding: 4px 8px;
    position: relative;
    margin: 0 10px;
    white-space: nowrap;
  }
}

.el-dropdown-menu {
  width: 200px;
  .tag {
    display: flex;

    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
  }
}
</style>
