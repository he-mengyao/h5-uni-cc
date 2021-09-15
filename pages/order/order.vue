<template>
	<view class="h-100 bg-eee f14">
		<!-- 顶部 -->
		<top :background="color">
			<template #left>
				<image src="../../static/back.png" mode="" class="img-40"></image>
			</template>
			<template #middle>
				<view class="flex">确认订单</view>
			</template>
		</top>
		<!-- 占位 -->
		<view class="top-div"></view>
		<view class="pdrl-10">
			<!-- 无地址 -->
			<view class="radius bg-fff  flex col ai-c flex-c w-100 mrtb-10" v-if="!name" @click="addAddress">
				<image src="../../static/location.png" mode="" style="width: 60rpx;height: 60rpx;margin-top: 10px;">
				</image>
				<view class="ta-c mrtb-10">手动添加新地址</view>
				<image src="../../static/caitiao.jpg" mode="" style="height: 5rpx;" class="w-100"></image>
			</view>
			<!-- 有地址 -->
			<view class="bg-fff radius mrtb-10" v-if="name" @click="goAddressList">
				<view class="pd-10">
					<view class="">{{Address}}<text class="pdrl-10  cw radius-5 bg-r mrrl-5" v-if="isDefault">默认</text>
					</view>
					<view class="fw mrtb-10">{{deatilAddress}}</view>
					<view class="">{{name}}<text class="mrl-10">{{tel}}</text></view>
				</view>
				<image src="../../static/caitiao.jpg" mode="" style="height: 5rpx;" class="w-100"></image>
			</view>
			<!-- 商品少 -->
			<view class="bg-fff radius" v-if="goods.length<=2">
				<view class="flex ai-c pd-10" v-for="(item,index) in goods" :key='index'>
					<image :src="item.goods.cover" mode="" class="img-160"></image>
					<view class="mrl-10" style="width: 70vw;">
						<view class="flex flex-b">{{item.goods.name}}
							<view class="">￥{{item.goods.presentPrice}}</view>
						</view>
						<view class="flex flex-b">{{item.goods.sku.map(i=>{return i.checked}).join(' ')}}
							<view class="color-a0a0">×{{item.count}}</view>
						</view>
						<view class="color-a0a0 f12">{{item.goods.sku.map(i=>{return i.checked}).join(' ')}}</view>
					</view>
				</view>
			</view>
			<!-- 商品多 -->
			<view class="flex flex-b ai-c pd-10 bg-fff radius" v-if="goods.length>2" @click="look">
				<view class="flex overflow" style="width: 70%;">
					<view class="" v-for="(item,index) in goods" :key='index'>
						<image :src="item.goods.cover" mode="" class="img-96"></image>
					</view>
				</view>
				<view class="flex ai-c">共{{goods.length}}件<image src="../../static/right.png" mode="" class="del">
					</image>
				</view>
			</view>
			<!-- 商品总价 -->
			<view class="bg-fff radius mrtb-10 pd-10">
				<view class="flex flex-b ai-c">
					商品总价<text>￥{{total}}</text>
				</view>
				<view class="flex flex-b ai-c mrtb-10">
					运费<text>包邮</text>
				</view>
				<view class="flex flex-b ai-c mrtb-10">
					优惠券<text class="color-a0a0">无可用</text>
				</view>
			</view>
			<!-- 发票 -->
			<view class="flex flex-b ai-c mrtb-10 bg-fff pd-10 radius">
				发票<text>电子普通发票-个人</text>
			</view>
		</view>
		<!-- 底部定位 -->
		<view class="total last bg-fff pd-10 flex ai-c flex-b">
			<view class="">共{{goods.length}}件，合计 <text class="color-r fw">￥{{total}}</text></view>
			<view class="buybtn" style="width: 250rpx;" @click="buy">去付款</view>
		</view>
		<!-- 商品弹出层 -->
		<cc-popup :show.sync="show" mode="bottom" height='900' closeable round>
			<view class="pd-20">
				<view class="hd">
					<view class="f16 ta-c">商品清单</view>
					<view class="color-a0a0 ta-c">共{{goods.length}}件</view>
				</view>
				<!-- 商品 -->
				<scroll-view scroll-y="true" style="height: 650rpx;">
					<view v-for="(item,index) in goods" :key='index' class="flex mrtb-10">
						<image :src="item.goods.cover" mode="" class="img-160"></image>
						<view class="mrl-10" style="width: 70vw;">
							<view class="flex flex-b">{{item.goods.name}}
								<view class="">￥{{item.goods.presentPrice}}</view>
							</view>
							<view class="flex flex-b">{{item.goods.sku.map(i=>{return i.checked}).join(' ')}}
								<view class="color-a0a0">×{{item.count}}</view>
							</view>
							<view class="color-a0a0 f12">{{item.goods.sku.map(i=>{return i.checked}).join(' ')}}</view>
						</view>
					</view>
				</scroll-view>
				<!-- 确定按钮 -->
				<view class="total last bg-fff pd-10 flex ai-c flex-b" @click="comfirm">
					<view class="buybtn" style="width: 98%;">确定</view>
				</view>
			</view>
		</cc-popup>
		<!-- 键盘 -->
		<cc-password-input :value.sync="show1" @complete="handleComplete" ></cc-password-input>
	</view>

