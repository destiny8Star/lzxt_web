<template>
<div>

  <div id="nav" class="nav whiteNav">
    <div class="nav-content">
      <!-- 企学院企业微信独立页面特殊处理 -->
      <router-link to="/" class="nav-logo_wrap" v-if="showDiv"></router-link>
      <div class="nav-func" style="display: block">
        <!-- <router-link id="navRoot" to="/home" class="nav-func_item" exact>首页</router-link> -->
        <div id="product" style='font-size:14px;font-weight:800' class="nav-func_item nav-more" :class="isMultinport?'router-link-active':''">
          产品与服务
          <i class="arrow-down iconfont iconicon_nav_downArrow"></i>
          <div class="product-list">
            <div class="product-multi">
              <div class="product-item__title">多终端课堂</div>
              <router-link
                to="/home/multinport"
                class="product-multi-item"
               >
                <i class="iconfont iconicon_minprogram EC1"></i>
                小程序课堂
              </router-link>
              <router-link
                to="/home"
                class="product-multi-item"
               >
                <i class="iconfont iconicon_minprogram EC1"></i>
                小程序
              </router-link>
              <router-link
                to="/home"
                class="product-multi-item"
               >
                <i class="iconfont iconicon_h EC1"></i>
                APP
              </router-link>
            </div>
            <div class="product-item">
              <div class="product-item__title">习题练习</div>
              <router-link to="/exercises" class="product-item__func">
                <div class="product-item__name">历史</div>
              </router-link>
              <router-link to="/exercises" class="product-item__func">
                <div class="product-item__name">化学</div>
                <!-- <div class="product-item__tip">历史</div> -->
              </router-link>
            </div>
            <!-- <div class="product-item">
              <div class="product-item__title">商家服务</div>
              <router-link to="/" class="product-item__func">
                <div class="product-item__name">商家学院</div>
                <div class="product-item__tip">小鹅通商家学习社群</div>
              </router-link>
            </div> -->
          </div>
        </div>
        <!-- <router-link  to="/home/example?type=example" class="nav-func_item">案例分享</router-link> -->
        <div class="nav-func_item" style='font-size:14px;font-weight:800' :class="isExample?'router-link-active':''" @click="$router.push('/home/example?type=example')">案例分享</div>
        <!-- <div id="xecloud" class="nav-func_item nav-more">
          云服务
          <i class="arrow-down iconfont iconicon_nav_downArrow"></i>

          <div class="product-list">
            <div class="product-item">
              <a
                href="https://cloud.xiaoe-tech.com/"
                target="_blank"
                class="product-item__func"
                data-count="pc-顶部导航_产品与服务_云服务"
              >
                <div class="product-item__name">API自主开发</div>
                <div class="product-item__tip">自主打造你的在线课堂</div>
              </a>
            </div>
            <div class="product-item">
              <a
                href="https://admin.xiaoe-tech.com/app_store"
                target="_blank"
                class="product-item__func"
                data-count="pc-顶部导航_产品与服务_应用市场"
              >
                <div class="product-item__name">应用市场</div>
                <div class="product-item__tip">更多深层次需求订购市场</div>
              </a>
            </div>
          </div>
        </div> -->
        <!-- <div id="aboutUs" class="nav-func_item nav-more">
          关于我们
          <i class="arrow-down iconfont iconicon_nav_downArrow"></i>
          <div class="more-list">
            <a href="/companyProfile" class="more-item" data-count="pc-顶部导航_关于我们_关于我们">公司简介</a>
            <a href="/joinUs" class="more-item" data-count="pc-顶部导航_关于我们_加入我们">加入我们</a>
            <a href="/mediaReport" class="more-item" data-count="pc-顶部导航_关于我们_媒体报道">媒体报道</a>
            <a href="/extendRead" class="more-item" data-count="pc-顶部导航_关于我们_延伸阅读">延伸阅读</a>
            <a
              href="https://admin.xiaoe-tech.com/helpCenter/index"
              class="more-item"
              data-count="pc-顶部导航_关于我们_帮助中心"
            >帮助中心</a>
          </div>
        </div> -->
      </div>
       <div class="btns index_top_btn" v-show="isLogin">
          <div class="login-btn SmallBtnType1" @click="toLogin">
            <router-link to="/exercises" class="product-item__func">
             习题练习
            </router-link>
          </div>
       </div>
      <div class="btns index_top_btn" v-show="!isLogin">
        <!-- 企学院企业微信独立页面右侧按钮显示跳转注册链接 -->
         <div class="login-btn SmallBtnType1" @click="toLogin">
           <img src="../assets/imgs/login.png" style='margin-right:5px' alt="">
           <div>登录</div>
           
          </div>
          <div to="/free" class="SmallBtnType1" @click="toLogin">
            <img src="../assets/imgs/shiyong.png" style='margin-right:5px' alt="">
            免费试用
          </div>

          <div class="ban_news blank" v-show="selLogin">
              <h5 class="ban_newsTit" style="border-bottom:0;line-height:1;font-size:18px;margin-left:20px" @click="outLogin"> 取消 </h5>
              <div class="login_qr">
                <iframe :src="qrcode" frameborder="0"></iframe>
              </div>
          </div>
        <!-- <div class="header-Qr">
          <span style="line-height:40px;">
            <i class="iconfont iconicon_minprogram EC1"></i>
          </span>
          <div style='font-size:12px'>小程序</div>
          <div class="tip-pop" style=" width: 200px; left: -100px; text-align: center; top:68px">
            <div class="iblock">
              <img
                src="http://img.jyeoo.net/images/root/wxSJ.jpg"
                alt
                style="width:172px;height:172px;"
              />
              <div>菁优网资源中心</div>
            </div>
          </div>
        </div> -->

         <!-- <div class="header-Qr">
          <span style="line-height:40px;">
            <i class="iconfont iconicon_h EC1"></i>
          </span>
          <div style='font-size:12px'>APP</div>
          <div class="tip-pop" style=" width: 200px; left: -100px; text-align: center; top:68px">
            <div class="iblock">
              <img
                src="http://img.jyeoo.net/images/root/wxPS.jpg"
                alt
                style="width:172px;height:172px;"
              />
              <div>菁优网拍搜</div>
            </div>
          </div>
        </div> -->
        
      </div>
    </div>
  </div>

  <!-- banner -->
  <div class="i_banner">
       <el-carousel trigger="click" height="500px" >
            <el-carousel-item v-for="(item,ind) in banners" :key="ind">
                <div class="i_banner_item">
                    <img :src="item" alt="">
                </div>
            </el-carousel-item>
        </el-carousel>
      
        <!-- 登陆 -->
        <!-- <div class="ban_news blank" v-show="selLogin">
            <h3 class="ban_newsTit" style="border-bottom:0" @click="outLogin">   返回 </h3>
            <div class="login_qr">
              <iframe :src="qrcode" frameborder="0"></iframe>
            </div>
        </div> -->
  </div>
    <!-- 最新资讯 -->
  <div class="infoBox" v-show="isNews">
    <div class="info_left">
      <img src="@/assets/image/image_1.png" alt="">
    </div>
    <div class="info_right" >
          <div class="info_right_top">
              <h3 class="ban_newsTit">最新资讯</h3>
            <router-link  to="/home/example?type=news" class="ban_newsMore">
              【更多】
            </router-link>
          </div>
        
          <div class="ban_newsTabs">
              <div class="ban_newsTabs_item" :class="selTabs==item.id?'selTabs':''" 
              v-for="item in tabs" :key="item.id" @click="overTabs(item.id)">
                  {{item.name}}
              </div>
          </div>
          <div class="ban_newsCont">
              <div class="ban_newsCont_item" v-for="item in selArr" :key="item.id"
                @click="toDetail(item.id)">
                      {{item.title}}  
              </div>
          </div>
         

      </div>
  </div>  
    
