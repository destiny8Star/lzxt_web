<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <div class="third-nav">
                <el-breadcrumb >
                    <el-breadcrumb-item to="/exercises/home">选择单元</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <div class="industryBox" v-loading="submitState">
                            <!-- 搜索条件 start -->
                            <!-- <div style="margin:20px 0;font-size:14px"> 练习次数：1</div> -->
                            <el-form  :inline="true" label-position="left" ref="form" :model="form" label-width="80px" >
                                <el-form-item label="科目名称:" >
                                   <el-select v-model="form.subjectId" placeholder="请选择" @change="selChange">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.subjectName"
                                        :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- <el-form-item label="区域:" >
                                   <el-select v-model="form.subject" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item> -->
                                <el-form-item label="单元:" v-if="status==1">
                                     <el-checkbox :indeterminate="isIndeterminate" 
                                     v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                     <el-checkbox-group v-model="form.subjectUnitList" @change="handleCheckedChange">
                                        <el-checkbox :label="item" v-for="(item,ind) in checkList" :key="ind">
                                        </el-checkbox>
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
                id:"",//课程id
                status:"",//状态0：试用，1、已经购买，有效，2、已失效
                form:{
                    "subjectId":0,
                    "subjectUnitList":[],
                    status:1,//1 是未完成 2是已完成
                    // subject:'全部',
                },
                options:[] ,//科目列表
                checkList:[],//多选
                checkAll: false,//是否全选
                isIndeterminate: true
            }
        },
        methods: {
            //选择框改变
            selChange(val){
            let item = this.options.find(e=>{
                return e.id == val
            })
            this.$set(this,"checkList",item.subjectUnitList)
            this.$set(this.form,"subjectUnitList",[])
            this.checkAll = false
            this.isIndeterminate = true
              console.log("value",val,this.options,item)

            },
            handleCheckAllChange(val) {
                this.form.subjectUnitList = val ? this.checkList : [];
                this.isIndeterminate = false;
            },
            //复选框改变
            handleCheckedChange(value){
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.checkList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkList.length;
            },
            //去练习 
            toExe(id){
                let info =  JSON.stringify(this.form)
                console.log("this.from",this.form,info)
                // 0：试用，1、已经购买，有效，2、已失效
                 if(this.status==1){
                   return this.$router.push("/exercises/doWork?info="+info)
                 }
                 if(this.status==0){
                   return this.$router.push("/exercises/Ontrial?info="+info)
                 }

            },
            /**
             * 获取信息详情
             */
            getDetail() {
                 //初始化列表
                this.searchState = true
                let data = {
                    courseId:this.id
                }
                this.$axios.post('/course/subjectInfo',data).then(res => {
                    console.log("获取",res);
                    this.searchState = false;
                    this.$set(this,"options",res.data.result)
                    this.$set(this,"checkList",res.data.result[0].subjectUnitList)
                    this.$set(this.form,"subjectId",res.data.result[0].id)
                })
                .catch((rej) => {
                    console.log("获取数据失败",rej)
                    this.searchState = false;
                    this.$message.error(rej.data.message||"网络异常")
                });
            },
        },
        beforeMount() {
             this.id = this.$route.query.id
             this.status = this.$route.query.status
             console.log("this.id,this.status",this.id,this.status)
            // 获取信息
            this.getDetail();
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