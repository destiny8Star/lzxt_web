<template>
  <div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item>微信H5课堂</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="w1200 pt96 pb48 center">
      <div class="xe-title1 mb8">微信H5课堂</div>
      <div class="T6 EC3 mb64">给每个公众号都装上强大的移动课堂</div>
      <img src="@/assets/image/m_1.png" alt srcset />
    </div>

    <div class="xe-modules1 w1200 pt96">
      <div class="xe-title1">一分钟帮您在微信公众号内搭建移动课堂</div>
      <div class="module-box pt64 pb64">
        <div class="module-img">
          <img src="@/assets/image/m_2.jpg" alt />
        </div>
        <div class="module-text">
          <div class="title EC2 T4 mb24">可无缝嵌入公众号任何位置</div>
          <div class="module-text-item mb16">
            <div class="desc EC3 T6">首页菜单栏、图文内嵌、欢迎语、关键词回复推送等等位置均可展现课堂入口，方便用户快速找到</div>
          </div>
        </div>
      </div>
      <div class="module-box pt64 pb64 row-reverse">
        <div class="module-img">
          <img src="@/assets/image/m_3.jpg" alt />
        </div>
        <div class="module-text">
          <div class="title EC2 T4 mb24">一键转发 让课堂在微信中自由传播</div>
          <div class="module-text-item mb16">
            <div class="desc EC3 T6">课堂可分享至微信朋友圈、微信社群等等位置，便于用户分享，有助于店铺获取新的流量</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "multinport",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style scoped>
.el-breadcrumb__item{
    float: none;
}
</style>