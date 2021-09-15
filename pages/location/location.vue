<template>
	<view>
		<!-- 顶部 -->
		<top :background="color">
			<template #left>
				<image src="../../static/back.png" mode="" class="img-40"></image>
			</template>
			<template #middle>
				<view class="flex">选择城市</view>
			</template>
		</top>
		<view class="top-div"></view>
		<!-- 搜索 -->
		<cc-sticky :offset-top="70">
		<view class=" search bg-fff" style="height: 100rpx;">
			<cc-search :value.sync="value" :show-action="false" placeholder='请输入城市名称或拼音查询' @input='input'></cc-search>
		</view>
		</cc-sticky>
		<!-- 地址 -->
		<view class="" v-if="!value">
			<cc-index-bar class='mr-10' v-if="area.length>0">
				<view v-for="(item, index) in indexList" :key="index">
					<cc-index-anchor :index="item" class='color-a0a0 f16'></cc-index-anchor>
					<view class="list-item" v-for="(item1,index1) in area.filter(i=>{return i.py_head===item})"
						:key='index1'>
						<view class="mrtb-10 f14 color-333" v-for="(item2,index2) in item1.name_list" :key='index2' @click="click(item2)">{{item2.name}}</view>
					</view>
				</view>
			</cc-index-bar>
		</view>
		<!-- 搜索列表 -->
	<view class="f14" v-if="value">
		<view class="color-a0a0 pd-10 border-b" v-if="citys.length>0">搜索结果</view>
		<view class=" color-333 pd-10" v-for="(item,index) in citys" :key='index' @click="click(item)">{{item.name}}</view>
		<view class="color-a0a0  flex flex-c" style="margin-top: 200rpx;">暂无搜索数据</view>
	</view>
	</view>

</template>

<script>
	import top from '../../componments/top/top.vue'
	import {
		createNamespacedHelpers
	} from 'vuex'
	let detailModule = createNamespacedHelpers('detail')
	let {
		mapState: detailState,
		mapActions: detailActions
	} = detailModule
	export default {
		components: {
			top
		},
		props: {},
		data() {
			return {
				color: '#eee',
				value: '',
				indexList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
					'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				],
				citys:[]
			}
		},
		methods: {
			...detailActions(['getAreaList','searchAreaList']),
			input() {
				this.searchAreaList(this.value)
			},
			// 点击城市
			click(item2){
				uni.navigateTo({
					url:`/pages/location/detailLocation?city=${JSON.stringify(item2)}`
				})
				this.value=''
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.getAreaList()
		},
		filters: {},
		computed: {
			...detailState(['area','city'])
		},
		watch: {
			city(val) {
				if (val) {
					this.citys=val
				}
			}
		},
	}
</script>

<style scoped lang="scss">

</style>
