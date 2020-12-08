import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const login = () => import('../views/Login')
const home = () => import('../components/Home')

const notPath = () => import('../views/error/NotPath_404')

const administration =() => import ('@/components/system/administration')  //角色管理
const hardware = () => import ('@/components/system/hardware') //硬件配置
const username = () =>import('@/components/system/username') //用户管理
const operation = () =>import('@/components/system/operation') //系统管理日志

// const update = () =>import('@/components/system/update') //应用更新
// const notice = () =>import('@/components/system/notice') //公告管理

// 单位登记
const supervise = () =>import('@/components/registration/registration1') //监管机构
const manufacture = () =>import('@/components/registration/registration2') //制造单位
const fillingunit =() =>import('@/components/registration/registration3')  //充装单位
const price =() =>import('@/components/registration/price') //价格查询
const prices =() =>import('@/components/registration/prices')  //充装单位价格查询
const building = () =>import('@/components/registration/registration5')  //使用单位
const inspection = () =>import('@/components/registration/registration4') //检验单位
const Distribution = () =>import('@/components/registration/registration6') //配送单位
const specificLocation =() =>import('../components/registration/registration7') //其它单位

const developers = () =>import('@/components/registration/developers')  //人员管理

//气瓶登记
// const cylinder =() =>import('@/components/archives/cylinder')  //液化档案新增
// const message =() =>import('@/components/archives/message')  //液化信息查看
// const report =() =>import('@/components/archives/report')  //液化检验报告
// const tagboard =() =>import('@/components/archives/tagboard')  //液化标签发卡
// const wraning = () => import('@/views/archivesmanage/warning') //气瓶超期预警
// const company = () => import('@/views/Transportmanage/enterpriser') //运输企业登记管理
// const record = () => import('@/views/Transportmanage/record') //运输车辆档案管理
// const portfolio = () => import('@/views/customermanage/portfolio') //客户档案管理
// const order = () => import('@/views/customermanage/order') //客户订单管理
// const evaluation = () =>import('@/views/customermanage/evaluate') // 客户评价投诉处理
// const filling = () =>import('@/views/Comprehensive/trace') // 气瓶充装记录
// const exception = () =>import('@/views/warningmange/abnormal') // 气瓶异常充装信息
// const delivery = () =>import('@/views/wandermanage/accomplish') //送货完成气瓶
// const bottleNumber = () =>import('@/views/wandermanage/warehousing') //入栈气瓶统计
// const outbound = () =>import('@/views/wandermanage/outbound') //出栈气瓶统计
// const distribution = () =>import('@/views/wandermanage/distribution') //送货完成气瓶
// const map = () =>import('@/views/wandermanage/map') //气瓶地图显示

// 工业气瓶
const bottleFilling = ()=>import('../views/IndustrialCylinders/gytrace') //工业气瓶充装记录
const order =()=>import('../views/IndustrialCylinders/order') //工业气瓶客户订单
// 液化气瓶
const liqueryOrder = ()=>import('../views/liquery/liqueryOrder') //液化气瓶客户订单
const liqueryTrace = () =>import('../views/liquery/liqueryTrace') //液化气瓶充装记录
// 车用气瓶
const carAuto =() =>import('../views/automobileCylinder/carAuto') //车用气瓶充装记录
const carbindustrial =() =>import('../views/vehicleCylinders/carbindustrial') //车用气瓶档案新增
const cinmessage =() =>import('../views/vehicleCylinders/carmessage') //车用气瓶信息查看

// 压力器容器
const yidongtrace =() =>import('../views/ydpressureVessel/yidongtrace') //移动压力容器充装记录
const yidongdemand =() =>import('../views/ydpressureVessel/yidongdemand') //移动充装档案记录
const yidongscannogam =() =>import('../views/ydpressureVessel/yidongscannogam') //移动充装扫描记录
const yidongverify = () =>import('../views/ydpressureVessel/yidongverify') //移动检验变更记录
const listingData = () =>import('../views/ydpressureVessel/listingData') //挂牌车头数据

// 热力分析图
const hotMap = () =>import('../views/hotMap/hotmap') //热力分析图
// const hottdmap = () =>import('../views/hotMap/hottdmap') //热力天地图

