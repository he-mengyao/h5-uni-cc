<template>
	<view class="">
		<!-- 导航栏 -->
		<view class="mrtb-10 scroll_box flex ai-c pdrl-10">
			<scroll-view scroll-x="true">
				<view class="flex">
					<view v-for="(i,s) in recommendNav" :key="s" class="flex col ai-c item flex-c" @click="click(i,s)"
						:class="{'item1':s===current}">
						<view class="title f14 fw">
							{{i.name}}
						</view>
						<view class="subtitle color-333">
							{{i.desc}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 商品 -->
		<view class="mrtb-10 flex wrap">
			<view class="goods bg-fff flex col " v-for="(i,s) in goods" :key='s' @click="goDetail(i)">
				<image :src="i.cover" mode="" class="w-100 goods-img"></image>
				<view class="pdrl-10 f14">
					{{i.name}}
				</view>
				<view class="pdrl-10 color-r fw">
					￥{{i.presentPrice}}
				</view>
				<image src="../../../static/image/icon_close.png" mode="" class="del" @click.stop="del(s)"></image>
				<!-- 遮罩层 -->
				<view class="goods-mask flex col flex-c ai-c" v-if="flag && current1===s" @click.stop="clickMask">
					<view class="mask1 bg-fff flex flex-c ai-c" v-for="(i,s) in maskList" :key='s' @click.stop="tip(i)">
						{{i}}
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
	let homeModule = createNamespacedHelpers('home')
	let {
		mapState: homeState,
		mapActions: homeActions
	} = homeModule
	
	
	export default {
		components: {},
		props: {
			recommendNav: {
				type: Array,
				required: true
			},
			goodsId: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				current: 0,
				current1: -1,
				flag: false,
				maskList:['不感兴趣','品类不喜欢','看过了','已购买了']
			}
		},
		methods: {
			...homeActions(['getNavGoods']),
			// 点击导航
			click(i, s) {
				this.current = s
				this.getNavGoods(i._id)
			},
			// 点击删除
			del(s) {
				this.current1 = s
				this.flag = true
			},
			// 点击遮罩层
			clickMask() {
				this.flag = false
			},
			// 点击提示标签
			tip(i){
				uni.showToast({
					title:`已为你备注${i}`,
					icon:'none'
				})
				this.flag = false
			},
			// 点击商品
			goDetail(i){
				uni.navigateTo({
					url:`/pages/detail/detail?id=${i._id}`
				})
			}
		},
		mounted() {
			this.getNavGoods(this.goodsId)
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...homeState(['goods'])
		},
		watch: {

		},
	}
</script>

<style scoped lang="scss">
	.item {
		margin-right: 40rpx;
	}

	.item1 {
		.title {
			color: #ee702e;
		}

		.subtitle {
			background-color: #ee702e;
			color: #FFFFFF;
			padding: 0 10rpx;
			border-radius: 20rpx;
		}
	}

	.goods {
		width: 750rpx*0.46;
		margin: 0 0 20rpx 20rpx;
		position: relative;

		.goods-img {
			height: 380rpx;
		}

		.del {
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			width: 30rpx;
			height: 30rpx;
		}

		.goods-mask {
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 99;
			background-color: rgba(0, 0, 0, .8);

			.mask1 {
				width: 80%;
				height: 60rpx;
				border-radius: 30rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
