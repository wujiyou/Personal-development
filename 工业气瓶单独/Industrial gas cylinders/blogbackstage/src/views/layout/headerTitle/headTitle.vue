<template>
  <div class="header">
    <div>
      <p style="color:white;font-weight:bold;">
        <i style="font-size:18px;margin-right:10px;" class="el-icon-help"></i>
        <span class="top1">气瓶后台管理系统</span>
      </p>
    </div>

    <!--左侧导航收缩按钮-->
    <div class="icon_class">
      <p multiBtn>
        <i
          class="icon_size"
           @click="isOpen"
          :class="{'el-icon-s-fold': getCollapseState == false?true:false,
          'el-icon-s-unfold': getCollapseState == true?true:false}"
        ></i>
      </p>
    </div>

    <div style="width:20%; display: flex;justify-content: flex-end;">
      <div class="heigth-botm">
        <el-tooltip class="item" effect="dark" content="刷新页面" placement="bottom">
          <p multiBtn @click="$router.go(0)">
            <i class="el-icon-refresh"></i>
          </p>
        </el-tooltip>
        <!-- position: absolute;right:12%; -->
        <span
          @click="dialogTableVisible()"
          style="cursor: pointer;width:40px;height:30px; border-radius: 20px;"
        >
          <img
            style="width:30px;height:30px;border-radius: 50%;position:relative;top:10px"
            src="../../../assets/images/touxiang.png"
            alt
          />
          
        </span>
        <span
          style="color:white;height:40px;line-height:40px;font-size:14px;cursor: pointer;"
          @click="dialogTableVisible()"
        >
          {{this.username}}
        </span>
         <i
            @click.prevent="handlesSingle()"
            style="font-size:16px;cursor: pointer;margin-left:5px;color:white"
            class="el-icon-switch-button"
          ></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.username = sessionStorage.getItem("username");
  },
  computed: {
    ...mapGetters({
      getHeaderBColor: "globalSetting/HeaderBColor",
      getHeaderColor: "globalSetting/HeaderColor",
      getDrawerState: "globalSetting/openDrawer",
      getCollapseState: "header/CollapseState",
      getCrumbs: "header/Crumbs",
    }),
  },
  methods: {
    handlesSingle() {
      sessionStorage.clear();
      this.$message.success("退出成功");
      this.$router.push("/");
    },
    isOpen() {
      // console.log(this.getCollapseState);
      //判断左侧栏是否展开或收缩
      if (this.getCollapseState == false) {
        this.$store.commit("header/setCollapse", true);
        // this.$notify({
        //   title: "成功",
        //   message: "关闭左侧导航栏",
        //   type: "success",
        //   duration: 1000,
        // });
      } else {
        this.$store.commit("header/setCollapse", false);
        // this.$notify({
        //   title: "成功",
        //   message: "打开左侧导航栏",
        //   type: "success",
        //   duration: 1000,
        // });
      }
    },
  },
};
</script>
<style scoped>
p[multiBtn] {
  width: 38px;
  max-width: 38px;
  height: 38px;
  max-height: 38px;
  font-size: 18px;
  border-radius: 38px;
  margin: 10px;
  cursor: pointer;
  display: inline-flex;
  vertical-align: middle;
}

[multiBtn] i {
  line-height: 40px;
  margin: 0 auto;
  font-size: 20px;
  color: white;
}

[multiBtn]:hover {
  box-shadow: 0 0 6px #b3b3b3 inset;
  transition: all 0.5s ease;
}
.header {
  display: flex;
  justify-content: space-between;
}
.header .icon_class {
  /* display: 1; */
  width:70%;
  /* cursor: pointer; */
 
}
</style>