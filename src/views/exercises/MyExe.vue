<template>
  <div>
    <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
      <div class="third-nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/exercises/myExe">我的学习</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
        <div class="main-feature">
          <div class="main-inner" v-loading="searchState">
            <el-card style="margin: 20px 0" v-for="item in list" :key="item.id">
                <div class="item_top">
                    <div class="item_tit">
                      {{item.subjectName}} 
                      <span style="font-size:14px;color:#909399;margin:0 30px">单元: {{item.subjectUnitList}}</span>
                       <span style="color:#5c307d ;font-size:16px;" v-if="item.historyStatus==1" >未完成</span>
                       <span style="color:#5c307d ;font-size:16px;" v-if="item.historyStatus==3" >已取消</span>
                       <span style="color:#67c23a;font-size:16px;" v-if="item.historyStatus==2">已完成</span>
                    </div>
                    
                     <el-button type="primary" @click="toExe(item)" :disabled="item.status==1||item.historyStatus==3">{{item.historyStatus==1?"继续学习":item.historyStatus==2?"查看":"已取消"}}</el-button>
                </div>
                <div class="item_bot">
                    <div class="col_tit" :style="{color:item.status==1?'#F56C6C':''}">状态：{{item.status==1?"已过期":"有效"}}</div>
                    <div class="col_time">开始时间：{{item.createTime}}</div>
                    <div class="col_time">完成时间：{{item.finishTime? item.finishTime:"--" }}</div>
                </div>
            </el-card>
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
      list: [] //题数据
    };
  },
  methods: {
    //去练习
    toExe(item) {
      // console.log("item",item)
      let info = {
        id:item.id,
        status:item.historyStatus,
        subjectId:item.subjectId,
        subjectUnitList:item.subjectUnitList
      }
      info = JSON.stringify(info)
      this.$router.push("/exercises/myExe/myExeDetail?info="+info);
    },
    /**
     * 获取信息详情
     */
    getDetail() {
        //初始化列表
        this.searchState = true
        this.$axios.post('/topic/practiceHistory').then(res => {
            console.log("获取",res);
            this.searchState = false;
            this.list = res.data.result;
        })
        .catch((rej) => {
            console.log("获取数据失败",rej)
            this.searchState = false;
            this.$message.error(rej.data.message||"网络异常")
        });
    },
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