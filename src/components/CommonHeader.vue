<template>
	<div class="main-top">
		<div class="first-nav-logo">
			<img :src="logoUrl" class="nav-logo">
		</div>
		<div class="search" id="search">
			<div class="search-content">
				在线练习系统
			</div>
		</div>
		<div class="tool">
				<div style="color:#105CFB;" @click="showAdd">
					<i class="el-icon-location-information"></i>
					地址管理
					<!-- <el-cascader
						v-model="value"
						:options="options"
						@change="handleChange"></el-cascader> -->
				</div>
			
			<div class="tool-msg">
<!--				<img src="../assets/img/tx.png" class="logo-img">-->
				<span class="tool-msg-t">欢迎您：{{ name ? name : '用户' }}</span>
				<el-dropdown @command="handleCommand">
					<span class="el-dropdown-link">
						<i class="el-icon-arrow-down el-icon--right"></i>
						<i style="display: inline-block;width: 10px;height: 10px;"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="a">修改密码</el-dropdown-item>
						<!--<el-dropdown-item command="b">退出登录</el-dropdown-item>-->
					</el-dropdown-menu>
				</el-dropdown>
			</div>
			<el-link @click="outLog" :underline="false"  style="margin: 0 20px 0 0;">退出</el-link>
		</div>
        <!-- //地址表单 -->
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="活动名称" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="活动区域" :label-width="formLabelWidth">
					<el-select v-model="form.region" placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</div>
			</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "CommonHeader",
		data(){
		    return {

                name:  this.$ls.get("accountName"),
				logoUrl: require('../assets/image/logo.png'),
				addValue:[],
				options:[
						{
						value: 'zhinan',
						label: '指南',
						children: [
							{
								value: 'shejiyuanze',
								label: '设计原则',
								children: [{
								value: 'yizhi',
								label: '一致'
								}]
							}, 
						],
				},]
			}
		},
		methods:{
            handleCommand(command) {
                console.log('click on item ' + command);
                if(command == 'a'){
                    this.$router.push('/account/change');
				}
			},
			//点击选择地址
			showAdd(){

			},
			/**
			 *  退出登录
			 */
            outLog() {
                console.log('退出登录');
                var that = this,text = "退出账号";
                console.log("退出登录");
                that.$confirm("此操作将退出账号 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                	this.$ls.clear();
					this.$ls.remove(this.$webConfig.authTokenName);
					this.$router.push('/');
                    // this.$axios.post('/mer/user/login/out').then(res => {
                    // 	this.$ls.remove(this.$webConfig.authTokenName);
                    //     console.log(res);
                    //     if (res.data.code === this.$webConfig.httpSuccessStatus) {
                    //         this.$message('退出成功');
                    //         localStorage.clear();
                    //         this.$router.push('/');
                    //     }else {
                    //         this.$message(res.data.message);
                    //     }
                    // }).catch(()=>{
					//
                    // })

                }).catch(() => {
                    that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            }
		},
	}
</script>
<style>
	.top_add{
		display: flex;
	}
	.tool-msg-t {
		width: auto;
	}
	.search-content{
		font-size: 22px;
		line-height: 60px;
	}
</style>
