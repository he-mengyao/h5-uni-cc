import fly from "../../http/api.js"
import Vue from 'vue'
export default {
	namespaced: true,
	state: {
		detail: {},
		list: [],
		coupon: [],
		cart: [],
		Recommend: [],
		area: [],
		city: [],
		cityOne: [],
	},
	mutations: {
		setDetail(state, data) {
			state.detail = data
		},
		setList(state, data) {
			state.list = data
		},
		setCoupon(state, data) {
			state.coupon = data
		},
		setCart(state, data) {
			state.cart = data
		},
		setRecommend(state, data) {
			state.Recommend = data
		},
		setArea(state, data) {
			state.area = data
		},
		setCity(state, data) {
			state.city = data
		},
		setCityOne(state, data) {
			state.cityOne = data
		}
	},
	actions: {
		// 详情
		async goodsDetail({
			commit
		}, params) {
			try {
				let res = await fly.goodsDetail(params)
				if (res.code === 200) {
					// 轮播图
					let arr = []
					res.data.pic.map((i) => {
						arr.push({
							'image': i
						})
					})
					// 规格
					let arr1 = []
					res.data.spec.map((i) => {
						Vue.set(i, 'showFlag', 0)
						arr1.push({
							name: i.name,
							checked: i.spec_item1[0]
						})
					})
					Vue.set(res.data, 'sku', arr1)
					// console.log(res.data)
					commit('setDetail', res.data)
					commit('setList', arr)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 优惠券
		async getCoupon({
			commit
		}) {
			try {
				let res = await fly.getCoupon()
				if (res.code === 200) {
					// console.log(res.data);
					commit('setCoupon', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 添加购物车
		async addCart({
			commit,dispatch
		}, params) {
			try {
				let res = await fly.addCart(params)
				if (res.code === 200) {
					dispatch('cart/getCart',uni.getStorageSync('youpin-h5-user')._id,{root:true})
					commit('setCart', res.data)
					uni.showToast({
						title: '加入购物车成功',
					})
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 推荐
		async getRecommend({
			commit
		}) {
			try {
				let res = await fly.getRecommend()
				if (res.code === 200) {
					// console.log(res.data);
					commit('setRecommend', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 地图数据
		async getAreaList({
			commit
		}) {
			try {
				let res = await fly.getAreaList()
				if (res.code === 200) {
					// console.log(res.data);
					commit('setArea', res.data)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 城市搜索
		async searchAreaList({
			commit
		}, params) {
			try {
				let res = await fly.searchAreaList(params)
				if (res.code === 200) {
					// console.log(res.data.data.area_list);
					commit('setCity', res.data.data.area_list)
				}
			} catch (err) {
				console.log(err)
			}
		},
		// 小米之家 getStoreHome
		async getStoreHome({
			commit
		}, params) {
			try {
				let res = await fly.getStoreHome(params)
				if (res.code === 200) {
					// console.log(res.data.data.store_type_list[0].store_list);
					commit('setCityOne', res.data.data.store_type_list[0].store_list)
				}
			} catch (err) {
				console.log(err)
			}
		},
	}

}
