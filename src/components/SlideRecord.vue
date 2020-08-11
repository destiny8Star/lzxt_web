<template>
  <div class="slide" >
       <div class="s_tj">
             <div class="s_dtkTit">统计信息</div>
             <div class="sdtkItem">科目名称：{{results.subjectName}}</div>
             <div class="sdtkItem">单元：{{results.subjectUnitList}}</div>
             <div class="sdtkItem">开始时间：{{results.createTime}}</div>
             <div class="sdtkItem">题目数量：{{results.total}}</div>
             <div class="sdtkItem">已答：{{results.total-results.noAnswer}}</div>
             <div class="sdtkItem s_gr">正确：{{results.trueNum}}</div>
             <div class="sdtkItem s_red">错误：{{results.wrongNum}}</div>
             <div class="sdtkItem">未答：{{results.noAnswer}}</div>
        </div>
        <div class="s_dtk">
             <div class="s_dtkTit">答题卡</div>
             <div class="dtkTip">
                 <div class="dtkTip_item">
                     <div class="dtkTip_item_box s_grb"></div>
                     正确
                 </div>
                 <div class="dtkTip_item ">
                     <div class="dtkTip_item_box s_redb"></div>
                     错误
                 </div>
                 <div class="dtkTip_item">
                     <div class="dtkTip_item_box s_blb"></div>
                     未做
                 </div>
             </div>
             <div class="dtkBox">
                 <div class="dtkTitem s_blb" :class="item.pStatus==1?'s_redb':item.pStatus==2?'s_grb':''" v-for="(item,ind) in 
                 results.topicAnswerStatusList" :key="ind" @click="jumpTo(item,ind+1)">{{ind+1}}</div>
             </div>
        </div>
  </div>
</template>                                       

<script>
export default {
   name:"slideRecord",
   props:{
       progressAll:Number,
   },
   watch:{
     progressAll(old,news){
        console.log("改变",old,news)
        if(this.info.status==1){
            this.getTopic();
        }else{
            this.getInfos() 
        }
     }
   },
   data(){
       return {
        results:{},
        info:{},
       }
   },
   methods:{
           //提交跳转
           jumpTo(item,ind){//0 未回答，1 错误 2 正确
               if(item.pStatus){
                   this.$emit("jumpTo",ind)
               }
           },
           // 获取题目-继续学习 
            getTopic() {
                //初始化列表
                let data = {
                    subjectId:this.info.subjectId,
                    subjectUnitList:this.info.subjectUnitList
                }
                this.$axios.post('/topic/practice',data)
                .then(res => {
                    console.log("子组件获取",res);
                    this.$set(this,"results",res.data.result)
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
             //查看
            getInfos(){
                let data = {
                    practiceId:this.info.id,
                }
                this.$axios.post('/topic/practiceDetail',data)
                .then(res => {
                    console.log("获取",res);
                    this.$set(this,"results",res.data.result)
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
   },
   created(){
        this.info = JSON.parse(this.$route.query.info) 
   },
   beforeUpdate(){
    // console.log("results",this.results)
   }
}
</script>

<style scoped>
.slide{
    width: 100%;
}
.s_tj{
    font-size: 14px;
    margin-bottom: 20px;
}
.s_dtkTit{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.s_blb{
    background: #fff;
    border: 1px solid #999;
}
.s_red{
    color:#F56C6C
}
.s_gr{
    color: #67C23A;
}
.s_grb{
    background:#67C23A ;
    color: #fff;
}
.s_redb{
    background:#F56C6C;
    color: #fff;

}
.dtkTip{
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;
}
.dtkTip_item{
    display: flex;
    align-items: center;
}
.dtkTip_item_box{
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.dtkBox{
    display: flex;
    flex-wrap: wrap;
}
.dtkTitem{
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    margin: 5px;
    font-size: 12px;
    cursor: pointer;
}
</style>