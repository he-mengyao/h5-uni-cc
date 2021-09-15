<template>
	<view>
		<cc-nav-bar leftArrow @clickLeft="clickLeft"></cc-nav-bar>
		<view class="flex col ai-c login" style="height: 90vh;">
			<view class="form">
				<view class="fw f20" @click="click">小米帐号登录</view>
				<view class="mrtb-20 flex flex-b ai-c f14">
					<view>验证码已发送至 +86 {{number}}</view>
					<view class="color-blue fw" @click="change">修改</view>
				</view>
				<view class="mrtb-20 color-a0a0">
					<view class="ipt ipt1  pr " :class="n===1?'border-blue':''">
						<input type="text" class="w-100 h-100" placeholder="请输入验证码"  v-model="value" />
						<view class="f14 fw flex" style="width: 300rpx;" :class="n===4?'color-blue':''">重新发送
							<view class="" v-if="n!==4">：{{time}}s</view>
						</view>
					</view>
					<view class="tip" v-if="n===3">验证码格式不正确</view>
				</view>
				<view class=" ipt ipt2 cw" :class="n===2?'bg-blue':'ipt-bg'" @click="login">登录</view>
			</view>
			<view class="flex ai-c mrtb-10 color-a0a0">
				<view class="" @click="go">用户名密码登录</view>
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
				n: 0,
				show: false,
				value: '',
				number: null,
				time: 60
			}
		},
		methods: {
			...userActions(['getCode','mobileLogin']),
			// 修改
			change() {
				uni.navigateTo({
					url: `/pages/login/login?value=${this.number}`
				})
			},
			click(){
							this.getCode({mobile:this.number})	
			},
			// 返回
			clickLeft() {
				uni.navigateBack({})
			},
			// 登录
			login() {
				if (this.value.length > 6) {
					this.n = 3
				} else {
					this.mobileLogin({
						mobile:this.number,
						code:this.value
					})
				}
			},
			// 点击立即注册
			register(){
				uni.navigateTo({
					url:'/pages/register/register'
				})
			},
			// 点击用户名登录
			go(){
				uni.navigateTo({
					url:'/pages/login/password'
				})
			}
		},
		mounted() {},
		onLoad(o) {
			this.number = o.number
			// 获取验证码
			this.getCode({mobile:o.number})	
			// 定时器
			let timer = setInterval(() => {
				this.time--
				if (this.time === 0) {
					this.n = 4
					clearInterval(timer)
				}
			}, 1000)
		},
		onShow() {

		},
		filters: {},
		computed: {
			...userState(['code'])
		},
		watch: {
			value(val) {
				if (val) {
					// 边框
					this.n = 1
					this.show = true
					// 登录变量
					if (val.length === 6) this.n = 2
				} else {
					this.show = false
				}
			}
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
			padding-left: 30rpx;
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
