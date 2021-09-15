<template>
	<view class="color-666 f16">
		<!-- 顶部 -->
		<top :background="color">
			<template #left>
				<image src="../../static/back.png" class="img-40" mode=""></image>
			</template>
			<template #middle>
				<view class="">个人中心</view>
			</template>
			<template #right>
				<image src="../../static/sousuo.png" class="del" mode=""></image>
			</template>
		</top>
		<!-- 占位 -->
		<view class="top-div"></view>
		<!-- 列表 -->
		<view class="border-b pd-10" v-for="(item,index) in list" :key='index' @click="click(item)">{{item}}</view>
		<!-- 底部 -->
		<view class="last pd-10 bg-eee flex flex-c ai-c" @click="quit">退出账号</view>
	</view>

</template>

<script>
	import top from '../../componments/top/top.vue'
	export default {
		components: {
			top
		},
		props: {},
		data() {
			return {
				color: '#eee',
				list: [
					'地址管理',
					'经营证照',
					'协议规则',
					'小米商城用户协议',
					'小米商城隐私政策',
					'小米帐号使用协议',
					'小米帐号隐私政策'
				]
			}
		},
		methods: {
			// 退出
			quit(){
				uni.clearStorageSync()
				uni.switchTab({
					url:'/pages/user/user'
				})
			},
			// 点击地址管理
			click(item){
				if(item==='地址管理'){
					uni.navigateTo({
						url:`/pages/address/addressList?flag=${true}`
					})
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
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
