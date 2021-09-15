<template>
	<view>
		<cc-nav-bar leftArrow @clickLeft="clickLeft"></cc-nav-bar>
		<view class="flex col ai-c login" style="height: 90vh;">
			<view class="">
				<image src="../../static/logo1.png" mode="" class="img-96"></image>
			</view>
			<view class="color-a0a0 f14">让每个人都能享受科技的乐趣</view>
			<view class="form">
				<view class="fw f20 mrtb-20">小米帐号登录</view>
				<view class="mrtb-20">
					<!-- 账户 -->
					<view class="ipt ipt1  pr mrtb-20 overflow" :class="n3===1?'border-blue':''" style="padding-left: 50rpx;">
						<input type="text" class="w-100 h-100" placeholder="请输入用户名" v-model="username" />
					</view>
					<view class="tip" v-if="un">账户不能为空</view>
					<!-- 密码 -->
					<view class="ipt ipt1  pr mrtb-20 overflow" :class="n4===1?'border-blue':''" style="padding-left: 50rpx;">
						<input type="password" class="w-100 h-100" placeholder="请输入密码"  v-model="password" />
					</view>
					<view class="tip" v-if="pn">密码不能为空</view>
				</view>
				<view class=" ipt ipt2 cw" :class="flag?'bg-blue':'ipt-bg'" @click="login">登录</view>
			</view>
			<view class="flex ai-c mrtb-10 color-a0a0">
				<view class="" @click="gomobile">手机号登录</view>
				<view class="line bg-333 mrrl-10"></view>
				<view class="" @click="register">立即注册</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let userModule = createNamespacedHelpers('user')
	let {
		mapState: userState,
		mapActions: userActions
	} = userModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				n3: 0,
				n4: 0,
				// 用户名验证
				un:false,
				// 密码验证
				pn:false,
				// 控制重新获取和验证码
				cnn: false,
				// 注册显示
				flag:false,
				show: false,
				// 手机号
				mobile: '',
				// 验证码
				code1: '',
				// 按钮
				list: [{value:1}],
				// 单选
				value:0,
				time: 60,
				username: '',
				password: ''
			}
		},
		methods: {
			...userActions(['userLogin']),
			// 点击返回
			clickLeft() {
				uni.navigateBack({})
			},
			// 点击删除
			del() {
				this.value = ''
			},
			// 点击注册
			register(){
				uni.navigateTo({
					url:'/pages/register/register'
				})
			},
			// 手机号登录
			gomobile(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			// 点击登录
			login(){
				this.userLogin({
					username:this.username,
					password:this.password
				})
			}
		},
		mounted() {

		},
		onLoad() {
		},
		onShow() {

		},
		filters: {},
		computed: {
		},
		watch: {
			username(val){
				if(val){
					if(this.code1.length!==6){
						this.cn=true
					}
					this.un=false
					this.n3=1
				}else {
					this.un=true
				}
			},
			password(val){
				if(val){
					this.pn=false
					this.n4=1
					this.flag=true
				}else {
					this.pn=true
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.login {
		padding-top: 100rpx;
	}

	.form {
		width: 750rpx*0.85;

		.ipt {
			height: 110rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 18px;
		}

		.ipt1 {
			border-radius: 30rpx;
			background-color: #f0f0f0;
			padding-left: 200rpx;
		}

		.ipt2 {
			border-radius: 55rpx;
		}

		.ipt-bg {
			background-color: #c4dafc;
		}
	}

	.line {
		width: 1px;
		height: 20rpx;
	}

	.number {
		position: absolute;
		top: 30rpx;
		left: 40rpx;
	}

	.close {
		position: absolute;
		top: 30rpx;
		right: 40rpx;
		z-index: 99;
	}

	.tip {
		color: red;
	}
</style>
