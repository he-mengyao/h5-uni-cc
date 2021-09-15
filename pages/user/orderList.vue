<template>
	<view class="color-666 f14">
		<!-- 顶部 -->
		<top :background="color">
			<template #left>
				<image src="../../static/back.png" class="img-40" mode=""></image>
			</template>
			<template #middle>
				<view class="">{{title}}</view>
			</template>
			<template #right>
				<image src="../../static/sousuo.png" class="del" mode=""></image>
			</template>
		</top>
		<!-- 占位 -->
		<cc-sticky>
			<view class="top-div"></view>
			<!-- 导航栏 -->
			<view class="flex border-b bg-fff" :offset-top="offset">
				<view class="flex-1 flex ai-c flex-c col item" v-for="(item,index) in nav" :key='index'
					@click="click(item,index)" :class="{'color-r':index===current,'fw':index===current}">
					<view class="pdtb-10">{{item}}</view>
					<view class="line-r" v-if="index===current"></view>
				</view>
			</view>
		</cc-sticky>
		<!-- 如果没有订单 -->
		<view class="flex col ai-c empty flex-c" v-if="list.length===0">
			<image src="../../static/empty1.png" mode="" class="empty-img"></image>
			您还没有{{text}}订单
		</view>
		<!--如果有订单 -->
		<view class="bg-eee">
			<view v-if="list.length>0">
				<view class="mrtb-10 w-100 bg-fff" v-for="(item,index) in list" :key='index'>
					<view class="f14 flex ai-c flex-b border-b pd-10  cb" style="width: 95vw;">
						小米商城<view class="color-r f12 color-a0a0">已收货</view>
					</view>
					<view class="border-b">
						<view class="pd-10" v-for="(item1,index1) in item.goods_list " :key='index1'
							>
							<view class="flex ai-c" @click="goDetail(item1.goods)">
								<image :src="item1.goods.cover" mode="" class="img-120"></image>
								<view class="mrl-10 cb" style="width: 80%;">{{item1.goods.name}}</view>
								<view class="flex col" style="align-items: flex-end;">
									<view class="">￥{{item1.goods.presentPrice}}</view>
									<view class="">×{{item1.count}}</view>
								</view>
							</view>
							<!-- 去评价 -->
							<view class="flex flex-r pd-10"  @click.stop='goComment(item1)'><cc-button type='warning' size='mini' :disabled='item1.isComment'>{{item1.isComment?'已完成':'去评价'}}</cc-button></view>
						</view>
					</view>
					<!-- 时间 -->
					<view class="pd-10 flex flex-b ai-c">
						<view class="">{{item.pay_time}}</view>
						<view class="cb">共{{list.length}}件商品 实付金额：<text class="color-a0a0">￥{{item.price}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品推荐 -->
		<view class="ta-c">
			<image src="../../static/recom.png" mode="" style="height: 125rpx;"></image>
		</view>
		<view class="flex wrap flex-b">
			<view class="item1" v-for="(item,index) in Recommend" :key='index' @click="goDetail(item)">
				<image :src="item.cover" mode="" class="recom"></image>
				<view class="pdrl-10">{{item.name}}</view>
				<view class="f14 color-r pdrl-10">￥{{item.presentPrice}}<text
						class="del color-a0a0 f12 mrrl-5">{{item.originalPrice}}</text></view>
			</view>
		</view>
	</view>

</template>

<script>
	import top from '../../componments/top/top.vue'
	import cloneDeep from 'lodash/cloneDeep'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let detailModule = createNamespacedHelpers('detail')
	let {
		mapState: detailState,
		mapActions: detailActions
	} = detailModule
	let orderModule = createNamespacedHelpers('cart')
	let {
		mapState: orderState,
		mapActions: orderActions
	} = orderModule
	export default {
		components: {
			top
		},
		props: {},
		data() {
			return {
				color: "#eee",
				title: '我的订单',
				nav: ['全部', '待付款', '待收货'],
				current: 0,
				text: '',
				list: [],
				offset: 160,
			}
		},
		methods: {
			...detailActions(['getRecommend']),
			...orderActions(['getAppOrder']),
			// 点击导航栏
			click(item, index) {
				this.current = index
				if (item === '全部') {
					this.text=''
					this.getAppOrder(uni.getStorageSync('youpin-h5-user')._id)
				} else {
					this.text = item
					this.list=[]
				}
			},
			// 点击商品
			goDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${item._id}`
				})
			},
			// 点击去评价
			goComment(item){
				uni.setStorageSync('item',item)
				uni.navigateTo({
					url:'/pages/user/comment'
				})
			}
		},
		mounted() {
			/* #ifndef MP-WEIXIN */
			this.offset = 160
			/* #endif */
			/* #ifdef MP-WEIXIN */
			this.offset = 200
			/* #endif */
		},
		onLoad() {

		},
		onShow() {
			this.getRecommend()
			let a = uni.getStorageSync('youpin-h5-user')
			if (a) {
				this.getAppOrder(a._id)
			}

		},
		filters: {},
		computed: {
			...detailState(['Recommend']),
			...orderState(['orderList'])
		},
		watch: {
			orderList(val) {
				if (val) {
					this.list = cloneDeep(val)
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.line-r {
		height: 5rpx;
		width: 85rpx;
		background-color: #ee702e;
	}

	.empty {
		height: 400rpx;

		.empty-img {
			width: 200rpx;
			height: 200rpx;
			margin: 40rpx 0;
		}
	}

	.recom {
		width: 370rpx;
		height: 370rpx;
	}

	.item1 {
		margin-bottom: 10rpx;
	}
</style>
