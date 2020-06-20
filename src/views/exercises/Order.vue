<template>
  <div>
    <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
      <div class="third-nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/exercises/order">订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
        <div class="main-feature">
          <div class="main-inner">
               <!-- 表格 start -->
                <template>
                    <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;">
                        <el-table-column prop="name" label="订单编号" :key="2">
                        </el-table-column>
                        <el-table-column prop="name" label="商品名称" :key="3">
                        </el-table-column>
                        <el-table-column prop="industry" label="商品总额" :key="4">
                        </el-table-column>
                        <el-table-column prop="area_scope" label="优惠" :key="5">
                        </el-table-column>
                        <el-table-column prop="shop_no" label="实付款" :key="6">
                        </el-table-column>
                        <el-table-column prop="shop_no" label="下单时间" :key="6">
                        </el-table-column>
                        <el-table-column prop="shop_no" label="支付方式" :key="6">
                        </el-table-column>
                        <el-table-column prop="apply_status" label="状态" :key="7" >
                        </el-table-column>
                    </el-table>
                </template>
                <!-- 表格 end -->
                <template>
                    <div class="block" style="text-align: center;margin-top: 30px;">
                        <el-pagination @size-change="handleSizeChange"
                                        @current-change="jumpPagination"
                                        @prev-click="prevClick"
                                        @next-click="nextClick"
                                        :current-page="pagination.currentPage"
                                        :page-sizes="pagination.pageCount"
                                        :page-size="pagination.pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="pagination.total">
                        </el-pagination>
                    </div>
                </template>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  computed: {
    getWinHeight: function() {
      return this.$winHeight;
    }
  },
  data() {
    return {
     tableData: [],//表格数据
         //页面所需
        "pagination": {
            "total": 0,
            "pageCount": [10, 20, 50, 100],
            "currentPage": 1,
            "pageSize": 10,
            "show": '1-5'
        },
        //接口参数
        "postData": {
            "cursor": 1,//当前第几页-游标
            "size": 10,//每页条数
        },
    };
  },
  methods: {
     /**
     * 分页跳转【当前页】
     */
    jumpPagination(val) {
        console.log(val);
        this.postData.cursor = val;
        this.getData();
    },
    /**
     * 上一页
     */
    prevClick() {
        this.pagination.currentPage--;
        this.postData.cursor--;
        this.getData();
    },
    /**
     * 下一页
     */
    nextClick() {
        this.pagination.currentPage++;
        this.postData.cursor++;
        this.getData();
    },
    /**
     * 每页条数
     * @param val
     */
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagination.size = this.postData.size = val;
        this.getData();
    },
    /**
     * 获取信息详情
     */
    getDetail() {
      //初始化列表
      this.$axios
        .get("/mer/business/circle/detail?businessCircleId=" + this.businessId)
        .then(res => {
          console.log(res);
          if (res.data.code === this.$webConfig.httpSuccessStatus) {
            let info = res.data.data;
          } else {
            this.$message(res.data.message);
          }
          this.searchState = false;
        })
        .catch(() => {
          this.searchState = false;
        });
    }
  },
  beforeMount() {
    // 获取信息
    // this.getDetail();
  }
};
</script>

<style scoped>
.el-date-editor--datetimerange {
  width: 240px !important;
  margin-top: 4px;
}

</style>