<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <div class="third-nav-t">订单支付</div>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner"  >
						<div class="realBox">
							<p ><span class="tit">订单编号：</span><span>{{infos.orderId}}</span></p>
							<p ><span class="tit">商品名称：</span><span>{{infos.courseName}}</span></p>
							<p ><span class="tit">包含科目：</span><span>{{infos.subject}}</span></p>
							<p ><span class="tit">订单金额：</span><span>{{infos.amount}}元</span></p>
							<p ><span class="tit">支付方式:</span>
                                 <span>
                                    <el-select v-model="form.payType" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        disabled>
                                        </el-option>
                                     </el-select>
                                   </span>
                              </p>
                            <el-button type="primary" @click="$router.push({name:'order'})"  plain class="btn">取消</el-button>
                            <el-button type="primary" @click="toPay" class="btn">支付</el-button>
						</div>
                        <el-card style="margin-left: 10%;width:300px;height:300px"
                         v-loading="searchState" v-if="payStatus">
                            <div class="qrBox">
                                  请用微信扫码支付
                                 <div id="qrcode"></div>
                                 如果您已支付成功，请去订单管理查看
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import QRCode  from "qrcodejs2"
    export default {
        name: "Detail",
        components: { QRCode },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data(){
            return {
                searchState:false,//查询按钮
                payStatus:false,//展示二维码
                infos:{},//信息
                form:{
                    orderId:'',
                    payType:"1",//1 微信支付 2 支付宝支付
                },
               options:[ {
                        value: '1',
                        label: '微信支付'
                        }, {
                        value: '2',
                        label: '支付宝支付'
                        }
                      ] 
            }
        },
        methods: {
            //支付
            toPay(){
            //    this.$router.push("/exercises/orderPay")
                this.payStatus = true
                this.searchState = true
                this.$axios.post('/order/wxPay',this.form).then(res => {
                    console.log("支付结果",res);
                    this.searchState = false
                    let qrcode = new QRCode('qrcode', {
                        width: 200,  
                        height: 200,
                        text: res.data.result, // 二维码地址
                        colorDark : "#000",
                        colorLight : "#fff",
                    })
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.searchState = false
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
          
        },
        beforeMount() {
            // 获取信息
            this.infos = JSON.parse(this.$route.query.infos) 
            this.form.orderId = this.infos.orderId
            console.log("infos",this.infos)
        },
    }
</script>

<style scoped>
    .main-inner{
        display: flex;
    }
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
    .realBox{
        max-width: 60%;
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
    .qrBox{
        width: 100%;
        height: 100%;
        text-align: center;
    }
    #qrcode {
        width: 200px;
        height: 200px;
        margin:20px auto  10px;
    }
     #qrcode img{
        width: 100%;
        height: 100%;
    }
</style>