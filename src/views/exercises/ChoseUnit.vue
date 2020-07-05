<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item to="/exercises/home">在线学习</el-breadcrumb-item>
                    <el-breadcrumb-item>选择单元</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="industryBox">
                            <!-- 搜索条件 start -->
                            <div style="margin:20px 0;font-size:14px"> 练习次数：1</div>
                            <el-form  :inline="true" label-position="left" ref="form" :model="form" label-width="80px" >
                                <el-form-item label="科目名称:" >
                                   <el-select v-model="form.subject" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="区域:" >
                                   <el-select v-model="form.subject" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="单元:" >
                                     <el-checkbox-group v-model="checkList">
                                        <el-checkbox label="复选框 A" ></el-checkbox>
                                        <el-checkbox label="复选框 B" ></el-checkbox>
                                        <el-checkbox label="复选框 C" ></el-checkbox>
                                        <el-checkbox label="禁用" ></el-checkbox>
                                        <el-checkbox label="选中且禁用" ></el-checkbox>
                                        <el-checkbox label="复选框 A" ></el-checkbox>
                                        <el-checkbox label="复选框 B" ></el-checkbox>
                                        <el-checkbox label="复选框 C" ></el-checkbox>
                                        <el-checkbox label="禁用" ></el-checkbox>
                                        <el-checkbox label="选中且禁用" ></el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="$router.go(-1)"  plain>返回</el-button>
                                    <el-button type="primary" @click="toExe">开始</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div>
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
                submitState:false,//查询按钮
                form:{
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
                checkList:[],//多选
              
            }
        },
        methods: {
            //去练习 
            toExe(id){
               this.$router.push("/exercises/doWork")
            },
            /**
             * 获取信息详情
             */
            getDetail() {
                //初始化列表
                this.$axios.get('/mer/business/circle/detail?businessCircleId=' + this.businessId).then(res => {
                    console.log(res);
                    let info = res.data.data;
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
    .el-breadcrumb__item {
        float: none;
    }
    .home-title .ly-title{
        font-size: 20px;
    }
   .el-form-item{
       width: 100%;
   }
   >>>.el-checkbox{
        max-width: 300px;
        margin-right: 20px;
        float: left;
    }
</style>