<template>
  <div>
    <div v-if="isMicro">
      <div class="showRouter">
            <router-view :key="$route.fullPath" />
        </div>
    </div>

    <div v-else class="setContainer">
      <div class="setLeft">
        <left-menu />
      </div>
      <div class="setRight">
        <div class="showTagsUp">
          <top-view />
        </div>
        <!-- 设置的用户认证信息 -->
        <div>
          <div class="setShowUser">
          <div style="font-size: 14px; color: #d6e6fc">
            <div style="margin-left: 16px; margin-right: 16px; display: flex">
              <div style="font-size: 14px; color: #d6e6fc">
                <div>
                  <el-popover placement="bottom" popper-class="ewrdddd" title="" trigger="click" width="260">
                    <div style="padding:24px" class="resetuserold">
                      <div style="font-size:16px;font-weight:500;">
                        系统管理员 
                      </div>
                      <div class="setuserold">
                        <div>
                          用户名
                        </div>
                        <div>
                          猪猪
                        </div>

                      </div>
                      <div class="setuserold">
                        <div>
                          手机号
                        </div>
                        <div>
                          15037777222
                        </div>
                      </div>

                      <div class="logoutown" @click="() => logout()">
                        <i style="font-size:16px" class="el-icon-switch-button" />
                        退出登录
                      </div>
                    </div>
                    <div slot="reference" style="background-color: white">
                      <img alt="" class="touX" src="https://img0.baidu.com/it/u=397723509,726331101&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1692982800&t=a58e7acf55774ca12735593c7245e2ac" style="cursor: pointer;width: 35px;height:35px"
                        @click="visible = !visible"  />
                    </div>

                  </el-popover>
                </div>
              </div>
            </div>
          </div>
        </div>



        </div>
        <div class="showRouter">
          <!-- 暂时先把缓存的去除 -->
          <!-- <keep-alive :include="cachedViews"> -->
            <router-view :key="$route.fullPath" />
          <!-- </keep-alive> -->
        </div>

      </div>

    </div>




  </div>
</template>

<script>

import LeftMenu from './components/leftmenu.vue';

import TopView from './components/top'

export default{
  data(){
    return {
      isMicro:window.microApp

    }
  },
  components:{
    LeftMenu,
    TopView
  },
  methods:{
    logout(){
      localStorage.removeItem('token')
      window.location.reload()
    }
  }
}


</script>
<style lang="less" scoped>
.setContainer {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #F2F5FA;

  .setLeft {
    width: 224px;
    height: 100vh;
    background: linear-gradient(137deg, #4e7bfa, #5c96f0 27%, #6690ec 57%, #475faf 96%);
    border-radius: 0px 24px 24px 0px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.10);
    flex-shrink: 0;
  }

  .setRight {
    flex: 1
  }

}

.showRouter {
  padding: 0px 6px;
  height: calc(100vh - 64px);
  overflow: hidden;
}
</style>


<style lang="less" scoped>
.setShowUser {
  margin-top: 3px;
  margin-left: 24px;
  margin-right: 16px;
  position: fixed;
  z-index: 90;
  top: 6px;
  right: -14px;

  img {
    width: 30px;
    border-radius: 50%;
  }
}

.resetuserold {
  .setuserold {
    display: flex;
    color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
    text-align: left;
    line-height: 28px;

    &>div:first-child {
      width: 50px;
    }

    &>div:last-child {
      flex: 1
    }
  }

  .logoutown {
    text-align: left;
    margin-left: 24px;
    color: #1890ff;
    cursor: pointer;
    margin-top: 14px;
  }
}

.setCenter {
  margin-left: calc(50vw - 550px);
  margin-top: -4px;

  /deep/ .el-select {
    input {
      border-right: none !important;
      border-top-right-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
      height: 30px;
      line-height: 30px;
      border-color: #ebebeb !important;
    }

    .el-input__suffix {
      top: -1px !important
    }
  }

  /deep/ .el-autocomplete {
    input {
      width: 300px;
      // border-left: none !important;
      border-top-left-radius: 0px !important;
      border-bottom-left-radius: 0px !important;
      height: 30px;
      line-height: 30px;
      border-color: #ebebeb !important;
    }

  }
}

.setOverScroll {
  overflow: auto;
  max-height: 400px;
}

.setalltest {
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  width: calc(100% - 115px);

  /deep/ .el-icon-time:hover{
    color: #4E7BFA;

  }

  @media (max-width:1110px) {
    .setCenter {
      margin-left: 20px;
    }

    /deep/ .el-autocomplete {
      input {
        width: 100px;
      }

    }
  }
  @media (max-width:910px) {
    /deep/ .el-select {
      width:160px !important
    }
    .setback{
      display: none  !important;
    }
    .setbackci{
      display: none;
    }

  }

}
</style>