<template>
  <view class="bg-fff pd-10">
		<view class="f16 fw">
			人气上新
		</view>
		<view class="flex ai-c flex-b">
			<view class="flex col ai-c flex-c" v-for="(i,s) in news.slice(0,3)" :key="s" :class="s===0?'img1':'img2'" @click="goDetail(i)">
				<image :src="i.cover" mode="" class="img1 radius mrtb-10 h" :class="s===0?'img1':'img2'"></image>
				<view class='name ellipsis-one'>
					{{i.name}}
				</view>
			</view>
		</view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
			news:{
				type:Array,
				required:true
			}
		},
    data() {
      return {}
    },
    methods: {
			goDetail(i){
				// console.log(i);
				uni.navigateTo({
					url:`/pages/detail/detail?id=${i._id}`
				})
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
	.img1 {
		width: 320rpx;
	}
	.img2 {
		width: 180rpx;
	}
	.h {
		height: 180rpx;
	}
	.name {
		width: 160rpx;
	}
</style>
