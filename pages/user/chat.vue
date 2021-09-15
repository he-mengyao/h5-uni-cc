<template>
  <view class="">
   <!-- 顶部 -->
		 <view class="head-div">
			 <cc-nav-bar leftArrow leftText="小米商城" @clickLeft='clickLeft' >
			 		 		 <template #right>
			 		 		     <view class="boder pdrl-5 " style="border-radius: 20rpx;">店铺</view>
			 		 		   </template>
			 		 </cc-nav-bar>
			 <view class="border-b"></view>
		 </view>
		 <view class="top-div"></view>
	 <!-- 内容 -->
	<view  class="pd-10">
		<view v-for="(item,index) in messageList" :key='index' :id="`chatItem-${index}`">
			<view class="flex flex-l mrtb-10 f16" v-if="item.platform==='h5'"><view class="text2 c">{{item.value}}</view></view>
			<view class="flex flex-r mrtb-10 f16" v-else><view class="text1 c">{{item.value}}</view></view>
		</view>
	</view>
	 <!-- 底部 -->
	 <view class="" style="height: 150rpx;"></view>
	 <view class="last">
		 <view class=" pd-10 flex ai-c flex-a ipt">
		 		 <cc-field :value.sync="value" placeholder="我想问..."></cc-field>
		 		 <image src="../../static/emoji.png" mode="" class="mrrl-10 bao"
				 @click="open"
				 ></image>
		 		 <view class=''>		
		 			<cc-button round type="warning" size='small' class='send' @click='send'>发送</cc-button>
		 			</view>
		 </view>
		 <scroll-view scroll-y="true" style="height: 520rpx;" class=" bg-fff pd-10" v-if="flag">
		 	<view class="flex wrap">
				<view v-for="(item,index) in list" :key="index" class="emoji" @click="click(item)">
					{{item}}
				</view>
			</view>
		 </scroll-view>
	 </view>
  </view>

</template>

<script>
	import emoji from '../../lib/emoji.js'
  export default {
    components: {},
    props: {},
    data() {
      return {
				goods:uni.getStorageSync('chatGoods'),
				flag:false,
				value:'',
				list:[],
				user:uni.getStorageSync('youpin-h5-user').username,
				messageList:[]
			}
    },
    methods: {
			// 打开表情
			open(){
				this.flag=!this.flag
			},
			// 返回
			clickLeft(){
				uni.navigateBack()
			},
			// 点击表情
			click(i){
				this.value+=i
			},
			// 点击发送
			send(){
				this.$socket.emit('event',{
					name:this.user.username,
					value:this.value,
					platform:'app'
				})
				this.value=''
				this.flag=false
			}
		},
    mounted() {
			this.list=emoji
			// 接收
			this.$socket.on('broadcast',val=>{
				this.messageList.push(val)
			})
    },
    onLoad(o) {
    },
    onShow() {

    },
    filters: {},
    computed: {},
    watch: {
			messageList: {				handler(val) {					this.$nextTick(() => {						let top = 0						let length = this.messageList.length						if (length) {							for (let i = 0; i < length; i++) {								let chatItem = uni.createSelectorQuery().in(this).select(`#chatItem-${i}`)									.boundingClientRect(res => {										top += res.height										uni.pageScrollTo({											scrollTop: top,											duration: 0										})									}).exec()							}						}					})				},				deep: true			}
		},
  }
</script>

<style scoped lang="scss">
	.bao {
		height: 50rpx;
		/* #ifdef H5 */
		width: 80rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		width: 60rpx;
		/* #endif */
	}
	.send {
		/* #ifdef H5 */
		width: 150rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		width: 180rpx;
		/* #endif */
	}
	.goods {
		position: fixed;
		bottom: 60px;
		left: 0;
		right: 0;
	}
	.ipt {
		background-color: #f0f0f0;
		height: 150rpx;
	}
.emoji {
	font-size: 30px;
	margin: 10px;
}

.text1 {
    position: relative;
    background-color: #e58039;
    color: #fff;
}

.text1::after {
    position: absolute;
    content: "";
    width: 0px;
    height: 0px;
    border-width: 12px 0 4px 18px;
    border-style: solid;
    border-color: transparent transparent transparent #e58039;
}

.c {
    max-width: 600px;
    word-wrap: break-word;
    padding: 0 10px;
    border-radius: 5px;
}

.text2 {
    position: relative;
    background-color: #fff;
    color: #a0a0a0;
}

.text2::before {
    position: absolute;
    content: "";
    left: -10px;
    width: 0px;
    height: 0px;
    border-width: 10px 16px 4px 0;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
}
</style>
