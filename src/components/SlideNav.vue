<template>
  <div class="side-tip">
    <a href="" target="_blank" class="app">
      <i></i>
      <div style="margin-top:-94px;">
        <img src="http://img.jyeoo.net/images/root/APP-code.png" />
        <p>扫码下载APP</p>
      </div>
      <em>
        <b></b>
      </em>
    </a>
    <a href="javascript:void(0)" class="service">
      <i></i>
      <div style="margin-top:-59px;">
        <p>
          <span>客服热线：</span>
          <span>400-863-9889</span>
        </p>
        <p>
          <span>工作日：</span>
          <span>
            08:30-12:00
            <br />13:30-22:00
          </span>
        </p>
        <p>
          <span>节假日：</span>
          <span>
            10:00-12:00
            <br />14:00-22:00
          </span>
        </p>
      </div>
      <em>
        <b></b>
      </em>
    </a>
    <a href="javascript:void(0)" class="wechat">
      <i></i>
      <div style="margin-top:-94px;">
        <img src="http://img.jyeoo.net/images/root/service-code.png" />
        <p>扫码关注服务号</p>
      </div>
      <em>
        <b></b>
      </em>
    </a>
    <a href="javascript:void(0)" class="users">
      <i></i>
      <div style="margin-top:-82px;">
        <p>学生Q群：480112476</p>
        <p>教师Q群：488131139</p>
        <p>家长Q群：486765070</p>
        <p>咨询Q群：548707308</p>
        <p>VIP专属群：330881880</p>
      </div>
      <em>
        <b></b>
      </em>
    </a>
  </div>
</template>

<script>
export default {
  name: "SlideNav",
  data: function() {
    return {};
  },
  methods: {}
};
</script>
<style >
.side-tip {
  position: fixed;
  height: 200px;
  width: 46px;
  border-radius: 4px;
  right: 40px;
  top: 50%;
  margin-top: -100px;
  z-index: 999;
}
.side-tip a {
  display: block;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding: 9px 0;
  background-color: rgba(0, 0, 0, 0.2);
  position: relative;
}
.side-tip a:hover {
  background-color: #1092ed;
}
.side-tip .app {
  border-radius: 6px 6px 0 0;
}
.side-tip .weibo {
  border-radius: 0 0 6px 6px;
}
.side-tip a i {
  display: block;
  margin: 0 auto;
  width: 22px;
  height: 22px;
  background: url(../assets/image/home-icon.png) no-repeat;
}
.side-tip a > div {
  position: absolute;
  right: 100%;
  line-height: 24px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  padding: 20px;
  display: none;
}
.side-tip a > div img {
  width: 120px;
  height: 120px;
}
.side-tip a:hover > div {
  display: block;
}
.side-tip .app i {
  background-position: 3px -50px;
}
.side-tip .service i {
  background-position: -27px -50px;
}
.side-tip .wechat i {
  background-position: -62px -50px;
}
.side-tip .users i {
  background-position: -97px -50px;
}
.side-tip .weibo i {
  background-position: -132px -50px;
}

.side-tip p span {
  display: inline-block;
  vertical-align: text-top;
}
.side-tip a:hover em {
  display: block;
}
.side-tip a > em {
  display: none;
  position: absolute;
  width: 0;
  height: 0;
  border: 12px solid transparent;
  border-left: 6px solid #e5e5e5;
  left: 0px;
  top: 50%;
  border-right: none;
  margin-top: -12px;
}
.side-tip a > em b {
  position: absolute;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left: 6px solid #fff;
  left: -8px;
  top: 50%;
  border-right: none;
  margin-top: -10px;
}
.side-tip .service div {
  width: 180px;
  text-align: left;
}
.side-tip .users div {
  width: 160px;
  text-align: left;
}
</style>