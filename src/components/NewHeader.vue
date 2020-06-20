<template>
<div>

  <div id="nav" class="nav whiteNav">
    <div class="nav-content">
      <!-- 企学院企业微信独立页面特殊处理 -->
      <router-link to="/" class="nav-logo_wrap" v-if="showDiv"></router-link>
      <div class="nav-func" style="display: block">
        <router-link id="navRoot" to="/home" class="nav-func_item" exact>首页</router-link>
        <div id="product" class="nav-func_item nav-more" :class="isMultinport?'router-link-active':''">
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
            <div class="product-item">
              <div class="product-item__title">商家服务</div>
              <router-link to="/" class="product-item__func">
                <div class="product-item__name">商家学院</div>
                <div class="product-item__tip">小鹅通商家学习社群</div>
              </router-link>
            </div>
          </div>
        </div>
        <router-link  to="/home/example" class="nav-func_item">案例分享</router-link>
        <div id="xecloud" class="nav-func_item nav-more">
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
        </div>
        <div id="aboutUs" class="nav-func_item nav-more">
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
        </div>
      </div>
      <div class="btns index_top_btn">
        <!-- 企学院企业微信独立页面右侧按钮显示跳转注册链接 -->
         <div class="login-btn SmallBtnType2" @click="toLogin">登录</div>
        <div to="/free" class="SmallBtnType1" @click="toLogin">免费试用</div>
        <div class="header-Qr">
          <span style="line-height:40px;">
            <i class="iconfont iconicon_minprogram EC1"></i>
          </span>
          <div class>小程序</div>
          <div class="tip-pop" style=" width: 370px; left: -178px; text-align: center; top:68px">
            <div class="iblock">
              <img
                src="http://img.jyeoo.net/images/root/wxPS.jpg"
                alt
                style="width:172px;height:172px;"
              />
              <div>菁优网拍搜</div>
            </div>
            <div class="iblock">
              <img
                src="http://img.jyeoo.net/images/root/wxSJ.jpg"
                alt
                style="width:172px;height:172px;"
              />
              <div>菁优网资源中心</div>
            </div>
          </div>
        </div>

         <div class="header-Qr">
          <span style="line-height:40px;">
            <i class="iconfont iconicon_h EC1"></i>
          </span>
          <div class>APP</div>
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
        </div>
        
      </div>
    </div>
  </div>

  <!-- banner -->
  <div class="i_banner">
       <el-carousel trigger="click" height="540px" >
            <el-carousel-item v-for="(item,ind) in banners" :key="ind">
                <div class="i_banner_item">
                    <img :src="item" alt="">
                </div>
            </el-carousel-item>
        </el-carousel>
        <!-- 最新资讯 -->
        <div class="ban_news" v-if="!selLogin&&isNews">
            <h3 class="ban_newsTit">最新资讯</h3>
            <div class="ban_newsTabs">
                <div class="ban_newsTabs_item" :class="selTabs==item.id?'selTabs':''" 
                v-for="item in tabs" :key="item.id" @mouseover="overTabs(item.id)">
                    {{item.name}}
                </div>
            </div>
            <div class="ban_newsCont">
                <div class="ban_newsCont_item" v-for="item in selArr" :key="item.id">
                       {{item.title}}  
                </div>
            </div>
            <div class="ban_newsMore">【更多】</div>
        </div>
        <!-- 登陆 -->
          <div class="ban_news" v-if="selLogin">
            <h3 class="ban_newsTit" style="border-bottom:0" @click="outLogin"> <<  返回 </h3>
            <h5 class="loginTit">手机扫码，安全登陆</h5> 
        </div>
        
  </div>
</div>

</template>

<script>
export default {
  name: "NewHeader",
  data() {
    return {
         showDiv:true,//是否展示省市区
         banners:[
             "http://wechatapppro-1252524126.file.myqcloud.com/apprnDA0ZDw4581/image/14636c07d7b757fb9aed83d83e8d8507.jpg",
             "http://wechatapppro-1252524126.file.myqcloud.com/apprnDA0ZDw4581/image/f9aea2c4238273f523bd6aa1aa0cff5c.png",
             "http://wechatapppro-1252524126.file.myqcloud.com/apprnDA0ZDw4581/image/91a54fd87ee04cc6c960c56c3f65734a.jpg"
         ],
         selTabs:1,//新闻当前选中
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
         tkArr:[
             {
                 id:1,
                 title:"啊洛杉矶的飞可拉伸的法律阿斯蒂芬阿斯蒂芬而通过风格化大发光火的风格撒的"
             },
               {
                 id:2,
                 title:"啊洛杉矶的飞可拉伸的法律阿斯蒂芬是电饭锅是电饭锅"
             },
               {
                 id:3,
                 title:"啊洛杉矶的飞可拉伸的法律阿斯蒂芬是电饭锅是电饭锅"
             },
               {
                 id:4,
                 title:"啊洛杉矶的飞可拉伸的法律阿斯蒂芬发的供货商是电饭锅"
             },
             {
                 id:5,
                 title:"啊洛杉矶的飞可拉伸的法律阿斯蒂芬是大发光火是电饭锅"
             },
             {
                 id:6,
                 title:"啊洛杉矶的飞可拉伸的法律阿斯蒂芬是电饭锅斯蒂芬"
             },

         ],
         sxArr:[
             {
                 id:1,
                 title:"111啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
               {
                 id:2,
                 title:"111啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
               {
                 id:3,
                 title:"222啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
               {
                 id:4,
                 title:"111啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
             {
                 id:5,
                 title:"222啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
             {
                 id:6,
                 title:"111啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },

         ],
          qtArr:[
             {
                 id:1,
                 title:"aaaa111啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
               {
                 id:2,
                 title:"bbbb111啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
               {
                 id:3,
                 title:"cccc222啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
               {
                 id:4,
                 title:"ddd111啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
             {
                 id:5,
                 title:"ddddee222啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },
             {
                 id:6,
                 title:"1eee11啊洛杉矶的飞可拉伸的法律阿斯蒂芬"
             },

         ], 
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
     }
  },
  methods: {
      //鼠标移入显示
      overTabs(id){
          this.selTabs = id;
          id==1? this.selArr = this.tkArr:id==2? this.selArr = this.sxArr: this.selArr = this.qtArr
      },
    //   登陆
    toLogin(){
        this.selLogin = true
    },
    // 退出登陆
    outLogin(){
        this.selLogin = false

    }
  },
  mounted() {
       console.log(this.$route)
       this.selArr = this.tkArr
    //   if(this.$route.meta.menu_name == "首页"){
    //      this.showDiv=false 
    //   }
  }
};
</script>

<style scoped>
.router-link-active {
  color: #105cfb;
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
    height: 610px;
    padding-top: 70px;
    position: relative;
}
>>>.el-carousel__arrow{
   width: 60px;
   height: 60px;
   font-size: 30px;
}
.ban_news{
    height: 540px;
    width: 530px;
    background: rgb(14, 89, 251,0.7);
    position: absolute;
    bottom:0;
    right:100px;
    z-index: 5;
    color:#fff;
    padding: 30px;
}
.ban_newsTit{
    font-size: 24px;
    padding-bottom: 5px;
    border-bottom: 1px solid #fff;
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
    border-bottom: 2px solid #fff;
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
    text-align: end;
    cursor: pointer;

}
.loginTit{
    margin-top: 30px;
    text-align: center;
    font-size: 22px;
}
</style>
