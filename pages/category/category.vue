<template>
	<view>
		<view class="top">
			<!-- 占位符 -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="div"> </view>
			<!-- #endif -->
			<!-- 搜索 -->
			<view class="" @click="search">
				<cc-search :value.sync="value" round placeholder='搜索商品' class="search" :show-action="false"></cc-search>
			</view>
		</view>
		<!-- 内容 -->
		<view class="bd flex">
			<!-- 侧边导航 -->
			<view class="scroll_box" style="width: 200rpx;">
				<scroll-view scroll-y="true" style="height: 83vh;">
					<cc-sidebar :list="categ" @change='change'></cc-sidebar>
				</scroll-view>
			</view>
			<!-- 右边 -->
			<view class=" pdrl-20 w-100">
				<image src="../../static/1.jpeg" mode="" class="img radius"></image>
				<!-- 二级导航 -->
				<view class="scroll_box mrtb-10">
					<scroll-view scroll-x="true">
						<view class="flex" v-if="categ[index]">
							<view class="mrr-10" v-for="(i,s) in categ[index].list" :key='s'
								:class="{'bg-eee':s===current}" @click="clickNav(i,s)">
								{{i.name}}
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- 详情 -->
				<scroll-view scroll-y="true" style="height: 60vh;width: 100%;" v-if="categ[index]"
					:scroll-into-view="id">
					<view class="" v-for="(i,s) in categ[index].list" :key='s' :id='"qufen"+s'>
						<view class="f14 fw mrtb-10">{{i.name}}</view>
						<view class="" v-if="i.list">
							<view class="" v-for="(j,q) in i.list" :key='q'>
								<view class="" v-for="(item1,index1) in Object.values(j)" :key='index1'>
									<view class="bg-eee mrtb-10 pd-10 flex radius-5" v-for="(item2,index2) in item1"
										:key='index2' @click="goDetail(item2)">
										<image :src="item2.cover" mode="" class="img-80 mrr-10"></image>
										<view class="">
											<view class="f14">{{item2.name}}</view>
											<view class="color-333">￥{{item2.presentPrice}}起</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
	</view>

</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex'
	let categModule = createNamespacedHelpers('categ')
	let {
		mapState: categState,
		mapActions: categActions
	} = categModule
	export default {
		components: {},
		props: {},
		data() {
			return {
				value: '',
				// 二级分类区分
				current: 0,
				index: 0,
				id: ''
			}
		},
		methods: {
			...categActions(['getCategory']),
			// 点击搜索
			search() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			// 点击二级分类
			clickNav(i, s) {
				this.current = s
				this.id = `qufen${s}`
			},
			// 点击左边导航
			change(item) {
				// console.log(item);
				this.index = item.index
				this.current = 0
			},
			// 点击商品
			goDetail(item2){
				uni.navigateTo({
					url:`/pages/detail/detail?id=${item2._id}`
				})
			}
		},
		mounted() {
			this.getCategory()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			...categState(['categ'])
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
		background-color: #FFFFFF;
	}

	.search {
		/* #ifdef MP-WEIXIN */
		width: 550rpx;
		position: fixed;
		top: 20rpx;
		right: 200rpx;
		/* #endif */
	}

	.bd {
		/* #ifdef MP-WEIXIN */
		padding-top: 140rpx;
		/* #endif */
		/* #ifndef MP-WEIXIN */
		padding-top: 110rpx;

		/* #endif */
		.img {
			width: 100%;
			height: 260rpx;
		}
	}

	.carousel {
		position: fixed;
		/* #ifdef MP-WEIXIN */
		top: 140rpx;
		/* #endif */
		/* #ifndef MP-WEIXIN */
		top: 110rpx;
		right: 20px;
		/* #endif */
	}

	.div-carousel {
		height: 200rpx;
	}
</style>
