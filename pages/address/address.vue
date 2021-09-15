<template>
	<view class=" h-100">
		<!-- 顶部 -->
		<top :background="color">
			<template #left>
				<image src="../../static/back.png" class="img-40" mode=""></image>
			</template>
			<template #middle>
				<view class="">{{obj?'编辑收货地址':'新增收货地址'}}</view>
			</template>
		</top>
		<!-- 占位 -->
		<view class="top-div"></view>
		<!-- 新增地址 -->
		<cc-address-edit :showDelete='false' @save='save' v-if='Object.keys(obj).length===0'></cc-address-edit>
		<!--  编辑地址-->
		<cc-address-edit :addressInfo="obj" v-if="Object.keys(obj).length>0" @save='save' @delete='del'></cc-address-edit>
	</view>

</template>

<script>
	import top from '../../componments/top/top.vue'
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
				color: '#f5f5f5',
				user: null,
				obj: {},
				id: '',
			}
		},
		methods: {
			...addressActions(['addAddress', 'updateAddress', 'delAddress']),
			// 地址保存
			save(addressInfo) {
				if (addressInfo.addressDetail) {
					this.addAddress({
						user_id: this.user._id,
						username: addressInfo.name,
						mobile: addressInfo.tel,
						address: addressInfo.province + '/' + addressInfo.city + '/' + addressInfo.county,
						detailAddress: addressInfo.addressDetail,
						isDefault: addressInfo.isDefault,
					})
				} else {
					uni.showToast({
						title: '详情地址必填，请先填写',
						icon: 'none'
					})
				}
			},
			// 地址删除
			del() {
				this.delAddress({
					addressId: this.id,
					user_id: this.user._id
				})
			}
		},
		mounted() {

		},
		onLoad(o) {
			if (o.address) {
				let a = JSON.parse(o.address)
				if (Object.keys(a).length > 0) {
					this.obj = a
					this.id = a.id
					this.$set(this.obj, 'province', a.address.split(' ')[0])
					this.$set(this.obj, 'city', a.address.split(' ')[1])
					this.$set(this.obj, 'county', a.address.split(' ')[2])
					this.$set(this.obj, 'addressDetail', a.detailAddress)
				}
			}
		},
		onShow() {
			let a = uni.getStorageSync('youpin-h5-user')
			if (a) this.user = a
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
