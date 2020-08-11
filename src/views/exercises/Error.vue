<template>
  <div>
    <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
      <div class="third-nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/exercises/error">错题本</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
        <div class="main-feature">
          <div class="main-inner" v-loading="loading">
            <el-card style="margin: 20px 0" v-for="(item,ind) in list" :key="ind">
                <div class="item_top">
                    <div class="item_tit">
                        历史（初一） 上 
                    </div>
                     <el-button type="primary" @click="toExe">错题板</el-button>
                </div>
                <div class="item_bot">
                    <div class="col_tit">状态：有效</div>
                    <div class="col_time">购买时间：2020-02-19 13:35:55</div>
                    <div class="col_time">到期时间：2020-02-19 13:35:55</div>
                </div>
            </el-card>

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
        loading:false,
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
            "size": 10,//每页条数
        },
      list: [] //题数据
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
    //去练习
    toExe(id) {
      this.$router.push("/exercises/error/errorDetail");
    },
    /**
     * 获取信息详情
     */
    getDetail() {
      //初始化列表
      this.loading = true
      this.$axios.post("/topic/userProblemList",this.postData)
        .then(res => {
          console.log(res);
          this.loading = false
          this.$set(this,"list", res.data.result)   
        
        })
        .catch((rej) => {
          this.loading = false
          this.$message.error(rej.data.message||"网络异常")
        });
    }
  },
  beforeMount() {
    // 获取信息
    this.getDetail();
  }
};
</script>

<style scoped>
.el-date-editor--datetimerange {
  width: 240px !important;
  margin-top: 4px;
}

.card_inTit {
  font-size: 16px;
  margin-bottom: 10px;
}

.home-title .ly-title {
  font-size: 20px;
}

.el-breadcrumb__item {
  float: none;
}
.col_tit {
  color: #67c23a;
  margin-right: 20px;
}
.col_time {
  margin: 0 20px;
}
.col_num {
  color: #909399;
}
.item_tit {
  margin: 20px 0 ;
  font-size: 20px;
}
.item_top{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item_bot{
    display: flex;
    align-items: center;
}
</style>