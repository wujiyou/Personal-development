<template>
  <div style="height: 100%">
    <el-container>
      <el-header class="headerPos">
        <HeadTitle></HeadTitle>
      </el-header>

      <el-container
        class="container-aside"
        :style="{ paddingLeft: getCollapseState == false ? '240px' : '64px' }"
      >
        <el-aside
          style="width: auto"
          class="aside aside-flex"
          :class="{
            'aside-show': getCollapseState == false ? true : false,
            'aside-hide': getCollapseState == true ? true : false,
          }"
        >
          <Aside></Aside>
        </el-aside>
        <el-main
          :style="{ paddingTop: '0px', paddingLeft: '0', paddingRight: '0' }"
        >
          <AsideTitle></AsideTitle>
          <!--页面的展示-->
          <transition name="compAnimate" appear>
            <keep-alive>
              <router-view
                :style="{ padding: '0 20px', marginTop: '55px' }"
              ></router-view>
            </keep-alive>
          </transition>
        </el-main>
        <Footer></Footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../views/layout/leftAside/Aside";
import Header from "../views/layout/rightMain/Header";
import HeadTitle from "../views/layout/headerTitle/headTitle";
import GlbSetting from "./GlbSetting";
import AsideTitle from "../views/layout/rightMain/AsideTitle";
import Crumbs from "../views/layout/rightMain/Crumbs";
import Footer from "../views/layout/rightMain/Footer";
import { mapGetters } from "vuex";
import style from "../assets/css/public.css";

export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    /*
     * 在VUEX中获得asideColor颜色值
     * */
    ...mapGetters({
      getCollapseState: "header/CollapseState",
      getNavs: "header/Navs",
      getAsideTitle: "header/AsideTitle",
      getCount: "header/Count",
    }),
  },
  watch: {
    $route: function (to) {
      console.log(to);
      this.createTabs(to.path);
    },
  },
  methods: {
    createTabs(path) {
      if (path !== "/welcome") {
        let asideItem = new Object();
        //得到当前点击的左侧导航的名字，存入vuex的header/asideTitle中
        let nav = this.getNavs.nav;
        console.log(nav);
        for (let i = 0; i < nav.length; i++) {
          const parentTitle = nav[i].name;
          //判断是否存在子导航，如果存在则取子导航的名字，如果没有，则取当前的导航名字
          if (nav[i].children) {
            for (let j = 0; j < nav[i].children.length; j++) {
              if (nav[i].children[j].path === path) {
                const childTitle = nav[i].children[j].name;
                //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
                let result = this.getAsideTitle.filter((item) => {
                  return item.name === nav[i].children[j].name;
                });
                if (result.length == 0) {
                  //添加标题标签
                  let count = this.getCount;
                  count++;
                  this.$store.commit("header/setCount", count);
                  asideItem.name = nav[i].children[j].name;
                  asideItem.path = nav[i].children[j].path;
                  asideItem.activeIndex = count;
                  this.$store.commit("header/setAside", asideItem);
                  this.$store.commit("header/setActiveIndex", count);
                  this.setCrumbs(parentTitle, childTitle);
                  return;
                } else {
                  //定位到当前标题标签
                  if (nav[i].children[j].path === path) {
                    let result = this.getAsideTitle.filter((item) => {
                      return item.name === nav[i].children[j].name;
                    });
                    this.$store.commit(
                      "header/setActiveIndex",
                      result[0].activeIndex
                    );
                    this.setCrumbs(parentTitle, childTitle);
                  }
                }
              }
            }
          } else {
            if (nav[i].path === path) {
              //判断vuex中是否已经存在当前标题，如果存在则不处理，否则添加入vuex中
              let result = this.getAsideTitle.filter((item) => {
                return item.name === nav[i].name;
              });
              const childTitle = nav[i].name;
              //添加标题标签
              if (result.length == 0) {
                let count = this.getCount;
                count++;
                this.$store.commit("header/setCount", count);
                asideItem.name = nav[i].name;
                asideItem.path = nav[i].path;
                asideItem.activeIndex = count;
                this.$store.commit("header/setAside", asideItem);
                this.$store.commit("header/setActiveIndex", count);
                this.setCrumbs(childTitle, "");
                return;
              } else {
                //定位到当前标题标签
                if (nav[i].path === path) {
                  let result = this.getAsideTitle.filter((item) => {
                    return item.name === nav[i].name;
                  });
                  this.$store.commit(
                    "header/setActiveIndex",
                    result[0].activeIndex
                  );
                  this.setCrumbs(childTitle, "");
                }
              }
            }
          }
        }
      } else {
        this.$store.commit("header/setActiveIndex", 0);
        this.setCrumbs("控制台", "角色管理");
      }
    },
    setCrumbs(pt, ct) {
      let crumbs = new Array();
      crumbs.push(pt, ct);
      this.$store.commit("header/setCrumbs", crumbs);
    },
  },
  components: {
    Aside,
    HeadTitle,
    Header,
    GlbSetting,
    AsideTitle,
    Crumbs,
    Footer,
  },
};
</script>

<style scoped>
.headerPos {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #324148;
}
.el-aside {
  color: #333;
}

.el-tabs--card > .el-tabs__header {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 1000;
  opacity: 1;
  background-color: #ffffff;
  margin: 0;
  padding-right: 20px;
}

.el-row {
  margin-bottom: 15px;
}

/*组件过渡动画*/
.compAnimate-enter {
  opacity: 0;
  transform: translateY(-60px);
}

.compAnimate-leave-to {
  opacity: 0;
}

.compAnimate-enter-active {
  transition: all 0.8s ease-in-out;
}
.compAnimate-leave-active {
  transition: all 0.2s ease;
}

>>> .el-card__body {
  padding: 0 !important;
}
</style>