<template>
	<view class="top" :style="{background:background?background:''}">
		<!-- #ifdef MP-WEIXIN -->
				<view class="div"></view>
		<!-- #endif -->
		<view class="top1" >
			<view class="left" @click="back">
			<slot name="left"></slot>
			</view>
		<view class="middle">
				<slot name="middle"></slot>
		</view>
		<view class="right">
			<slot name="right"></slot>
		</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			background:{
				type:String,
			},
			arrow:{
				type:Boolean
			},
		},
		data() {
			return {}
		},
		methods: {
			back(){
				uni.navigateBack()
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.div {
		height: 40rpx;
	}
	.top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		color: #666;
		z-index: 99999;
	}
	.top1 {
		height: 40px;
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.left {
		position: absolute;
		/* #ifdef MP-WEIXIN */
				top: 70%;
				transform: translateY(-50%);
		/* #endif */
		/* #ifndef MP-WEIXIN */
		top: 50%;
		transform: translateY(-50%);
		/* #endif */
		left: 5%;
	}
	.right {
		position: absolute;
		right: 5%;
		/* #ifdef MP-WEIXIN */
				top: 70%;
				transform: translateY(-50%);
		/* #endif */
		/* #ifndef MP-WEIXIN */
		top: 50%;
		transform: translateY(-50%);
		/* #endif */
	}
</style>
