<template>
  <div>
    <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="单位登记" level2="人员登记" level3="员工卡发卡"></my-bread>
    </div>
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <!--搜索  -->
      <el-row>
        <el-col :span="24">
          <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询姓名</h5>
        </el-col>

        <el-col style="padding-left:15px" :span="22">
          <el-col :span="4">
            <el-input
              size="small"
              style=" width: 100%;"
              @clear="loadUserList()"
              clearable
              class="input-serach"
              placeholder="请输入姓名"
              v-model="username"
              @input="searchUser"
            ></el-input>
          </el-col>

          <el-col style="padding-left:15px" :span="4">
            <el-select
              filterable
              @clear="loadUserList()"
              clearable
              size="small"
              style=" width: 100%;"
              @input="searchUser()"
              v-model="unitId"
              placeholder="单位名称"
            >
              <el-option v-for="item in select" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>

          <el-col style="padding-left:15px" :span="4">
            <el-select
              filterable
              @clear="loadUserList()"
              clearable
              size="small"
              style=" width: 100%;"
              @input="searchUser()"
              v-model="cardInformation"
              placeholder="是否发卡"
            >
              <el-option
                v-for="item in optionslei"
                :key="item.id"
                :label="item.lei"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>

          <el-col style="margin-left:30px" :span="4">
            <el-button
              size="small"
              style=" width: 100%;"
              @click="searchUser()"
              class="el_button"
              icon="el-icon-search"
            >搜索</el-button>
          </el-col>
        </el-col>
      </el-row>
      <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>

      <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button type="success" @click="showEdituser()" size="small">标签卡发卡</el-button>
        </el-col>
        <!-- <el-col :span="2">
          <el-button type="success" @click="showAddUserDia()"  size="small">
            <i style="padding-right:10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>-->
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          class="tableClass"
          border
          :data="userlist"
          style="width: 100%;margin:20px 0px;padding-bottom:40px"
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
        >
          <el-table-column type="index" label="序号" width="50" style="line-height:30px"></el-table-column>

          <el-table-column prop="username" label="员工姓名" show-overflow-tooltip></el-table-column>
           <el-table-column prop="code" label="员工编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
          <el-table-column prop="idCard" label="身份证" show-overflow-tooltip></el-table-column>
          <el-table-column prop="unitName" label="单位名称" show-overflow-tooltip></el-table-column>

          <el-table-column prop="labelNo" label="标签号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="noDateEnd" label="到期时间" show-overflow-tooltip>
            <template slot-scope="socpe">{{socpe.row.noDateEnd | fmtdate}}</template>
          </el-table-column>
          <el-table-column prop="isCard" label="是否发卡" show-overflow-tooltip>
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].isCard==0">未发卡</p>
              <p v-if="userlist[scope.$index].isCard==1">已发卡</p>
            </template>
          </el-table-column>
          <!-- noDateEnd -->
          <el-table-column prop="cardInformation" label="发卡信息" show-overflow-tooltip>
          </el-table-column>
          <!-- 表格操作 -->
        </el-table>
      </template>
      <!-- 4.分页 -->
      <!-- 》该接口支持分页 url参数中有pagenum，pagesize
          @size-change 每页显示条数变化时触发
          @current-change当前页改变时触发
          :current-page 设置当前页是第几页
           :page-sizes="[5, 10, 15, 20]"每页多少条的数据组
           :page-size="5"设置显示多少条
           :total="400"分页总数
      -->
      <el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10,15,20,25,30,35]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <!-- <el-dialog
        title="添加用户"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="姓名" label-width="100px" prop="username">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="发卡信息" label-width="100px" prop="cardInformation">
               
                 <el-select style="width: 100%" v-model="form.cardInformation">
                  <el-option
                    v-for="item in optionslei"
                    :key="item.id"
                    :label="item.lei"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="联系电话" label-width="100px" prop="phone">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
             
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="标签号" label-width="100px" prop="labelNo">
                <el-input v-model="form.labelNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="发证日期" label-width="100px" prop="noDateStart">
                <el-date-picker
                  type="date"
                  placeholder="发证日期"
                  v-model="form.noDateStart"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="到期时间" label-width="100px" prop="noDateEnd">
                <el-date-picker
                  type="date"
                  placeholder="到期时间"
                  v-model="form.noDateEnd"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
              <el-form-item label="作业人员证" label-width="100px" prop="operatorsNo">
                <el-input v-model="form.operatorsNo" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
             
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="11">
             
            </el-col>

            <el-col :span="2"></el-col>
            <el-col :span="11">
            
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>-->

      <!-- 编辑对话框 -->
      <el-dialog title="发卡" :close-on-click-modal="false" :visible.sync="dialogFormVisibleEdit">
        <div v-html="this.html"></div>
        <!-- <p style="text-align:center">
          <el-button @click="dialogFormVisibleEdit = false">取消发卡</el-button>
          <el-button type="primary" @click="EditUser()">确认发卡</el-button>
        </p>-->
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import "../../assets/jquery-1.12.4.min.js";
import jwtDecode from "jwt-decode";
// import $ from "jquery";
// import "./wsrProxyTest_iso14443.js";
// import wsrProxy from  "wsrProxy";
import { wsrProxy } from "./wsrProxy.min.js";
// import {myfun} from "../../assets/text.js"; //注意路径
export default {
  name: "filling",
  data() {
    return {
      username: "",
      value: "",
      userlist: [],
      token: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      unitId: "",
      cardInformation: "",
      html: "",
      userId: "",
      optionslei: [
        {
          id: 0,
          lei: "未发卡",
        },
        {
          id: 1,
          lei: "已发卡",
        },
      ],
      pageSize: 10,
      // 添加对话框的属性
      // dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      // dialogFormVisibleRoleshow: false,
      //添加用户的表单的数据
      // form: {
      //   username: "",
      //   phone: "",
      //   labelNo: "",
      //   cardInformation: "",
      //   noDateEnd: "",
      //   noDateStart: "",
      //   operatorsNo: "" //作业人员证
      // },
      // rules: {
      //   vestingName: [
      //     { required: true, message: "公司名称不能为空", trigger: "blur" }
      //   ],
      //   idcard: [
      //     { required: true, message: "身份证不能为空", trigger: "blur" },
      //     {
      //       pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
      //       message: "证件号码格式有误！"
      //     }
      //   ],
      //   userNo: [
      //     { required: true, message: "员工编号不能为空", trigger: "blur" }
      //   ],
      //   username: [
      //     { required: true, message: "员工姓名不能为空", trigger: "blur" }
      //   ],
      //   phone: [
      //     { required: true, message: "手机不能为空", trigger: "blur" },
      //     { min: 11, max: 11, message: "请输入正确的手机格式" },
      //     {
      //       pattern: /^1[3456789]\d{9}$/,
      //       message: "手机号格式不对",
      //       trigger: "blur"
      //     }
      //   ],
      //   labelNo: [
      //     { required: true, message: "标签号不能为空", trigger: "blur" }
      //   ],
      //   operatorsNo: [
      //     { required: true, message: "作业人员证不能为空", trigger: "blur" }
      //   ],
      //   noDateStart: [
      //     { required: true, message: "发证日期不能为空", trigger: "blur" }
      //   ],
      //   noDateEnd: [
      //     { required: true, message: "换证日期不能为空", trigger: "blur" }
      //   ],
      //   cardInformation: [
      //     { required: true, message: "发卡信息不能为空", trigger: "blur" }
      //   ]
      // },
      // 编辑
      // editUserForm: {
      //   username: "",
      //   number: "",
      //   sex: "",
      //   mobile: "",
      //   mond: ""
      // }
      select: [],
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
  },
  created() {
    this.getUserlist();
    this.suosudan();
    // wsr.init()
    // console.log(wsrProxy.init());
  },
  methods: {
    async suosudan() {
      const res = await this.$http.get(`/unit/findUnit`);
      console.log(res);
      this.select = res.data.data;
      //  /public/gas/manageGasBasicCylinder/affiliated/company
    },
    // 发卡对话框打开
    async showEdituser(rowid) {
      let tokens = this.token;
      let token = sessionStorage.getItem("access_token");
      let unitId = sessionStorage.getItem("unitId");
      let username = sessionStorage.getItem("username");
      console.log(username);
      const res = await this.$http.post(`send/sendService`, tokens);
      console.log(res);
      if (res.data.code == 201) {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
      } else {
        let http = res.data.data;
        window.open(
          `${http}/sendCard/tuckComb?unitId=${unitId}&username=${username}`,
          "_blank"
        );
      }
    },
    // 发卡
    EditUser() {
      debugger;
      var wsr = wsrProxy;
      console.log(wsr);
      wsr.init();
      var rt = 0; //返回值
      var port = 0; //端口号
      var keyType = 0; //密码类型
      var key = "FFFFFFFFFFFF"; //密码
      var v1 = 5000,
        v2 = 0; // var block = 12; //块号
      var block = 5; //块号
      var delaytime = 5; // 峰鸣时长
      var obj = { cardno: "", uid: "", len: 0 };
      // 打开端口
      rt = wsr.ws_openPort(port);
      console.log(rt);
      // ----------一个个方法去调通就好了
      // try {
      wsr.ws_set_mode(wsr.MODE_TIMEOUT, 1000);

      wsr.ws_beep(port);
      rt = wsr.ws_getCardNo_String(port, obj);
      // if (rt < 0) {
      //   alert("请放入卡片");
      //   return rt;
      // }
      if (rt < 0) return rt;
      rt = wsr.ws_beepex(port, delaytime);
      if (rt < 0) return rt;

      // 读取设备唯一序列号
      rt = wsr.ws_get_dev_id(port, obj);
      if (rt < 0) return rt;
      console.log("device id:" + obj.id);

      // 读取设备信息
      rt = wsr.ws_get_dev_info(port, obj);
      if (rt < 0) return rt;
      console.log("device info:" + obj.info);
      // } finally {
      wsr.ws_closePort(port);
      // }
      RefreshWin();
    },

    //   添加用户发送请求
    // async AddUser() {
    //   this.$refs.form.validate(async valid => {
    //     if (valid) {
    //       const res = await this.$http.post(`/no-user`, this.form);
    //       console.log(res);
    //       if (res.data.code === 0) {
    //         // 回到第一页展示
    //         //this.pagenum = 1;
    //         // 重新请求数据
    //         this.getUserlist();
    //         // 提示
    //         this.$message({
    //           type: "success",
    //           message: res.data.msg
    //         });
    //         this.dialogFormVisibleAdd = false;
    //       } else {
    //         this.$message({
    //           type: "danger",
    //           message: "新增失败"
    //         });
    //         this.dialogFormVisibleAdd = true;
    //       }
    //     } else {
    //       this.$message({
    //         type: "error",
    //         message: "请填写内容再试"
    //       });
    //       this.dialogFormVisibleAdd = true;
    //     }
    //   });
    // },
    // 添加用户显示对话框
    // showAddUserDia() {
    //   // 先点编辑 再点添加 打开表单清空表单
    //   this.form = {};
    //   this.dialogFormVisibleAdd = true;
    // },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
      // this.value = "";
      // this.query.vestingCode = "";
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      // if (this.username != "") {

      const res = await this.$http.get(
        `/sendCard/pageEmployeeTuckComb?pageSize=${this.pageSize}&currPage=${this.currPage}&username=${this.username}&unitId=${this.unitId}&cardInformation=${this.cardInformation}`
      );
      console.log(res);
      if (res.data.code === 0) {
        // 回到第一页展示
        //this.pagenum = 1;
        // 重新请求数据

        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
        // this.$message({
        //   type: "success",
        //   message: res.data.msg
        // });
      }
      // else {
      //   this.$message({
      //     type: "danger",
      //     message: "查询失败"
      //   });
      // }
      // console.log("aaaaaa");
      // }
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      // this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
      this.getUserlist();
    },
    async getUserlist() {
      let access_token = sessionStorage.getItem("access_token");
      let decode = jwtDecode(access_token);
      console.log(decode);
      this.token = decode.authorities;
      //  this.unitIds = sessionStorage.getItem("unitId");
      const res = await this.$http.get(
        `no-user/findPage?pageSize=${this.pageSize}&currPage=${this.currPage}&unitId=${this.unitId}&cardInformation=${this.cardInformation}`
      );
      console.log(res);

      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
    },
  },
};
</script>
<style scoped>
.el-tooltip__popper {
  max-width: 0%;
}
.arrow_right {
  padding: 10px 0px;
  margin-bottom: 10px;
}

/* .pp{
     justify-content: flex-end;
  } */
.input-serach {
  width: 400px;
}

.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
</style>
<style>
.el-table td,
.el-table th {
  text-align: center !important;
}
/* .el-table__row{
  height: 20px !important;
} */

.el-table .warning-row {
  background: rgb(250, 249, 249) !important;
}

.el-table .success-row {
  background: rgb(250, 249, 249) !important;
}
.el-card__body {
  padding: 0;
}
</style>