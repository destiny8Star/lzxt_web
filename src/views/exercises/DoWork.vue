<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/exercises/home">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>练习</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="home-title" >
                           <span class="home-title-t ly-title">初一历史（上）</span>
                        </div>
                        <el-card style="margin: 20px 0" v-for="(item,ind) in list" :key="ind">
                            <div class="card_inTit">
                               {{item.title}}
                            </div>
                            <el-radio-group v-model="from['radio'+ind]">
                                <el-radio :label="itemIn.key" v-for="itemIn in item.selctions" :key="itemIn.key">
                                    {{itemIn.value}}
                                </el-radio>
                            </el-radio-group>
                        </el-card>
                        
                        

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
               list:[
                   {
                       title:" 10.某纪录片拍摄组决定拍摄一系列节目 《中国原始人一探秘中 国文化之源》，其内容以时间顺序记录。此摄制组的第一站应为(     )。",
                       selctions:[
                           {
                              key:"a",
                              value:"第一个" 
                           },
                            {
                              key:"b",
                              value:"第一而已 发的规划个" 
                           },
                            {
                              key:"c",
                              value:"第一阿吃痴痴缠缠斯蒂芬斯蒂芬个" 
                           },
                            {
                              key:"d",
                              value:"第一个都是阿斯蒂芬是的" 
                           },
                       ]
                   },
                    {
                       title:" 10.某纪录片拍摄组决定拍摄一系列节目 《中国原始人一探秘中 国文化之源》，其内容以时间顺序记录。此摄制组的第一站应为(     )。",
                       selctions:[
                           {
                              key:"a",
                              value:"第一个" 
                           },
                            {
                              key:"b",
                              value:"第一而已 发的规划个" 
                           },
                            {
                              key:"c",
                              value:"第一阿吃痴痴缠缠斯蒂芬斯蒂芬个" 
                           },
                            {
                              key:"d",
                              value:"第一个都是阿斯蒂芬是的" 
                           },
                       ]
                   }
               ],//题数据
               from:{
                   radio0:"",
                   radio1:"",
               }
            }
        },
        methods: {
            /**
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.$axios.get('/mer/business/circle/detail?businessCircleId=' + this.businessId).then(res => {
                    console.log(res);
                    if (res.data.code === this.$webConfig.httpSuccessStatus) {
                        let info = res.data.data;
                    } else {
                        this.$message(res.data.message);
                    }
                    this.searchState = false;
                })
                    .catch(() => {
                        this.searchState = false;
                    });
            },
          
        },
        beforeMount() {
          
            // 获取信息
            // this.getDetail();
        },
    }
</script>

<style scoped>
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
   
    .card_inTit{
        font-size: 16px;
        margin-bottom: 10px;
    }
   
    .home-title .ly-title{
        font-size: 20px;
    }
  
    .el-breadcrumb__item {
        float: none;
    }
</style>