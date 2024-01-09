<template>
  <div>
    <div class="setBackImgParent">
      <div class="setBackImg">
        <img
          src="../assets/images/back.jpg"
          alt=""
        />
      </div>
      <div class="setmainForm">
        <div>
          <div
            style="
              height: 140px;
              text-align: center;
              line-height: 140px;
              font-size: 28px;
            "
          >
            用户登录
          </div>
          <div style="margin-right: 40px">
            <el-form
              :model="numberValidateForm"
              ref="numberValidateForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item
                label=""
                prop="username"
                :rules="[{ required: true, message: '请输入用户名' }]"
              >
                <el-input
                  v-model="numberValidateForm.username"
                  placeholder="账号密码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                label=""
                prop="password"
                :rules="[{ required: true, message: '请输入密码' }]"
              >
                <el-input
                  v-model="numberValidateForm.password"
                  placeholder="请输入密码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="
                    width: 310px;
                    height: 40px;
                    font-size: 18px;
                    margin-left: 0px;
                  "
                  type="primary"
                  @click="submitForm('numberValidateForm')"
                >
                  登 录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      numberValidateForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果登录成功  将返回的token存储起来 跳转首页
          let res = {
            token: "123",
            userId: "1111",
          };
          localStorage["token"] = res.token;
          localStorage["userId"] = res.userId;
          this.$router.push("/index");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.setBackImgParent {
  position: relative;

  .setBackImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    img {
      width: 100vw;
      height: 100vh;
    }
  }

  .setmainForm {
    width: 400px;
    height: 400px;

    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    position: absolute;
    left: calc(50vw - 200px);
    top: calc(50vh - 200px);

    /deep/ .el-form-item__label {
      color: black !important;
      line-height: 40px !important;
    }

    /deep/ .el-form-item__content {
      line-height: 40px !important;
      margin-left: 50px !important;
    }

    /deep/ input {
      height: 36px !important;
    }
  }
}
</style>
