<template>
  <view class="bg-eee f14">
		<!-- 头像 -->
     <view class="hd flex  ai-c pd-10">
			 <view class="avator">
			 	<image src="../../static/user/touxiang.png" mode="" class="avator-img"></image>
			 </view>
			 <view class="f14 mrl-10 cw" @click="login" >{{user?user.username:'登录/注册'}}</view>
		 </view>
		 <!-- 我的订单 -->
		 <view class="flex flex-b ai-c order bg-fff radius border-b pdrl-10" @click="click({name:'全部订单',link:'/pages/user/orderList'})">
			 <view class="">我的订单</view>
			 <view class="flex ai-c">
				 全部订单
				 <image src="../../static/right.png" mode="" class="del"></image></view>
		 </view>
		 <!-- 代付款 -->
		 <view class="flex-a flex bg-fff dai ai-c">
			 <view class="flex-1 flex ai-c col" v-for="(item,index) in navList" :key='index' @click="click(item)">
				 <image :src="item.src" mode="" class="user-iocn"></image>
				 				 {{item.name}}
			 </view>
		 </view>
		 <!-- 会员中心 -->
		 <view class="flex  bg-fff mrtb-10 col pdrl-10" v-for="(item,index) in items" :key='index'>
			 <view class="flex ai-c" v-for="(item1,index1) in item" :key='index1' @click="click(item1)">
				 <image :src="item1.src" mode="" class="user-iocn mrr-20"></image>
				 <view class="flex flex-b  w-100 pdtb-20" :class="index1===0?'border-b':''">
					 {{item1.name}}
					 <image src="../../static/right.png" mode="" class="del"></image>
				 </view>
			 </view>
		 </view>
		 <!-- 占位 -->
		 <view class="bottom-div"></view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
				navList:[
					{
						name:'代付款',
						src:'../../static/user/daifukuan.png',
						link:'/pages/user/orderList',
					},
					{
						name:'代收货',
						src:'../../static/user/daishouhuo.png',
						link:'/pages/user/orderList',
					},
					{
						name:'退换修',
						src:'../../static/user/tuihuanxiu.png',
						link:'/pages/user/orderList',
					}
				],
				user:null,
				// 小米之家
				items:[
					[
						{
							src:'../../static/user/huiyuanzhongxin.png',
							name:'会员中心',
							link:'/pages/user/vip'
						},
						{
							src:'../../static/user/youhui.png',
							name:'我的优惠',
						link:'',
						}
					],
					[
						{
							src:'../../static/user/fuwuzhongxin.png',
							name:'服务中心',
						link:'',
						},
						{
							src:'../../static/user/xiaomizhijia.png',
							name:'小米之家',
						link:'/pages/location/location',
						}
					],
					[
						{
							src:'../../static/user/fma.png',
							name:'我的F码',
						link:'',
						},
						{
							src:'../../static/user/liwu.png',
							name:'礼物码兑换',
						link:'',
						}
					],
					[
						{
							src:'../../static/user/shezhi.png',
							name:'设置',
						link:'/pages/user/setting',
						},
					]
				]
			}
    },
    methods: {
			// 点击每一项
			go(item){
				if(item.link){
					uni.navigateTo({
						url:item.link
					})
				}else {
					uni.showToast({
						title:'暂无此功能',
						icon:'none'
					})
				}
			},
			// 检测登录
			click(item){
				if(item.name=='会员中心'){
					uni.navigateTo({
						url:item.link
					})
				}else if(item.name=='服务中心') {
					uni.showToast({
						title:'暂无此功能',
						icon:'none'
					})
				}else if (item.name=='小米之家'){
					uni.navigateTo({
						url:item.link
					})
				}else {
					this.$utils.checkLogin({
						key:'youpin-h5-user',
						next:this.go,
						item:item
					})
				}
			},
			// 点击登录
			login(){
				if(!this.user){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			}
		},
    mounted() {

    },
    onLoad() {

    },
    onShow() {
			this.user = uni.getStorageSync('youpin-h5-user')
    },
    filters: {},
    computed: {},
    watch: {},
  }
</script>

<style scoped lang="scss">
	.hd {
		background:  #f37d0f;
		height: 160rpx;
	}
	.order {
		height: 82rpx;
	}
	.dai {
		height: 150rpx;
	}

</style>