const routes = [
  {
    path: '/',
    meta: {
      title: '登录页面'
    },
    component: login
  },
  {
    path: '/404',
    meta: {
      title: '错误页面-404'
    },
    component: notPath
  },
  {
    path: '/',
    redirect: '/system/role',
    component: home,
    children: [
      {
        path: "/system/role",
        name: "administration",
        meta: {
          title: '角色管理'
        },
        component: administration
      },
      {
        path: '/system/hardware',
        name: "hardware",
        meta: {
          title: '硬件配置'
        },
        component:hardware
      },
      {
       path:"/system/user",
       name:"username",
       meat:{
         title:"用户管理"
       },
       component:username
      },
      {
        path:"/warning/system/operate",
        name:"operation",
        meta:{
          title:"系统操作日志"
        },
        component:operation
      },
      {
        path:"/unit/unit/supervise",
        name:"supervise",
        meta:{
          title:"监管机构"
        },
        component:supervise
      },
      {
        path:"/unit/unit/made",
        name:"manufacture",
        meta:{
          title:"制造单位"
        },
        component:manufacture
      },
      {
        path:"/unit/unit/filling",
        name:"fillingunit",
        meta:{
          title:"充装单位"
        },
        component:fillingunit
      },
      {
        name:"developers",
        path:'/unit/personnel/user',
        meta:{
          title:"人员管理"
        },
        component:developers
      },
      {
        path:"/unit/unit/use",
        name:"building",
        meta:{
          title:"使用单位"
        },
        component:building
      },
      {
        path:"/unit/unit/checkout",
        name:"inspection",
        meta:{
          title:"检验单位"
        },
        component:inspection
      },
      {
        path:"/unit/unit/delivery",
        name:"Distribution",
        meta:{
          title:"配送单位"
        },
        component:Distribution
      },
      {
       path:"/unit/qitait",
       name:"specificLocation",
       meta:{
         title:"其它单位"
       },
       component:specificLocation
      },
      {
        path:"/prices",
        name:"prices",
        meta:{
          title:"价格查询"
        },
        component:prices
      },
      {
        path:"/price",
        name:"price",
        meta:{
          title:"配送单位价格查看"
        },
        component:price
      },
      {
        path:"/query/industrial/bottleFilling",
        name:"bottleFilling",
        meta:{
          title:"工业气瓶充装记录"
        },
        component:bottleFilling
      },
      {
        path:"/query/industrial/client",
        name:"order",
        meta:{
          title:"工业气瓶客户订单"
        },
        component:order
      },
      {
        path:"/query/liquer/client",
        name:"liqueryOrder",
        meta:{
          title:"液化气瓶客户订单"
        },
        component:liqueryOrder
      },
      {
        path:"/query/liquer/bottleFilling",
        name:"liqueryTrace",
        meta:{
          title:"液化气瓶充装记录"
        },
        component:liqueryTrace
      },
      {
        path:"/query/car/bottleFilling",
        name:"carAuto",
        meta:{
          title:"车用气瓶充装记录"
        },
        component:carAuto
      },
      {
        path:"/unit/car/carsupervise",
        name:"carbindustrial",
        meta:{
          title:"车用气瓶档案新增"
        },
        component:carbindustrial
      },
      {
        path:"/cinmessage",
        name:"cinmessage",
        meta:{
          title:"车用气瓶信息查看"
        },
        component:cinmessage
      },
      {
        path:"/query/phone/fill",
        name:"yidongtrace",
        meta:{
          title:"移动式压力容器充装记录"
        },
        component:yidongtrace
      },
      {
        path:"/query/phone/dangan",
        name:"yidongdemand",
        meta:{
          title:'移动充装档案查询'
        },
        component:yidongdemand
      },
      {
        path:"/query/phone/fillscan",
        name:"yidongscannogam",
        meta:{
          title:"移动充装扫描记录"
        },
        component:yidongscannogam
      },
      {
        path:"/query/phone/check",
        name:"yidongverify",
        meta:{
          title:"移动检验变更记录"
        },
        component:yidongverify
      },
      {
        path:"/query/guapai/fill",
        name:"listingData",
        meta:{
          title:"挂头车牌数据"
        },
        component:listingData
      },
      {
        path:"/system/hot/map",
        name:"hotMap",
        meta:{
          title:"热力分布图"
        },
        component:hotMap
      }
      // {
      //   path:"/system/hot/tdmap",
      //   name:"hottdmap",
      //   meat:{
      //     title:"天地热力分布图"
      //   },
      //   component:hottdmap
      // }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: __dirname,
  base: process.env.BASE_URL,
  routes
})

/*
* 全局前置路由
* */
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title
//   if (to.matched.length === 0) {
//     next('/404')
//   }
//   //校验是否登录，防止不登录，直接进入其他页面
//   if ((to.path == '/login' && from.path === '/') || (to.path == '/welcome' && from.path === '/login')) {
//     next()
//   } else {
//     if (sessionStorage.getItem('profile') === null) {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })


//重写路由的push方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default router