</div>

</template>

<script>
export default {
  name: "NewHeader",
  data() {
    return {
         isLogin:false,//是否登陆
         showDiv:true,//是否展示省市区
         banners:[
             require("@/assets/image/ban1.png"),
             require("@/assets/image/ban2.png"),
         ],
         selTabs:1,//新闻当前选中
         qrcode:"",//二维码地址
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
         tkArr:[],
         sxArr:[],
         qtArr:[], 
         selArr:[],//要展示的新闻数组
         selLogin:false,//是否点击登陆
    };
  },
  computed:{
      //修改点击二级分类的时候添加类名
     isMultinport(){
         return this.$route.meta.menu_name == 'Multinport'
     },
     //是否展示新闻
     isNews(){
         return this.$route.meta.menu_name == 'home'
     },
     //是否是案例
     isExample(){
         return this.$route.query.type == 'example'
     }
  },
  methods: {
      //去详情页
    toDetail(id){
       this.$router.push("/home/newsDetail?type=news&id="+id)
    },
      //鼠标移入显示
      overTabs(id){
          this.selTabs = id;
          if(id==1){
            if(this.tkArr.length>0){
              this.selArr = this.tkArr
            }else{
              this.getNews()
            }
          }else if(id == 2){
             if(this.sxArr.length>0){
              this.selArr = this.sxArr
            }else{
              this.getNews()
            }
          }else{
             if(this.qtArr.length>0){
              this.selArr = this.qtArr
            }else{
              this.getNews()
            }
          }
      },
    //   登陆
    toLogin(){
        this.selLogin = true
    },
    // 退出登陆
    outLogin(){
        this.selLogin = false
    },
    //获取二维码 
    getQrcode(){
         //初始化列表
          this.$axios.get('/login/getQRCodeUrl' ).then(res => {
              console.log("获取数据",res);
              this.qrcode = res.data.result
              //     let info = res.data.data;
          })
          .catch((rej) => {
              console.log("获取数据失败",rej)
              this.$message.error(rej.data.message||"网络异常")
          });
    },
    getNews(){
        let data = {
          page:1,
          pageSize:10,
          tab:this.selTabs,
        }
        this.$axios.post('/news/newsList',data).then(res => {
            console.log("获取新闻",res);
            if(this.selTabs==1){
              this.selArr = this.tkArr = res.data.result.list;
            }
            if(this.selTabs==2){
              this.selArr = this.sxArr = res.data.result.list;
            }
            if(this.selTabs==3){
              this.selArr = this.qtArr = res.data.result.list;
            }

        })
        .catch((rej) => {
            console.log("获取数据失败",rej)
            this.$message.error(rej.data.message||"网络异常")
        });
    },
    isLoginHand(){
        this.$axios.post('/user/userInfo' ).then(res => {
                console.log("获取数据登陆",res);
                this.isLogin = true
            })
            .catch((rej) => {
                console.log("获取登陆数据失败",rej)
                this.isLogin = false
            });
    }
  },
  mounted() {
       console.log("222",this.$route)
       this.selArr = this.tkArr
       this.getQrcode()
       this.getNews()
       this.isLoginHand()
    //   if(this.$route.meta.menu_name == "首页"){
    //      this.showDiv=false 
    //   }
  }
};
</script>

