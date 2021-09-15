<template>
    <view>
    	<!-- 顶部 -->
    	<top :background="color">
    		<template #left>
    			<image src="../../static/back.png" class="img-40" mode=""></image>
    		</template>
    		<template #middle>
    			<view class="">会员中心</view>
    		</template>
    	</top>
    	<!-- 内容 -->
    	<view class="text  color-333 f18">请前往小米商城App查看会员福利</view>
			<view class="pdrl-20">
				<view class="pd-20 bg-r cw flex ai-c flex-c f16">立马下载小米商城App</view>
			</view>
    </view>

</template>

<script>
	import top from '../../componments/top/top.vue'
  export default {
    components: {top},
    props: {},
    data() {
      return {
				color:'#eee'
			}
    },
    methods: {},
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
	.text {
		margin:120rpx 0 20rpx 0;
		text-align: center;
		/* #ifndef MP-WEIXIN */
		padding: 80rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 120rpx;
		/* #endif */
	}

</style>
