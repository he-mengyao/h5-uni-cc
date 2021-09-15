<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./styles/base.scss";
	@import './static/iconfont/iconfont.css';
	uni-page-body {
		height: 100%;
	}
	svg {
		width: 117px;
		height: 40px;
	}
	::-webkit-scrollbar{display:none; width:0; height: 0;}
</style>
