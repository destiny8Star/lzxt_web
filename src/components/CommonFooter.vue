<template>
  <div>
    <div class="free" v-if="showBan&&from!='back'">
      <el-carousel trigger="click" height="400px">
        <el-carousel-item v-for="(item,ind) in banners" :key="ind">
          <div class="i_banner_item">
            <img :src="item" alt />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="bg161E30">
      <div class="footer">
        <div class="footer-content">
          <div class="foot">
            <h2 class="tel">400-102-6665</h2>
            <p class="time">周一至周日 9:00-24:00</p>
            <div class="qr">
              <div class="gzh">
                <img src="@/assets/image/gzh_qrcode.png" data-no-retina alt />
                <p>关注小鹅通公众号</p>
              </div>
              <div class="zsdp">
                <img src="@/assets/image/sjxy_qrcode.jpg" data-no-retina alt />
                <p>进入小鹅通商家学院</p>
              </div>
            </div>
          </div>
          <dl>
            <dt>行业与场景</dt>
            <dd>
              <a
                class="footer-href"
                href="/onlineEducation/overview"
                data-count="pc-底部导航_行业解决方案_在线教育"
              >新教育</a>
            </dd>
            <dd>
              <a
                class="footer-href"
                href="/payKnowledge/overview"
                data-count="pc-底部导航_行业解决方案_知识付费"
              >知识付费</a>
            </dd>
            <dd>
              <a class="footer-href" href="/corporateTraining" data-count="pc-底部导航_行业解决方案_ 企学院">企学院</a>
            </dd>
            <dd>
              <a class="footer-href" href="/online_alive" data-count="pc-底部导航_场景解决方案_在线直播">在线直播</a>
            </dd>
          </dl>
          <dl>
            <dt>商家服务</dt>
            <dd>
              <a
                class="footer-href"
                href="https://xueyuan.xiaoe-tech.com/"
                target="_blank"
                data-count="pc-底部导航_商家服务_商家学院"
              >商家学院</a>
            </dd>
            <dd>
              <a
                class="footer-href"
                href="https://fenxiao.xiaoe-tech.com"
                target="_blank"
                data-count="pc-底部导航_商家服务_内容分销"
              >内容分销</a>
            </dd>
          </dl>
          <dl>
            <dt>更多</dt>
            <dd>
              <a class="footer-href" href="/public_welfare" data-count="pc-底部导航_场景解决方案_公益计划">公益计划</a>
            </dd>
          </dl>
          <dl>
            <dt>云服务</dt>
            <dd>
              <a
                class="footer-href"
                href="https://admin.xiaoe-tech.com/app_store"
                target="_blank"
                data-count="pc-底部导航_云服务_应用市场"
              >应用市场</a>
            </dd>
            <dd>
              <a
                class="footer-href"
                href="https://cloud.xiaoe-tech.com/"
                target="_blank"
                data-count="pc-底部导航_云服务_API自主开发"
              >API自主开发</a>
            </dd>
          </dl>
          <dl>
            <dt>关于我们</dt>
            <dd>
              <a class="footer-href" href="/companyProfile" data-count="pc-底部导航_公司相关_关于我们">公司简介</a>
            </dd>
            <dd>
              <a class="footer-href" href="/joinUs" data-count="pc-底部导航_公司相关_加入我们">加入我们</a>
            </dd>
            <dd>
              <a class="footer-href" href="/mediaReport" data-count="pc-底部导航_公司相关_媒体报道">媒体报道</a>
            </dd>
            <dd>
              <a class="footer-href" href="/extendRead" data-count="pc-底部导航_公司相关_延伸阅读">延伸阅读</a>
            </dd>
            <dd>
              <a
                class="footer-href"
                href="https://admin.xiaoe-tech.com/helpCenter/index"
                data-count="pc-底部导航_服务支持_帮助中心"
              >帮助中心</a>
            </dd>
            <dd>
              <a class="footer-href" href="/clientCases" data-count="pc-底部导航_服务支持_客户案例">客户案例</a>
            </dd>
          </dl>
          <dl class="media-report">
            <dt>媒体报道</dt>
            <dd>
              <a
                class="footer-href"
                target="_blank"
                href="http://www.niaogebiji.com/article-26318-1.html"
                title="打通微信生态直播需求，小鹅通完成全行业直播平台进化。"
              >打通微信生态直播需求，小鹅通完成全行业直播平台进化。</a>
            </dd>
            <dd>
              <a
                class="footer-href"
                target="_blank"
                href="https://baijiahao.baidu.com/s?id=1654411632271167341&wfr=spider&for=pc"
                title="长期主义者「小鹅通」"
              >长期主义者「小鹅通」</a>
            </dd>
            <dd>
              <a
                class="footer-href"
                target="_blank"
                href="https://baijiahao.baidu.com/s?id=1653668986900697396&wfr=spider&for=pc"
                title="小鹅通宣布获好未来教育集团领投1亿元B轮战略投资，加码互联网教育生态服务"
              >小鹅通宣布获好未来教育集团领投1亿元B轮战略投资，加码互联网教育生态服务</a>
            </dd>
            <dd>
              <a
                class="footer-href"
                target="_blank"
                href="https://baijiahao.baidu.com/s?id=1654337644331844530&wfr=spider&for=pc"
                title="吴晓波谈小鹅通：在中国知识思想市场建立了一个新的品类"
              >吴晓波谈小鹅通：在中国知识思想市场建立了一个新的品类</a>
            </dd>
            <dd>
              <a
                class="footer-href"
                target="_blank"
                href="https://www.eol.cn/news/t9/202001/t20200117_1706039.shtml"
                title="小鹅通亮相2020微信公开课Pro 助力教培机构实现线上转型"
              >小鹅通亮相2020微信公开课Pro 助力教培机构实现线上转型</a>
            </dd>
          </dl>
        </div>

        <div class="bottom">
          <ul class="contact-way">
            <li class="address">深圳地址：深圳市南山区科兴科学园A2单元1205</li>
            <li class="address">北京地址：北京市东城区银河SOHO D座7层</li>
            <li class="address">上海地址：上海市浦东新区张江微电子港2号楼404D室</li>
          </ul>
          <ul class="contact-way">
            <li class="email">客服支持：xiaoekf@xiaoe-tech.com</li>
            <li class="email">商务合作：support@xiaoe-tech.com</li>
            <li class="email">渠道合作：partner@xiaoe-tech.com</li>
            <li>投诉意见：xiaoeks@xiaoe-tech.com</li>
          </ul>
        </div>
        <div class="copyright">
          <p class="copyright-info">
            Copyright © 2015-2020 深圳小鹅网络技术有限公司 All Rights Reserved.
            <a target="_blank" href="http://www.beian.miit.gov.cn" class="link">粤ICP备15020529号</a>
          </p>
          <div class="brand">
            <a
              target="_blank"
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502002037"
            >
              <img class="webInfo-ga-icon" src="@/assets/image/beian.png" data-no-retina />
              粤公网安备 44030502002037号
            </a>
            <a
              target="_blank"
              href="https://szcert.ebs.org.cn/56b1d5d4-ecc1-4dc9-9478-063925f9c322"
            >
              <img class="webInfo-ga-icon" src="@/assets/image/ebsIcon.png" data-no-retina />
              工商网监 电子标识
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonFooter",
  props:{
    from:{
      type:String,
      default:"front",
    },
  },
  data: function() {
    return {
      banners: [
        "http://wechatapppro-1252524126.file.myqcloud.com/appsrzJaqCA8676/image/cmVzb3VyY2UtY291cnNlQXJ0aWNsZS02MTkwMDU1Mw.png"
      ]
    };
  },
  computed: {
    //是否展示底部轮播
    showBan() {
      return this.$route.meta.menu_name != "NewsDetail";
    },
   
  }
};
</script>