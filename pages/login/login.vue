<template>
	<view>
		<cc-nav-bar leftArrow @clickLeft="clickLeft"></cc-nav-bar>
		<view class="flex col ai-c login" style="height: 90vh;">
			<view class="">
				<image src="../../static/logo1.png" mode="" class="img-96"></image>
			</view>
			<view class="color-a0a0 mrtb-20 f14">让每个人都能享受科技的乐趣</view>
			<view class="form">
				<view class="fw f20">小米帐号登录</view>
				<view class="mrtb-20">
					<view class="ipt ipt1  pr " :class="n===1?'border-blue':''">
						<input type="text" class="w-100 h-100" placeholder="请输入手机号" v-model="value" />
						<view class="fw f20 number flex ai-c">+86
							<image src="../../static/right.png" mode="" class="del mrl-10"></image>
						</view>
						<image src="../../static/image/icon_close.png" mode="" class="del close" v-if="show" @click="del">
						</image>
					</view>
					<view class="tip" v-if="n===3">手机格式不正确</view>
				</view>
				<view class=" ipt ipt2 cw" :class="n===2?'bg-blue':'ipt-bg'" @click="next">下一步</view>
			</view>
			<view class="flex ai-c mrtb-10 color-a0a0">
				<view class="" @click="gopassword">用户名密码登录</view>
				<view class="line bg-333 mrrl-10"></view>
				<view class="" @click="register">立即注册</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				n: 0,
				show: false,
				value: ''
			}
		},
		methods: {
			clickLeft() {
				uni.navigateBack({})
			},
			del() {
				this.value = ''
			},
			// 点击下一步
			next() {
				if(this.value.length>11 || !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.value)) {
					this.n=3 
				}else {
					uni.navigateTo({
						url:`/pages/login/phone?number=${this.value}`
					})
				}
			},
			// 点击立即注册
			register(){
				uni.navigateTo({
					url:'/pages/register/register'
				})
			},
			// 点击用户名密码登录
			gopassword(){
				uni.navigateTo({
					url:'/pages/login/password'
				})
			}
		},
		mounted() {

		},
		onLoad(o) {
			if(o.value){
				this.value=o.value
			}
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			value(val) {
				if (val) {
					this.show = true
					if (val.length === 11) this.n = 2
					if(val.length < 11) this.n=1
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
