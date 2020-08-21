<template>
  <div>
    <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
      <div class="third-nav">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/exercises/error/errorDetail">错题本</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
        <div class="main-feature">
          <div class="main-inner">
            <!-- 搜索条件 start -->
            <el-form
              :inline="true"
              label-position="left"
              ref="forms"
              :model="postData"
              label-width="60px"
            >
              <el-form-item label="科目:">
                <el-select v-model="postData.subjectName" placeholder="请选择">
                  <el-option
                    v-for="item in subjects"
                    :key="item.id"
                    :label="item.subjectName"
                    :value="item.subjectName"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年级:">
                <el-select v-model="postData.subjectGrade" placeholder="请选择">
                  <el-option
                    v-for="item in grades"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学期:">
                <el-select v-model="postData.subjectTerm" placeholder="请选择">
                  <el-option
                    v-for="item in terms"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm" size="small" v-loading="loading">查询</el-button>
              </el-form-item>
            </el-form>
            <div class="home-title">
             
              <span class="home-title-t ly-title">{{postData.subjectName}}（{{postData.subjectTerm}}）</span>
            </div>
            <el-card style="margin: 20px 0" v-for="(item,ind) in list" :key="ind">
              <div class="card_inTit">{{ind+1}}、{{item.topic.topicTitle}}</div>
              <!-- <el-radio-group v-model="from['radio'+ind]"> -->
                  <!-- :label="Object.keys(itemIn)[0]" -->
                <!-- 填空题 -->
                <div v-if="item.topic.topicType == 0">
                  <div v-for="(inpI,indI) in item.topic.fillBlankTopicChoice" :key="indI" class="inpBox">
                      ({{indI+1}})、
                      <el-input placeholder="请输入答案" disabled></el-input>
                  </div>
              </div>
              <!-- 单选题 -->    
              <el-radio-group v-if="item.topic.topicType==1">
                <el-radio
                  v-for="(itemIn,index) in item.topic.radioChoice"
                  :key="index"
                  disabled
                >{{Object.keys(itemIn)[0]}}、
                {{Object.values(itemIn)[0].content }}
                  <img :src="itemImg" alt="" v-for="(itemImg,indImg) in Object.values(itemIn)[0].imageList"
                  :key="indImg" class="img-radio">
                </el-radio>
              </el-radio-group>
              <!-- 多选题 -->
              <div v-if="item.topic.topicType == 2">
                  <el-checkbox-group >
                      <el-checkbox  v-for="(itemIn,index) in item.topic.mulChoice" :key="index" disabled>
                          {{Object.keys(itemIn)[0]}}、
                          {{Object.values(itemIn)[0].content }}
                          <img :src="itemImg" alt="" v-for="(itemImg,indImg) in Object.values(itemIn)[0].imageList"
                          :key="indImg" class="img-radio">
                        </el-checkbox>
                  </el-checkbox-group>
              </div>
              <!-- 问答题 -->
              <div v-if="item.topic.topicType == 3">
                  <div  class="inpBox">
                      <el-input type="textarea" :rows="3" placeholder="请输入答案" disabled></el-input>
                  </div>
              </div>
              <!-- 判断题 0为真，1为假-->
              <el-radio-group v-if="item.topic.topicType == 4">
                  <el-radio  disabled>对</el-radio>
                  <el-radio  disabled>错</el-radio>
              </el-radio-group>


              <div class="card_bot">
                <span class="card_botItem card_botItem_fai" v-if="item.topic.topicType==0">
                  你的答案：{{item.errorAnswer | formatData}}
                </span>
                <span class="card_botItem card_botItem_fai" v-if="item.topic.topicType==1||item.topic.topicType==2||item.topic.topicType==3">
                  你的答案：{{item.errorAnswer}}
                </span>
                <span class="card_botItem card_botItem_fai" v-if="item.topic.topicType==4">
                  你的答案：{{item.errorAnswer==0?"对":"错"}}
                </span>
                <div class="hasAnswer2 card_botItem_suc card_botItem" v-if="item.topic.topicType==0">
                    正确答案：
                    <div v-for="(aitem,aint) in item.topic.fillBlankAnswer" :key="aint">
                      ({{aint+1}})、{{aitem.content}}
                    </div>
                </div>
                <span class="card_botItem card_botItem_suc" v-if="item.topic.topicType==1||item.topic.topicType==2||item.topic.topicType==3">
                  正确答案：{{item.topic.answer}}
                </span>
                <span class="card_botItem card_botItem_suc" v-if="item.topic.topicType==4">
                    正确答案：{{item.topic.answer==0?"对":"错"}}
                </span>
                <span class="card_botItem">错误时间：{{item.errorTime}}</span>
                <span class="card_botItem">错误次数：{{item.errorCount}}</span>
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
      loading: false, //查询按钮
      list: [], //题数据
      subjects: [
        //科目列表
      {
        id: 0,
        subjectGrade: "全部",
        subjectName: "全部",
        subjectTerm: "全部"
      },
      
      ],
      grades: [
        //年级
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "七年级",
          label: "七年级"
        },
        {
          value: "八年级",
          label: "八年级"
        },
        {
          value: "九年级",
          label: "九年级"
        }
      ],
      terms: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "上",
          label: "上"
        },
        {
          value: "下",
          label: "下"
        }
      ],
      pagination: {
        total: 0,
        pageCount: [10, 20, 50, 100],
        currentPage: 1,
        pageSize: 10,
        show: "1-5"
      },
      //接口参数
      postData: {
        page: 1,
        pageSize: 10,
        subjectName: "全部", //科目名称
        subjectGrade: "全部", //年级
        subjectTerm: "全部" //学期
      }
    };
  },
  //过滤填空题答案
  filters:{
      formatData(data){
        let newData = data.split("$#$")
        let format = "";
        newData.forEach((e,i) => {
           if(e!=""){
            format +=`(${i+1})`+e+" "
           }
        });
        return format
      }
  },
  methods: {
    /**
     * 分页跳转【当前页】
     */
    jumpPagination(val) {
      console.log(val);
      this.pagination.currentPage = val;
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
    // 查询
    submitForm() {
      console.log("this.fomr", this.postData);
      this.postData.page = 1;
      this.getData()
    },
    //获取学科列表
    getSubjects() {
      this.$axios.post("/subject/listSubject")
        .then(res => {
          console.log("学科", res);
          this.subjects.push(...res.data.result)
        })
        .catch(rej => {
          this.$message.error(rej.data.message || "网络异常");
        });
    },

    /**
     * 获取信息详情
     */
    getData() {
      //初始化列表
      this.loading = true;
      this.$axios
        .post("/topic/userProblemSearch", this.postData) 
        .then(res => {
          console.log(res);
          this.loading = false;
          this.$set(this, "list", res.data.result.list);
          this.$set(this.pagination, "total", res.data.result.size);
        })
        .catch(rej => {
          this.loading = false;
          // if(rej.data.code == 1011004104){
          //   return 
          // }
          this.$message(rej.data.message || "网络异常");
        });
    },
  },
  beforeMount() {
    // 获取信息
    this.getData();
    this.getSubjects();
  }
};
</script>

<style scoped>
.el-form-item {
  margin-right: 30px;
}
.el-date-editor--datetimerange {
  width: 240px !important;
  margin-top: 4px;
}
.el-menu-demo {
  margin-bottom: 30px;
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
.card_bot {
  margin-top: 30px;
}
.card_botItem {
  margin: 0 20px;
}
.hasAnswer2{
  margin: 10px 20px;
}
.card_botItem_suc {
  color: #67c23a;
}
.card_botItem_fai {
  color: #f56c6c;
}
.el-radio{
  display: block;
  margin: 20px 0;
}
.img-radio{
  width: 100px;
  height: 100px;
  margin: 0 20px;
}
</style>