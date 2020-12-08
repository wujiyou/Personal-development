<template>
  <div>
    <!-- 挂牌车头数据 -->
    <el-card class="box-card" style="margin: 20px 20px 0 20px">
      <el-row>
        <el-col :span="22">
          <el-col :span="24">
            <h5
              style="
                border-bottom: 1px solid #ece8e8;
                padding-bottom: 15px;
                padding-left: 15px;
              "
            >
              查询信息
            </h5>
          </el-col>

          <el-col style="padding-left: 15px" :span="24">
            <el-col :span="4">
              <el-input
                size="small"
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入车头号"
                v-model="beforeCar"
              ></el-input>
            </el-col>

            <el-col style="padding-left: 30px" :span="4">
              <el-input
                size="small"
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入挂牌号"
                v-model="hangCar"
              ></el-input>
            </el-col>

            <el-col style="padding-left: 30px" :span="4">
              <el-button
                size="small"
                style="width: 100%"
                @click="searchUser()"
                class="el_button"
                icon="el-icon-search"
                >搜索</el-button
              >
            </el-col>
          </el-col>
        </el-col>
      </el-row>

      <el-col :span="24">
        <p
          style="
            width: 100%;
            height: 1px;
            background: rgb(236, 232, 232);
            margin: 15px 0px 15px 0px;
            z-index: 999;
          "
        ></p>
      </el-col>
      <el-col style="margin-bottom: 10px; margin-top: 10px" :span="24">
        <el-col :span="20" style="color: white">1</el-col>
        <el-col :span="2">
          <el-button
            style="font-size: 13px"
            type="success"
            @click="showAddUserDia()"
            size="small"
          >
            <i style="padding-right: 10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="small"
            plain
            icon="el-icon-delete"
            style="font-size: 13px"
            @click="showDeleUserMsgBox"
            >删除</el-button
          >
        </el-col>
      </el-col>

      <!-- 表格 -->
      <template>
        <el-table
          border
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          :data="userlist"
          style="width: 100%; margin: 20px 0px; padding-bottom: 40px"
          @selection-change="handleCurrentChanges"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
            show-overflow-tooltip
          >
            <template slot-scope="socpe">
              <p style="cursor: pointer" @click="showEdituser(socpe.row)">
                {{ socpe.$index + 1 }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="beforeCar"
            label="车头"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="hangCar"
            label="挂牌"
          ></el-table-column>
          <el-table-column
            sortable
            show-overflow-tooltip
            prop="createdTime"
            label="创建时间"
          >
            <template slot-scope="socpe">{{
              socpe.row.createdTime | fmtdate
            }}</template>
          </el-table-column>
          <el-table-column
            sortable
            show-overflow-tooltip
            prop="updatedTime"
            label="修改时间"
          >
            <template slot-scope="socpe">{{
              socpe.row.updatedTime | fmtdate
            }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="addName"
            label="创建人"
          ></el-table-column>
          <el-table-column show-overflow-tooltip prop="info" label="备注">
          </el-table-column>
        </el-table>
      </template>

      <el-pagination
        style="
          padding: 5px 15px 15px 15px;
          display: flex;
          justify-content: flex-end;
        "
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[10, 15, 20, 25, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <el-dialog
        title="新增信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
        width="60%"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                label="车头:"
                class="red_s"
                label-width="140px"
                prop="beforeCar"
              >
                <el-input
                  v-model="form.beforeCar"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="挂牌:"
                class="red_s"
                label-width="140px"
                prop="hangCar"
              >
                <el-input v-model="form.hangCar" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="备注:"
                class="red_s"
                label-width="140px"
                prop="info"
              >
                <el-input v-model="form.info" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="修改信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAadds"
        width="60%"
      >
        <el-form :model="ersform" :rules="rules" ref="ersform">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                label="车头:"
                class="red_s"
                label-width="140px"
                prop="beforeCar"
              >
                <el-input
                  v-model="ersform.beforeCar"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="挂牌:"
                class="red_s"
                label-width="140px"
                prop="hangCar"
              >
                <el-input
                  v-model="ersform.hangCar"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="备注:"
                class="red_s"
                label-width="140px"
                prop="info"
              >
                <el-input v-model="ersform.info" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAadds = false">取 消</el-button>
          <el-button type="primary" @click="Erhsct()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "trace",
  data() {
    return {
      no: "",
      regId: "",
      beforeCar: "",
      hangCar: "",
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id
      form: {
        beforeCar: "",
        hangCar: "",
        info: "",
      },
      ersform: {
        beforeCar: "",
        hangCar: "",
        info: "",
      },
      rules: {
        beforeCar: [
          { required: true, message: "车头不能为空", trigger: "blur" },
        ],
        hangCar: [{ required: true, message: "挂牌不能为空", trigger: "blur" }],
        info: [{ required: true, message: "备注不能为空", trigger: "blur" }],
      },
      // createTime: "",
      // createTime2: "",
      userlist: [],
      //分页相关数据
      total: -1,
      currPage: 1,
      idss: "",
      page: 1,
      pageSize: 10,

      dialogFormVisibleAdd: false,
      dialogFormVisibleAadds: false,
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
    dialogFormVisibleAadds: function (val, oldVla) {
      this.$refs["ersform"].resetFields();
    },
  },
  methods: {
    //生成一个文档
    // downtemplatee() {
    //   console.log(this.idss);
    //   this.loadingbut = true;
    //   this.loadingbuttext = "加载中...";
    //   this.$http
    //     .post(
    //       `pc-mobile/creat/exam?id=${this.idss}`,
    //       { headers: "application/x-download" },
    //       { responseType: "blob" }
    //     )
    //     .then((response) => {
    //       console.log(res);
    //       if (response.status === 200) {
    //         this.getUserlist();
    //         // 提示
    //         this.$message({
    //           type: "success",
    //           message: "下载成功",
    //         });
    //         this.loadingbut = false;
    //         this.loadingbuttext = "生成一个excel文档";
    //         const blob = new Blob([response.data], {
    //           type: "application/msword",
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
    //         this.dengdialogFormVisible = false;
    //       } else if (res.data.code == 201) {
    //         this.$message({
    //           type: "error",
    //           message: "生成失败",
    //         });
    //         this.loadingbut = false;
    //         this.loadingbuttext = "生成一个excel文档";
    //       }
    //     })
    //     .catch((err) => {
    //       this.$message({
    //         type: "error",
    //         message: "生成失败",
    //       });
    //       //         _toastr.error(err)
    //       this.loadingbut = false;
    //       this.loadingbuttext = "生成一个excel文档";
    //     });
    // },
    showEdituser(user) {
      this.dialogFormVisibleAadds = true;
      this.ersform = user;
    },
    Erhsct() {
      this.$refs.ersform.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post(`mobile-data`, this.ersform);
          console.log(res);
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleAadds = false;
            this.getUserlist();
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
            this.dialogFormVisibleAadds = false;
            this.getUserlist();
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAadds = true;
        }
      });
    },
    async AddUser() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.put(`mobile-data`, this.form);
          console.log(res);
          console.log(res.data.code);
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleAdd = false;
            this.getUserlist();
          } else {
            this.$message({
              type: "error",
              message: res.data.msg,
            });
            this.dialogFormVisibleAdd = false;
            this.getUserlist();
          }
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.dialogFormVisibleAdd = true;
        }
      });
    },
    handleCurrentChanges(val) {
      let arr = [];
      console.log(val);
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    showDeleUserMsgBox() {
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.delarr.push(this.multipleSelection[i].id);
        console.log(this.multipleSelection[i].id);
      }

      if (this.delarr == "") {
        this.$message({
          type: "error",
          message: "请选择需要删除的数据",
        });
      } else {
        this.$confirm("是否删除这条气瓶信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            // 注意async的位置，最近的位置
            // 发送删除请求:id:用户id
            // 1.data中找userId
            // 2.把userID以showDeleUserMsgBox参数形式传进来
            console.log(this.delarr);
            const res = await this.$http.post(
              `mobile-data/delete`,
              this.delarr
            );
            console.log(res);
            this.delarr = [];
            // 提示
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
            } else {
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

    showAddUserDia() {
      this.dialogFormVisibleAdd = true;
    },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      const res = await this.$http.get(
        `mobile-data?pageSize=${this.pageSize}&currPage=${this.currPage}&beforeCar=${this.beforeCar}&hangCar=${this.hangCar}`
      );
      if (res.data.data == null) {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      } else {
        this.userlist = res.data.data.list;
        console.log(this.userlist);
        this.total = res.data.data.totalCount;
        this.currPage = 1;
      }
      
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
      const res = await this.$http.get(
        `mobile-data?pageSize=${this.pageSize}&currPage=${this.currPage}&beforeCar=${this.beforeCar}&hangCar=${this.hangCar}`
      );
      console.log(res);
      if (res.data.data == null) {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      } else {
        this.userlist = res.data.data.list;
        console.log(this.userlist);
        this.total = res.data.data.totalCount;
      }
    },
  },
  created() {
    this.getUserlist();
  },
};
</script>
<style scoped>
.arrow_right {
  padding: 10px 0px;
  margin-bottom: 10px;
}
.wborder {
  border: 1px solid #e0dede;
}
.ggong {
  text-align: left;
  padding-left: 20px;
  line-height: 40px;
  /* border-right-width: 1px solid #e0dede; */
  border-right: 1px solid #e0dede;
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
<style>
.red_s label {
  color: #f00 !important;
}
</style>