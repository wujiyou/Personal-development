<template>
  <div class="container">
    <Vcode :show="isShow" @success="success" :imgs="[Img1,Img2,Img3,Img4,Img5,Img6]" />
    <div class="headTitle">
      <div class="center">
        气瓶综合管理系统
        <!-- 气瓶与移动式压力容器 -->
        <!-- <br />安全追溯智能综合监督管理平台 -->
      </div>
    </div>
    <div class="box">
      <div>
        <h1 class="hh1">欢迎登录气瓶后台管理系统</h1>
        <el-form
          :label-position="labelPosition"
          label-width="185px"
          :model="formdata"
          :rules="loginFormRules"
          class="loginer_from"
        >
          <el-form-item class="input_margin" prop="username">
            <i class="el-icon-user" style="font-size:25px;color:black;"></i>
            <el-input
              placeholder="请输入账号"
              class="input_border"
              v-model="formdata.username"
              prefix-icon="iconfont icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item class="input_margin" prop="password">
            <el-input
              placeholder="请输入密码"
              class="input_border"
              v-model="formdata.password"
              type="password"
              aria-placeholder="请输入密码"
              prefix-icon="iconfont icon-3702mima"
            ></el-input>
            <span>
              <i class="el-icon-unlock" style="font-size:25px;color:black;"></i>
            </span>
          </el-form-item>

          <el-button class="loginer_btns" @click.prevent="logins()" type="success">请先验证</el-button>
          <el-button
            :disabled="disab"
            class="loginer_btn"
            @click.prevent="handLogin()"
            type="primary"
          >登录</el-button>
        </el-form>
      </div>
    </div>
    <div class="box2">
      <span>Copyright ©2016-2020 长劲鹿科技有限公司 湘ICP备18008170号-2</span>
    </div>
  </div>
</template>

<script>
import Vcode from "vue-puzzle-vcode";
import Img1 from "../../public/img/imgs1.png";
import Img2 from "../../public/img/imgs2.png";
import Img3 from "../../public/img/imgs3.png";
import Img4 from "../../public/img/imgs4.png";
import Img5 from "../../public/img/imgs5.png";
import Img6 from "../../public/img/imgs6.png";
export default {
  name: "loginer",
  components: {
    Vcode,
  },
  data() {
    return {
      labelPosition: "left",
      isShow: false, // 验证码模态框是否出现
      disab: true,
      Img1,
      Img2,
      Img3,
      Img4,
      Img5,
      Img6,
      formdata: {
        username: "",
        password: ""
      },
      form: {
        code: "",
      },
      dialogFormVisible: false,
      checkCode: "",
      sqm: "",
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    logins() {
      this.isShow = true;
    },
    success() {
      this.isShow = false; // 通过验证后，需要手动隐藏模态框
      this.$message.success("验证成功");
      this.disab = false;
    },

    async handLogin() {
      const res = await this.$http.post("/user/login", this.formdata);
      console.log(res);
      let data = res.data;
      if (res.data.code == 0) {
        sessionStorage.setItem(
          "access_token",
          "bearer " + data.data.access_token
        );
        sessionStorage.setItem("username", data.data.username);
        sessionStorage.setItem("unitId", data.data.unitId);
        sessionStorage.setItem("type", data.data.type);
        this.$router.push("/system/role");
        this.$message.success("登录成功");
      } else if (res.data.code == 1) {
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
        this.disab=true;
      }
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 1200px) {
  .headTitle .center {
    font-size: 20px !important;
  }
  .hh1 {
    font-size: 20px !important;
  }
}
* {
  margin: 0px;
  padding: 0px;
}
.container {
  width: 100%;
  height: 100vh;
  text-align: center;
  background-image: url("../assets/images/a1.jpg");
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  justify-content: space-around;
  align-items: center;
}
.headTitle {
  width: 100%;
  height: 8vh;
  background: url("../../static/images/liquefied/head2.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.headTitle .center {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(to right, #00afff, #295aaa);
  color: white !important;
  -webkit-background-clip: text;
  color: transparent;
}
.box {
  width: 100%;
  height: 100%;
  text-align: center;
  background-image: url("../assets/images/bg09.png");
  display: flex;
  background-repeat: no-repeat;
  justify-content: space-around;
  align-items: center;
  background-position: center center;
  position: relative;
}
.box2 {
  position: absolute;
  bottom: 0%;
  color: white;
}
.hh1 {
  color: white;
  font-size: 28px;
  margin-top: 100px;
}
.input_border,
.input_border1 {
  border: 3px solid #6cb2d6;
  background-color: transparent;
  width: 100%;
  padding-left: 0px;
  text-align: center;
  margin-bottom: 10px;
}
.input_border1 {
  margin-left: -99px;
}
.input_margin {
  position: relative;
  margin-top: 25px;
  margin-left: -18%;
  color: white;
  width: 500px;
}
.el-form-item__content {
  margin-left: 0px !important;
}
.el-icon-user,
.el-icon-unlock,
.el-icon-s-claim {
  position: absolute;
  left: 2%;
  top: 16%;
  z-index: 100;
}
.code {
  cursor: pointer;
  color: white;
  height: 40px;
  line-height: 40px;
  background-color: black;
  border-radius: 5px;
  font-size: 30px;
  padding: 2px 2px;
}
#checkCode {
  display: inline-block;
  position: absolute;
  right: 1%;
  top: 8%;
}
#box1 {
  position: relative;
}
.loginer_btn {
  width: 63%;
  height: 50px;
  margin-top: 30px;
  background-color: #0099f2;
  border-radius: 10px;
}
.loginer_btns {
  width: 63%;
  height: 50px;
  margin-top: 30px;
  border-radius: 10px;
}
</style>