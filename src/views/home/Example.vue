<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{type=="news"?"最新资讯":"案例分享"}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="tabs" v-if="type=='news'">
         <div class="tabItem" v-for="(item,ind) in tabs" :key="ind"
          @click="selItem(item.id)" :class="selTabs==item.id?'selitem':''">
           {{item.name}}
         </div>
    </div>
    <div class="news-content w1200">
      <ul>
        <li class="news-item" v-for="(item,ind) in selArr" :key="ind" @click="toDetail(item.id)">
          <div class="left newsinfo-img">
            <img
              :src="item.imageUrl"
              data-no-retina
              alt
              class="news-img"
            />
          </div>
          <div class="right desc" style="cursor:pointer">
            <h2 class="news-title"> {{item.title}} </h2>
            <p class="news-short">{{item.summary}}</p>
            <p class="news-origin">
              <span>{{item.author}}</span>
              |
              <span>{{item.createTime}}</span>
            </p>
          </div>
        </li>
        
      </ul>
      <div class="more-btn center">
        <span class="MediumBtnType3" v-if="showMore">查看更多</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "example",
  data() {
    return {
      type:"",//news-新闻 example-案例
      forms:{
         page:1,
         pageSize:10,
         tab:1,
      },
      tabs:[
          {
              id:1,
              name:"题库",
          },
          {
              id:2,
              name:"升学",
          },
          {
              id:3,
              name:"其他",
          },
      ],
      selTabs:1,//新闻当前选中
      selArr:[],//要展示的新闻数组
      showMore:false,//是否展示更多按钮
    };
  },
  created() {
    this.init()
  },
  watch:{
     "$route.query.type":"init"
  },
  methods: {
    //选择
      selItem(id){
        this.selTabs = id;
        this.forms.page = 1 
        this.forms.tab = id
        this.$axios.post('/news/newsList',this.forms).then(res => {
            console.log("获取新闻",res);
            this.selArr  = res.data.result.list;
        })
        .catch((rej) => {
            console.log("获取数据失败",rej)
            this.$message.error(rej.data.message||"网络异常")
        });
      },
    //去详情页
    toDetail(id){
       this.$router.push("/home/newsDetail?type="+this.type+"&id="+id)
    },
    //初始化数据
    init(){
       this.type = this.$route.query.type
       console.log("router",this.$route.query.type,this.type)
       if(this.type == "news"){
          this.$axios.post('/news/newsList',this.forms).then(res => {
            console.log("获取新闻",res);
            this.selArr  = res.data.result.list;
        })
        .catch((rej) => {
            console.log("获取数据失败",rej)
            this.$message.error(rej.data.message||"网络异常")
        });
       }
    }
  }
};
</script>
<style scoped>
.el-breadcrumb__item {
  float: none;
}
.tabs{
  width: 100%;
  padding-left: 30px;
}
.tabItem{
  width: 150px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  margin: 0 10px;
  border-radius: 8px;
  display: inline-block;
  background: #eee;
}
.tabItem:hover{
  background:#5c307d ;
  color: #fff;
}
.selitem{
   background:#5c307d ;
   color: #fff;
}
</style>