<template>
	<view class="bg-eee h-100">
		<!-- 未登录 -->
		<view class="box" v-if="!user" style="height: 80vh;">
			<view class="">
				<image src="../../static/logo1.png" mode="" class="img-96"></image>
			</view>
			<view class="fw f18 mrtb-10">小米商城</view>
			<view class="color-a0a0  f14">让每个人都能享受科技的乐趣</view>
			<view class="pdrl-20 mrtb-20" style="width: 90vw;">
				<cc-button round type="success" block @click='login'>去登录</cc-button>
			</view>
		</view>
		<!-- 已登录 -->
		<view class="" v-if="user">
			<!-- 购物车为空 -->
			<view class="box empty" v-if="cart1.length===0">
				<image src="../../static/cart1.png" mode="" class="img-130"></image>
				<view class="f20 fw color-333 mrtb-20">购物车还是空的</view>
				<view class="w-100 pdrl-20 mrtb-10">
					<cc-button type="warning" block @click="goHome">到小米商城逛逛</cc-button>
				</view>
			</view>
			<!-- 购物车有商品 -->
			<view class="bg-eee have" v-if="cart1.length>0">
				<view class="flex flex-r f14  edit pdrl-10 head" @click="finish">{{flag?'编辑':'完成'}}</view>
				<view class="flex flex-b ai-c pd-10" style="margin-top: 40rpx;">
					<cc-checkbox @change="handleChange" :checked.sync="check1"
						:option="{label:'小米自营',checkedColor: '#ee702e'}"></cc-checkbox>
					<view class="color-a0a0">免运费</view>
				</view>
				<view class="bg-fff radius flex pd-10  mr-10 ai-c" v-for="(item,index) in cart1" :key="index">
					<cc-checkbox @change="checkChange($event,item)" :checked.sync="item.checked"
						:option="{checkedColor: '#ee702e'}"></cc-checkbox>
					<view class="img-160">
						<image :src="item.goods.cover" mode="" class="img-160 radius" @click="goDetail(item)"></image>
					</view>
					<view class="mrl-10">
						<view class="" @click="goDetail(item)">{{item.goods.name}}</view>
						<view class="flex" @click="open(item)" v-if="item.spec.length>0">
							<view class="bg-eee pdrl-10">{{item.spec.map(i=>{return i.checked}).join(' ')}}</view>
							<image src="../../static/bottom.png" mode="" class="del bg-eee"></image>
						</view>
						<view class="flex flex-b ai-c mrtb-10" style="width: 400rpx;">
							<view class="color-r f14">￥{{item.goods.presentPrice}}</view>
							<cc-stepper :value.sync="item.count"  @minus='change($event,item)' @plus='change($event,item)'></cc-stepper>
						</view>
					</view>
				</view>
			</view>
			<!-- 结算定位 -->
			<view class="bottom1 flex flex-b ai-c bg-fff pdrl-10" v-if="cart1.length>0">
				<cc-checkbox @change="handleChange" :checked.sync="check1"
					:option="{label:'全选',checkedColor: '#ee702e'}"></cc-checkbox>
				<view class="flex ai-c" v-if="!flag">
					<view class="mrr-10">合计：<text class="color-r f14">{{total.toFixed(2)}}</text></view>
					<view class="settle flex ai-c flex-c cw f14 box1" @click="add(2)">结算<text
							v-if="num">({{num}})</text></view>
				</view>
				<cc-button v-if='flag' class='settle' size='mini' @click='del'>删除</cc-button>
			</view>
		</view>
		<cc-popup :show.sync="show1" mode="bottom" height='700' round :closeable="true">
			<view class="pd-10 pr">
				<view class="hd flex ai-c" v-if="detailGoods">
					<image :src="detailGoods.goods.cover" mode="" class="img-160 mrr-10"></image>
					<view>
						<view class="fw f16 color-r">￥{{detailGoods.goods.presentPrice}}</view>
						<view class="flex">
							{{detailGoods.spec.map(i=>{return i.checked}).join(' ')}}
						</view>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 530rpx" v-if="detailGoods">
					<view class="spec-bd" v-for="(item,index) in detailGoods.goods.spec" :key='index'>
						<view class="mrtb-10">{{item.name}}</view>
						<view class="flex wrap ">
							<view class="spec-item mrr-10 flex ai-c flex-c color-333 pdrl-10 radius-5"
								v-for="(item1,index1) in item.spec_item1" :key='index1'
								@click="click(index,index1,item,item1)"
								:class="{'active':item.showFlag===index1,'bg-eee':item.showFlag!==index1}">
								{{item1}}
							</view>
						</view>
					</view>
					<!-- 占位 -->
					<view class="div-80"></view>
				</scroll-view>
				<!-- 确认 -->
				<view class="bottom mr-10 flex overflow flex-c pa">
					<view class="buy box1 flex ai-c flex-c f14" @click="add(1,detailGoods)">确定</view>
				</view>
			</view>
		</cc-popup>
	</view>

