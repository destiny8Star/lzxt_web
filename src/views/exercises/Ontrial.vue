<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/exercises/home">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>试用</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title" >
                           <!-- <span class="home-title-t ly-title">{{results.subjectName}}</span> -->
                        </div>
                         <div class="contBox"  v-loading="searchState">
                            <el-card style="margin: 20px 0;width:100%" v-for="(topic,topInd) in results" :key="topInd">
                                <div class="card_inTit">
                                   {{topInd+1}}、 {{topic.topicTitle}}
                                </div>
                                <div style="display:flex">
                                    <div class="top_imgs" v-for="(item,ind) in topic.topicImgList" :key="ind">
                                        <img :src="item" alt="">
                                    </div>
                                </div>
                                <!-- 填空题 -->
                                <div v-if="topic.topicType == 0">
                                        <div v-for="(inpI,indI) in topic.fillBlankTopicChoice" :key="indI" class="inpBox">
                                           ({{indI+1}})、 <el-input placeholder="请输入答案" :disabled="true"></el-input>
                                        </div>
                                </div>
                                <!-- 单选题 -->
                                <el-radio-group v-if="topic.topicType == 1">
                                    <el-radio :label="Object.keys(itemIn)[0]" v-for="(itemIn,index) in topic.radioChoice" :key="index"
                                    disabled>
                                         {{Object.keys(itemIn)[0]}}、
                                         {{Object.values(itemIn)[0].content }}
                                          <img :src="itemImg" alt="" v-for="(itemImg,indImg) in Object.values(itemIn)[0].imageList"
                                         :key="indImg" class="img-radio">
                                    </el-radio>
                                </el-radio-group>
                                <!-- 多选题 -->
                                <div v-if="topic.topicType == 2">
                                    <el-checkbox  disabled  v-for="(itemIn,index) in topic.mulChoice" :key="index">
                                        {{Object.keys(itemIn)[0]}}、
                                         {{Object.values(itemIn)[0].content }}
                                          <img :src="itemImg" alt="" v-for="(itemImg,indImg) in Object.values(itemIn)[0].imageList"
                                         :key="indImg" class="img-radio">
                                    </el-checkbox>
                                </div>
                                <!-- 问答题 -->
                                <div v-if="topic.topicType == 3">
                                    <el-input type="textarea" placeholder="请输入答案" :disabled="true"></el-input>
                                </div>
                                <!-- 判断题 -->
                                <div v-if="topic.topicType == 4">
                                     <el-radio disabled >对</el-radio>
                                     <el-radio disabled >错</el-radio>
                                </div>
                            </el-card>
                        </div>
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
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data(){
            return {
                searchState:false,
                info:"",//课程
                topic:{},//题数据  topicType:0:填空题 ,1：单选题,2:多选题,3:问答题,4:判断题
                results:{},//接口所有信息
            }
        },
        methods: {
          
            /**
             * 获取题目-继续学习 
             */
            getTopic() {
                //初始化列表
                let data = {
                    subjectId:this.info.subjectId,
                }
                this.searchState = true
                this.$axios.post('/topic/preview',data)
                .then(res => {
                    console.log("获取",res);
                    this.searchState = false;
                    this.$set(this,"results",res.data.result)
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.searchState = false;
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
        
        },
       
        created(){
            this.info = JSON.parse(this.$route.query.info) 
            console.log("info",this.info)
        },
        beforeMount() {
            this.getTopic();
        },
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
    .el-menu-demo{
        margin-bottom: 30px;
    }
   
    .card_inTit{
        font-size: 16px;
        margin-bottom: 10px;
    }
   
    .home-title .ly-title{
        font-size: 20px;
    }
  
    .el-breadcrumb__item {
        float: none;
    }
    .el-radio{
        width: 100%;
        margin:10px 0;
    }
    .card_bot{
        margin-top: 30px ;
    }
    .card_botItem{
        margin: 0 20px;
    }
 
    .contBox{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .top_imgs{
        width: 150px;
        height: 150px;
        margin: 10px;
    }
    .img-radio{
        width: 100px;
        height: 100px;
        margin: 0 20px;
    }
    .el-button{
        margin: 20px;
    }
    .hasAnswer{
        margin-right: 30px;
    }
    .inpBox{
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
</style>