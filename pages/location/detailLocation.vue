<template>
  <view>
    <view class="w-100 pr" id='container' style="height: 800rpx;">
			<view class="back pa radius-100 boder" @click="back"><image src="../../static/back.png" mode="" class="img-40"></image></view>
			<view class="city pa boder flex ai-c flex-c f14" @click="go">{{item.name}}</view>
		</view>
		<view class="border-b pd-10 flex ai-c">
			<view class="pd-5 ta-c home color-a0a0 boder" @click="click(1)" :class="index===1?'active':''">小米之家</view>
			<view class="pd-5 ta-c home color-a0a0 boder mrl-10" @click="click(2)" :class="index===2?'active':''">服务网点</view>
		</view>
		<scroll-view scroll-y="true" style="height: 400rpx;">
			<view v-for="(item,index) in list" :key='index' class="pd-10" :class="index===0?'bgc':''" @click="click(item)">
				<view class="f14 ellipsis-one">{{item.store_name}}</view>
				<view class="color-a0a0 ">{{item.shop_time}}</view>
				<view class="color-a0a0 f14">{{item.address}}</view>
			</view>
		</scroll-view>
  </view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let detailModule = createNamespacedHelpers('detail')
	let {
		mapState: detailState,
		mapActions: detailActions
	} = detailModule
  export default {
    components: {},
    props: {},
    data() {
      return {
				index:1,
				list:[],
				item:null
			}
    },
    methods: { 
			...detailActions(['getStoreHome']),
			// 点击小米之家
			click(n){
				this.index=n
			},
			// 点击门店
			click(item){
				uni.navigateTo({
					url:`/pages/location/store?store=${JSON.stringify(item)}`
				})
			},
			// 点击当前城市
			go(){
				uni.navigateTo({
					url:'/pages/location/location'
				})
			},
			back(){
				uni.navigateBack()
			}
		},
    mounted() {

    },
    onLoad(o) {
			let a=JSON.parse(o.city)
			this.item=a
			this.getStoreHome({
				area_name:a.name,
				area_id:a.id
			})
    },
    onShow() {
			
    },
    filters: {},
    computed: {
			...detailState(['cityOne'])
		},
    watch: {
			cityOne(val){
				if(val){
					this.$utils.getLocation(val[0])
					this.list=val
					console.log(val);
				}
			}
		},
  }
</script>

<style scoped lang="scss">
	.home {
		border-radius: 40rpx;
		width: 150rpx;
	}
	.active {
		border: 1px solid #ee702e !important;
		color: #ee702e;
	}
	.bgc{
		background-color: #fffcf6;
	}
	.back {
		top:30rpx;
		left: 30rpx;
		background-color: #fff;
		z-index: 999999;
		width: 60rpx;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.city {
		height: 60rpx;
		border-radius: 30rpx;
		padding: 0 20px;
		z-index: 99999;
		background-color: #fff;
		top:30rpx;
		right: 30rpx;
	}

</style>
