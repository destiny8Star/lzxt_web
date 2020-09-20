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
                            <el-card style="margin: 20px 0;width:100%" >
                                <div class="card_inTit">
                                    {{progress}}、 {{topic.topicTitle}}
                                </div>
                                <div style="display:flex">
                                    <div class="top_imgs" v-for="(item,ind) in topic.topicImgList" :key="ind">
                                        <img :src="item" alt="">
                                    </div>
                                </div>
                                <!-- 填空题 -->
                                 <div v-if="topic.topicType == 0">
                                    <div v-for="(inpI,indI) in topic.fillBlankTopicChoice" :key="indI" class="inpBox">
                                        ({{indI+1}})、
                                        <el-input placeholder="请输入答案" v-model="inpIbox[indI]" :disabled="topic.pstatus?true:false"></el-input>
                                    </div>
                                </div>
                                <!-- 单选题 -->
                                <el-radio-group  v-model="answer" v-if="topic.topicType == 1">
                                    <el-radio :label="Object.keys(itemIn)[0]" v-for="(itemIn,index) in topic.radioChoice" :key="index"
                                    :disabled="topic.pstatus?true:false">
                                         {{Object.keys(itemIn)[0]}}、
                                         {{Object.values(itemIn)[0].content }}
                                          <img :src="itemImg" alt="" v-for="(itemImg,indImg) in Object.values(itemIn)[0].imageList"
                                         :key="indImg" class="img-radio">
                                    </el-radio>
                                </el-radio-group>
                                 <!-- 多选题 -->
                                <div v-if="topic.topicType == 2">
                                    <el-checkbox-group v-model="answer2">
                                        <el-checkbox  v-for="(itemIn,index) in topic.mulChoice" :key="index" :label="Object.keys(itemIn)[0]"
                                        :disabled="topic.pstatus?true:false">
                                            {{Object.keys(itemIn)[0]}}、
                                            {{Object.values(itemIn)[0].content }}
                                            <img :src="itemImg" alt="" v-for="(itemImg,indImg) in Object.values(itemIn)[0].imageList"
                                            :key="indImg" class="img-radio">
                                         </el-checkbox>
                                    </el-checkbox-group>
                                </div>
                               <!-- 问答题 -->
                                <div v-if="topic.topicType == 3">
                                    <div  class="inpBox">
                                        <el-input type="textarea" :rows="3" placeholder="请输入答案" v-model="answer" :disabled="topic.pstatus?true:false"></el-input>
                                    </div>
                                </div>
                               <!-- 判断题 0为真，1为假-->
                                <el-radio-group v-model="answer" v-if="topic.topicType == 4">
                                    <el-radio label="0" :disabled="topic.pstatus?true:false">对</el-radio>
                                    <el-radio label="1" :disabled="topic.pstatus?true:false">错</el-radio>
                                </el-radio-group>
                                <div style="margin:20px 0" v-if="topic.pstatus&&topic.pstatus!=0">
                                    <div class="hasAnswer2" :class="topic.pstatus==1?'red-color':'suc-color'" v-if="topic.topicType==0">
                                       你的答案：
                                       <div v-for="(aitem,aint) in uinpBox" :key="aint">
                                            <div v-if="aitem">({{aint+1}})、{{aitem}}</div>
                                       </div>
                                   </div>
                                   <span class="hasAnswer" :class="topic.pstatus==1?'red-color':'suc-color' " v-if="topic.topicType==1||topic.topicType==2||topic.topicType==3">
                                       你的答案：{{topic.userAnswer}}
                                   </span>
                                   <span class="hasAnswer" :class="topic.pstatus==1?'red-color':'suc-color' " v-if="topic.topicType==4">
                                       你的答案：{{topic.userAnswer==0?"对":"错"}}
                                    </span>
                                   <span class="hasAnswer" :class="topic.pstatus==1?'red-color':'suc-color' ">结果：{{topic.pstatus==1?'错误':'正确'}}</span>
                                   <div class="hasAnswer2" v-if="topic.topicType==0">
                                       正确答案：
                                       <div v-for="(aitem,aint) in topic.fillBlankAnswer" :key="aint">
                                          ({{aint+1}})、{{aitem.content}}
                                       </div>
                                   </div>
                                   <span class="hasAnswer" v-if="topic.topicType==1||topic.topicType==2||topic.topicType==3">
                                       正确答案：{{topic.answer}}
                                   </span>
                                   <span class="hasAnswer" v-if="topic.topicType==4">
                                       正确答案：{{topic.answer==0?"对":"错"}}
                                   </span>
                                </div>   
                                <div>
                                    <el-button type="primary" @click="goback" :disabled="progress<=1">上一题</el-button>
                                    <el-button type="primary" @click="toNext" :disabled="(topic.pstatus&&results.total==progress)?true:false">{{topic.pstatus?"下一题":"提交"}} </el-button>
                                    <el-button type="danger" @click="cancel" >取消</el-button>
                                </div>
                               
                            </el-card>
                            <el-card style="margin: 20px 0;background:#EBEEF5" >
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

                answer2:[],//多选答案
                inpIbox:{},//填空答案
                uinpBox:[],//填写的填空答案
            }
        },
        methods: {
            // 取消
            cancel(){

              this.$axios.post('/topic/jump',{practiceId:this.results.practiceId})
                .then(res => {
                    console.log("取消",res);
                    this.searchState = false;
                    this.$message.success("取消成功")
                    this.$router.go(-2)
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.searchState = false;
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
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
              console.log("this",this.results,this.topic,this.answer,this.answer2,this.inpIbox[0])
               if(!this.topic.pstatus){
                   let answer = "";
                   if(this.topic.topicType==1||this.topic.topicType==3||this.topic.topicType==4){
                         if(this.answer.trim()=='')return this.$message("请填写答案")
                         answer = this.answer
                   }else if(this.topic.topicType==2){
                         if(this.answer2.length==0)return this.$message("请选择答案")
                         this.answer2.forEach(e => {
                             answer += e+","
                         });
                        console.log("answer",answer)

                   }else if(this.topic.topicType==0){
                        for(let i = 0;i < this.topic.fillBlankTopicChoice;i++){
                            if(this.inpIbox[i] == undefined || this.inpIbox[i].trim() == ''){
                                return this.$message("请填写答案")
                            }else{
                                answer+=this.inpIbox[i]+'$#$'
                            }
                        }
                        console.log("answer",answer)
                   }
                   let data = {
                        "practiceId":this.results.practiceId,
                        "topicId":this.topic.id,
                        "answer":answer
                    }
                    this.commit(data)
                   console.log("去提交",data)
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
                this.uinpBox = []
                this.$axios.post('/topic/jump',data)
                .then(res => {
                    console.log("获取",res);
                    this.searchState = false;
                    this.topic = res.data.result.topic;
                    this.progressAll = res.data.result.progress;
                    if(this.topic.topicType==0&&this.topic.pstatus&&this.topic.pstatus!=0){
                        console.log("天空答案",this.topic.userAnswer)
                        this.uinpBox = this.topic.userAnswer.split("$#$")
                    }
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
                    this.answer2 = []
                    this.inpIbox = {}
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
                    if(this.topic.topicType==0&&this.topic.pstatus&&this.topic.pstatus!=0){
                        console.log("天空答案",this.topic.userAnswer)
                        this.uinpBox = this.topic.userAnswer.split("$#$")
                    }
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
    .hasAnswer2{
        margin: 10px;
    }
    .inpBox{
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
</style>