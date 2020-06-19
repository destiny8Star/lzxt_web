<template>
  <div>
    <!-- 内容 -->
    <div class="product-content w1200">
      <div class="product-items">
        <div class="title">新教育&middot;教育机构的互联网解决方案</div>
        <div class="product-item">
          <div class="product-img">
            <img
              src="@/assets/image/image_1.png"
              class="advantages-img"
              data-rjs="2"
              alt="内容付费平台,内容分销"
            />
          </div>
          <div class="product-info">
            <div class="info-item">
              <h3 class="subtitle">轻松招生引流</h3>
              <p class="desc">拓宽线上线下渠道，轻松解决招生难题</p>
            </div>
            <div class="info-item">
              <h3 class="subtitle">高效教务管理</h3>
              <p class="desc">排课、预约、学员管理，快速提升运营效率</p>
            </div>
            <div class="info-item">
              <h3 class="subtitle">线上线下课堂</h3>
              <p class="desc">直播录播在线教学，线上1V1、1VN灵活授课</p>
            </div>
            <div class="info-item">
              <h3 class="subtitle">灵活助学互动</h3>
              <p class="desc">学、练、测、考结合，学员学习效果有保障</p>
            </div>
            <a class="MediumBtnType2">了解详情</a>
          </div>
        </div>
      </div>
      <div class="product-items">
        <div class="title">知识付费&middot;让您一分钟拥有自己的知识店铺</div>
        <div class="product-item">
          <div class="product-img">
            <img
              src="@/assets/image/image_2.png"
              class="advantages-img"
              data-rjs="2"
              alt="内容付费平台,内容分销"
            />
          </div>
          <div class="product-info">
            <div class="info-item">
              <h3 class="subtitle">多种内容形式</h3>
              <p class="desc">图文、音视频、直播，满足各类课程需求</p>
            </div>
            <div class="info-item">
              <h3 class="subtitle">人气营销工具</h3>
              <p class="desc">品牌传播快速获客，持续提升课程销量</p>
            </div>
            <div class="info-item">
              <h3 class="subtitle">高效社群运营</h3>
              <p class="desc">维系用户增强互动，拉新促活面面俱到</p>
            </div>
            <div class="info-item">
              <h3 class="subtitle">精准数据分析</h3>
              <p class="desc">随时掌控店铺数据，多维分析经营状态</p>
            </div>
            <a  class="MediumBtnType2">了解详情</a>
          </div>
        </div>
      </div>
    </div>
    <!-- //合作商 -->
    <div class="home_swiper">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="(item,ind) in swiperItem " :key="ind">
          <div class="home_swiperItem" @mouseover="sOverHand" @mouseout="sOutHand">
            <div class="sImg">
              <img :src="item.img" alt />
            </div>
            {{item.name}}
          </div>
        </swiper-slide>
      </swiper>
      <div class="swip_bot">
        更多
        <i class="iconfont iconarrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "home",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: true, //可选选项，自动滑动
        slidesPerView: 4
      },
      swiperItem: [
        {
          name: "十点课堂",
          img: require("../../assets/image/s1.jpg")
        },
        {
          name: "儿童",
          img: require("../../assets/image/s2.jpg")
        },
        {
          name: "额外其他",
          img: require("../../assets/image/s3.jpg")
        },
        {
          name: "阿斯蒂芬",
          img: require("../../assets/image/s4.png")
        },
        {
          name: "啊速递的",
          img: require("../../assets/image/s5.png")
        }
      ]
    };
  },
  methods: {
    sOverHand() {
      this.swiper.autoplay.stop();
    },
    sOutHand() {
      this.swiper.autoplay.start();
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    //   this.swiper.slideTo(3, 1000, false)
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
.home_swiper {
  width: 100%;
  height: 400px;
  padding: 0 30px;
  font-size: 18px;
}
.swiper-container,
.swiper-slide {
  width: 100%;
  height: 300px;
}
.home_swiperItem {
  width: 300px;
  height: 300px;
  padding-top: 30px;
  text-align: center;
}
.sImg {
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
}
.swip_bot {
  margin-top: 30px;
  font-size: 20px;
  padding: 8px 30px;
  border-radius: 8px;
  border: 1px solid #333;
  float: right;
  cursor: pointer;
}
</style>
