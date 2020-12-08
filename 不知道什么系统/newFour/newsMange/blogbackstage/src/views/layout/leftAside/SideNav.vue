<template>
  <div class="side_con" :class="{'menu-wrapper':state}">
    <!--没有子导航-->
    <el-menu-item v-if="item.children==''" :index="item.path">
      <i style="margin-right:20px" :class="iconObj[item.id]"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
    <!--有子导航-->
    <el-submenu v-else :index="String(index+1)">
      <template slot="title">
        <!--如果item有icon才添加icon图标-->
        <i style="margin-right:20px" :class="iconObj[item.id]"></i>
        <span slot="title">{{item.name}}</span>
      </template>
      <!--判断子导航是否存在下一级的子导航，如果没有则渲染自己，如果有则递归组件-->
      <!--如果子导航中没有存在下一级的子导航 则是<el-menu-item> 否则为<el-submenu>-->
      <template v-for="(cItem, cIndex) in item.children" :index="String(index+1+'-'+cIndex+1)">
        <!-- :style="{color: getTextColor}" -->
        <el-menu-item v-if="cItem.children==''" :index="cItem.path">
          <i class="el-icon-menu"></i>
          <span v-show="!getCollapseState">{{cItem.name}}</span>
        </el-menu-item>
        <el-submenu v-else :index="String(index+1+'-'+cIndex+1)">
          <i class="el-icon-menu"></i>
          <span slot="title">{{cItem.name}}</span>
          <!--递归自己 遍历子..导航-->
          <template v-for="(item, parentIndex) in cItem.children">
            <SideNav :item="item" :index="parentIndex"></SideNav>
          </template>
        </el-submenu>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SideNav",
  data() {
    return {
      // iconObj: {
      //   "8b24656c-e8ab-4585-a80f-d939b8295b6c": "iconfont icon-huabanfuben",
      //   "2d2ea8e9-d8ca-46ee-89ce-d93612b2cc35": "iconfont icon-guanli2",
      //   "09778566-88aa-4b69-9de5-3d4830cee319": "iconfont icon-jinggao",
      //   "0edfffe5-b0eb-4ac5-b25e-481eca795fc3":"iconfont icon-renyuanguanli-copy",
      //   "fac5d57c-7bf3-4925-b937-6fe6a3d138f5": "iconfont icon-dangan2",
      //   "88f2e9a5-a44e-4891-9798-e0d5cb86cd03": "iconfont icon-nav_user ",
      //   "408f56a8-fef3-4b0d-8d9f-b99a47f40bb3": "iconfont icon-dangan2",
      //   "2a5b822f-64bd-49f8-b0e0-3de4bceff94c": "iconfont icon-huabanfuben",
      //   "b13269b3-c840-4c2b-921d-f7b056ab625c": "iconfont icon-huabanfuben",
      //   "51608d1e-c58b-4016-9463-81c289922993": "iconfont icon-huabanfuben",
      // },
      iconObj: {
        // "4854645":"iconfont icon-dangan2",
        // "121231": "iconfont icon-huabanfuben",
        // "1231": "iconfont icon-guanli2",
        // "123": "iconfont icon-jinggao",
        // "45254": "iconfont icon-renyuanguanli-copy",
        // "4546": "iconfont icon-dangan2",
        "7879": "iconfont icon-nav_user ",
        // "1566": "iconfont icon-dangan2",
        // "123667": "iconfont icon-huabanfuben",
        // "12314":"iconfont icon-kehu",
        // "788454":"iconfont icon-weizhuanwenwenjian",
        // "521345":"iconfont icon-yunshuche",
        "7845123667":"iconfont icon-huaban",
        // "78451236673432":"iconfont icon-dizhi"
      },
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      getCollapseState: "header/CollapseState",
    }),
    getTextColor() {
      //图标颜色 对应文字的颜色
      return this.$store.state.globalSetting.aTextColor;
    },
  },
};
</script>

<style scoped>
.el-submenu [class^="fa"] {
  vertical-align: middle;
  /* margin-right: 5px; */
  width: 24px;
  text-align: center;
  font-size: 16px;
}

.menu-wrapper span[slot="title"] {
  display: none;
}

.el-menu-item {
  /* padding: 0 !important; */
}
.side_con {
  background-color: black !important;
}
</style>