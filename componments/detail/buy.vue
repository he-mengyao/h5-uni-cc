<template>
  <view>
    <!-- 规格弹出层 -->
    <cc-popup  mode="bottom" height='700' round :closeable="true">
    	<view class="pd-10 pr">
    		<view class="hd flex ai-c" v-if="detailGoods">
    			<image :src="detailGoods.cover" mode="" class="img-160 mrr-10"></image>
    			<view>
    				<view class="fw f16 color-r">￥{{detailGoods.presentPrice}}</view>
    				<view class="flex">
    					<!-- <view class="mrr-10" v-for="(i,s) in list" :key='s'>
    						<view v-if="i">{{i}}</view>
    					</view> -->
    				</view>
    			</view>
    		</view>
    		<scroll-view scroll-y="true" style="height: 530rpx" v-if="detailGoods">
    			<view class="spec-bd" v-for="(item,index) in detailGoods.spec" :key='index'>
    				<view class="mrtb-10">{{item.name}}</view>
    				<view class="flex wrap ">
    					<view class="spec-item mrr-10 flex ai-c flex-c color-333"
    						v-for="(item1,index1) in item.spec_item1" :key='index1'
    						@click="click(index,index1,item,item1)"
    						:class="{'active':item.showFlag===index1,'bg-eee':item.showFlag!==index1}">
    						{{item1}}
    					</view>
    				</view>
    			</view>
    			<!-- 步进器 -->
    			<view class="flex flex-b ai-c mrtb-10">
    				购买数量
    				<cc-stepper :value.sync="count"></cc-stepper>
    			</view>
    			<!-- 占位 -->
    			<view class="div-80"></view>
    		</scroll-view>
    		<!-- 加入购物车 -->
    		<view class="bottom mr-10 flex overflow flex-c pa">
    			<view class="buy box1 flex ai-c flex-c" @click="add(1)">加入购物车</view>
    			<view class="buy box2 flex ai-c flex-c" @click="add(2)">立即购买</view>
    		</view>
    	</view>
    </cc-popup>
  </view>

</template>

<script>
  export default {
    components: {},
    props: {
			show1:{
				type:Boolean,
				required:true
			},
			goods:{
				type:Object,
				required:true
			}
		},
    data() {
      return {
				show:false,
				detailGoods:null
			}
    },
    methods: {
			// 选择规格
			click(index, index1, item, item1) {
				this.$set(this.detailGoods.sku,index,{name:item,checked:item1})
				item.showFlag = index1
			},
			add(e) {
				this.show1=false
				let user = uni.getStorageSync('youpin-h5-user')
				if (user) {
					let a = uni.getStorageSync('youpin-h5-user')
					if (e === 1) {
						this.addCart({
							user_id:a._id,
							count:this.count,
							goods:this.detailGoods,
							spec:this.detailGoods.sku
						})
					} else {
						// 立即购买
						uni.navigateTo({
							url:`/pages/order/order?goods${this.detailGoods}&count=${this.count}`
						})
					}
				} else {
					this.show = true
					this.show1 = false
				}
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
    watch: {
			show1(val){
				if(val) this.show=val
			},
			show(val){
				if(!val){
					this.$emit('send',val)
				}
			},
			goods(val){
				console.log(val);
				if(val) this.detailGoods=val
			}
		},
  }
</script>

<style scoped lang="scss">

</style>