</template>

<script>
	import cloneDeep from 'lodash/cloneDeep'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let cartModule = createNamespacedHelpers('cart')
	let {
		mapState: cartState,
		mapActions: cartActions
	} = cartModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				user: null,
				flag: false,
				// 全选
				check1: false,
				detailGoods: null,
				show1: false,
				// 列表
				cart1: [],
				user: uni.getStorageSync('youpin-h5-user'),
			}
		},
		methods: {
			...cartActions(['getCart', 'delCart','updateCart']),
			// 去登录
			login() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			// 点击到小米商城逛逛
			goHome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			// 点击商品
			goDetail(item){
				uni.navigateTo({
					url:`/pages/detail/detail?id=${item.goods._id}`
				})
			},
			// 点击完成
			finish() {
				this.flag = !this.flag
			},
			// 全选
			handleChange(e) {
				this.check1 = !this.check1
				this.cart1.map((i) => {
					i.checked = this.check1
				})
			},
			// 单选
			checkChange(e, item) {
				item.checked = e
				this.check1 = this.cart1.every(i => {
					return i.checked === true
				})
			},
			// 打开弹出层
			open(item) {
				this.detailGoods = item
				this.show1 = true
				console.log(item);
			},
			// 选择规格
			click(index, index1, item, item1) {
				this.$set(this.detailGoods.spec, index, {
					name: item,
					checked: item1
				})
				item.showFlag = index1
			},
			// 点击删除
			del() {
				let arr = this.cart1.filter(i => i.checked === true)
				if (arr.length !== 0) {
					uni.showModal({
						content: '确认删除所选商品？',
						success: (res) => {
							if (res.confirm) {
								arr.map(i => {
									this.delCart({
										user_id: this.user._id,
										id: i._id
									})
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: '请先选择须删除的商品',
						icon: 'none'
					})
				}
			},
			// 点击结算和确认购物车
			add(n,item) {
				this.show1=false
				// 修改购物车
				if (n === 1) {
					this.updateCart({
						id:item._id,
						user_id:this.user._id,
						count:item.count, 
					})
				} else if(n===2){ //结算
				let arr =this.cart1.filter(i=>i.checked===true)
				if(arr.length>0){
					uni.navigateTo({
						url:`/pages/order/order`
					})
					uni.setStorageSync('goods',arr)
				}else {
					uni.showToast({
						title:'请先选择需结算的商品',
						icon:'none'
					})
				}
				}
			},
			// 步进器改变
			change(e,item){
				this.updateCart({
					id:item._id,
					user_id:this.user._id,
					count:e, 
				})
			}
		},
		mounted() {
			// console.log(123);
			this.check1=false
		},
		onLoad() {},
		onShow() {
			let a = uni.getStorageSync('youpin-h5-user')
			if (a) {
				this.user = a
				this.getCart(a._id)
			}
		},
		filters: {},
		computed: {
			...cartState(['cart']),
			// 总金额
			total() {
				let sum = 0
				this.cart1.map(i => {
					if (i.checked) {
						let n = i.count * Number(i.goods.presentPrice)
						sum += n
					}
				})
				return sum
			},
			// 总数量
			num(val) {
				return this.cart1.filter(i => i.checked === true).length
			}
		},
		watch: {
			cart(val) {
				this.cart1 = cloneDeep(val)
			},
		},
	}
</script>

<style scoped lang="scss">
	// 顶部定位
	.head {
		position: fixed;
		/* #ifdef MP-WEIXIN */
		top: 0;
		/* #endif */
		/* #ifdef H5 */
		top:88rpx;
		/* #endif */
		left: 0;
		right: 0;
		z-index: 2;
	}

	.empty {
		background-color: #f6f6f6;
		height: 86vh;
	}

	.edit {
		background-color: #f8f8f8;
	}

	.bottom1 {
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef MP-WEIXIN */
		bottom: 0;
		/* #endif */
		/* #ifndef MP-WEIXIN */
		bottom: 100rpx;
		/* #endif */
		height: 100rpx;
	}

	.settle {
		width: 200rpx;
		height: 80rpx;
		border-radius: 40rpx;
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
	}

	.box1 {
		background: linear-gradient(to right, #e97732, #e54f26);
	}

	.buy {
		flex: 1;
	}

	// 有商品的盒子
	.have {
		/* #ifndef MP-WEIXIN */
		padding-bottom: 200rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-bottom: 100rpx;
		/* #endif */
	}
</style>
