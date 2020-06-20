<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/exercises/error">错题本</el-breadcrumb-item>
                    <el-breadcrumb-item>详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <!-- 搜索条件 start -->
                            <el-form  :inline="true" label-position="left" ref="forms" :model="forms" label-width="60px" >
                                <el-form-item label="科目:" >
                                   <el-select v-model="forms.subject" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="年级:" >
                                   <el-select v-model="forms.subject" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="排序:" >
                                   <el-select v-model="forms.subject" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm" size="small" v-loading="submitState">查询</el-button>
                                </el-form-item>
                            </el-form>
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
                            <div class="card_bot">
                                <span class="card_botItem card_botItem_fai">你的答案：a</span>
                                <span class="card_botItem card_botItem_suc">正确答案：a</span>
                                <span class="card_botItem">错误时间：2020-02-21 14:38:36</span>
                                <span class="card_botItem">错误次数：11</span>

                            </div>
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
                submitState:false,//查询按钮
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
                forms:{
                 subject:'全部',
                },
                options:[ {
                        value: '1',
                        label: '全部'
                        }, {
                        value: '2',
                        label: '语文'
                        }, {
                        value: '3',
                        label: '数学'
                        },] ,
               from:{
                   radio0:"",
                   radio1:"",
               },
                tabIndex: '1',//tab选中值
                tabList: [
                    {
                        value: '1',
                        label: '全部'
                    },
                    {
                        value: '2',
                        label: '错题'
                    }
                ],
            }
        },
        methods: {
              //    查询
                submitForm(){
                console.log("this.fomr",this.form)
                },
              /**
             * tab选择
             * @param key
             * @param keyPath
             */
            tabSelect(key, keyPath) {
                console.log(key, keyPath,this.tabIndex);
            },
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
    .el-form-item{
        margin-right: 30px;
    }
    .el-date-editor--datetimerange {
        width: 240px!important;
        margin-top: 4px;
    }
    .el-menu-demo{
        margin-bottom: 30px;
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
    .card_bot{
        margin-top: 30px ;
    }
    .card_botItem{
        margin: 0 20px;
    }
    .card_botItem_suc{
        color:#67C23A
    }
    .card_botItem_fai{
        color:#F56C6C
    }
</style>