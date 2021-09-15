import  api from "../../http/api.js"
import Vue from 'vue'
import dayjs from 'dayjs'
export default {
	namespaced:true,
	state:{
		cart:[],
		address:[],
		orderList:[],
		num:0
	},
	mutations:{
		setCart(state,data){
			state.cart=data
		},
		setAddress(state,data){
			state.address=data
		},
		setOrderList(state,data){
			state.orderList=data
		},
		setNum(state,data){
			state.num=data
		}
	},
	actions:{
		// 获取购物车数据
		async getCart({commit},params){
			try {
				let res=await api.getCart(params)
				if(res.code===200){
					// console.log(res.data);
					res.data.map(i=>{
						Vue.set(i,'checked',false)
					})
					commit('setCart',res.data)
					commit('setNum',res.total)
				}
			}catch (err){
				console.log(err);
			}
		},
		// 删除购物车
		async delCart({commit,dispatch},params){
			try {
				let res=await api.delCart(params)
				if(res.code===200){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					dispatch('getCart',uni.getStorageSync('youpin-h5-user')._id)					
				}
			}catch (err){
				console.log(err);
			}
		},
		// 修改购物车
		async updateCart({commit},params){
			try {
				let res=await api.updateCart(params)
				if(res.code===200){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				}
			}catch (err){
				console.log(err);
			}
		},
		// 添加地址 addAddress
		async addAddress({commit},params){
			try {
				let res=await api.addAddress(params)
				if(res.code===200){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					uni.navigateTo({
						url:'/pages/address/addressList'
					})
				}
			}catch (err){
				console.log(err);
			}
		},
		// 获取地址 getAppAddress
		async getAppAddress({commit},params){
			try {
				let res=await api.getAppAddress(params)
				if(res.code===200){
					res.data.map(i=>{
						Vue.set(i,'name',i.username)
						Vue.set(i,'tel',i.mobile)
						i.address=i.address.split('/').join(' ')+' '+i.detailAddress
					})
					commit('setAddress',res.data)
				}
			}catch (err){
				console.log(err);
			}
		},
		// 修改地址 updateAddress
		async updateAddress({commit},params){
			try {
				let res=await api.updateAddress(params)
				if(res.code===200){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					uni.navigateTo({
						url:'/pages/address/addressList'
					})
				}
			}catch (err){
				console.log(err);
			}
		},
		//删除地址 delAddress
		async delAddress({commit},params){
			try {
				let res=await api.delAddress(params)
				if(res.code===200){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					uni.navigateTo({
						url:'/pages/address/addressList'
					})
				}
			}catch (err){
				console.log(err);
			}
		},
		// 添加订单 addOrder
		async addOrder({commit},params){
			try {
				let res=await api.addOrder(params)
				if(res.code===200){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					uni.navigateTo({
						url:'/pages/user/orderList'
					})
				}
			}catch (err){
				console.log(err);
			}
		},
		// 获取订单
		async getAppOrder({commit},params){
			try {
				let res=await api.getAppOrder(params)
				if(res.code===200){
				// console.log(res.data);
				res.data.map(i=>{
					i.pay_time=dayjs(i.pay_time).format('YYYY-MM-DD HH:mm:ss')
					i.goods_list.map(q=>{
						Vue.set(q,'order_id',i.id)
					})
				})
				commit('setOrderList',res.data)
				}
			}catch (err){
				console.log(err);
			}
		},
		// 评价提交 createComment
		async createComment({commit},params){
			try {
				let res=await api.createComment(params)
				if(res.code===200){
				// console.log(res.data);
				uni.showToast({
					title:res.msg,
					icon:'none'
				})
				uni.navigateTo({
					url:'/pages/user/orderList.vue'
				})
				}
			}catch (err){
				console.log(err);
			}
		}
	}
	
}