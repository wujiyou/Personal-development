<template>
  <div class="aside_con" style="height: 100%">
    <!--logo栏位-->
    <div class="toggle-button">
      <!-- <span style="display: block;">民用液化气瓶</span> -->
      <img
        style="
          width: 40px;
          height: 40px;
          margin-bottom: 25px;
          border-radius: 50%;
          position: relative;
          top: 20px;
        "
        src="../../../assets/images/touxiang.png"
        alt
      />
      <span
        class="logo_png"
        :style="{
          display: getCollapseState == false ? 'inline-block' : 'none',
        }"
        style="
          font-size: 12px;
          position: relative;
          top: -12px;
          left: 10px;
          display: inline-block;
        "
      >
        <span style="display: block">{{ this.username }}</span>
        <span style="display: block; margin-top: 8px">{{ this.zg }}</span>
      </span>
    </div>
    <!-- <div v-if="nav.LOGO && this.nav.LOGO.id === '1'"
         class="avatar avatar-flex bg"
         :style="{width: (getCollapseState == false)?'200px':'64px'}">
      <div>
        <a href="javascript:;">
          <img :src="require('@/assets'+nav.LOGO.img)" alt="" :style="{width: '50px', height: '50px'}">
          <span>{{nav.LOGO.title}}</span>
        </a>
      </div>
    </div>-->

    <el-menu
      :default-active="String(activeNav)"
      class="el-menu-vertical"
      :collapse="getCollapseState"
      :background-color="getAsideColor"
      :text-color="getATextColor"
      :active-text-color="getActiveColor"
      :unique-opened="getDoubleOpen"
      :default-openeds="defaultOpen"
      ref="menu"
      router
    >
      <!--动态生成sideItem-->
      <template v-for="(item, parentIndex) in nav">
        <SideNav
          :item="item"
          :index="parentIndex"
          :state="getCollapseState"
        ></SideNav>
      </template>
    </el-menu>
  </div>
</template>

