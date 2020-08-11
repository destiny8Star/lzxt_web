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
          <div class="main-inner"  v-loading="searchState">
               <!-- 表格 start -->
                <template>
                    <el-table ref="multipleTable" :data="tableData" style="width: 100%;min-width: 780px;">
                        <el-table-column prop="orderId" label="订单编号" :key="2">
                        </el-table-column>
                        <el-table-column prop="course.courseName" label="商品名称" :key="3">
                        </el-table-column>
                        <el-table-column prop="course.coursePrice" label="商品总额" :key="4">
                        </el-table-column>
                        <el-table-column  label="包含科目" width="150">
                            <template slot-scope="scope">
                              <div v-for="(item,ind) in scope.row.course.subjectList" :key="ind">
                                {{item.subjectName}}({{item.subjectTerm}})
                              </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="couponAmount" label="优惠" :key="5">
                        </el-table-column>
                        <el-table-column prop="oamount" label="实付款" :key="6">
                        </el-table-column>
                        <el-table-column prop="createTime" label="下单时间" :key="7" width="200">
                        </el-table-column>
                        <el-table-column  label="支付方式" :key="8">
                            <template slot-scope="scope">
                                 {{scope.row.payType==1?"微信支付":"支付宝支付"}}
                            </template>
                        </el-table-column>
                        <el-table-column  label="状态" :key="9" >
                           <template slot-scope="scope">
                                 {{scope.row.payStatus==1?"未支付":"已支付"}}
                            </template>
                        </el-table-column>
                        <el-table-column  label="操作"  >
                           <template slot-scope="scope">
                                <el-button type="danger" @click="delClick(scope.row)" size="mini">删除</el-button>
                                <el-button type="primary" size="mini" @click="toClick(scope.row)" v-if="scope.row.payStatus==1">去支付</el-button>
                            </template>
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
      searchState:false,
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
            "page": 1,//当前第几页-游标
            "pageSize": 10,//每页条数
        },
    };
  },
  methods: {
    //去支付
    toClick(row){
        console.log("row",row)
        let subject = ""
         row.course.subjectList.forEach(e => {
           subject+=e.subjectName+'('+e.subjectTerm+'),'
        });
        let info = {
          orderId:row.orderId,
          courseName:row.course.courseName,
          amount:row.oamount,
          subject:subject
        }
        info = JSON.stringify(info)
        this.$router.push("/exercises/orderPay?infos="+info)
        console.log("info",info)
    },
     /**
     * 分页跳转【当前页】
     */
    jumpPagination(val) {
        console.log(val);
        this.postData.page = val;
        this.getData();
    },
    /**
     * 上一页
     */
    prevClick() {
        this.pagination.currentPage--;
        this.postData.page--;
        this.getData();
    },
    /**
     * 下一页
     */
    nextClick() {
        this.pagination.currentPage++;
        this.postData.page++;
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
    getData() {
      //初始化列表
      this.searchState = true
      this.$axios.post("/order/orderList" , this.postData)
        .then(res => {
          console.log(res);
          this.searchState = false;
          this.$set(this.pagination,"total",res.data.result.size)
          this.$set(this,"tableData",res.data.result.list)
        })
        .catch((rej) => {
              console.log("获取数据失败",rej)
              this.searchState = false;
              this.$message.error(rej.data.message||"网络异常")
        });
    }
  },
  beforeMount() {
    // 获取信息
    this.getData();
  }
};
</script>

<style scoped>
.el-date-editor--datetimerange {
  width: 240px !important;
  margin-top: 4px;
}
.el-button{
  margin: 5px;
}
</style>