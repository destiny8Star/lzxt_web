<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">订单提交</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner" :loading="searchState">
						<div class="realBox">
							<p >  <span class="tit">商品名称：</span>  <span>{{datas.courseName}}</span></p>
							<p ><span class="tit">包含科目：</span><span>{{datas.subjectInfo}}</span></p>
							<p ><span class="tit">有效周期：</span><span>{{datas.courseTime}}日</span></p>
							<p ><span class="tit">售价：</span><span>{{datas.price}}元</span></p>
							<p ><span class="tit">优惠（优惠券）:</span>
                                 <span>
                                    <el-select v-model="form.couponId" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.couponId"
                                        :label="item.amount"
                                        :value="item.couponId"
                                        >
                                        </el-option>
                                     </el-select>
                                   </span>
                              </p>
							<p ><span class="tit">订单金额：</span><span>{{datas.price}}元</span></p>
                            <el-button type="primary" @click="$router.go(-1)"  plain class="btn">取消</el-button>
                            <el-button type="primary" @click="toPay" class="btn">提交订单</el-button>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Detail",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data(){
            return {
                searchState:false,//查询按钮
                form:{
                    courseId:"",//课程id
                    couponId:'',
                },
               options:[] ,//卡券列表
                datas:{},//获取到的数据      
            }
        },
        methods: {
            //支付
            toPay(){
              this.$axios.post('/order/submitOrder',this.form).then(res => {
                    console.log("提交详情",res);
                   let infos = res.data.result
                   infos = JSON.stringify(infos)
                    this.$router.push("/exercises/orderPay?infos="+infos)
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
            /**
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.searchState = true
                this.$axios.post('/course/courseDetail',this.form).then(res => {
                    console.log("获取详情",res);
                    this.searchState = false;
                    this.datas = res.data.result;
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.searchState = false;
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
            //获取卡券
            getCoupon(){
                this.$axios.post('/course/myCoupon',this.form).then(res => {
                    console.log("获取卡券",res);
                    this.options = res.data.result;
                })
                .catch((rej) => {
                    console.log("获取卡券失败",rej)
                    this.$message.error(rej.data.message||"网络异常")
                });
            }
          
        },
        beforeMount() {
            // 获取信息
            this.form.courseId = this.$route.query.id
            this.getDetail();
            this.getCoupon()
        },
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
   
   .realBox p{
		font-size: 18px;
		line-height: 32px;
	}
    .realBox .tit{
        width: 150px;
        display: inline-block;
        color: #666;
    }
	.realBox span{
		margin-left: 10px;
        color: #888;
	}
    .btn{
        margin: 30px 50px;
    }
</style>