<style scoped>

.router-link-active {
  color: #f6c624;
}
.index_top_btn {
  display: flex;
  align-items: center;
}
.header-Qr {
  position: relative;
  line-height: 0;
  text-align: center;
  line-height: 10px;
  cursor: pointer;
  margin-left: 30px;
  padding-bottom: 10px;
}
.header-Qr:hover .tip-pop {
  visibility: visible;
  opacity: 1;
}
.tip-pop {
  border: 1px solid #dadada;
  border-radius: 5px;
  padding: 10px 15px;
  position: absolute;
  background-color: #fff;
  z-index: 16;
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease-out 0.1s;
  -webkit-transition: all 0.2s ease-out 0.1s;
  display: flex;
}
.i_banner{
    width: 100%;
    height: 570px;
    padding-top: 70px;
    position: relative;
    overflow: hidden;
}
>>>.el-carousel__arrow{
   width: 60px;
   height: 60px;
   font-size: 30px;
}
.infoBox{
  width: 100%;
  height: 400px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info_left{
   height: 400px;
    width:500px;
    background: #fff;
    margin-right: 50px;
    box-shadow: 0 10px 10px 0 #f5f5f5;
    border-radius: 10px;
}
.info_left img{
  width: 100%;
  height: 100%;
}
.info_right{
    height:400px;
    width: 500px;
    color:#333;
    padding: 30px;
    background: #fff;
    box-shadow: 0 10px 10px 0 #f5f5f5;
      border-radius: 10px;
}
.info_right_top{
  width: 100%;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: space-between;

}
.ban_news{
    height: 450px;
    width: 430px;
    background: rgb(14, 89, 251,0.7);
    position: absolute;
    top:70px;
    right:0;
    z-index: 15;
    color:#fff;
    padding: 10px;
}
.ban_news.blank{
  background: #fff;
  color: #666;
}
.ban_newsTit{
    font-size: 24px;
    padding-bottom: 5px;
}

.ban_newsTabs{
    margin: 20px 0 30px;
    font-size: 18px;
    display: flex;
    align-items: center;
}
.ban_newsTabs_item{
    margin-right: 30px;
    cursor: pointer;
}
.selTabs{
    border-bottom: 2px solid #333;
}
.ban_newsCont_item{
    font-size: 16px;
    margin-bottom: 30px;
    text-overflow: ellipsis;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
}
.ban_newsMore{
    font-size: 20px;
    cursor: pointer;
    color: #333;
}
.loginTit{
    margin-top: 30px;
    text-align: center;
    font-size: 22px;
}
.login_qr{
  width: 400px;
  height: 400px;
  background: #fff;
  margin: 10px auto 0 ;
}
iframe{
  width: 100%;
  height: 100%;
}
.impowerBox{
 width: 100px!important;
}
            
>>>.impowerBox .qrcode{
  width: 100px!important;
  height: 100px!important;
}

</style>
