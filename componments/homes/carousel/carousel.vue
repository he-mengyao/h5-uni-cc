<template>
  <view class=" flex flex-c ai-c mr-10">
    <view class="carousel">
    	<cc-swiper :list="list" mode="rect" @click='click'></cc-swiper>
    </view>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
			list:{
				type:Array,
				required:true
			}
		},
    data() {
      return {
			}
    },
    methods: {
			click(item,index){
				console.log(item);
			}
		},
    mounted() {	
    },
    onLoad() {

    },
    onShow() {

    },
    filters: {},
    computed: {
		},
    watch: {},
  }
</script>

<style scoped lang="scss">
	.carousel {
		width: 100%;
		border-radius: 10rpx;
		overflow: hidden;
	}

</style>
