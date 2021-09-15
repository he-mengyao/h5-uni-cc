<template>
	<view>
		<!-- 顶部 -->
		<view class="first">
			<cc-nav-bar leftArrow @clickLeft='clickLeft' background='#eee'>
				<template #left>
					<image src="../../static/back.png" mode="" class="img-40"></image>
				</template>
				<template #default>
					<view class="color-333 f16">小米之家</view>
				</template>
			</cc-nav-bar>
		</view>
		<view class="w-100" id='container' style="height: 500rpx;"></view>
		<view class="bg-fff f16">
			<view class="pdtb-20 mrl-10  border-b flex ai-c">
				<image src="../../static/mihome/store_name.png" mode="" class="img-40"></image>
				<view class=" mrl-10">{{store.store_name}}</view>
			</view>
			<view class="pdtb-20 mrl-10  border-b flex ai-c">
				<image src="../../static/mihome/time.png" mode="" class="img-40"></image>
				<view class="ellipsis-one mrl-10">
					营业时间
					<view class="f12 color-a0a0">{{store.shop_time}}</view>
				</view>
			</view>
			<view class="pdtb-20 mrl-10  border-b flex ai-c">
				<image src="../../static/mihome/location.png" mode="" class="img-40"></image>
				<view class=" mrrl-10" style="width: 60vw;">
					地址
					<view class="f12 color-a0a0">{{store.address}}</view>
				</view>
				<view class="aa flex ai-c col flex-c" style="width: 30vw;">
					<image src="../../static/mihome/go.png" mode="" class="img-40"></image>
					<view class="f12">到这去</view>
				</view>
			</view>
			<view class="pdtb-20 mrl-10  border-b flex ai-c">
				<image src="../../static/mihome/tel.png" mode="" class="img-40"></image>
				<view class="ellipsis-one mrrl-10" style="width: 60vw;">
					电话
					<view class="f12 color-a0a0">{{store.tel}}</view>
				</view>
				<view class="aa flex ai-c  col flex-c" style="width: 30vw;">
					<image src="../../static/mihome/phone.png" mode="" class="img-40"></image>
					<view class="f12">去联系</view>
				</view>
			</view>
			<view class="pdtb-20 mrl-10  border-b flex ai-c">
				<image src="../../static/mihome/service.png" mode="" class="img-40"></image>
				<view class="mrl-10">
					支持服务
					<view class="f12 color-a0a0">{{store.support_service.join('、')}}</view>
				</view>
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
				store: null
			}
		},
		methods: {
			clickLeft(){
				uni.navigateBack()
			}
		},
		mounted() {

		},
		onLoad(o) {
			console.log(JSON.parse(o.store));
			this.store = JSON.parse(o.store)
			this.$utils.getLocation(this.store, 1)
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.aa {
		border-left: 1px solid #f6f6f6;
	}
</style>
