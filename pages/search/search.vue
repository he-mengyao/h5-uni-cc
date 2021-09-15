<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="bg-eee pr top">
			<view class="head pr">
				<view class="title flex flex-c fw f16">
					小米Lite
				</view>
				<image src="../../static/back.png" mode="" class="arrow" @click="back"></image>
			</view>
			<view class="bg-eee flex flex-a ai-c">
				<cc-search :value.sync="value" round actionText='搜索' style='width: 100%;' placeholder='搜索商品'
					@confirm='confirm'></cc-search>
				</cc-search>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
		<cc-nav-bar leftArrow @clickLeft='back'>
			<template #default>
				<view class="demo-rate">
					<cc-search :value.sync="value" round :show-action="false" placeholder="搜索商品" class="search"
						@confirm='confirm'>
					</cc-search>
				</view>
			</template>
			<template #right>
				<view class="color-a0a0">
					搜索
				</view>
			</template>
		</cc-nav-bar>
		<!-- #endif -->
		<!-- 搜索历史 -->
		<view class="bg-fff pd-10 bd">
			<!-- 历史 -->
			<view class="">
				<view class="history-hd f14 fw flex flex-b">
					<view class="">
						搜索历史
					</view>
					<image src="../../static/empt.png" mode="" class="del" @click="del"></image>
				</view>
				<view class="history-bd flex wrap">
					<view class="tag pdrl-10 bg-eee flex ai-c flex-c" v-for="(i,s) in historyList" :key="s"
						@click="clickHistory(i)">
						{{i}}
					</view>
				</view>
			</view>
			<!-- 探索发现 -->
			<view class="mrtb-20">
				<view class="history-hd f14 fw flex flex-b">
					<view class="">
						搜索发现
					</view>
				</view>
				<view class="history-bd flex wrap">
					<view class="tag1 mrtb-10" v-for="(i,s) in goods.slice(0,8)" :key="s" @click="clickHistory(i.name)">
						{{i.name}}
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let searchModule = createNamespacedHelpers('search')
	let {
		mapState: searchState,
		mapActions: searchActions
	} = searchModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				historyList: []
			}
		},
		methods: {
			...searchActions(['getGoods']),
			// 搜索
			confirm() {
				// console.log(this.value);
				this.save(this.value)
			},
			// 保存本地
			save(val) {
				this.historyList = this.historyList.filter(i => i !== val)
				this.historyList.unshift(val)
				uni.setStorageSync('searchHistory', this.historyList)
				this.value = ''
				uni.navigateTo({
					url: `/pages/list/list?value=${val}`
				})
			},
			// 清空历史记录
			del() {
				this.historyList = []
				uni.removeStorageSync('searchHistory')
			},
			// 点击历史记录
			clickHistory(i) {
				this.value = i
				this.save(i)
			},
			// 返回
			back() {
				uni.navigateBack({})
			}
		},
		mounted() {
			this.getGoods()
			let arr = uni.getStorageSync('searchHistory')
			if (arr) {
				this.historyList = arr
			}
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...searchState(['goods'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.top {
		height: 100rpx;
		padding-top: 60rpx;
	}

	.bd {
		/* #ifdef MP-WEIXIN */
		margin-top: 60rpx;
		/* #endif */
	}

	.tag {
		border-radius: 20rpx;
		margin: 20rpx 20rpx 0 0;
	}

	.tag1 {
		width: 340rpx;
	}
</style>
