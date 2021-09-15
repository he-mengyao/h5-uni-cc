<template>
	<view class="bg-f5">
		<scroll-view scroll-y="true" style="height: 100vh;" @scroll='scroll'>
			<!-- 顶部 -->
			<view :class="n>=1?'bg-fff':''" class="head">
				<cc-nav-bar class="shortcut" background="none" titleColor="#333333" @clickLeft="back">
					<template #left>
						<image src="../../static/back.png" mode="" class="del"></image>
					</template>
					<template #default>
						<view class="flex">
							<view class="mrr-10 f14 color-333 flex col ai-c" v-for="(i,s) in tags" :key="s"
								@click="clickTag(s)">
								<view class="">{{i}}</view>
								<view class="line bg-r" v-if="current===s"></view>
							</view>
						</view>
					</template>
				</cc-nav-bar>
			</view>
			<!-- 轮播图 -->
			<cc-swiper :list="list" mode="rect" height='800'>
			</cc-swiper>
			<!-- 价格 -->
			<Prices :detail="detail" :coupon="coupon" class="bg-fff"></Prices>
			<!-- 规格 -->
			<Spec :detail="detail" v-if='detail'></Spec>
			<!-- 推荐 -->
			<Recom :Recommend='Recommend' v-if="Recommend"></Recom>
			<!-- 商品介绍 -->
			<view class="flex bg-fff pdtb-10" :class="n>=2?'head1':''">
				<view class="f14 flex flex-c ai-c flex-1" v-for="(item,index) in tag1" :key='index'
					:class="current1===index?'color-r':''" @click="clickTag1(index)">{{item}}</view>
			</view>
			<view  style="line-height: 0;">
				<view class="" v-html="detail.detail" v-if="detail && current1===0"></view>
				<view class="" v-html="detail.specParams" v-if="detail && current1===1"></view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	import Prices from '../../componments/detail/prices.vue'
	import Spec from '../../componments/detail/spec.vue'
	import Recom from '../../componments/detail/recom.vue'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let detailModule = createNamespacedHelpers('detail')
	let {
		mapState: detailState,
		mapActions: detailActions
	} = detailModule
	export default {
		components: {
			Prices,
			Spec,
			Recom
		},
		props: {},
		data() {
			return {
				current: 0,
				tags: ['商品', '评价', '详情', '推荐'],
				tag1: ['商品介绍', '规格参数'],
				current1: 0,
				// 判断顶部导航
				n: 0
			}
		},
		methods: {
			...detailActions(['goodsDetail', 'getCoupon', 'getRecommend']),
			// 点击导航栏
			clickTag(s) {
				this.current = s
			},
			// 返回
			back() {
				uni.navigateBack()
			},
			// 监听滚动
			scroll(e) {
				if(e.detail.scrollTop<400){
					this.n=0
				}else if(e.detail.scrollTop>400 && e.detail.scrollTop<1080){
					this.n=1
				}else {
					this.n=2
				}
			},
			// 点击商品介绍
			clickTag1(index) {
				this.current1 = index
			},
		},
		mounted() {

		},
		onLoad(options) {
			this.goodsDetail(options.id)
			this.getCoupon()
			this.getRecommend()
		},
		onShow() {

		},
		filters: {},
		computed: {
			...detailState(['detail', 'list', 'coupon', 'Recommend'])
		},
		watch: {},

	}
</script>

<style scoped lang="scss">
	.head {
		height: 88rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
	}
	.head1 {
		height: 80rpx;
		position: fixed;
		top: 88rpx;
		left: 0;
		right: 0;
		z-index: 99;
	}
</style>
