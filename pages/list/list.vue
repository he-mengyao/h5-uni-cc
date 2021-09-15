<template>
	<view class="bg-eee">
		<!-- 搜索 -->
		<view class="head">
			<!-- #ifdef MP-WEIXIN -->
			<view class="bg-eee pr top">
				<view class="pr">
					<view class="title flex flex-c fw f16">
						小米Lite
					</view>
					<image src="../../static/back.png" mode="" class="arrow" @click="back"></image>
				</view>
				<view class="bg-eee flex flex-a ai-c">
					<cc-search :value.sync="value" round actionText='搜索' style='width: 100%;' placeholder='搜索商品'
						@confirm='confirm' @input='input'></cc-search>
					</cc-search>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<cc-nav-bar leftArrow @clickLeft='back'>
				<template #default>
					<view class="demo-rate">
						<cc-search :value.sync="value" round :show-action="false" placeholder="搜索商品" class="search"
							@confirm='confirm' @input='input'>
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
		</view>
		<view class="div"></view>
		<!-- 内容 -->
		<view class="bd" v-if="seachList.length===0">
			<!-- 导航 -->
			<view class="flex flex-a color-333 f14 mrtb-20">
				<view class="flex ai-c pr" v-for="(i,s) in navs" :key="s" @click="clickNav(i,s)">
					{{i}}
					<view class="flex col color-333">
						<view class="iconfont icon-youjiantou icon1 pa" v-if="s===2" :class="{'color-r':index1===1}"
							@click="click(1)"></view>
						<view class="iconfont icon-youjiantou1 pa icon2" v-if="s===2" :class="{'color-r':index1===2}"
							@click="click(2)"></view>
					</view>
				</view>
			</view>
			<!-- 横向滚动 -->
			<!-- 商品列表 -->
			<view class="bg-fff border-b flex" v-for="(i,s) in arr" :key='s' @click="goDetail(i)">
				<image :src="i.cover" mode="" class="img-130 mrr-10"></image>
				<view class="flex col flex-c">
					<view class="f14">{{i.name}}</view>
					<view class="flex ai-c">
						<view class="color-r f14">￥{{i.presentPrice}}</view>
						<view class="del color-a0a0">￥{{i.originalPrice}}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索列表 -->
		<view class="bd mrtb-10 pdrl-20 bg-fff" v-if='seachList.length>0'>
			<view class="border-b pdtb-10" v-for="(i,s) in seachList" :key='s'@click="goDetail(i)">
				{{i.name}}
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
				current: 1,
				pageSize: 10,
				value: '',
				navs: ['综合', '销量', '价格', '筛选'],
				index1: 0,
				arr: [],
				seachList: []
			}
		},
		methods: {
			...searchActions(['search', 'getGoods']),
			// 获取商品
			getData(val) {
				this.search({
					current: this.current,
					pageSize: this.pageSize,
					query: val
				})
			},
			clickNav(i, s) {
				this.index = s
			},
			// 点击从高到低
			click(n) {
				this.index1 = n
			},
			confirm() {
				this.getData(this.value)
			},
			// 返回
			back() {
				uni.navigateBack({})
				this.seachList=[]
			},
			input() {
				if (this.value) {
					this.search({
						current: this.current,
						pageSize: this.pageSize,
						query: this.value
					})
					this.seachList = this.list
				} else {
					this.seachList = []
				}
			},
			// 点击商品
			goDetail(i){
				uni.navigateTo({
					url:`/pages/detail/detail?id=${i._id}`
				})
			}
		},
		mounted() {},
		onLoad(options) {
			this.value = options.value
			if (options.value === '全部商品') {
				this.getGoods()
			} else {
				this.getData(options.value)
			}
		},
		onShow() {

		},
		filters: {},
		computed: {
			...searchState(['list', 'goods'])
		},
		watch: {
			list(val){
					if(val) this.arr=this.list
			},
			goods(val){
				if(val) this.arr=this.goods.slice(1)
			}
		},
	}
</script>

<style scoped lang="scss">
	.head {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		z-index: 999;
	}

	.top {
		height: 100rpx;
		padding-top: 60rpx;
	}

	.bd {
		/* #ifdef MP-WEIXIN */
		margin-top: 100rpx;

		/* #endif */
		.icon1 {
			top: -8rpx;
		}

		.icon2 {
			top: 8rpx;
		}
	}
</style>
