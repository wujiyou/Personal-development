<template>
  <div>
    <!-- <div style="background:white;width:99.1%;padding-left:15px">
      <my-bread level1="综合查询" level2="移动充装" level3="充装扫描记录"></my-bread>
    </div> -->
    <!--移动充装扫描记录  -->
    <el-card class="box-card" style="margin:20px 20px 0 20px;">
      <el-row>
        <el-col :span="22">
          <el-col :span="24">
            <h5 style="border-bottom:1px solid #ece8e8;padding-bottom:15px;padding-left:15px">查询信息</h5>
          </el-col>

          <el-col style="padding-left:15px" :span="24">
            <el-col :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入设备号"
                v-model="controlId"
              ></el-input>
            </el-col>
            <el-col style="padding-left:30px" :span="4">
              <el-input
                size="small"
                style=" width: 100%;"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入枪号"
                v-model="gunId"
              ></el-input>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-date-picker
                size="small"
                style=" width: 100%;"
                type="date"
                placeholder="加气时间"
                value-format="yyyy-MM-dd"
                v-model="createTime"
                @input="searchUser()"
              ></el-date-picker>
            </el-col>

            <el-col style="padding-left:20px" class="line" :span="1">
              <p style="margin-top:8px;">至</p>
            </el-col>
            <el-col :span="4">
              <el-date-picker
                type="date"
                placeholder="加气时间"
                value-format="yyyy-MM-dd"
                v-model="createTime2"
                size="small"
                style=" width: 100%;"
                @input="searchUser()"
              ></el-date-picker>
            </el-col>

            <el-col style="padding-left:30px" :span="4">
              <el-button
                size="small"
                style=" width: 100%;"
                @click="searchUser()"
                class="el_button"
                icon="el-icon-search"
              >搜索</el-button>
            </el-col>
          </el-col>
        </el-col>
        
      </el-row>

       <el-col :span="24">
        <p
          style="width:100%;height:1px;background:rgb(236, 232, 232);margin:20px 0px 0px 0px;z-index:999"
        ></p>
      </el-col>
      <el-col style="margin-bottom:5px;margin-top:5px" :span="24">
        <el-col :span="21" style="color:white">1</el-col>

        <!-- <el-col :span="2">
          <el-button
            type="success"
            plain
            size="small"
            style="margin-left:10px;font-size:13px"
            @click="downtemplatee()"
          >
            <i style="padding-right:10px;" class="el-icon-download"></i>批量下载excel
          </el-button>
        </el-col> -->
      </el-col>

      <!-- 表格 -->
      <template>
        <el-table
          border
          :row-style="{height:'40px'}"
          :cell-style="{padding:'0px'}"
          :data="userlist"
          style="width: 100%;margin:20px 0px;padding-bottom:40px"
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column show-overflow-tooltip prop="carNumber" label="车牌号" width="200"></el-table-column>
          <el-table-column show-overflow-tooltip prop="controlId" label="设备号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="gunId" label="枪号"></el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="fillTime"  :formatter="dateFormat" label="充装时间">
            <!-- <template slot-scope="socpe">{{socpe.row.fillTime | fmtdate}}</template> -->
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="czl" label="充装量(kg)"></el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="" label="充装枪号"></el-table-column> -->

          <el-table-column show-overflow-tooltip prop="carUnit" label="车辆使用单位"></el-table-column>
          <el-table-column sortable show-overflow-tooltip prop="nextCheckDate" label="下检时间">
            <template slot-scope="socpe">{{socpe.row.nextCheckDate | fmtdate}}</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="unitName" label="充装机构"></el-table-column>
        </el-table>
      </template>

      <el-pagination
        style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10,15,20,25,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "trace",
  data() {
    return {
      gunId: "",
      controlId: "",
      createTime: "",
      createTime2: "",
      idss: "",
      datas: [],
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      page: 1,
      pageSize: 10,
    };
  },
 created() {
    this.getUserlist();
  },
  methods: {
        //生成一个文档
      // async downtemplatee() {
      //   this.loadingbut = true;
      //   this.loadingbuttext = "加载中...";
      //   var arr = {
      //     controlId: this.controlId,
      //     gunId: this.gunId,
      //     startTime: this.createTime,
      //     endTime: this.createTime2
      //   };
      //   console.log(arr);
      //   const res = await this.$http
      //     .post(
      //       `pc-mobile/creat/record`,
      //       arr,
      //       // { headers: "application/x-download" },
      //       { responseType: "blob" }
      //     )
      //     .then(response => {
      //       console.log(response);
      //       if (response.status === 200) {
      //         this.getUserlist();
      //         // 提示
      //         this.$message({
      //           type: "success",
      //           message: "下载成功"
      //         });
      //         console.log(this.datas);
      //         this.loadingbut = false;
      //         this.loadingbuttext = "生成一个excel文档";
      //         const blob = new Blob([response.data], {
      //           type: "application/msword"
      //         });
      //         const fileName = "气瓶基本信息.xlsx";

      //         const elink = document.createElement("a");

      //         elink.download = fileName;

      //         elink.style.display = "none";

      //         elink.href = URL.createObjectURL(blob);

      //         document.body.appendChild(elink);

      //         elink.click();

      //         URL.revokeObjectURL(elink.href); // 释放URL 对象
      //         document.body.removeChild(elink);
      //         this.datas = [];
      //         console.log(this.datas);
      //       } else if (res.data.code == 201) {
      //         this.$message({
      //           type: "error",
      //           message: "生成失败"
      //         });
      //         this.loadingbut = false;
      //         this.loadingbuttext = "生成一个excel文档";
      //       }
      //     })
      //     .catch(err => {
      //       this.$message({
      //         type: "error",
      //         message: "生成失败"
      //       });
      //       //         _toastr.error(err)
      //       this.loadingbut = false;
      //       this.loadingbuttext = "生成一个excel文档";
      //     });
      // },
    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `/pc-mobile/record/findPage?rows=${this.pageSize}&page=1&gunId=${this.gunId}&controlId=${this.controlId}&startTime=${this.createTime}&endTime=${this.createTime2}`
      );
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
      // console.log(this.userlist);
      this.currPage = 1;
      
    },
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date === null) {
        return "0:0:0";
      }
      var moment = require("moment");
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
      //HH:mm:ss
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.pageSize = val;
      // 回到第一页
      this.currPage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.currPage = val;
      this.getUserlist();
      //this.userlist=res.data.data.list
    },
    async getUserlist() {
      // http://localhost:8081/public/gas/CylinderFilling/CylinderFillingPaging?pageSize=2&currPage=2&gunId=01&gasId=1588923670165&createTime=2020-05-10 10:44:22&createTime2=2020-05-11 10:44:22
      const res = await this.$http.get(
        `/pc-mobile/record/findPage?rows=${this.pageSize}&page=${this.currPage}&gunId=${this.gunId}&controlId=${this.controlId}`
      );
      // &name=${this.name}
      var arr = res.data.data.list;
      for (var key in arr) {
        // 自定义变量,存储索引 0 1 2 3 4 ....
        console.log(arr[key].id); // arr[key] 就是索引对应的数据
        this.datas.push(arr[key].id);
        console.log(this.datas);
      }
      console.log(res);
      this.userlist = res.data.data.list;
      this.total = res.data.data.totalCount;
    }
  }
};
</script>
<style scoped>
.arrow_right {
  padding: 10px 0px;
  margin-bottom: 10px;
}

.input-serach {
  width: 400px;
}
.el_button {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff !important;
}
</style>