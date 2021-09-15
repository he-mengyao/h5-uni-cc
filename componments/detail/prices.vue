<template>
	<view class="">
		<!-- 价格 -->
		<view class="price mr-10 border-b">
			<view class="color-r f16 fw" v-if="detail">￥{{detail.presentPrice?detail.presentPrice:0}}</view>
			<view class="more radius-5 flex flex-b ai-c pdrl-10" @click="clickCoupon(1)">
				<view class="flex">
					<view class="flex  coupu radius-5 color-r mrr-10 f12" v-for="(i,s) in coupon.slice(0,2)" :key='s'>
						{{i.name}}
					</view>
				</view>
				<view class="bg-r radius-5 cw new flex ai-c flex-c">更多</view>
			</view>
		</view>
		<!-- 名称 -->
		<view class="name border-b">
			<view class="f16">{{detail.name}}</view>
			<view class="color-333 flex" v-for="(i,s) in sellDesc" :key='s'>
				<view class="num flex ai-c flex-c mrr-10">{{s+1}}</view>
				<view class="">{{i}}</view>
			</view>
		</view>
		<!-- 商品参数 -->
		<scroll-view scroll-x="true" class="scroll_box pdt-10" v-if="detail.params" @click="clickCoupon(2)">
			<view v-for="(i,s) in detail.params" class=" params" :key='s'>
				<view class="flex ai-c flex-c col">
					<image :src="i.url" mode="" class="del"></image>
					<view class="">{{i.name}}</view>
					<view class="ellipsis-one w-100 ta-c">{{i.desc}}</view>
				</view>
			</view>
		</scroll-view>
		<!-- 优惠券弹出层 -->
		<cc-popup :show.sync="show1" mode="bottom" height='900' round :closeable="true">
			<view class="pd-20">
				<view class="flex flex-c f16 fw">{{num===1?'优惠':'关键参数'}}</view>
				<view class="" v-if="num===1">
					<view class="mrtb-20" v-for="(i,s) in coupon" :key='s'>
						<view class="fw color-r">{{i.name}}</view>
						<view class="mrtb-10">截止时间：{{i.end_time}}</view>
					</view>
				</view>
				<view class="" v-if="num===2">
					<view class="" v-for="(i,s) in detail.params" class="flex ai-c mrtb-20" :key='s'>
						<view class="color-a0a0" style="width: 200rpx;">{{i.name}}</view>
						<view class="">{{i.desc}}</view>
					</view>
					<view class="pd-10 flex flex-c last">
						<view class="buybtn mr-10" @click="comfirm" style="width: 90%;">确定</view>
					</view>
				</view>
			</view>
		</cc-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			detail: {
				type: Object,
				required: true
			},
			coupon: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				// 优惠券弹出层
				show1: false,
				sellDesc: [],
				num:0
			}
		},
		methods: {
			// 打开优惠券
			clickCoupon(n) {
				this.num=n
				this.show1=true
			},
			// 点击确认
			comfirm(){
				this.show1=false
			}
		},
		mounted() {},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			detail(val) {
				if (val) {
					this.sellDesc = val.sellDesc[0].split('\n')
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.price {
		height: 120rpx;

		.more {
			height: 50rpx;
			background-color: #FFF7F2;

			.coupu {
				border: 1px solid #ee702e;
				padding: 0 5px;
			}

			.new {
				height: 40rpx;
				width: 80rpx;
			}
		}
	}

	.name {
		padding: 0 20rpx 20rpx 20rpx;
	}

	// 编号
	.num {
		border: 1px solid #333333;
		border-radius: 100%;
		height: 30rpx;
		width: 30rpx;
	}

	.params {
		width: 200rpx;
		margin: 0 10rpx;
		display: inline-block;
	}
</style>
