<template>
	<view class="bg-f0f0 h-100">
		<!-- 顶部 -->
		<view class="head-div">
		<cc-nav-bar leftArrow titleSize='24' @clickLeft='clickLeft'>
			<template #default>
				<view class="demo-rate f16">
					小米秒杀
				</view>
			</template>
		</cc-nav-bar>
		</view>
		<!-- 导航 -->
		<view class="flex mrtb-10">
			<view class="flex ai-c flex-c col" style="width: 200rpx">
				<view class="f14 fw">最后疯抢</view>
				<view class="color-a0a0">已开抢</view>
			</view>
			<scroll-view scroll-x="true" style="white-space: nowrap;">
				<view v-for="(item,index) in list" :key='index' style="display: inline-block;" class="mr-5"
					@click="click(item,index)">
					<view class="ta-c fw f14" :class="index===current?'color-r':''">{{item}}:00</view>
					<view class="color-a0a0" :class="index===current?'qiang':''">
						{{index===0?'抢购中':'即将开抢'}}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 商品 -->
		<!-- 有商品的时候 -->
		<view class="" v-if="list1.length>0">
			<view class="flex bg-fff mr-10 pd-10 radius" v-for="(item,index) in list1" :key='index'
				@click="goDetail(item)">
				<image :src="item.goods.cover" mode="" class="img-160"></image>
				<view class="mrl-10 flex col flex-b">
					<view class="ellipsis-one">
						<view class="f14">{{item.goods.name}}</view>
						<view class=" color-r">{{item.goods.introduction}}</view>
					</view>
					<view class="flex flex-b" style="width: 60vw;height: 80rpx;">
						<view class="fw f14 color-r">{{item.goods.presentPrice}}<text
								class="del f12 color-a0a0 mrrl-5">{{item.goods.originalPrice}}</text></view>
						<view class="pdrl-10 bg-r radius-5 cw flex col ai-c flex-c"
							:class="current!==0?'color-green':''" style="width: 180rpx;">
							<view class="f14" v-if="item.percentage!==100">{{current===0?'去抢购':'去预约'}}</view>
							<view class="f14" v-if='item.percentage===100'>已抢完</view>
							<view class="" v-if="current===0" style="width: 150rpx;">
								<cc-progress :percentage="item.percentage" bg-color="#ffffff"></cc-progress>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 没有商品的时候 -->
		<view class="flex ai-c flex-c col" v-if="list1.length===0">
			<view class="mrtb-20 color-a0a0 f16">暂无秒杀商品</view>
			<cc-button type="warning" block style='width: 90%;margin: 20px;' @click='goHome'>请前往首页购买</cc-button>
		</view>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	import cloneDeep from 'lodash/cloneDeep'
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
		props: {},
		data() {
			return {
				timeList: [8, 10, 12, 14, 16, 18, 20, 22, 0],
				current: 0,
				list1: [],
				current1: dayjs().hour() % 2 === 0 && dayjs().hour() >= 8 ? dayjs().hour() : dayjs().hour() - 1,
				timer: null
			}
		},
		methods: {
			...homeActions(['getSeckill']),
			clickLeft() {
				uni.navigateBack()
			},
			// 点击导航
			click(item, index) {
				this.current = index
				this.current1 = item
				this.getData()
				if (item === dayjs().hour() % 2 === 0 && dayjs().hour() >= 8 ? dayjs().hour() : dayjs().hour() - 1) {
					this.timer = setInterval(this.getData, 1000)
				} else {
					clearInterval(this.timer)
					this.timer = null
				}
			},
			// 点击商品
			goDetail(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${item.goods._id}`
				})
			},
			// 点击去首页
			goHome(){
				uni.switchTab({
					url:'/pages/home/home'
				})
			},
			getData() {
				this.list1 = this.splike.filter(i => {
					// 场次开始时间
					let start_time = this.current1
					// 场次结束时间
					let end_time = this.current1 + 2

					let a = start_time - dayjs(i.start_time).hour()
					let b = end_time - dayjs(i.end_time).hour()
					let c = end_time - dayjs(i.start_time).hour()
					let d = start_time - dayjs(i.end_time).hour()
					// 商品开始时间小于等于场次开始时间，商品结束时间大于等于场次开始时间
					// 商品开始时间大于场次开始时间并且小于场次结束时间，商品结束时间大于等于场次结束时间
					if ((a >= 0 && d <= 0) || (a >= 0 && c >= 0 && b <= 0) || (a<=0 && b<=0)) {
						return i
					}
				})
			}
		},
		mounted() {
			this.getSeckill()
			this.timer = setInterval(this.getData, 1000)
		},
		onLoad() {

		},
		onShow() {},
		filters: {},
		computed: {
			...homeState(['splike']),
			list() {
				let a = (dayjs().hour() % 2) === 0 && dayjs().hour() >= 8 ? dayjs().hour() : dayjs().hour() - 1
				if (a === 24) {
					a = 0
				}
				let n = this.timeList.indexOf(a)
				let arr = this.timeList.slice(n, n + 5)
				return arr
			}
		},
		watch: {
			splike(val) {
				if (val) {
					this.list1 = val.filter((i, index) => {
						// 场次开始时间
						let start_time = this.current1
						// 场次结束时间
						let end_time = this.current1 + 2
						let a = start_time - dayjs(i.start_time).hour()
						let b = end_time - dayjs(i.end_time).hour()
						let c = end_time - dayjs(i.start_time).hour()
						let d = start_time - dayjs(i.end_time).hour()
						// 商品开始时间小于等于场次开始时间，商品结束时间大于等于场次开始时间
						// 商品开始时间大于场次开始时间并且小于场次结束时间，商品结束时间大于等于场次结束时间
						// 正好在本场次
						if ((a >= 0 && d <= 0) || (a >= 0 && c >= 0 && b <= 0) || (a<=0 && b<=0)) {
							let percent = (dayjs().valueOf() - dayjs(i.start_time).valueOf()) /
								(dayjs(i.end_time).valueOf() - dayjs(i.start_time).valueOf()) * 100
							// console.log(parseInt(percent))
							if (parseInt(percent) >= 100) {
								i.percentage = 100
							} else {
								i.percentage = parseInt(percent)
							}
							return i
						}
					})
					// console.log(this.list1);
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.qiang {
		background-color: #ee702e;
		padding: 0 5px;
		border-radius: 20rpx;
		color: #FFFFFF;
	}

	.color-green {
		background-color: #41a863;
	}
</style>
