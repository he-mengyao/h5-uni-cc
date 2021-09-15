<template>
	<view class="bg-eee">
		<!-- 导航 -->
		<view class="bg-r">
			<view class="div2">
			</view>
			<cc-nav-bar class="bg-r nav" background="#ee702e">
				<template #left>
					<view class="logo bg-fff flex flex-c ai-c">
						<image src="../../static/logo.png" mode="" class="img"></image>
					</view>
				</template>
				<template #default>
					<view class="" @click="click">
						<cc-search :value.sync="value" round :show-action="false" placeholder="搜索商品" class="search">
						</cc-search>
					</view>
				</template>
			</cc-nav-bar>
		</view>
		<!-- 背景 -->
		<view class="banner pr">
			<view class="banner-bg">
			</view>
		</view>
		<!-- 内容 -->
		<view class="content ">
			<Carousel :list="list"></Carousel>
			<Recom :nav='nav'></Recom>
			<splike :splike='splike'></splike>
			<News :news='news'></News>
			<Navs :recommendNav='recommendNav' :goodsId='id' v-if="id"></Navs>
		</view>
	</view>

</template>

<script>
	import Carousel from '../../componments/homes/carousel/carousel.vue'
	import splike from '../../componments/homes/spike/splike.vue'
	import Recom from '../../componments/homes/recom/recom.vue'
	import News from '../../componments/homes/news/news.vue'
	import Navs from '../../componments/homes/navs/navs.vue'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let homeModule = createNamespacedHelpers('home')
	let {
		mapState: homeState,
		mapActions: homeActions
	} = homeModule
	export default {
		components: {
			Carousel,
			Recom,
			News,
			Navs,
			splike
		},
		props: {},
		data() {
			return {
				id: "",
				value: ''
			}
		},
		methods: {
			...homeActions(['getBanner', 'getNav', 'getNew', 'getRecommendNav', 'getSeckill']),
			click() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}
		},
		mounted() {
			this.getBanner()
			this.getNav()
			this.getNew()
			this.getRecommendNav()
			this.getSeckill()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...homeState(['list', 'nav', 'news', 'recommendNav', 'splike'])
		},
		watch: {
			recommendNav: {
				handler(val) {
					if (val) {
						this.id = val[0]._id
					}
				},
				deep: true
			}
		},
	}
</script>

<style scoped lang="scss">
	.nav {
		/* #ifdef MP-WEIXIN */
		height: 98rpx;
		position: fixed;
		padding-top: 36rpx;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		/* #endif */
		/* #ifndef MP-WEIXIN */
		height: 96rpx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;

		/* #endif */
		.search {
			/* #ifdef MP-WEIXIN */
			position: fixed;
			top: 28rpx;
			right: 200rpx;
			width: 440rpx;
			/* #endif */
		}

		.logo {
			width: 50rpx;
			height: 50rpx;
			border-radius: 8px;

			.img {
				width: 70%;
				height: 55%;
			}
		}
	}

	.banner {
		width: 100%;
		background-color: #FFFFFF;

		.banner-bg {
			position: absolute;
			left: -25%;
			width: 150%;
			height: 200rpx;
			background-color: #ee702e;
			border-bottom-left-radius: 100%;
			border-bottom-right-radius: 100%;
		}
	}

	.content {
		/* #ifdef MP-WEIXIN */
		margin-top: 98rpx;
		/* #endif */
		/* #ifndef MP-WEIXIN */
		margin-top: 96rpx;
		/* #endif */
	}
</style>
