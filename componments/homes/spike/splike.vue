<template>
	<view class="bg-fff mr-10 pd-10" v-if="list.length>0">
		<view class="flex flex-b" @click="go">
			<view class="flex ai-c">
				<view class="">小米秒杀</view>
				<view class="flex ai-c mrl-10 tbox overflow">
					<view class="tbox1 bg-r cw pdrl-5">{{time}}点场</view>
					<view class="pdrl-5 color-r">
						{{times}}
					</view>
				</view>
			</view>
			<view class="color-a0a0">
				更多好货限时抢 >
			</view>
		</view>
		<!--商品 -->
		<scroll-view scroll-x="true" style="white-space: nowrap;" class="pdtb-10">
			<view style="display: inline-block;" v-for="(item,index) in list" :key='index' 
			class="mrr-10 ta-c" @click="click(item)">
				<image :src="item.goods.cover" mode="" class="img-160"></image>
				<view class="color-r f14 fw">￥{{item.goods.presentPrice}}</view>
				<view class="color-a0a0" style="text-decoration: line-through;">￥{{item.goods.originalPrice}}</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	import cloneDeep from 'lodash/cloneDeep'
	export default {
		components: {},
		props: {
			splike: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				times: '',
				list: [],
			}
		},
		methods: {
			// 倒计时
			countTime() {
				let inputTime = dayjs(dayjs().format('YYYY-MM-DD ')+this.time+':00:00').valueOf()+7200000
				let nowTime = Date.now()
				let times = (inputTime - nowTime) / 1000
				let h = parseInt(times / 60 / 60 % 24)
				h = h < 10 ? '0' + h : h
				let m = parseInt(times / 60 % 60)
				m = m < 10 ? '0' + m : m
				let s = parseInt(times % 60)
				s = s < 10 ? '0' + s : s
				this.times = `${h}:${m}:${s}`
			},
			// 点击商品
			click(item){
				uni.navigateTo({
					url:`/pages/detail/detail?id=${item.goods._id}`
				})
			},
			// 点击更多
			go(){
				uni.navigateTo({
					url:'/pages/seckill/seckill'
				})
			}
		},
		mounted() {
			// 倒计时
			this.countTime()
			setInterval(this.countTime, 1000)
		},
		onLoad() {

		},
		onShow() {
		},
		filters: {},
		computed: {
			time(){
				return Number(dayjs().format('HH'))%2===0 && Number(dayjs().format('HH'))>=8?dayjs().hour():dayjs().hour()-1
			}
		},
		watch: {
			// 处理商品数据
			splike(val) {
				if (val) {
					this.list=cloneDeep(val)
					this.list=this.list.filter(i=>{
						// 场次开始时间
						let start_time=this.time
						// 场次结束时间
						let end_time=this.time+2
						
						let a=start_time-dayjs(i.start_time).hour()
						let b =end_time-dayjs(i.end_time).hour()
						let c = end_time-dayjs(i.start_time).hour()
						let d = start_time-dayjs(i.end_time).hour()
						// 商品开始时间小于等于场次开始时间，商品结束时间大于等于场次开始时间
						// 商品开始时间大于场次开始时间并且小于场次结束时间，商品结束时间大于等于场次结束时间
						if((a >= 0 && d <= 0) || (a >= 0 && c >= 0 && b <= 0) || (a<=0 && b<=0)){
							return i
						}
					})
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.tbox {
		border: 1px solid #ee702e;
		border-radius: 30rpx;
	}
</style>
