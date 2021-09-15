<template>
	<view class="bg-f0f0 h-100">
		<!-- 顶部 -->
		<view class="head-div">
			<cc-nav-bar leftArrow @clickLeft='clickLeft'>
				<template #default>
					<view class="f16 color-333">
						评价
					</view>
				</template>
			</cc-nav-bar>
		</view>
		<!-- 内容 -->
		<view class="bg-fff radius mr-10 pd-10" v-if="Object.keys(order).length>0">
			<!-- 产品列表 -->
			<view class="flex mrtb-10">
				<image :src="order.goods.cover" mode="" class="img-80 mrr-10"></image>
				<view class="">
					<view class="ellipsis-one">{{order.goods.name}}</view>
					<view class="color-a0a0 flex flex-b" style="width: 70vw;">
						{{order.spec.map(i=>{return i.checked}).join(' ')}}
						<text>￥{{order.goods.presentPrice}}</text>
					</view>
				</view>
			</view>
			<!-- 评分 -->
			<view class="flex flex-c">
				<cc-rate :value.sync="rate"></cc-rate>
			</view>
			<!-- 上传图片 -->
			<cc-upload :action="action" @uplpadSuccess="uplpadSuccess" :header='header'></cc-upload>
			<!-- 文本域 -->
			<cc-field :maxlength="200" :value.sync="content" type="textarea" rows="4" :border='false'></cc-field>
			<!-- 匿名 -->
			<cc-checkbox @change="handleChange" :checked.sync="check" :option="{label: '匿名'}"></cc-checkbox>
			<!-- 发表 -->
			<cc-button type="warning" size='mini' style='margin: 10px 0;' @click='comfirm'>发表</cc-button>
		</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let orderModule = createNamespacedHelpers('cart')
	let {	
		mapState: orderState,
		mapActions: orderActions
	} = orderModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				order: {},
				rate: 0,
				action: 'http://localhost:7001/app/upload',
				header: {
					Authorization: uni.getStorageSync('youpin-h5-token')
				},
				pic: null,
				content: '',
				check: false
			}
		},
		methods: {
			...orderActions(['createComment']),
			uplpadSuccess(data) {
				console.log( data)
				if (data.statusCode === 200) {
					this.pic = data.data
				} else {
					uni.showToast({
						title: '图片上传失败',
						icon: 'none'
					});
				}
			},
			clickLeft(){
				uni.navigateBack()
			},
			// 点击匿名
			handleChange(e) {
				this.check = e
			},
			// 点击发表
			comfirm() {
				this.createComment({
					user_id:uni.getStorageSync('youpin-h5-user')._id,
					goods_id:this.order._id,
					order_id:this.order.order_id,
					rate:this.rate,
					content:this.content,
					pic:this.pic,
					isAnonymous:this.check,
					comment_time:Date.now()
				})
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.order = uni.getStorageSync('item')
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">

</style>
