<template>
	<view class="mrtb-10 bg-fff pdrl-10">
		<view class="flex ai-c border-b pdtb-10" @click="clickTag(1)">
			<view class="tag">已选</view>
			<view class="flex flex-b w-100 ai-c">
				<view class="flex">
					<view class="mrr-10" v-for="(i,s) in list" :key='s'>{{i}}</view>
				</view>
				<image src="../../static/right.png" mode="" class="del"></image>
			</view>
		</view>
		<view class="flex ai-c border-b pdtb-10" @click="clickTag(2)">
			<view class="tag">送至</view>
			<view class="flex flex-b w-100 ai-c">
				<view class="">{{address.length>0?address[0].address.split(' ').join(''):'暂无地址，请先添加地址'}}</view>
				<image src="../../static/right.png" mode="" class="del"></image>
			</view>
		</view>
		<view class="flex ai-c border-b pdtb-10">
			<view class="tag">门店</view>
			<view class="flex flex-b w-100 ai-c">
				<view class="">{{store}}</view>
				<image src="../../static/right.png" mode="" class="del"></image>
			</view>
		</view>
		<!-- 规格弹出层 -->
		<cc-popup :show.sync="show1" mode="bottom" height='720' round :closeable="true" style='z-index: 99999;'>
			<view class="pd-10 pr">
				<view class="hd flex ai-c" v-if="detailGoods">
					<image :src="detailGoods.cover" mode="" class="img-160 mrr-10"></image>
					<view>
						<view class="fw f16 color-r">￥{{detailGoods.presentPrice}}</view>
						<view class="flex">
							<view class="mrr-10" v-for="(i,s) in list" :key='s'>
								<view v-if="i">{{i}}</view>
							</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 530rpx" v-if="detailGoods">
					<view class="spec-bd" v-for="(item,index) in detailGoods.spec" :key='index'>
						<view class="mrtb-10">{{item.name}}</view>
						<view class="flex wrap ">
							<view class="spec-item mrr-10 flex ai-c flex-c color-333"
								v-for="(item1,index1) in item.spec_item1" :key='index1'
								@click="click(index,index1,item,item1)"
								:class="{'active':item.showFlag===index1,'bg-eee':item.showFlag!==index1}">
								{{item1}}
							</view>
						</view>
					</view>
					<!-- 步进器 -->
					<view class="flex flex-b ai-c mrtb-10">
						购买数量
						<cc-stepper :value.sync="count"></cc-stepper>
					</view>
					<!-- 占位 -->
					<view class="div-80"></view>
				</scroll-view>
				<!-- 加入购物车 -->
				<view class="bottom mr-10 flex overflow flex-c pa">
					<view class="buy box1 flex ai-c flex-c" @click="checkLogin(1)">加入购物车</view>
					<view class="buy box2 flex ai-c flex-c" @click="checkLogin(2)">立即购买</view>
				</view>
			</view>
		</cc-popup>
		<!-- 送至弹出层 -->
		<cc-popup :show.sync="show2" mode="bottom" height='700' round :closeable="true">
			<view class="pd-10">
					<view class="f16 flex ai-c flex-c">收货地址</view>
					<view v-for="(item,index) in address" :key="index" class="flex pdtb-10 border-b ai-c">
						<image src="../../static/mihome/location.png" mode="" style="height: 30rpx;width: 30rpx;"></image>
						<view class="f14 mrl-10">
							{{item.username}} {{item.address.split(' ')[1]}}
							<view class="color-a0a0 f12">{{item.detailAddress}}</view>
						</view>
					</view>
					<view class="buybtn bottom last" @click="addAddress">新增地址</view>
			</view>
		</cc-popup>
		<!-- 商品导航 -->
		<view class='goodsaction'>
			<cc-goods-action :options="options" :buttons="buttons" @click='clickIcon' @clickButton='checkLogin(1)'>
			</cc-goods-action>
		</view>
	</view>

</template>s

