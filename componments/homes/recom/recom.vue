<template>
  <view class="mr-10 flex wrap">
    	<image :src="item.url" class="nav" v-for="(item,index) in nav" :key="index"></image>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
			nav:{
				type:Array,
				required:true
			}
		},
    data() {
      return {
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
.nav {
	width: 142rpx;
	height: 142rpx;
}
</style>
