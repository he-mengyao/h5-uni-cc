<template>
	<view>
		<cc-nav-bar leftArrow @clickLeft="clickLeft"></cc-nav-bar>
		<view class="flex col ai-c login" style="height: 90vh;">
			<view class="form">
				<view class="fw f20">注册小米账号</view>
				<view class="color-blue f14 mrtb-10">系统会根据您选择的国家/地区的法律法规存储您的个人信息</view>
				<view class="mrtb-20">
					<view class="ipt ipt1  pr overflow" :class="n1===1?'border-blue':''">
						<input type="text" class="w-100 h-100" placeholder="请输入手机号" v-model="mobile" />
						<view class="fw f20 number flex ai-c">+86
							<image src="../../static/right.png" mode="" class="del mrl-10"></image>
						</view>
					</view>
					<view class="tip" v-if="mn">手机格式不正确</view>
					<!-- 验证码 -->
					<view class="ipt ipt1  pr mrtb-20 overflow" :class="n2===1?'border-blue':''" style="padding-left: 50rpx;">
						<input type="text" class="w-100 h-100" placeholder="请输入短信的验证码" v-model="code1" />
						<view class="f14 fw flex" style="width: 300rpx;" :class="n2===2?'color-blue':'color-a0a0'"
							@click="next">{{cnn?`重新获取 ${time}s`:'获取验证码'}}</view>
					</view>
					<view class="tip" v-if="cn">验证码格式不正确</view>
					<!-- 账户 -->
					<view class="ipt ipt1  pr mrtb-20 overflow" :class="n3===1?'border-blue':''" style="padding-left: 50rpx;">
						<input type="text" class="w-100 h-100 ta-c" placeholder="请输入用户名" v-model="username" />
					</view>
					<view class="tip" v-if="un">账户不能为空</view>
					<!-- 密码 -->
					<view class="ipt ipt1  pr mrtb-20 overflow" :class="n4===1?'border-blue':''" style="padding-left: 50rpx;">
						<input type="text" class="w-100 h-100 ta-c" placeholder="请输入密码" v-model="password" />
					</view>
					<view class="tip" v-if="pn">密码不能为空</view>
				</view>
				<view class=" ipt ipt2 cw" :class="flag?'bg-blue':'ipt-bg'" @click="register1">注册</view>
			</view>
			<!-- 协议 -->
			<view class="flex ai-c f14 mrtb-10 color-a0a0">
				<cc-radio :value.sync="value" :list="list"></cc-radio>
				<view class="">已阅读并同意小米帐号</view>
				<view class="color-blue">用户协议</view>
				<view class="mrrl-5">和</view>
				<view class="color-blue">隐私政策</view>
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
				n1: 0,
				n2: 0,
				n3: 0,
				n4: 0,
				// 控制手机验证
				mn: false,
				// 控制验证码验证
				cn: false,
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
			...userActions(['getCode', 'register']),
			// 点击返回
			clickLeft() {
				uni.navigateBack({})
			},
			// 点击注册
			register1() {
				if(this.mobile!==''&&this.code1!=='' && this.username!=='' &&this.password!==''){
					if (this.value) {
						this.register({
							mobile:this.mobile,
							code:this.code1,
							username:this.username,
							password:this.password
						})
					} else {
						uni.showToast({
							title: '请先勾选协议',
							icon: "none"
						})
					}
				}
			},
			// 获取验证码
			next() {
				if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(this.mobile)) {
					this.mn=true
				} else {
					this.n2 = 0
					this.cnn=true
					this.getCode({
						mobile: this.mobile
					})
					// 定时器
					let timer = setInterval(() => {
						this.time--
						if (this.time <= 0) {
							clearInterval(timer)
							this.cnn=false
							this.n2=2
						}
					}, 1000)
				}
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
			...userState(['code'])
		},
		watch: {
			mobile(val) {
				if (val) {
					this.show = true
					this.n1=1
					if (val.length === 11) {
						// 验证码显示
						this.n2 = 2
					} else if(val.length > 11){
						// 手机验证显示
						this.n2=0
					}else {
						this.mn=false
					}
				} else {
					this.show = false
				}
			},
			code1(val) {
				if (val) {
					this.show = true
					this.n2=1
					if (val.length === 6) {
						// 验证码变灰色
						this.n2 = 3
						this.cn=false
					} else if (val.length > 6) {
						this.n2 = 2
					}
				}
			},
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
