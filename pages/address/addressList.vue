<template>
	<view>
		<!-- 顶部 -->
		<top :background="color">
			<template #left>
				<image src="../../static/back.png" class="img-40" mode=""></image>
			</template>
			<template #middle>
				<view class="">选择收货地址</view>
			</template>
		</top>
		<!-- 占位 -->
		<view class="top-div"></view>
		<view class="" v-if="list.length>0">
			<cc-address-list :value="chosenAddressId" :list="list" default-tag-text="默认" @add='add' @edit='edit' @select='select'>
			</cc-address-list>
		</view>
		<!-- 底部占位 -->
		<view class="bottom-div"></view>
	</view>

</template>

<script>
	import top from '../../componments/top/top.vue'
	import cloneDeep from 'lodash/cloneDeep'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let addressModule = createNamespacedHelpers('cart')
	let {
		mapState: addressState,
		mapActions: addressActions
	} = addressModule
	export default {
		components: {
			top
		},
		props: {},
		data() {
			return {
				user: null,
				chosenAddressId: '1',
				list: [],
				color: '#f5f5f5',
				// 判断选择跳转
				flag:null
			}
		},
		methods: {
			...addressActions(['getAppAddress']),
			// 新增地址
			add() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			// 点击编辑
			edit(item) {
				uni.navigateTo({
					url: `/pages/address/address?address=${JSON.stringify(item.item)}`
				})
			},
			// 切换地址
			select(item){
				uni.setStorageSync('address',item.item)
				if(this.flag){
					uni.navigateTo({
						url:"/pages/user/setting"
					})
				}else {
					uni.navigateTo({
						url:'/pages/order/order'
					})
				}
			}
		},
		mounted() {

		},
		onLoad(o) {
			this.flag=o.flag

		},
		onShow() {
			let a = uni.getStorageSync('youpin-h5-user')
			if (a) {
				this.user = a
				this.getAppAddress(a._id)
			}
		},
		filters: {},
		computed: {
			...addressState(['address'])
		},
		watch: {
			address(val) {
				if (val) {
					this.list = cloneDeep(val)
					let arr= val.filter(i => {
						return i.isDefault === true
					})
					this.chosenAddressId=arr[arr.length-1].id
				}
			}
		},
	}
</script>

<style scoped lang="scss">

</style>
