<template>
    <div>
        <div class="main-right" id="main-right" :style="{height: (getWinHeight-60) + 'px'}">
            <!--			<third_nav></third_nav>-->
            <div class="main-content" id="main-content" :style="{height: (getWinHeight-120)+'px'}">
                <div class="main-feature">
                    <div class="main-inner">
                        <h1 class="ly-title-one">个人中心</h1>
                        <div class="form-list" style="margin-top: 30px" v-loading="loading">
                            <el-form label-position="left" ref="form1" :model="form" label-width="140px">
                                <el-form-item label="昵称:" prop="zfb" >
                                    <el-input v-model="form.zfb" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="微信ID:" prop="idcard" >
                                    <el-input v-model="form.idcard" disabled></el-input>
                                </el-form-item>
                                 <el-form-item label="姓名:" prop="iccard" >
                                    <el-input v-model="form.iccard" placeholder="请输入姓名"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号:" prop="iccard" >
                                    <el-input v-model="form.iccard" placeholder="请输入手机号"></el-input>
                                </el-form-item>
                                <el-form-item label="性别:" prop="iccard" >
                                    <el-select v-model="form.value" placeholder="请选择">
                                        <el-option
                                        v-for="item in options"
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
        name: "deliver",
        components: {
        },
        computed: {
            getWinHeight: function () {
                return this.$winHeight;
            }
        },
        data() {
            
            return {
                loading:false,
                options:[{
                    value: '1',
                    label: '男'
                    }, {
                    value: '2',
                    label: '女'
                },],
                form: {
                    id: '',//id
                    zfb: '', //支付宝
                    address: '',//地址
                    yenum: '',//营业执照标号
                    yename: '',//营业执照名称
                    dateT: '',//营业期限
                    trade: '',//行业选择
                    idcard: '',//身份证
                    iccard: '',//银行卡
                    icname: '',//结算开户名
                    pro: '',//省份
                    city: '',//城市
                    area: '',//区域
                    settle_bank: '', //开户行
                    settle_bank_branch: '' //结算银行支行
                },
                dialogVisible: false,
            }
        },
       
        methods: {
           
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       
                    } else {
                        console.log('error submit!!');
                        this.$message.error('请填写完整!')
                        return false;
                    }
                });
            },
         
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
</style>

