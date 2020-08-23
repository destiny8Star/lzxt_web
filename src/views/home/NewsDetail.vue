<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="'/home/example?type='+type">{{type=="news"?"最新资讯":"案例分享"}}</el-breadcrumb-item>
      <el-breadcrumb-item>资讯详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="read-details" >
        <div class='YnewsDetail'>
          <div class="read-details-title">{{infos.title}}</div>
          <div class="read-details-title" style='font-size:18px'>{{infos.summary}}</div>
          <div class="read-details-time">作者：{{infos.author}}  |  {{infos.createTime}}</div>
         </div>
        <!-- <div class="read-details-img" :style="'background-image:url('+infos.imageUrl+')'"> -->
          <!-- <img :src="infos.imageUrl" alt=""> --> 
        <!-- </div> -->
        <div v-html="infos.content" class="read-details-content"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "newsDetail",
  data() {
    return {
        infos:"",
        type:"",//news-新闻 example-案例
    };
  },
  created() {
     this.type = this.$route.query.type
     let id = this.$route.query.id
     this.$axios.post('/news/detail',{id}).then(res => {
          console.log("获取新闻",res);
          this.infos  = res.data.result;
      })
      .catch((rej) => {
          console.log("获取数据失败",rej)
          this.$message.error(rej.data.message||"网络异常")
      });
  },
  methods: {}
};
</script>
<style scoped>
.el-breadcrumb__item {
  float: none;
}
.YnewsDetail{
  width:1200px;
  margin:0 auto;
  background-image: url(../../assets/imgs/3-1title.png);
   background-size: cover;
 background-position: center;
 border-radius: 15px;
 padding:15px 20px;
}
.read-details{
  width: 100%;
  padding: 30px;
  overflow: hidden;
}
.read-details-title {
  font-size: 24px;
  color: #fff;
  font-weight: 500;
}
 .read-details-time {
  font-size: 14px;
  color: #fff;
  /* margin-right: 200px; */
}
.read-details .read-details-content {
  margin:30px auto;
  width:720px;
  color: #353535;
  font-size: 16px;
}
.read-details-img{
 width: 60%;
 height: 300px;
 margin: 0 auto;
 background-size: cover;
 background-position: center;
}

</style>