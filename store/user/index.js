import fly from '../../http/api.js'

export default {
	namespaced: true,
	state: {
		code: ''
	},
	mutations: {
		setCode(state, data) {
			state.code = data
		}

	},
	actions: {
		// 验证码
		async getCode({
			commit
		}, params) {
			try {
				let res = await fly.getCode(params)
				if (res.code === 200) {
					// console.log(res);
				}
			} catch (err) {
				console.log(err);
			}
		},
		// 手机登录
		async mobileLogin({
			commit
		}, params) {
			try {
				let res = await fly.mobileLogin(params)
				if (res.code === 200) {
					// console.log(res);
					uni.setStorageSync('youpin-h5-token',res.token)
					uni.setStorageSync('youpin-h5-user',res.data)
					if(uni.getStorageSync('flag')){
						uni.switchTab({
							url:'/pages/cart/cart'
						})
					}else {
						uni.switchTab({
							url:'/pages/user/user'
						})
					}
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 注册
		async register({
			commit
		}, params) {
			try {
				let res = await fly.register(params)
				// console.log(res);
				if (res.code === 200) {
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 用户名登录
		async userLogin({
			commit
		}, params) {
			try {
				let res = await fly.userLogin(params)
				// console.log(res);
				if (res.code === 200) {
					uni.setStorageSync('youpin-h5-token',res.token)
					uni.setStorageSync('youpin-h5-user',res.data)
					if(uni.getStorageSync('flag')){
						console.log(123);
						uni.switchTab({
							url:'/pages/cart/cart'
						})
					}else {
						uni.switchTab({
							url:'/pages/user/user'
						})
					}
				}
			} catch (err) {
				console.log(err)
			}
		},
	}
}
