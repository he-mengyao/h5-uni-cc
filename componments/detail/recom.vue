<template>
	<view class="bg-fff pd-10 mrtb-20">
		<view class="flex  f14">
			<view class="flex flex-c ai-c col flex-1" v-for="(i,s) in tag" :key='s' @click="click(i,s)"
				:class="s===current?'color-r':''">
				<view class="tag">{{i}}</view>
				<view :class="current===s?'line':'tags'"></view>
			</view>
		</view>
		<view class="mrtb-10">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 700rpx;">
				<swiper-item>
					<view class="flex wrap flex-b">
						<view class=" item bg-f0f0 overflow" v-for="(item,index) in recom.slice(0,6)" :key='index'
							@click="goDeatil(item)">
							<image :src="item.cover" mode="" class="w-100" style="height: 230rpx;"></image>
							<view class="name">{{item.name}}</view>
							<view class="flex">
								<view class="fw color-r f14">￥{{item.presentPrice}} </view>
								<view class="color-a0a0 del">￥{{item.originalPrice}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="flex wrap flex-b">
						<view class=" item bg-f0f0 overflow" v-for="(item,index) in recom.slice(6,12)" :key='index'
							@click="goDeatil(item)">
							<image :src="item.cover" mode="" class="w-100" style="height: 230rpx;"></image>
							<view class="name">{{item.name}}</view>
							<view class="flex">
								<view class="fw color-r f14">￥{{item.presentPrice}} </view>
								<view class="color-a0a0 del">￥{{item.originalPrice}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="flex wrap flex-b">
						<view class=" item bg-f0f0 overflow" v-for="(item,index) in recom.slice(12,18)" :key='index'
							@click="goDeatil(item)">
							<image :src="item.cover" mode="" class="w-100" style="height: 230rpx;"></image>
							<view class="name">{{item.name}}</view>
							<view class="flex">
								<view class="fw color-r f14">￥{{item.presentPrice}} </view>
								<view class="color-a0a0 del">￥{{item.originalPrice}}</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>

<script>
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		components: {},
		props: {
			Recommend: {
				type: Array,
				required: true
			},
		},
		data() {
			return {
				tag: ['为你推荐', '爆款推荐'],
				current: 0,
				recom: [],
				i: 0,
			}
		},
		methods: {
			// 点击tag
			click(i, s) {
				this.current = s
			},
			// 点击进详情
			goDeatil(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${item._id}`
				})
			},
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			Recommend(val) {
				if (val) this.recom = cloneDeep(val)
			},
		},
	}
</script>

<style scoped lang="scss">
	.tag {
		height: 40rpx;
	}

	.tags {
		background-color: transparent;
		height: 6rpx;
		width: 30rpx;
	}

	.item {
		border-radius: 8rpx;
		width: 31%;
		height: 340rpx;
		margin: 0 10rpx 10rpx 0;

		.name {
			height: 60rpx;
		}
	}
</style>
