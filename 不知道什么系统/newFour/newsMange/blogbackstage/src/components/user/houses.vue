<template>
  <div>
    <el-col :span="24">
      <el-col :span="22">&nbsp;</el-col>
      <el-col :span="2" style="margin-bottom:10px">
        <el-button type="success" style="font-size:13px" size="small" @click="showSystem()">
          <i style="padding-right:10px" class="el-icon-plus"></i>新增
        </el-button>
      </el-col>
    </el-col>
    <!-- 表格 -->
    <template>
      <el-table
        border
        :data="userlistsystem"
        style="width: 100%;margin:10px 0px;padding-bottom:40px;"
        :row-style="{height:'40px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column show-overflow-tooltip prop="username" label="用户名"></el-table-column>
        <el-table-column show-overflow-tooltip prop="unitName" label="单位名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="name" label="姓名"></el-table-column>
        <el-table-column show-overflow-tooltip prop="address" label="地址"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column show-overflow-tooltip prop="code" label="工作证编号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="note" label="备注"></el-table-column>
      </el-table>
    </template>

    <el-pagination
      style="border:1px solid #ebeef5;padding:5px 15px;display:flex; justify-content: flex-end;"
      background
      @size-change="handleSizeChanges"
      @current-change="handleCurrentChanges"
      :current-page="pages"
      :page-sizes="[10,15,20,25,30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalss"
    ></el-pagination>

    <!-- 新增系统用户对话框 -->
    <el-dialog
      title="添加用户"
      v-dialogDrag
      ref="dialog__wrapper"
      :close-on-click-modal="false"
      width="80%"
      :visible.sync="dialogFormVisibleAddsystem"
      append-to-body
    >
    <!-- @keyup.enter.native="AddUsersystem" -->
      <el-form  :model="formers" ref="formers" :rules="rulseses">
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item hidden prop="provinceCode" label-width="140px" label="行政省份:">
              <el-select
                :disabled="showCmd"
                v-model="formers.provinceCode"
                @change="function2(formers.provinceCode)"
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
                v-model="formers.cityCode"
                @change="function1(formers.cityCode)"
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
              <el-select :disabled="showCmds" v-model="formers.areaCode" placeholder="请选择">
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
          <el-col :span="8">
            <el-form-item label="用户名:" label-width="140px" prop="name">
              <el-input v-model="formers.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名:" label-width="140px" prop="name">
              <el-input v-model="formers.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="联系电话:" label-width="140px" prop="name">
              <el-input v-model="formers.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>

        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="工作证编号:" label-width="140px" prop="name">
              <el-input v-model="formers.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="身份证:" label-width="140px" prop="idCard">
              <el-input v-model="formers.idCard" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地址:" label-width="140px" prop="地址">
              <el-input v-model="formers.address" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24">
          <el-col :span="8">
            <el-form-item label="备注:" label-width="140px" prop="name">
              <el-input v-model="formers.note" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAddsystem = false">取 消</el-button>
        <el-button type="primary" @click="AddUsersystem()">确 定</el-button>
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
      provinceCode: "",
      cityCode: "",
      areaCode: "",
      totalss: 0,
      pages: 1,
      rows: 10,
      unitId: "",
      ProvinceId:[],
      AreaId:[],
      CityId:[],
      userlistsystem: [],
      dialogFormVisibleAddsystem: false,
      curr: 1,
      tyPe: "",
      codes: "",
      citys: "",
      areas: "",
      formers: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        username: "",
        name: "",
        phone: "",
        code: "",
        idCard: "",
        address: "",
        note: "",
      },
      // 新增系统表单验证
      rulseses: {},
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["formers"].resetFields();
    },
  },
  created() {
    this.systemuser();
  },
  methods: {
    // 新增系统用户新增发送请求
    async AddUsersystem() {
      this.$refs.formers.validate(async (valid) => {
        if (valid) {
          // this.formers={}
          this.formers.unitId = sessionStorage.getItem("systemunitId");
          this.formers.provinceCode = sessionStorage.getItem("systemprovincecode");
          this.formers.cityCode = sessionStorage.getItem("systemcityCode");
          this.formers.areaCode = sessionStorage.getItem("systemareaCode");
          const res = await this.$http.post(`user`, this.formers);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleAddsystem = false;

            // this.form = {};
            this.systemuser();
          } else if (res.data.code === 1) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.dialogFormVisibleAddsystem = true;
          } else if (res.data.code === 2) {
            this.$message({
              type: "warning",
              message: res.data.msg,
            });
            this.dialogFormVisibleAddsystem = true;
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAddsystem = true;
        }
      });
    },
    // 新增系统用户弹出框
    showSystem() {
      this.formers = {};
      this.dialogFormVisibleAddsystem = true;
    },
    // 新增系统用户分页查询
    async systemuser() {
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);
      this.tyPe = res.data.data.type; //type
      console.log(this.tyPe);
      this.unitId = sessionStorage.getItem("systemunitId");
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
        this.showCmd_1 = true;
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
      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.pages}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlistsystem = res.data.data.list;
        this.totalss = res.data.data.totalCount;
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.page}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlistsystem = res.data.data.list;
        this.totalss = res.data.data.totalCount;
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.pages}&rows=${this.rows}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlistsystem = res.data.data.list;
        this.totalss = res.data.data.totalCount;
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/user/findPage?page=${this.pages}&rows=${this.rows}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}&unitId=${this.unitId}`
        );
        console.log(res);
        this.userlistsystem = res.data.data.list;
        this.totalss = res.data.data.totalCount;
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
      this.systemuser();
    },
    handleCurrentChanges(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.pages = val;
      this.systemuser();
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