<script>
import SideNav from "./SideNav";
import { mapGetters } from "vuex";
import Axios from "axios";
import style from "@/assets/css/public.css";
import { cjlwlkj } from "../../../utils/api"
// import { getNav } from "../../../utils/api";
export default {
  name: "Aside",
  data() {
    return {
      nav: [
        // {
        //   id: 4854645,
        //   name: "车用气瓶档案新增",
        //   path: "/unit/car/carsupervise",
        //   children: "",
        // },
        // {
        //   id: 121231,
        //   name: "单位登记",
        //   path:"/danwei/denghji",
        //   children: [
        //     {
        //       name: "监管机构",
        //       path: "/unit/unit/supervise",
        //       children: "",
        //     },
        //     {
        //       name: "制造单位",
        //       path: "/unit/unit/made",
        //       children: "",
        //     },
        //     {
        //       name: "充装单位",
        //       path: "/unit/unit/filling",
        //       children: "",
        //     },
        //     {
        //       name: "使用单位",
        //       path: "/unit/unit/use",
        //       children: "",
        //     },
        //     {
        //       name: "检验单位",
        //       path: "/unit/unit/checkout",
        //       children: "",
        //     },
        //     {
        //       name: "配送单位",
        //       path: "/unit/unit/delivery",
        //       children: "",
        //     },
        //     {
        //       name:"其它单位",
        //       path:"/unit/qitait",
        //       children:""
        //     }
        //   ],
        // },
        // {
        //   id: 788454,
        //   name: "充装记录",
        //   path: "/trace/order",
        //   children: [
        //     {
        //       name: "工业气瓶充装记录",
        //       path: "/query/industrial/bottleFilling",
        //       children: "",
        //     },
        //     {
        //       name: "液化气瓶充装记录",
        //       path: "/query/liquer/bottleFilling",
        //       children: "",
        //     },
        //     {
        //       name: "车用气瓶充装记录",
        //       path: "/query/car/bottleFilling",
        //       children: "",
        //     },
        //   ],
        // },
        // {
        //   id: 12314,
        //   name: "客户订单管理",
        //   path: "/kehud/dan",
        //   children: [
        //     {
        //       path: "/query/industrial/client",
        //       name: "工业气瓶订单管理",
        //       children: "",
        //     },
        //     {
        //       path: "/query/liquer/client",
        //       name: "液化气瓶订单管理",
        //       children: "",
        //     },
        //   ],
        // },
        // {
        //   id: 521345,
        //   name: "移动压力器容器",
        //   path: "/systemrole",
        //   children: [
        //     {
        //       name: "移动充装记录",
        //       children: "",
        //       path: "/query/phone/fill",
        //     },
        //     {
        //       name: "移动充装扫描记录",
        //       children: "",
        //       path: "/query/phone/fillscan",
        //     },
        //     {  
        //       name: "移动充装档案记录",
        //       children: "",
        //       path: "/query/phone/dangan",
        //     },
        //     {
        //       name: "移动检验变更记录",
        //       children: "",
        //       path: "/query/phone/check",
        //     },
        //     {
        //       name:"挂牌车头数据",
        //       children:"",
        //       path:"/query/guapai/fill"
        //     }
        //   ],
        // },
        // {
        //   id: 1231,
        //   name: "账号管理",
        //   path: "/system/user",
        //   children: "",
        // },
        {
          id: 7879,
          name: "角色管理",
          path: "/system/role",
          children: "",
        },
        // {
        //   id: 1566,
        //   name: "日志管理",
        //   path: "/warning/system/operate",
        //   children: "",
        // },
        // {
        //   id: 123667,
        //   name: "硬件配置",
        //   path: "/system/hardware",
        //   children: "",
        // },
        {
          id: 7845123667,
          name: "百度热力分布图",
          path: "/system/hot/map",
          children: "",
        }
        // {
        //   id: 78451236673432,
        //   name: "天地热力分布图",
        //   path: "/system/hot/tdmap",
        //   children: "",
        // }
      ], //左侧导航数据数组
      defaultOpen: ["0"],
      zg: "",
    };
  },
  computed: {
    activeNav() {
      //当前激活的导航
      return this.$route.path;
    },
    /*
     * 在VUEX中获得asideColor颜色值
     * */
    ...mapGetters({
      getAsideColor: "globalSetting/AsideColor",
      getATextColor: "globalSetting/ATextColor",
      getActiveColor: "globalSetting/ActiveColor",
      getDoubleOpen: "globalSetting/DoubleOpen",
      getCollapseState: "header/CollapseState",
    }),
  },
  async created() {
    var token = sessionStorage.getItem("access_token");
    if (!token) {
      this.nav = [];
    } else {
      this.username = sessionStorage.getItem("username");
      cjlwlkj().then((res=>{
        this.zg = res.data.name;
      }))
      this.$store.dispatch("header/setNavs", {
        nav: this.nav,
      });
    }


    // const side =await this.$http.get(`../../../../public/side.json`);
    // console.log(side);
    //获得导航的json数据
    // console.log(location);
    // const res = await this.$http.get(`/menu/findAll`);
    // this.$store.dispatch("header/setNavs", {
    //   nav: res.data,
    // });
    // console.log(res);
    // this.nav = res.data;

    // Axios({
    //   url: location.origin + "/side.json",
    //   method: "get",
    // }).then((res) => {
    //   console.log(res);
    //   this.$store.dispatch("header/setNavs", {
    //     nav: res.data.data,
    //   });
    //   console.log(res);
    //   this.nav = res.data.data;
    // });
  },
  components: {
    SideNav,
  },
};
</script>

<style scoped>
@import "~font-awesome/css/font-awesome.min.css";
.bg {
  background-color: #32373d;
}

.toggle-button {
  /* width: 220px; */
  background-color: #263238;
  font-size: 14px;
  line-height: 15px;
  padding-left: 10px;
  padding-right: 10px;
  color: #fff;
}

.el-menu-vertical:not(.el-menu--collapse) {
  /* padding-top: 60px; */
  width: 240px;
  min-height: 400px;
  height: calc(100% - 70px);
}

.aside-show {
  width: 200px;
  max-width: 200px;
  min-height: 400px;
  height: 100%;
}

.aside-hide {
  width: 64px;
  max-width: 64px;
  min-height: 400px;
  height: 100%;
}

.el-menu--collapse {
  height: 100%;
  /* margin-top: 60px; */
}

.el-submenu [class^="fa"] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 16px;
}
.aside_con {
  /* padding-top:60px ; */

  background-color: #324148 !important;
}
.top1 {
  display: inline-block;
  line-height: 46px;
}
</style>
<style>
.el-table__header-wrapper {
  border-top: 1px solid #ebeef5 !important;
}
.el-menu-item.is-active {
  background-color: #29b0a3 !important;
  color: white !important;
}
</style>