<script>
	import cloneDeep from 'lodash/cloneDeep'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let detailModule = createNamespacedHelpers('detail')
	let {
		mapState: detailState,
		mapActions: detailActions
	} = detailModule
	let cartModule = createNamespacedHelpers('cart')
	let {
		mapState: cartState,
		mapActions: cartActions
	} = cartModule
	export default {
		components: {},
		props: {
			detail: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				// 检测登录
				show: false,
				// 规格弹出层
				show1: false,
				// 送至弹出层
				show2: false,
				list: [],
				current: 0,
				count: 1,
				detailGoods: null,
				// 商品导航
				options: [{
						text: '首页',
						icon: 'home'
					},
					{
						text: '客服',
						icon: 'chat'
					},
					{
						text: '购物车',
						icon: 'cart',
						info:1
					}
				],
				// 商品导航内容
				buttons: [{
					text: '加入购物车'
				}],
				store: '门店定位中...',
			}
		},
		methods: {
			...detailActions(['addCart','searchAreaList','getStoreHome']),
			...cartActions(['getAppAddress','getCart']),
			// 点击打开弹框
			clickTag(e) {
				if (e === 1) this.show1 = true
				if (e === 2) this.show2 = true
			},
			// 选择规格
			click(index, index1, item, item1) {
				this.$set(this.list, index, item1)
				this.$set(this.detailGoods.sku, index, {
					name: item,
					checked: item1
				})
				item.showFlag = index1
			},
			// 加入购物车
			add(e) {
				this.show1 = false
				if (e === 1) {
					this.addCart({
						user_id: this.$utils.user({
							key: 'youpin-h5-user'
						})._id,
						count: this.count,
						goods: this.detailGoods,
						spec: this.detailGoods.sku
					})
				} else if (e === 2) {// 结算
					let arr = [{
						count: this.count,
						goods: this.detailGoods,
						spec: this.detailGoods.sku
					}]
					uni.setStorageSync('goods', arr)
					uni.navigateTo({
						url: `/pages/order/order`
					})
				}
			},
			checkLogin(n) {
				this.$utils.checkLogin({
					key: 'youpin-h5-user',
					next: this.add,
					item: n
				})
			},
			// 点击首页和购物车
			clickIcon(item) {
				// console.log(item);
				if (item.index === 0) {
					uni.switchTab({
						url: '/pages/home/home'
					})
				} else if (item.index === 1) {
					uni.navigateTo({
						url: `/pages/user/chat`
					})
					uni.setStorageSync('chatGoods', this.detailGoods)
				} else if (item.index === 2) {
					this.$utils.checkLogin({
						key: 'youpin-h5-user',
						next: this.goCart,
					})
				}
			},
			// 跳转购物车
			goCart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			// 新增地址
			addAddress(){
				uni.navigateTo({
					url:'/pages/address/address'
				})
				this.show2=false
			}
		},
		mounted() {
			this.getAppAddress(uni.getStorageSync('youpin-h5-user')._id)
			this.$utils.getLocation('').then(res => {
				if(res.code===200){
					this.store=res.data.formattedAddress
				}
			}).catch(err => {
				console.log('地图定位失败');
			})
			let id = uni.getStorageSync('youpin-h5-user')._id
			this.getCart(id)
		},
		onLoad() {

		},
		created() {
		},
		onShow() {
		},
		filters: {},
		computed: {
			...detailState(['cart','city','cityOne']),
			...cartState(['address','num'])
		},
		watch: {
			detail(val) {
				if (val) {
					this.detailGoods = cloneDeep(val)
					val.spec.map((i) => [
						this.list.push(i.spec_item1[0])
					])
				}
			},
			num:{
				handler(val){
					this.options[2].info=val
				},
				immediate:true
			}
		}
	}
</script>

<style scoped lang="scss">
	.tag {
		width: 100rpx;
		height: 100%;
	}

	.spec-item {
		/* #ifndef MP-WEIXIN */
		height: 50rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 30rpx;
		/* #endif */
		border-radius: 25rpx;
		padding: 10rpx 30rpx;
		margin-bottom: 10rpx;
		border: 1px solid #FFFFFF;
	}

	.active {
		background-color: #fef3f0 !important;
		border: 1px solid #ee702e !important;
		color: #ee702e !important;
	}

	.bottom {
		left: 0;
		right: 0;
		bottom: 20rpx;
		height: 80rpx;
		z-index: 999999;
		color: #FFFFFF;
		border-radius: 40rpx;

		.box1 {
			background: linear-gradient(to right, #f6cd45, #ee9e39);
		}

		.box2 {
			background: linear-gradient(to right, #e97732, #e54f26);
		}

		.buy {
			flex: 1;
		}
	}

	.div-80 {
		height: 80rpx;
	}

	// 商品导航
	.goodsaction {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99;
		padding-bottom: 10px;
		background-color: #FFFFFF;
	}
</style>
