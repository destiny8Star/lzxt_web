<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/exercises/home">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>练习</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                      
                        <div class="home-title" >
                           <span class="home-title-t ly-title">{{results.subjectName}}</span>
                        </div>
             
                         <div class="contBox"  v-loading="searchState">
                            <el-card style="margin: 20px 0;max-width:60%" >
                                <div class="card_inTit">
                                    {{progress}}、 {{topic.topicTitle}}
                                </div>
                                <div style="display:flex">
                                    <div class="top_imgs" v-for="(item,ind) in topic.topicImgList" :key="ind">
                                        <img :src="item" alt="">
                                    </div>
                                </div>
                              
                                <el-radio-group v-model="answer">
                                    <el-radio :label="Object.keys(itemIn)[0]" v-for="(itemIn,index) in topic.radioChoice" :key="index"
                                    :disabled="topic.pstatus?true:false">
                                         {{Object.keys(itemIn)[0]}}、
                                         {{Object.values(itemIn)[0].content }}
                                          <img :src="itemImg" alt="" v-for="(itemImg,indImg) in Object.values(itemIn)[0].imageList"
                                         :key="indImg" class="img-radio">
                                    </el-radio>
                                </el-radio-group>
                                <div style="margin:20px 0" v-if="topic.pstatus&&topic.pstatus!=0">
                                   <span class="hasAnswer" :class="topic.pstatus==1?'red-color':'suc-color' ">你的答案：{{topic.userAnswer}}</span>
                                   <span class="hasAnswer" :class="topic.pstatus==1?'red-color':'suc-color' ">结果：{{topic.pstatus==1?'错误':'正确'}}</span>
                                   <span class="hasAnswer">正确答案：{{topic.answer}}</span>
                                </div>   
                                <div>
                                    <el-button type="primary" @click="goback" :disabled="progress<=1">上一题</el-button>
                                    <el-button type="primary" @click="toNext" :disabled="(topic.pstatus&&results.total==progress)?true:false">{{topic.pstatus?"下一题":"提交"}} </el-button>
                                </div>
                               
                            </el-card>
                            <el-card style="margin: 20px 0;width:39%;background:#EBEEF5" >
                                <SlideRecord :progressAll="progressAll" @jumpTo="jumpTo"></SlideRecord>
                            </el-card>
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SlideRecord from "@/components/SlideRecord.vue"
    export default {
        name: "Detail",
        components:{
            SlideRecord
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data(){
            return {
                searchState:false,
                info:"",//课程
                topic:{},//题数据
                answer:"",//答案
                results:{},//接口所有信息
                progress:0,//当前在第几道提上
                progressAll:0,//进度
            }
        },
        methods: {
             //上一题
            goback(){
               let page = --this.progress
               let data = {
                    "page":page,
                    "practiceId":this.results.practiceId
                    }
                this.jump(data)    
            },
            //下一
            toNext(){
              console.log("this",this.results,this.topic)
               if(!this.topic.pstatus){
                   if(this.answer.trim()=='')return this.$message("请填写答案")
                   let data = {
                        "practiceId":this.results.practiceId,
                        "topicId":this.topic.id,
                        "answer":this.answer
                    }
                    this.commit(data)
                   console.log("去提交")
               }else{
                    let page = ++this.progress
                    let data = {
                    "page":page,
                    "practiceId":this.results.practiceId
                    }
                     this.jump(data)  
               }
            },
            jumpTo(page){
              console.log("page",page)
               let data = {
                    "page":page,
                    "practiceId":this.results.practiceId
                }
                this.progress = page  
                this.jump(data)  
            },
            //jump接口
            jump(data){
                this.searchState = true
                this.answer = ""
                this.$axios.post('/topic/jump',data)
                .then(res => {
                    console.log("获取",res);
                    this.searchState = false;
                    this.topic = res.data.result.topic;
                    this.progressAll = res.data.result.progress;
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.searchState = false;
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
            //commit提交接口
            commit(data){
                this.searchState = true
                this.$axios.post('/topic/submit',data)
                .then(res => {
                    console.log("获取",res);
                    this.searchState = false;
                    this.answer = ""
                    let info =  {
                    "page":this.progress,
                    "practiceId":this.results.practiceId
                    }
                    this.jump(info)
                    // this.topic = res.data.result.topic;
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.searchState = false;
                    this.$message.error(rej.data.message||"网络异常")
                });
            },

          
            /**
                status:"",//状态1未完成 2 已完成 3 已取消
             * 获取题目-继续学习 
             */
            getTopic() {
                //初始化列表
                let data = {
                    subjectId:this.info.subjectId,
                    subjectUnitList:this.info.subjectUnitList
                }
                this.searchState = true
                this.$axios.post('/topic/practice',data)
                .then(res => {
                    console.log("获取",res);
                    this.searchState = false;
                    this.topic = res.data.result.topic;
                    this.progress = res.data.result.progress
                    this.progressAll = res.data.result.progress
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
        beforeMount() {//1未完成 2 已完成 3 已取消
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
    .card_botItem_suc{
        color:#67C23A
    }
    .card_botItem_fai{
        color:#F56C6C
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
</style>