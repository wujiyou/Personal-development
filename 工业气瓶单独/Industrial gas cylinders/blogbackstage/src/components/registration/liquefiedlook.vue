<template>
  <div>
    <template>
      <el-table
        border
        :data="yelist"
        style="width: 100%;margin:10px 0;padding-bottom:40px"
        :row-style="{height:'40px'}"
        :cell-style="{padding:'0px'}"
      >
        <el-table-column type="index" label="序号" width="50" show-overflow-tooltip>
          <template slot-scope="socpe">
            <p style="cursor:pointer;">{{socpe.$index+1}}</p>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="gasId" label="气瓶号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="medium" label="介质"></el-table-column>
        <el-table-column show-overflow-tooltip prop="equipmentCode" label="设备品质"></el-table-column>
        <el-table-column show-overflow-tooltip prop="pressure" label="压力"></el-table-column>
        <el-table-column show-overflow-tooltip prop="volume" label="容积"></el-table-column>
        <el-table-column show-overflow-tooltip prop="makeInfo" label="制造单位"></el-table-column>
        <el-table-column show-overflow-tooltip prop="makeData" label="制造日期">
             <template slot-scope="socpe">{{socpe.row.makeData | fmtdate}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="checkData" label="检验日期">
             <template slot-scope="socpe">{{socpe.row.checkData | fmtdate}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="nextCheckData" label="下次检验日期">
            <template slot-scope="socpe">{{socpe.row.nextCheckData | fmtdate}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="selfId" label="单位内部id"></el-table-column>
        <el-table-column show-overflow-tooltip prop="changeStatus" label="气瓶状态">
          <template slot-scope="scope">
            <p v-if="yelist[scope.$index].changeStatus==0">新增</p>
            <p v-if="yelist[scope.$index].changeStatus==1">停用</p>
            <p v-if="yelist[scope.$index].changeStatus==2">注销</p>
            <p v-if="yelist[scope.$index].changeStatus==3">报废</p>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination
      style="padding:5px 15px 15px 15px;display:flex; justify-content: flex-end;"
      background
      @size-change="handleSizeChangeyh"
      @current-change="handleCurrentChangeyh"
      :current-page="yepage"
      :page-sizes="[10,15,20,25,30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="yetotal"
    ></el-pagination>
  </div>
</template>

 
<script>
export default {
  data() {
    return {
      yelist: [],
      yepage: 1,
      yerows: 10,
      yetotal: -1,
      unitId: "",
    };
  },
  created() {
    
      this.unitId = sessionStorage.getItem("liqueid");
      this.lique()
  },
  methods: {
    async lique() {
      
      const res = await this.$http.get(
        `/unit/cylinder/liquidation?unitId=${this.unitId}&bottleType=1&currPage=${this.yepage}&pageSize=${this.yerows}`
      );
      console.log(res);
      this.yelist = res.data.data.list;
      this.yetotal = res.data.data.totalCount;
    },
    //液化的分页
    handleSizeChangeyh(val) {
      console.log(`每页 ${val} 条`);
      // 1.每页显示条数的改变
      this.yerows = val;
      // 回到第一页
      this.yepage = 1;
      // 希望当页条数改变时 从第一页开始显示 this.pagenum = 1 -》currPage=1?
      this.danwei(this.users);
    },
    handleCurrentChangeyh(val) {
      //页码改变时
      console.log(`当前页: ${val}`);
      this.yepage = val;
      this.danwei(this.users);
    },
  },
};
</script>
<style lang="less">
</style>