</template>

<script>
	import top from '../../componments/top/top.vue'
	import cloneDeep from 'lodash/cloneDeep'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let addressModule = createNamespacedHelpers('cart')
	let {
		mapState: addressState,
		mapActions: addressActions
	} = addressModule
	export default {
		components: {
			top
		},
		props: {},
		data() {
			return {
				goods: [],
				color: '#f5f5f5',
				name: '',
				total: 0,
				show: false,
				// 地址原生
				AddressHome:null,
				Address: '',
				deatilAddress: '',
				isDefault: false,
				tel: '',
				// 键盘
				show1: false,
				user:null
			}
		},
		methods: {
			...addressActions(['getAppAddress','addOrder']),
			// 点击商品
			look() {
				this.show = true
			},
			// 弹出层点击确认
			comfirm() {
				this.show = false
			},
			// 点击添加地址
			addAddress() {
				uni.navigateTo({
					url: '/pages/address/address'
				})
			},
			// 点击去地址列表
			goAddressList() {
				uni.navigateTo({
					url: '/pages/address/addressList'
				})
			},
			// 点击去付款
			buy() {
				if (this.address.length > 0) {
					this.show1=true
				} else {
					uni.showModal({
						title: '温馨提示',
						content: '请添加收货地址',
						success: () => {
							uni.navigateTo({
								url: '/pages/address/address'
							})
						}
					})
				}
			},
			// 输入完成
			handleComplete(val) {
				console.log(Date.now());
				if(val==='123456'){
					this.addOrder({
						user_id:this.user._id,
						price:this.total,
						address:this.AddressHome.address,
						count:this.goods.length,
						pay_time:Date.now(),
						goods_list:this.goods,
						mobile:this.AddressHome.tel,
					})
				}else {
					uni.showToast({
						title:'密码错误，请重新输入',
						icon:'none'
					})
				}
			},
		},
		mounted() {
			// 商品
			this.goods = uni.getStorageSync('goods')
			this.goods.map(i => {
				this.total += i.count * i.goods.presentPrice
			})
		},
		onLoad(o) {},
		onShow() {
			// 获取地址列表
			let u = uni.getStorageSync('youpin-h5-user')
			if (u) {
				this.user=u
				this.getAppAddress(u._id)
			}
		},
		filters: {},
		computed: {
			...addressState(['address'])
		},
		watch: {
			address(val) {
				let a = uni.getStorageSync('address')
				// 如果本地有
				if (a) {
					this.AddressHome=a
					this.Address = a.address.split(' ').slice(0, a.address.split(' ').length - 1).join('')
					this.deatilAddress = a.address.split(' ').slice(a.address.split(' ').length - 1).join('')
					this.name = a.name
					this.isDefault = a.isDefault
					this.tel = a.tel.slice(0, 3) + '****' + a.tel.slice(7)
				} else {
					// 本地没有，如果请求有值
					if (val) {
						let obj1 = val.find(i=>{return i.isDefault===true})
						if(obj1){
							this.AddressHome = obj1
						}else {
							this.AddressHome=val[0]
						}
						this.Address = this.AddressHome.address.split(' ').slice(0, this.AddressHome.address.split(' ').length - 1).join('')
						this.deatilAddress = this.AddressHome.address.split(' ').slice(this.AddressHome.address.split(' ').length - 1).join('')
						this.name = this.AddressHome.name
						this.isDefault = this.AddressHome.isDefault
						this.tel = this.AddressHome.tel.slice(0, 3) + '****' + this.AddressHome.tel.slice(7)
					}
				}
			}
		},
	}
</script>

<style scoped lang="scss">
	.total {
		height: 100rpx;
	}
</style>
