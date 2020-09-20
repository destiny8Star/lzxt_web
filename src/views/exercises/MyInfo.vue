<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!--			<third_nav></third_nav>-->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one">个人中心</h1>
                        <div class="form-list" style="margin-top: 30px" v-loading="loading">
                            <el-form label-position="left" ref="form1" :model="form" label-width="140px" :rules="rules">
                                <el-form-item label="昵称:"  >
                                    <el-input v-model="form.nickname" disabled></el-input>
                                </el-form-item>
                                 <el-form-item label="性别:" prop="sex" >
                                    <el-select v-model="form.sex" placeholder="请选择" disabled>
                                        <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                 <el-form-item label="姓名:" prop="name" >
                                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号:" prop="mobile" >
                                    <el-input v-model="form.mobile" type='number' placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                  <el-form-item label="学校:" prop="idcard" >
                                    <el-input v-model="form.school" ></el-input>
                                </el-form-item>
                                <el-form-item label="年级:" prop="sex" >
                                    <el-select v-model="form.grade" placeholder="请选择" >
                                        <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                
                                
                               <el-form-item>
                                    <el-button type="primary" @click="submitForm('form1')">确认</el-button>
                                    <el-button>取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                        
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user_info",
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            
            return {
                loading:false,
                options:[{
                    value: 1,
                    label: '男'
                    }, {
                    value: 2,
                    label: '女'
                },],
                 options2:[{
                    value: '七年级',
                    label: '七年级'
                    }, {
                    value: '八年级',
                    label: '八年级'
                },
                {
                    value: '九年级',
                    label: '九年级'
                },],
                form: {},
                dialogVisible: false,
                rules:{
                    mobile: [
                        { min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur' }
                    ],
                }
            }
        },
       
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       console.log("this.from",this.form)
                        this.$axios
                        .post("/user/updateUser",this.form)
                        .then((res) => {
                             console.log("成功", res);
                            this.$message.success("修改成功")
                            this.$router.go(-1)
                        })
                        .catch((rej) => {
                              console.log("获取登陆数据失败", rej);
                        });
                    } else {
                        console.log('error submit!!');
                        this.$message.error('请填写完整!')
                        return false;
                    }
                });
            },
         
        },
        created(){
            this.form = this.$ls.get("user_info")
            console.log("userni",this.form )
        }
    }
</script>

<style>
    .error {
        color: #FF0000;
        font-size: 20px;
    }

    .tip {
        font-size: 14px;
        color: #8c939d
    }

    .avatar-uploader {
        display: inline;
    }

    .imgDemo {
        width: 200px;
        height: 140px;
        margin-left: 30px
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 140px;
        height: 140px;
        line-height: 140px;
        text-align: center;
    }

    .avatar {
        width: 140px;
        height: 140px;
        display: block;
    }
     input[type=number] {
        -moz-appearance: textfield;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>

