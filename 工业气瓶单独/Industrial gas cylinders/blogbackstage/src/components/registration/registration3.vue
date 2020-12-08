<template>
  <div>
    <el-card class="box-card" style="margin: 20px 20px 0 20px">
      <!--搜索  -->
      <el-row>
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
        <el-col style="padding-left: 15px" :span="22">
          <el-col :span="24">
            <el-col :span="4">
              <el-select
                :disabled="showCmd"
                size="small"
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                v-model="provinceCode"
                @change="function2(provinceCode)"
                placeholder="请选择省份"
              >
                <el-option
                  v-for="item in ProvinceId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-col>

            <el-col style="margin-left: 30px" :span="4">
              <el-select
                size="small"
                :disabled="showCmd_1"
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                v-model="cityCode"
                @input="searchUser()"
                @change="function1(cityCode)"
                placeholder="请选择城市"
              >
                <el-option
                  v-for="item in CityId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left: 30px" :span="4">
              <el-select
                size="small"
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                :disabled="showCmds"
                @input="searchUser()"
                v-model="areaCode"
                placeholder="请选择区域"
              >
                <el-option
                  v-for="item in AreaId"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-col>
            <el-col style="margin-left: 30px" :span="4">
              <el-select
                filterable
                size="small"
                style="width: 100%"
                @clear="loadUserList()"
                @input="searchUser()"
                clearable
                v-model="unitName"
                placeholder="请选择单位名称"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-col>
          </el-col>

          <el-col style="margin-top: 20px" :span="24">
            <el-col :span="4">
              <el-input
                size="small"
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                class="input-serach"
                placeholder="请输入充装许可证号"
                v-model="licence"
              ></el-input>
            </el-col>

            <el-col style="margin-left: 30px" :span="4">
              <el-select
                size="small"
                filterable
                style="width: 100%"
                @clear="loadUserList()"
                clearable
                v-model="bottleType"
                @input="searchUser()"
                placeholder="请选择气瓶类型"
              >
                <el-option
                  v-for="item in optionsqip"
                  :key="item.id"
                  :label="item.usename"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>

            <el-col style="margin-left: 30px" :span="4">
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
            margin: 20px 0px 0px 0px;
            z-index: 999;
          "
        ></p>
      </el-col>
      <el-col style="margin-bottom: 5px; margin-top: 5px" :span="24">
        <el-col :span="20">&nbsp;</el-col>
        <el-col :span="2">
          <el-button
            type="success"
            @click="showAddUserDia()"
            style="font-size: 13px"
            size="small"
          >
            <i style="padding-right: 10px" class="el-icon-plus"></i>新增
          </el-button>
        </el-col>

        <el-col :span="2">
          <el-button
            size="small"
            style="font-size: 13px"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="showDeleUserMsgBox"
            >删除</el-button
          >
        </el-col>
      </el-col>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="userlist"
          style="width: 100%; margin: 10px 0; padding-bottom: 40px"
          :row-style="{ height: '40px' }"
          :cell-style="{ padding: '0px' }"
          @selection-change="handleCurrentChang"
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
          <el-table-column show-overflow-tooltip prop="name" label="单位名称">
            <template slot-scope="socpe">
              <p style="cursor: pointer" @click="danwei(socpe.row)">
                {{ socpe.row.name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="licence"
            label="充装许可证号"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="division"
            label="行政区划"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="personnelName"
            label="负责人"
          ></el-table-column>
          <!-- <el-table-column show-overflow-tooltip prop="unitPhone" label="单位固定电话"></el-table-column> -->
          <el-table-column
            show-overflow-tooltip
            prop="phone"
            label="负责人联系电话"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="address"
            label="单位地址"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="unitIssueTime"
            label="发证日期"
          >
            <template slot-scope="socpe">{{
              socpe.row.unitIssueTime | fmtdate
            }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="unitChangeTime"
            label="换证日期"
          >
            <template slot-scope="socpe">{{
              socpe.row.unitChangeTime | fmtdate
            }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="bottleType"
            label="气瓶选择"
          >
            <template slot-scope="scope">
              <p v-if="userlist[scope.$index].bottleType == 0">车用气瓶</p>
              <p v-if="userlist[scope.$index].bottleType == 1">液化气瓶</p>
              <p v-if="userlist[scope.$index].bottleType == 2">工业气瓶</p>
              <p v-if="userlist[scope.$index].bottleType == 3">移动充装</p>
            </template>
          </el-table-column>
          <!-- 表格操作 -->
          <el-table-column width="220" label="操作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="新增系统用户"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  size="mini"
                  title="新增系统用户"
                  plain
                  icon="el-icon-s-platform"
                  @click="newUsers(scope.row)"
                  circle
                ></el-button>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="新增app用户"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="primary"
                  content="新增app用户"
                  size="mini"
                  plain
                  icon="el-icon-mobile-phone"
                  circle
                  @click="appUserssure(scope.row)"
                ></el-button>
              </el-tooltip>

              <el-tooltip
                class="item"
                effect="dark"
                content="新增人员"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  content="新增人员"
                  size="mini"
                  plain
                  icon="el-icon-place"
                  circle
                  @click="newStaff(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="充装许可证"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="primary"
                  content="充装许可证"
                  size="mini"
                  plain
                  icon="el-icon-s-home"
                  circle
                  @click="Fillingpermit(scope.row)"
                ></el-button>
              </el-tooltip>
              <!-- <el-tooltip
                class="item"
                effect="dark"
                content="气瓶价格"
                :enterable="false"
                placement="top"
              >
                <el-button
                  type="success"
                  content="气瓶价格"
                  size="mini"
                  plain
                  icon="el-icon-coin"
                  circle
                  @click="orderPrice(scope.row)"
                ></el-button>
              </el-tooltip> -->
            </template>
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
        :current-page="page"
        :page-sizes="[10, 15, 20, 25, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 对话框 -->
      <!-- 添加对话框 -->
      <el-dialog
        title="新增信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleAdd"
        width="80%"
      >
        <el-form :model="form" :rules="rulses" ref="form">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                prop="vestingProvinceId"
                label-width="140px"
                label="行政省份:"
              >
                <el-select
                  style="width: 100%"
                  v-model="form.provinceCode"
                  @change="function2(form.provinceCode)"
                  :disabled="showCmd"
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
              <el-form-item
                prop="cityCode"
                label-width="140px"
                label="市级区域:"
              >
                <el-select
                  style="width: 100%"
                  v-model="form.cityCode"
                  @change="function1(form.cityCode)"
                  :disabled="showCmd_1"
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
              <el-form-item prop="areaCode" label-width="140px" label="区级:">
                <el-select
                  style="width: 100%"
                  v-model="form.areaCode"
                  :disabled="showCmds"
                  placeholder="请选择"
                >
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
              <el-form-item
                label="单位名称:"
                class="red_s"
                label-width="140px"
                prop="name"
              >
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="负责人:"
                label-width="140px"
                prop="personnelName"
              >
                <el-input
                  v-model="form.personnelName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="单位固定电话:" label-width="140px">
                <el-input
                  v-model="form.unitPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="负责人联系电话:" label-width="140px">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                class="red_s"
                label="详细地址:"
                label-width="140px"
                prop="address"
              >
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="red_s"
                label="发证日期:"
                label-width="140px"
                prop="unitIssueTime"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.unitIssueTime"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                class="red_s"
                label="换证日期:"
                label-width="140px"
                prop="unitChangeTime"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.unitChangeTime"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                class="red_s"
                label="充装许可证号:"
                label-width="140px"
                prop="licence"
              >
                <el-input v-model="form.licence" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="统一社会信用代码:"
                label-width="140px"
                prop="code"
              >
                <el-input v-model="form.code" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="邮政编码:" label-width="140px">
                <el-input
                  v-model="form.postalCode"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                class="red_s"
                label="气瓶类型:"
                label-width="140px"
                prop="type"
              >
                <el-select
                  style="width: 100%"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.bottleType"
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in optionsqip"
                    :key="item.id"
                    :label="item.usename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否已购保险:" label-width="140px">
                <el-select
                  style="width: 100%"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.isSafe"
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in optionbao"
                    :key="item.id"
                    :label="item.bao"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                hidden
                label="单位类型:"
                label-width="140px"
                prop="type"
              >
                <el-select
                  style="width: 100%"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.type"
                  placeholder="请选择单位类型"
                >
                  <el-option
                    v-for="item in optionsuseName"
                    :key="item.icd"
                    :label="item.usenames"
                    :value="item.icd"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="AddUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 编辑对话框 -->
      <el-dialog
        title="修改信息"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisibleEdit"
        width="80%"
      >
        <!-- @keyup.enter.native="EditUser" -->
        <el-form :model="editUserForm" :rules="rulses">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                prop="vestingProvinceId"
                label-width="140px"
                label="行政省份:"
              >
                <el-select
                  style="width: 100%"
                  v-model="editUserForm.provinceCode"
                  @change="function2(editUserForm.provinceCode)"
                  :disabled="showCmd"
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
              <el-form-item
                prop="cityCode"
                label-width="140px"
                label="市级区域:"
              >
                <el-select
                  style="width: 100%"
                  v-model="editUserForm.cityCode"
                  @change="function1(editUserForm.cityCode)"
                  :disabled="showCmd_1"
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
              <el-form-item prop="areaCode" label-width="140px" label="区级:">
                <el-select
                  style="width: 100%"
                  v-model="editUserForm.areaCode"
                  :disabled="showCmds"
                  placeholder="请选择"
                >
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
              <el-form-item label="单位名称:" label-width="140px" prop="name">
                <el-input
                  v-model="editUserForm.name"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="负责人:"
                label-width="140px"
                prop="personnelName"
              >
                <el-input
                  v-model="editUserForm.personnelName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="单位固定电话:" label-width="140px">
                <el-input
                  v-model="editUserForm.unitPhone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="负责人联系电话:" label-width="140px">
                <el-input
                  v-model="editUserForm.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="详细地址:"
                label-width="140px"
                prop="address"
              >
                <el-input
                  v-model="editUserForm.address"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="发证日期:"
                label-width="140px"
                prop="unitIssueTime"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.unitIssueTime"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                label="换证日期:"
                label-width="140px"
                prop="unitChangeTime"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="editUserForm.unitChangeTime"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="充装许可证号:"
                label-width="140px"
                prop="licence"
              >
                <el-input
                  v-model="editUserForm.licence"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="统一社会信用代码:"
                label-width="140px"
                prop="code"
              >
                <el-input
                  v-model="editUserForm.code"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item label="邮政编码:" label-width="140px">
                <el-input
                  v-model="editUserForm.postalCode"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="气瓶类型:" label-width="140px" prop="type">
                <el-select
                  style="width: 100%"
                  @clear="loadUserList()"
                  clearable
                  v-model="editUserForm.bottleType"
                  placeholder="请选择类型"
                >
                  <el-option
                    v-for="item in optionsqip"
                    :key="item.id"
                    :label="item.usename"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                hidden
                label="单位类型:"
                label-width="140px"
                prop="type"
              >
                <el-select
                  style="width: 100%"
                  @clear="loadUserList()"
                  clearable
                  v-model="form.type"
                  placeholder="请选择单位类型"
                >
                  <el-option
                    v-for="item in optionsuseName"
                    :key="item.icd"
                    :label="item.usenames"
                    :value="item.icd"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="EditUser()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- pdf查看 -->
      <!-- <el-dialog title="PDF图片预览" :visible.sync="pdfindex">
        <div class="indexs">
          <p class="imgs">
            <img :src="this.url" alt />
          </p>
        </div>
      </el-dialog> -->

      <!-- 充装许可证对话框 -->
      <el-dialog
        title="充装信息"
        v-dialogDrag
        width="80%"
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        :visible.sync="Fillingdialog"
      >
        <el-form :model="Filling" :rules="rulses" ref="Filling">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                label="充装编号:"
                class="red_s"
                label-width="140px"
                prop="licence"
              >
                <el-input
                  v-model="Filling.licence"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="单位名称:"
                class="red_s"
                label-width="140px"
                prop="name"
              >
                <el-select
                  size="small"
                  disabled
                  style="width: 100%"
                  clearable
                  filterable
                  v-model="Filling.name"
                  @input="a"
                  placeholder="请选择单位名称"
                >
                  <el-option
                    v-for="(item, i) in selects6"
                    :key="i"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="充装地址:"
                class="red_s"
                label-width="140px"
                prop="address"
              >
                <el-input
                  v-model="Filling.address"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                label="充装气体类别:"
                class="red_s"
                label-width="140px"
                prop="type"
              >
                <el-input v-model="Filling.type" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="气体名称:"
                class="red_s"
                label-width="140px"
                prop="gasName"
              >
                <el-input
                  disabled
                  v-model="Filling.gasName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注:" label-width="140px">
                <el-input v-model="Filling.note" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item
                label="发证机关:"
                class="red_s"
                label-width="140px"
                prop="office"
              >
                <el-input
                  v-model="Filling.office"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="换证日期:"
                class="red_s"
                label-width="140px"
                prop="unitChangeTime"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="Filling.unitChangeTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="发证日期:"
                class="red_s"
                label-width="140px"
                prop="unitIssueTime"
              >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="Filling.unitIssueTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            class="el_button"
            :loading="loadingbut"
            @click="savencftpget()"
            >{{ loadingbuttext }}</el-button
          >
          <el-button class="el_button" type="primary" @click="print()"
            >下 载</el-button
          >
          <!-- <el-button class="el_button" @click="previewFile">预 览</el-button> -->
        </div>
      </el-dialog>

      <!-- 新增系统用户弹框显示数据表格 -->
      <el-dialog
        title="新增系统用户"
        v-dialogDrag
        ref="dialog__wrapper"
        width="95%"
        top="5vh"
        v-if="dialogFormVisiblenewUsers"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisiblenewUsers"
      >
        <House></House>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblenewUsers = false"
            >取 消</el-button
          >
          <!-- <el-button type="primary" @click="newUserssure()">确 定</el-button> -->
        </div>
      </el-dialog>

      <!-- 新增app用户分页查询 -->
      <el-dialog
        title="新增app用户"
        v-dialogDrag
        top="4vh"
        ref="dialog__wrapper"
        width="95%"
        v-if="dialogFormVisiblenewUserapp"
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisiblenewUserapp"
      >
        <Fillings></Fillings>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblenewUserapp = false"
            >取 消</el-button
          >
        </div>
      </el-dialog>

      <!-- 新增人员 -->
      <el-dialog
        title="新增人员"
        v-dialogDrag
        ref="dialog__wrapper"
        width="95%"
        :close-on-click-modal="false"
        v-if="dialogFormnewStaff"
        :visible.sync="dialogFormnewStaff"
        top="4vh"
      >
        <Sufficients></Sufficients>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormnewStaff = false">取 消</el-button>
          <!-- <el-button type="primary" @click="newStaff()">确 定</el-button> -->
        </div>
      </el-dialog>

      <!-- 液化气瓶信息查看弹框 -->
      <el-dialog
        title="液化气瓶信息查看"
        v-dialogDrag
        ref="dialog__wrapper"
        v-if="dialogFormyehua"
        :close-on-click-modal="false"
        :visible.sync="dialogFormyehua"
        width="75%"
      >
        <Lique></Lique>
      </el-dialog>

      <!-- 工业气瓶信息查看弹框 -->
      <el-dialog
        title="工业气瓶信息查看"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        v-if="dialogFormgongye"
        :visible.sync="dialogFormgongye"
        width="75%"
      >
        <Gongye></Gongye>
      </el-dialog>

      <!-- 车用气瓶信息查看弹框 -->
      <el-dialog
        title="车用气瓶信息查看"
        v-dialogDrag
        ref="dialog__wrapper"
        :close-on-click-modal="false"
        v-if="dialogFormcheyong"
        :visible.sync="dialogFormcheyong"
        width="75%"
      >
        <Chyong></Chyong>
      </el-dialog>


    </el-card>
  </div>
</template>
<script>
import House from "@/components/user/houses";
import Fillings from "@/components/user/fillings";
import Sufficients from "@/components/user/sufficients";
import Lique from "@/components/registration/liquefiedlook";
import Gongye from "@/components/registration/gylook";
import Chyong from "@/components/registration/cheyonglook";
export default {
  name: "cylinder",

  data() {
    return {
      showCmd: true,
      showCmds: true,
      showCmd_1: true,
      licence: "", //特种设备行政许可证
      unitName: "", //单位名称
      name: "",
      bottleType: "",
      ProvinceId: [], //省
      provinceCode: "",
      vestingCityId: "",
      CityId: [], //市
      cityCode: "",
      vestingAreaId: "",
      AreaId: [], //区
      areaCode: "",
      select: "",
      userlist: [],
      options: [],
      codein: "",
      licences: "",
      //分页相关数据
      total: -1,
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
      optionsqip: [
        {
          id: 0,
          usename: "车用气瓶",
        },
        {
          id: 1,
          usename: "液化气瓶",
        },
        {
          id: 2,
          usename: "工业气瓶",
        },
        {
          id: 3,
          usename: "移动充装",
        },
      ],
      optionsuseName: [
        {
          icd: 0,
          usenames: "监管机构",
        },
        {
          icd: 1,
          usenames: "制造单位",
        },
        {
          icd: 2,
          usenames: "充装单位",
        },
        {
          icd: 3,
          usenames: "检验单位",
        },
        {
          icd: 4,
          usenames: "使用单位",
        },
        {
          icd: 5,
          usenames: "配送单位",
        },
      ],
      selects6: [],
      // currPage: 1,
      page: 1,
      rows: 10,
      url: "",
      urls: "",
      licence: "",
      id: "",
      Id: "",
      sid: "",
      dengId: -1,
      curr: 1,
      // vestingType: "监管机构",
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogTableVisible: false,
      // dengdialogFormVisible: false,
      Fillingdialog: false,
      dialogFormVisiblenewUsers: false,
      dialogFormnewStaff: false,
      dialogFormVisiblenewUserapp: false,
      pdfindex: false,
      loadingbuttext: "保存文件",
      loadingbut: false, //审核提交加载中
      // dialogFormVisibleRoleshow: false,
      // optionadd: [],
      dialogFormyehua: false, //液化单位气瓶查看
      dialogFormgongye: false,//工业单位气瓶查看
      dialogFormcheyong:false,//移动单位气瓶查看
      //添加用户的表单的数据
      form: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        name: "", //单位名称
        licence: "", //特种设备行政许可证号
        unitPhone: "", //单位固定电话
        phone: "", //负责人联系电话
        address: "", //单位地址
        unitIssueTime: "", //发证日期
        unitChangeTime: "", //换证日期
        code: "", //统一社会信用代码
        postalCode: "", //邮政编码
        type: 2, //单位类型
        personnelName: "", // 负责人
        bottleType: 1,
        isSafe: 0,
      },
      // 编辑
      editUserForm: {
        provinceCode: "", //省
        cityCode: "", //市
        areaCode: "", //区
        name: "", //单位名称
        licence: "", //特种设备行政许可证号
        unitPhone: "", //单位固定电话
        phone: "", //负责人联系电话
        address: "", //单位地址
        unitIssueTime: "", //发证日期
        unitChangeTime: "", //换证日期
        code: "", //统一社会信用代码
        postalCode: "", //邮政编码
        bottleType: 1,
      },
      optionbao: [
        {
          id: 0,
          bao: "未购",
        },
        {
          id: 1,
          bao: "已购",
        },
      ],

      //充装
      Filling: {
        licence: "", //充装编号
        name: "", //单位名称
        address: "", //充装地址
        type: "", //充装气体类别
        gasName: "", //气体名称
        note: "", //备注
        office: "", //发证机关
        unitChangeTime: "", //换证日期
        unitIssueTime: "", //发证日期
      },
      //表单验证
      rulses: {
        name: [
          { required: true, message: "请输入单位名称", trigger: "blur" },
          { min: 2, message: "请输入不少于2个字", trigger: "blur" },
        ], //单位名称的验证
        licence: [
          { required: true, message: "充装许可证号不能为空", trigger: "blur" },
        ], //特种设备证号验证

        address: [
          { required: true, message: "请输入地址", trigger: "blur" },
          { min: 2, message: "请输入不少于2个字", trigger: "blur" },
        ], //地址验证
        type: [
          { required: true, message: "充装气体类别不能为空", trigger: "blur" },
        ],
        gasName: [
          { required: true, message: "气体名称不能为空", trigger: "blur" },
        ],
        note: [{ required: true, message: "备注不能为空", trigger: "blur" }],
        office: [
          { required: true, message: "发证机关不能为空", trigger: "blur" },
        ],
        unitChangeTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ],
        unitIssueTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ], //发证日期
        unitChangeTime: [
          {
            required: true,
            message: "请选择时间",
            trigger: "blur",
          },
        ], //换证日期
      },
      country: [],
      arealeve: 1,
      Idss: "",
      multipleSelection: [], //批量删除数据
      delarr: [], //批量删除id
      tyPe: "",
      unitId: "",
      provincecode: "",
      citycode: "",
      areacode: "",
    };
  },
  watch: {
    dialogFormVisibleAdd: function (val, oldVla) {
      this.$refs["form"].resetFields();
    },
    Fillingdialog: function (val, oldVla) {
      this.$refs["Filling"].resetFields();
    },
  },
  created() {
    this.selectedDia();
    this.getUserlist();
  },
  methods: {
    async danwei(user) {
      console.log(user);
      if (user.bottleType == 0) {
        sessionStorage.setItem("carid", user.id);
        this.dialogFormcheyong=true
        console.log("-------------");
      } else if (user.bottleType == 1) {
        sessionStorage.setItem("liqueid", user.id);
        this.dialogFormyehua = true;
      } else if (user.bottleType == 2) {
        sessionStorage.setItem("gyid", user.id);
        this.dialogFormgongye = true;
        console.log("=============");
      } else if (user.bottleType == "null") {
        this.$message({
          type: "error",
          message: "气瓶类别未选择",
        });
      } else if (user.bottleType == 3) {
        this.$message({
          type: "error",
          message: "移动充装没有气瓶",
        });
      }
    },

    // 批量删除app用户请求数据
    showDelete() {
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      console.log(this.delarr);
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
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.appuser();
            } else if (res.data.code == 1) {
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
    // 价格查询跳转
    // orderPrice(userId) {
    //   this.$router.push({
    //     path: "/prices",
    //     query: { id: userId.id },
    //   });
    // },
    //预览pdf文件
    // async previewFile() {
    //   if (this.codein == 200) {
    //     this.pdfindex = true;
    //   } else {
    //     this.$message({
    //       type: "error",
    //       message: "请先保存文件再预览",
    //     });
    //   }
    // },
    // 新增app弹出框关闭
    lose() {
      this.dialogFormVisibleAddapp = false;
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
    //  市级
    async function2(val) {
      this.code = val;
      this.cityCode=""
      this.areaCode=""
      this.form.cityCode=""
      this.form.areaCode=""
      console.log(this.code);
      const res = await this.$http.get(`/chinese/city/${this.code}`);
      console.log(res);
      this.CityId = res.data.data;
      this.getUserlist();
    },
    // 区域
    async function1(val) {
      this.Id = val;
      this.areaCode=""
      this.form.areaCode=""
      const res = await this.$http.get(`/chinese/area/${this.Id}`);
      console.log(res);
      this.AreaId = res.data.data;
      this.getUserlist();
    },

    //  市级修改
    async function22(val) {
      this.code = sessionStorage.getItem("sid"); //省code
      // this.code = val;
      console.log(this.code);
      const res = await this.$http.get(`/chinese/city/${this.code}`);
      console.log(res);
      this.CityId = res.data.data;
      this.getUserlist();
    },

    // 区域修改
    async function11(val) {
      this.Id = sessionStorage.getItem("sids");
      const res = await this.$http.get(`/chinese/area/${this.Id}`);
      console.log(res);
      this.AreaId = res.data.data;
      this.getUserlist();
    },
    // 新增app用户弹框查询数据
    async appUserssure(userId) {
      console.log(userId);
      sessionStorage.setItem("pstype",userId.type);
      sessionStorage.setItem("unitIdss", userId.id);
      sessionStorage.setItem("appprovinceCode", userId.provinceCode);
      sessionStorage.setItem("appcityCode", userId.cityCode);
      sessionStorage.setItem("appareaCode", userId.areaCode);
      this.dialogFormVisiblenewUserapp = true;
      // this.appuser();
    },

    // 新增系统用户弹出显示数据
    newUsers(userId) {
      sessionStorage.setItem("systemunitId", userId.id);
      sessionStorage.setItem("systemprovincecode", userId.provinceCode);
      sessionStorage.setItem("systemcityCode", userId.cityCode);
      sessionStorage.setItem("systemareaCode", userId.areaCode);
      this.dialogFormVisiblenewUsers = true;
      // this.systemuser();
    },

    //  新增人员页面查询
    newStaff(user) {
      sessionStorage.setItem("Ids", user.id);
      sessionStorage.setItem("provinceCode", user.provinceCode);
      sessionStorage.setItem("cityCode", user.cityCode);
      sessionStorage.setItem("areaCode", user.areaCode);
      this.dialogFormnewStaff = true;
    },

    // 多选
    handleCurrentChang(val) {
      this.multipleSelection = val;
      // this.showDeleUserMsgBox = val.length;
    },
    // 批量删除请求数据
    showDeleUserMsgBox() {
      for (let i = 0; i <= this.multipleSelection.length - 1; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      console.log(this.delarr);
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
            const res = await this.$http.post(`/unit/delete`, this.delarr);
            console.log(res);
            // this.getUserlist();
            this.delarr = [];
            // 提示
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
            } else if (res.data.code == 1) {
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

    async a() {
      this.Idss = sessionStorage.getItem("ids");
      console.log(this.Idss);

      const res = await this.$http.get(
        `GunUnit/filling/unit?unitName=${this.Filling.name}&type=${this.Idss}`
      );
      console.log(res);
      this.Filling.licence = res.data.data.licence; //充装编号
      this.Filling.address = res.data.data.address; //充装地址
      this.Filling.unitChangeTime = res.data.data.unitChangeTime; //换证日期
      this.Filling.unitIssueTime = res.data.data.unitIssueTime; //发证日期
      this.Filling.type = res.data.data.type;
      this.Filling.office = res.data.data.office;
      this.Filling.note = res.data.data.note;
      this.Filling.gasName = res.data.data.gasName;
    },

    // 查询单位名称
    async selectedDia() {
      const res = await this.$http.get(`/unit/findByUnitType/2`);
      console.log(res);
      this.options = res.data.data;
    },

    // 修改对话框打开
    async showEdituser(user) {
      this.dialogFormVisibleEdit = true;
      this.editUserForm = user;
      this.getUserlist();
      if (this.tyPe == 1) {
        this.editUserForm.provinceCode = this.provinceCode; //省name
        this.editUserForm.cityCode = this.cityCode; //市name
        this.editUserForm.areaCode = this.areaCode;
        // this.editUserForm.provinceCode = sessionStorage.getItem("province"); //省code
        // this.editUserForm.cityCode = sessionStorage.getItem("city"); //市code
        // this.editUserForm.areaCode = sessionStorage.getItem("area"); //市code
      } else if (this.tyPe == 2) {
        this.editUserForm.provinceCode = this.provinceCode; //省name
        this.editUserForm.cityCode = this.cityCode; //市name
        // this.editUserForm.provinceCode = sessionStorage.getItem("province"); //省code
        // this.editUserForm.cityCode = sessionStorage.getItem("city"); //市code
      } else if (this.tyPe == 0) {
        this.Id = user.cityCode; //市code
        this.Ids = user.areaCode; //区code
        // 省code
        // this.sid = user.provinceCode;
        sessionStorage.setItem("sid", user.provinceCode); //省
        sessionStorage.setItem("sids", user.cityCode); //市
        sessionStorage.setItem("sidarea", user.areaCode); //区
        const res = await this.$http.get(`/chinese/findCity/${this.Id}`);
        console.log(res);
        if (res.data.code == 0) {
          this.editUserForm.cityCode = res.data.data.name;
          sessionStorage.setItem("cityname", res.data.data.name);
          this.function22();
          this.function11();
        }

        const ress = await this.$http.get(`/chinese/findArea/${this.Ids}`);
        console.log(ress);
        this.editUserForm.areaCode = ress.data.data.name;
        sessionStorage.setItem("arename", ress.data.data.name);
        this.getUserlist();
      } else if (this.tyPe == 3) {
        this.Ids = user.areaCode;
        sessionStorage.setItem("sids", user.cityCode);
        this.editUserForm.provinceCode = this.provinceCode; //省name
        const ress = await this.$http.get(`/chinese/findArea/${this.Ids}`);
        console.log(ress);

        if (ress.data.code == 0) {
          this.editUserForm.areaCode = ress.data.data.name;
          this.function11();
        }
      }
    },

    // 修改用户发送请求
    async EditUser() {
      //   users/:id
      if (this.tyPe == 1) {
        this.editUserForm.provinceCode = sessionStorage.getItem("provinceCode"); //省code
        this.editUserForm.cityCode = sessionStorage.getItem("cityCode"); //市code
        this.editUserForm.areaCode = sessionStorage.getItem("areaCode"); //市code
        const res = await this.$http.put(`/unit`, this.editUserForm);
        console.log(res);
        if (res.data.code === 0) {
          // 回到第一页展示
          //this.pagenum = 1;
          // 重新请求数据
          // this.getUserlist();
          // 提示
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.dialogFormVisibleEdit = false;
          this.getUserlist();
        } else {
          this.$message({
            type: "danger",
            message: "修改失败",
          });
        }
      } else if (this.tyPe == 2) {
        this.editUserForm.provinceCode = sessionStorage.getItem("provinceCode"); //省code
        this.editUserForm.cityCode = sessionStorage.getItem("cityCode"); //市code
        const res = await this.$http.put(`/unit`, this.editUserForm);
        console.log(res);
        if (res.data.code === 0) {
          // 回到第一页展示
          //this.pagenum = 1;
          // 重新请求数据
          // this.getUserlist();
          // 提示
          this.$message({
            type: "success",
            message: res.data.msg,
          });
          this.dialogFormVisibleEdit = false;
          this.getUserlist();
        } else {
          this.$message({
            type: "danger",
            message: "修改失败",
          });
        }
      } else if (this.tyPe == 0) {
        this.proid = sessionStorage.getItem("sid"); //省
        this.cityid = sessionStorage.getItem("sids"); //市
        this.areaid = sessionStorage.getItem("sidarea"); //区
        this.cityname = sessionStorage.getItem("cityname"); //市name
        this.arename = sessionStorage.getItem("arename"); //区name
        console.log(this.proid);
        console.log(this.cityid);
        console.log(this.areaid);
        if (
          this.editUserForm.areaCode == this.arename &&
          this.editUserForm.cityCode == this.cityname
        ) {
          console.log("======================");
          delete this.editUserForm.provinceCode;
          delete this.editUserForm.cityCode;
          delete this.editUserForm.areaCode;
          const res = await this.$http.put(`/unit`, this.editUserForm);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleEdit = false;
            this.getUserlist();
          } else {
            this.$message({
              type: "danger",
              message: "修改失败",
            });
          }
        } else if (
          this.editUserForm.cityCode == this.cityname &&
          this.editUserForm.areaCode != this.arename
        ) {
          console.log("----------------------------");
          this.editUserForm.cityCode = this.cityid;
          const res = await this.$http.put(`/unit`, this.editUserForm);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleEdit = false;
            this.getUserlist();
          } else {
            this.$message({
              type: "danger",
              message: "修改失败",
            });
          }
        } else if (this.editUserForm.cityCode != this.cityname) {
          console.log("+++++++++++++++++++++++++++++++++");
          const res = await this.$http.put(`/unit`, this.editUserForm);
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogFormVisibleEdit = false;
            this.getUserlist();
          } else {
            this.$message({
              type: "danger",
              message: "修改失败",
            });
          }
        }
      }
    },

    //   添加用户发送请求
    async AddUser() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (this.tyPe == 1) {
            const res = await this.$http.post(`/unit`, this.form);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 2) {
            this.form.provinceCode = sessionStorage.getItem("provinceCode"); //省code
            this.form.cityCode = sessionStorage.getItem("cityCode"); //市code
            const res = await this.$http.post(`/unit`, this.form);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 0) {
            const res = await this.$http.post(`/unit`, this.form);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          } else if (this.tyPe == 3) {
            this.form.provinceCode = sessionStorage.getItem("provinceCode"); //省code

            const res = await this.$http.post(`/unit`, this.form);
            console.log(res);
            this.getUserlist();
            // console.log(res);
            if (res.data.code === 0) {
              // 提示
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.getUserlist();
              this.dialogFormVisibleAdd = false;
              // this.form = {};
            } else if (res.data.code === 1) {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
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

    // 充装许可证发送请求
    async EditUsers() {
      this.$refs.Filling.validate(async (valid) => {
        if (valid) {
          //  const res=this.$http.get(``)
        } else {
          this.$message({
            type: "error",
            message: "请填写内容再试",
          });
          this.Fillingdialog = true;
        }
      });
    },
    // 添加用户显示对话框
    showAddUserDia() {
      // 先点编辑 再点添加 打开表单清空表单
      // this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //充装许可证显示对话框
    async Fillingpermit(user) {
      this.Fillingdialog = true;
      console.log(user);
      this.Filling.licence = user.licence;
      this.Filling.name = user.name;
      this.Filling.address = user.address;
      this.Filling.type = user.type;
      this.Filling.gasName = user.gasName;
      this.Filling.note = user.note;
      this.Filling.unitChangeTime = user.unitChangeTime;
      this.Filling.unitIssueTime = user.unitIssueTime;

      this.Filling.gasName = "LNG";
      // this.licence = user.licence;
      // this.Idss = sessionStorage.getItem("ids");
      const res = await this.$http.get(`/unitdrop/unit`);

      console.log(res);
      this.Filling.office = res.data.data;
      console.log(this.Filling.office);

      // this.selects6 = res.data.data;
    },
    //充装许可证保存文件
    async savencftpget() {
      this.loadingbut = true;
      this.loadingbuttext = "加载中...";
      const res = await this.$http.post(
        `/unitdrop/Filling/create`,
        this.Filling
      );
      console.log(res);
      if (res.data.code == 200) {
        this.$message({
          type: "success",
          message: res.data.msg,
        });

        this.codein = res.data.code;
        this.url = res.data.data[0];
        this.loadingbut = false;
        this.loadingbuttext = "保存文件";
      } else {
        this.$message({
          type: "error",
          message: res.data.msg,
        });
        this.loadingbut = false;
        this.loadingbuttext = "保存文件";
      }
    },

    //充装许可证打印
    async EditUserss() {
      const res = await this.$http.post(`GunUnit/Filling/print`);
      console.log(res);
    },

    print() {
      this.$http
        .post(
          `/unitdrop/download/${this.Filling.licence}`,
          { headers: "application/x-download" },
          { responseType: "blob" }
        )
        .then((response) => {
          console.log(response);

          if (response.status === 200) {
            this.getUserlist();
            // 提示
            this.$message({
              type: "success",
              message: "下载成功",
            });
            const blob = new Blob([response.data], {
              type: "application/msword",
            });
            const fileName = "充装许可证.docx";

            const elink = document.createElement("a");

            elink.download = fileName;

            elink.style.display = "none";

            elink.href = URL.createObjectURL(blob);

            document.body.appendChild(elink);

            elink.click();

            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
            this.dengdialogFormVisible = false;
          } else if (res.data.code == 201) {
            this.$message({
              type: "danger",
              message: "请填写所需要的内容",
            });
          }
        })
        .catch((err) => {
          this.$message({
            type: "danger",
            message: "请填写所需要的内容",
          });
          //         _toastr.error(err)
        });
    },

    //清空搜索框搜索数据 点击清楚按钮清除数据重新发送请求
    loadUserList() {
      this.getUserlist();
    },
    // 搜索用户 给搜索框绑定query v-model="query"
    async searchUser() {
      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.curr}&type=2&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.curr}&type=2&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.curr}&type=2&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.curr}&type=2&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licence}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      }
      // console.log("aaaaaa");
    },
    //分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.rows = val;
      // 回到第一页
      this.pages = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.getUserlist();
    },
    handleCurrentChange(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getUserlist();
    },
    async getUserlist() {
      const res = await this.$http.get(`/chinese/address`);
      console.log(res);
      this.tyPe = res.data.data.type; //type
      console.log(this.tyPe);

      if (res.data.data.type == 2) {
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        sessionStorage.setItem("province", res.data.data.province);
        sessionStorage.setItem("city", res.data.data.city);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省搜索name
        this.form.provinceCode = res.data.data.province; //省表单name
        this.form.cityCode = res.data.data.city; //市表单name
        this.cityCode = res.data.data.city; //市搜索name
        this.citys = res.data.data.cityCode; //市code
        this.AreaId = res.data.data.area; //区数组
        this.showCmd = true;
        this.showCmds = false;
        this.showCmd_1 = true;
      } else if (res.data.data.type == 1) {
        sessionStorage.setItem("provinceCode", res.data.data.provinceCode);
        sessionStorage.setItem("cityCode", res.data.data.cityCode);
        sessionStorage.setItem("areaCode", res.data.data.area);
        sessionStorage.setItem("province", res.data.data.province);
        sessionStorage.setItem("city", res.data.data.cityCode);
        sessionStorage.setItem("area", res.data.data.area);
        this.codes = res.data.data.provinceCode; //省code
        this.provinceCode = res.data.data.province; //省name
        this.cityCode = res.data.data.city; //市name
        this.form.provinceCode = res.data.data.province; //省表单name
        this.form.cityCode = res.data.data.city; //市表单name
        this.citys = res.data.data.cityCode; //市code
        this.areas = res.data.data.areaCode; //区code
        this.areaCode = res.data.data.area; //区name
        this.form.areaCode = res.data.data.area; //区name
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
        // this.AreaId = res.data.data.area; //区数组
        //
        this.showCmds = false; //区按钮
        this.showCmd = true; //省按钮
        this.showCmd_1 = false; //市按钮
      }
      if (this.tyPe == 1) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.page}&type=2&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licences}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areas}`
        );
        console.log(res);

        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 2) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.page}&type=2&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licences}&provinceCode=${this.codes}&cityCode=${this.citys}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 0) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.page}&type=2&unitName=${this.unitName}&bottleType=${this.bottleType}&licence=${this.licences}&provinceCode=${this.provinceCode}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      } else if (this.tyPe == 3) {
        const res = await this.$http.get(
          `/unit/findPage?rows=${this.rows}&page=${this.page}&type=2&unitName=${this.unitName}&bottleType=1&licence=${this.licences}&provinceCode=${this.codes}&cityCode=${this.cityCode}&areaCode=${this.areaCode}`
        );
        console.log(res);
        this.userlist = res.data.data.list;
        this.total = res.data.data.totalCount;
      }
    },
  },
  components: {
    House,
    Fillings,
    Sufficients,
    Lique,
    Gongye,
    Chyong
  },
};
</script>
<style scoped>
.arrow_right {
  padding: 10px 0px;
  margin-bottom: 10px;
}
/* .pp{
   justify-content: flex-end;
} */
[class*="el-col-"] {
  margin-top: 5px;
}
.imgs {
  text-align: center;
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
.el-table th,
.el-table td {
  text-align: center !important;
}
.red_s label {
  color: red;
}
</style>