<template>
  <div>
    <el-col :span="24">
      <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px"></h5>
    </el-col>

    <el-col style="margin-bottom:10px;margin-top:10px" :span="24">
      <el-col :span="20">&nbsp;</el-col>
      <el-col :span="2">
        <el-button style="font-size:13px" type="success" size="small" @click="showAddUserDias()">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button
          style="font-size:13px"
          type="danger"
          size="small"
          plain
          icon="el-icon-delete"
          @click="showDelete"
        >删除</el-button>
      </el-col>
    </el-col>

    <el-col :span="24">
      <p style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px"></p>
    </el-col>

    <template>
      <el-table
        border
        :data="userlists"
        style="width: 100%;margin:10px 0px;padding-bottom:40px"
        :row-style="{height:'40px'}"
        :cell-style="{padding:'0px'}"
        @selection-change="handleCurrentChang"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
          <template slot-scope="socpe">
            <p style="cursor:pointer;" @click="xiugaiusers(socpe.row)">{{socpe.$index+1}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="username" label="账号" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="idCard" label="身份证" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="workNumber" label="作业人员证号" width="170" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="siteName" label="所属站点" show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="type" label="人员类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <p v-if="userlists[scope.$index].type==0">充装人员</p>
            <p v-if="userlists[scope.$index].type==1">检验人员</p>
            <p v-if="userlists[scope.$index].type==2">配送人员</p>
            <p v-if="userlists[scope.$index].type==3">监管人员</p>
          </template>
        </el-table-column>
        <el-table-column prop="certificateTime" label="发证日期" show-overflow-tooltip>
          <template slot-scope="socpe">{{socpe.row.certificateTime | fmtdate}}</template>
        </el-table-column>
        <el-table-column
          prop="renewalTime"
          :formatter="dateFormat"
          label="换证日期"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
      </el-table>
    </template>

    <el-pagination
      style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
      background
      @size-change="handleSizeChanges"
      @current-change="handleCurrentChanges"
      :current-page="pagess"
      :page-sizes="[10,15,20,25,30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
    ></el-pagination>

    <!-- 新增app用户数据弹出框 -->
    <el-dialog
      title="添加信息"
      v-dialogDrag
      ref="dialog__wrapper"
      :close-on-click-modal="false"
      width="80%"
      :visible.sync="dialogFormVisibleAddapp"
      append-to-body
    >
      <el-form :model="former" ref="former" :rules="rulesss">
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item hidden prop="provinceCode" label-width="140px" label="行政省份:">
              <el-select
                :disabled="showCmd"
                v-model="former.provinceCode"
                @change="function2(former.provinceCode)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ProvinceId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item hidden prop="cityCode" label-width="140px" label="市级区域:">
              <el-select
                :disabled="showCmd"
                v-model="former.cityCode"
                @change="function1(former.cityCode)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in CityId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item hidden prop="areaCode" label-width="140px" label="区级:">
              <el-select :disabled="showCmds" v-model="former.areaCode" placeholder="请选择">
                <el-option
                  v-for="item in AreaId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="11">
            <el-form-item label="姓名" class="red_s" label-width="150px" prop="name">
              <el-input v-model="former.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="账号" class="red_s" label-width="150px" prop="username">
              <el-input v-model="former.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="11">
            <el-form-item label="密码" class="red_s" label-width="150px" prop="password">
              <el-input v-model="former.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="身份证" label-width="150px" prop="idCard">
              <el-input v-model="former.idCard" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="11">
            <el-form-item label="确认密码" class="red_s" label-width="150px" prop="againPassword">
              <el-input
                v-model="former.againPassword"
                type="password"
                autocomplete="off"
                @change="mima()"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="联系电话" label-width="150px" prop="phone">
              <el-input v-model="former.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="11">
            <el-form-item label="员工类型" label-width="150px" prop="type">
              <el-select :disabled="showpeople" style="width: 100%" v-model="former.type">
                <el-option
                  v-for="item in selectss"
                  :key="item.id"
                  :label="item.siteNames"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="作业人员证号" label-width="150px" prop="workNumber">
              <el-input v-model="former.workNumber" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item hidden label="作业人员证号" label-width="150px" prop="unitId">
              <el-input v-model="former.unitId" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="11">
            <el-form-item label="发证日期" label-width="150px" prop="certificateTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="former.certificateTime"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="换证日期" label-width="150px" prop="renewalTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="former.renewalTime"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lose()">取 消</el-button>
        <el-button type="primary" @click="AddUserapp()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改app用户数据弹出框 -->
    <el-dialog
      title="修改信息"
      v-dialogDrag
      ref="dialog__wrapper"
      :close-on-click-modal="false"
      width="80%"
      :visible.sync="changeVisibleAddapp"
      append-to-body
    >
      <el-form :model="former" ref="former" :rules="rulesss">
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item hidden prop="provinceCode" label-width="140px" label="行政省份:">
              <el-select
                :disabled="showCmd"
                v-model="former.provinceCode"
                @change="function2(former.provinceCode)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ProvinceId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item hidden prop="cityCode" label-width="140px" label="市级区域:">
              <el-select
                :disabled="showCmd"
                v-model="former.cityCode"
                @change="function1(former.cityCode)"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in CityId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item hidden prop="areaCode" label-width="140px" label="区级:">
              <el-select :disabled="showCmds" v-model="former.areaCode" placeholder="请选择">
                <el-option
                  v-for="item in AreaId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="11">
            <el-form-item label="姓名" label-width="150px" prop="name">
              <el-input v-model="former.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="账号" label-width="150px" prop="username">
              <el-input v-model="former.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="11">
            <el-form-item label="联系电话" label-width="150px" prop="phone">
              <el-input v-model="former.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="身份证" label-width="150px" prop="idCard">
              <el-input v-model="former.idCard" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <!-- <el-col :span="11">
              <el-form-item label="确认密码" label-width="150px" prop="againPassword">
                <el-input v-model="former.againPassword" type="password" autocomplete="off"></el-input>
              </el-form-item>
          </el-col>-->

          <el-col :span="2"></el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="11">
            <el-form-item label="员工类型" label-width="150px" prop="type">
              <el-select disabled style="width: 100%" v-model="former.type">
                <el-option
                  v-for="item in selectss"
                  :key="item.id"
                  :label="item.siteNames"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="作业人员证号" label-width="150px" prop="workNumber">
              <el-input v-model="former.workNumber" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item hidden label="unitId" label-width="150px" prop="unitId">
              <el-input v-model="former.unitId" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="11">
            <el-form-item label="发证日期" label-width="150px" prop="certificateTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="former.certificateTime"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="2"></el-col>
          <el-col :span="11">
            <el-form-item label="换证日期" label-width="150px" prop="renewalTime">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="former.renewalTime"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="11">
            <el-form-item hidden label="密码" label-width="150px" prop="password">
              <el-input v-model="former.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeVisibleAddapp = false">取 消</el-button>
        <el-button type="primary" @click="xiugaUserapp()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showCmd: true,
      showCmds: true,
      showCmd_1: true,
      showpeople:true,
      userlists: [],
      provinceCode: "",
      cityCode: "",
      areaCode: "",
      tyPe: "",
      unitId: "",
      pagess: 1,
      totals: -1,
      rows: 10,
      curr: 1,
      ProvinceId: [],
      AreaId:[],
      CityId: [],
      codes: "",
      citys: "",
      areas: "",
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id
      dialogFormVisibleAddapp: false, //app添加弹出框
      changeVisibleAddapp: false, //修改app弹出框
      former: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        name: "",
        username: "",
        password: "",
        againPassword: "",
        idCard: "",
        phone: "",
        renewalTime: "",
        certificateTime: "",
        workNumber: "", //作业人员证号
        type:"",
        unitId: "",
      },
      selectss: [
        {
          id: 0,
          siteNames: "充装人员",
        },
        {
          id: 1,
          siteNames: "检验人员",
        },
        {
          id: 2,
          siteNames: "配送人员",
        },
        {
          id: 3,
          siteNames: "监管人员",
        },
      ],
      rulesss: {
        name: [{ required: true, message: "员工姓名", trigger: "blur" }],
        username: [{ required: true, message: "员工账号", trigger: "blur" }],
        password: [
          { required: true, message: "密码", trigger: "blur" },
          { min: 6, message: "请输入不少于6位的密码" },
        ],
        againPassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
          { min: 6, message: "请再次确认密码" },
        ],
        // idCard: [
        //   { required: true, message: "身份证", trigger: "blur" },
        //   {
        //     pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
        //     message: "证件号码格式有误！"
        //   }
        // ],
        // sex: [{ required: true, message: "性别", trigger: "blur" }],
        // adminNo: [
        //   { required: true, message: "特种设备行政许可编号", trigger: "blur" }
        // ],
        // number: [
        //   { required: true, message: "员工编号", trigger: "blur" }
        // ],
        // phone: [
        //   { required: true, message: "电话号码", trigger: "blur" },
        //   { min: 11, max: 11, message: "请输入11位手机号码", trigger: "blur" },
        //   {
        //     pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
        //     message: "请输入正确的手机号码"
        //   }
        // ],
        // workNumber: [
        //   { required: true, message: "作业人员账号不能为空", trigger: "blur" }
        // ],
        // address: [{ required: true, message: "详细地址不能为空", trigger: "blur" }],

        // siteId: [
        //   { required: true, message: "所属站点不能为空", trigger: "blur" }
        // ],

        // certificateTime: [
        //   { required: true, message: "发证日期不能为空", trigger: "blur" }
        // ],
        // renewalTime: [{ required: true, message: "换证日期", trigger: "blur" }]
      },
      pstype:"",
      watch: {
        dialogFormVisibleAdd: function (val, oldVla) {
          this.$refs["former"].resetFields();
        },
      },
    };
  },
  created() {
    this.appuser();
  },
  methods: {
    mima() {
      if (this.former.password != this.former.againPassword) {
        console.log(this.former.password);
        console.log(this.former.againPassword);
        this.$message({
          type: "error",
          message: "再次输入的密码不一致",
        });
      }
    },

    // 修改app用户弹出框
    xiugaiusers(user) {
      console.log(user);
      this.former = user;
      this.former.type = user.type;
      this.changeVisibleAddapp = true;
      this.appuser();
    },
    // 修改app用户确认发送请求
    async xiugaUserapp() {
      this.$refs.former.validate(async (valid) => {
        if (valid) {
          this.former.unitId = sessionStorage.getItem("unitIdss");
          this.former.provinceCode = sessionStorage.getItem("appprovinceCode");
          this.former.cityCode = sessionStorage.getItem("appcityCode");
          this.former.areaCode = sessionStorage.getItem("appareaCode");

          const res = await this.$http.put(`/app-user`, this.former);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.changeVisibleAddapp = false;

            // this.form = {};
            this.appuser();
          } else if (res.data.code === 1) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.changeVisibleAddapp = true;
          } else if (res.data.code === 2) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.changeVisibleAddapp = true;
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.changeVisibleAddapp = true;
        }
      });
    },
    // 新增app弹出框关闭
    lose() {
      this.dialogFormVisibleAddapp = false;
      this.appuser();
    },
    // app新增
    showAddUserDias() {
      this.former = {};
      this.pstype=sessionStorage.getItem("pstype")
      if(this.pstype==5){
        // 配送单位
        this.former.type = 2
        this.showpeople=true;
      }else if(this.pstype==0){
        // 监管机构
        this.former.type = 3
        this.showpeople=true;
      }else if(this.pstype==2){
        // 充装单位
        this.former.type = 0
        this.showpeople=true;
      }else if(this.pstype !=5 || this.pstype !=0 || this.pstype !=2){
        this.showpeople=false;
      }
      // this.former.type = 3;
      this.dialogFormVisibleAddapp = true;
    },

    //  新增app用户发送请求
    async AddUserapp() {
      if (this.former.password != this.former.againPassword) {
        this.$message({
          type: "error",
          message: "再次输入的密码不一致",
        });
        this.dialogFormVisibleAddapp = true;
      } else {
        this.$refs.former.validate(async (valid) => {
          if (valid) {
            this.former.unitId = sessionStorage.getItem("unitIdss");
            this.former.provinceCode = sessionStorage.getItem(
              "appprovinceCode"
            );
            this.former.cityCode = sessionStorage.getItem("appcityCode");
            this.former.areaCode = sessionStorage.getItem("appareaCode");
            console.log(this.former);
            const res = await this.$http.post(`/app-user`, this.former);
            console.log(res);
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddapp = false;

              // this.form = {};
              this.appuser();
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddapp = true;
            } else if (res.data.code === 2) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
              this.dialogFormVisibleAddapp = true;
            }
          } else {
            this.$message({
              type: "error",
              message: "请填写内容再试",
            });
            this.dialogFormVisiblenewUserapp = true;
          }
        });
      }
    },
    // 多选
    handleCurrentChang(val) {
      this.multipleSelection = val;
      // this.showDeleUserMsgBox = val.length;
    },
    showDelete() {
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      // console.log(this.delarr);
      if (this.delarr == "") {
        this.$message({
          type: "error",
          message: "请选择需要删除的数据",
        });
      } else {
        this.$confirm("是否删除这条信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            const res = await this.$http.post(`app-user/delete`, this.delarr);
            console.log(res);
            this.delarr = [];
            // this.getUserlist();
            // 提示
            if (res.data.code == 0) {
              // this.delarr = [];
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.appuser();
            } else if (res.data.code == 1) {
              // this.delarr = [];
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
            this.delarr = [];
          });
      }
    },
    dateFormat: function (row, column) {
      var date = row[column.property];
      if (date === null) {
        return "0:0:0";
      }
      var moment = require("moment");
      return moment(date).format("YYYY-MM-DD ");
      //HH:mm:ss
    },
    // 新增app分页数据查询
    async appuser() {
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);
      this.tyPe = res.data.data.type; //type
      this.unitId = sessionStorage.getItem("unitIdss");
      console.log(this.tyPe);

      if (res.data.data.type == 2) {
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省搜索name
        this.former.provinceCode = res.data.data.province; //省表单name
        this.former.cityCode = res.data.data.city; //市表单name
        this.cityCode = res.data.data.city; //市搜索name
        this.citys = res.data.data.cityCode; //市code
        this.AreaId = res.data.data.area; //区数组
        this.showCmd = true;
        this.showCmds = false;
        this.showCmd_1 = false;
      } else if (res.data.data.type == 1) {
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        sessionStorage.setItem("areaCode", res.data.data.areaCode);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省name
        this.cityCode = res.data.data.city; //市name
        this.former.provinceCode = res.data.data.province; //省表单name
        this.former.cityCode = res.data.data.city; //市表单name
        this.citys = res.data.data.cityCode; //市code
        this.areas = res.data.data.areaCode; //区code
        this.areaCode = res.data.data.area; //区name
        this.former.areaCode = res.data.data.area; //区name
        this.showCmd = true;
        this.showCmds = true;
        this.showCmd_1 = true;
      } else if (res.data.data.type == 0) {
        this.ProvinceId = res.data.data.provinces;
        this.showCmd = false;
        this.showCmds = false;
        this.showCmd_1 = false;
      } else if (res.data.data.type == 3) {
        //省监管
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("province", res.data.data.province);
        this.provinceCode = res.data.data.province; //省搜索name
        this.codes = res.data.data.provinceCode; //省code
        this.form.provinceCode = res.data.data.province; //省表单name
        this.CityId = res.data.data.city; //市数组
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }
      // sessionStorage.setItem("unitIdss", userId);

      console.log(1);
      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/app-user/findPage?page=${this.pagess}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlists = res.data.data.list;
        this.totals = res.data.data.totalCount;
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/app-user/findPage?page=${this.pagess}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlists = res.data.data.list;
        this.totals = res.data.data.totalCount;
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/app-user/findPage?page=${this.pagess}&rows=${this.rows}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlists = res.data.data.list;
        this.totals = res.data.data.totalCount;
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/app-user/findPage?page=${this.pagess}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlists = res.data.data.list;
        this.totals = res.data.data.totalCount;
      }
    },
    //分页功能
    handleSizeChanges(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.pages = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.appuser();
    },
    handleCurrentChanges(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.pagess = val;
      this.appuser();
    },
  },
};
</script>
<style scoped>
</style>
<style>
.el-table th,
.el-table td {
  text-align: center !important;
}
</style>