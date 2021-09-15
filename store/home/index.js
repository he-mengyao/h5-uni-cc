import fly from "../../http/api.js"
import dayjs from 'dayjs'
export default {
	namespaced:true,
	 state:{
		 list:[],
		 nav:[],
		 news:[],
		 recommendNav:[],
		 goods:[],
		 splike:[]
	 },
	 mutations:{
		 setList(state,data){
			 state.list=data
		 },
		 setNav(state,data){
		 			 state.nav=data
		 },
		 setNews(state,data){
			 state.news=data
		 },
		 setRecommendNav(state,data){
		 			 state.recommendNav=data
		 },
		 setGoods(state,data){
			 state.goods=data
		 },
		 setSplike(state,data){
			 state.splike=data
		 }
	 },
	 actions:{
		 // 轮播图
		 async getBanner({commit}){
			 try {
				 let res = await fly.getBanner()
				 if(res.code===200){
					 res.data.map(i=>i.image=i.url)
					 commit('setList',res.data)
				 }
			 } catch(err){
				 console.log(err)
			 }
		 },
		 // 推荐导航
		 async getNav({commit}){
		 			 try {
		 				 let res = await fly.getNav()
		 				 if(res.code===200){
							// console.log(res.data)
		 					 commit('setNav',res.data)
		 				 }
		 			 } catch(err){
		 				 console.log(err)
		 			 }
		 },
		 // 人气上新
		 async getNew({commit}){
		 			 try {
		 				 let res = await fly.getNew()
		 				 if(res.code===200){
		 					 commit('setNews',res.data)
		 				 }
		 			 } catch(err){
		 				 console.log(err)
		 			 }
		 },
		 // 推荐导航
		 async getRecommendNav({commit}){
		 			 try {
		 				 let res = await fly.getRecommendNav()
		 				 if(res.code===200){
		 							// console.log(res.data)
		 					 commit('setRecommendNav',res.data)
		 				 }
		 			 } catch(err){
		 				 console.log(err)
		 			 }
		 },
		 // 商品
		 async getNavGoods({commit},params){
		 			 try {
		 				 let res = await fly.getNavGoods({id:params})
		 				 if(res.code===200){
		 							// console.log(res.data)
		 					 commit('setGoods',res.data)
		 				 }
		 			 } catch(err){
		 				 console.log(err)
		 			 }
		 },
		 // 秒杀
		 async getSeckill({commit}){
		 			 try {
		 				 let res = await fly.getSeckill()
		 				 if(res.code===200){
		 							// console.log(res.data)
								let arr =[]
								let time=dayjs(dayjs().format('YYYY-MM-DD ')+'0:00:00').valueOf()
								let endtime=dayjs(dayjs().format('YYYY-MM-DD ')+'23:59:59').valueOf()
								arr=res.data.filter(i=>{
									return (dayjs(i.start_time).valueOf()>time && dayjs(i.start_time).valueOf()<endtime)
									|| (dayjs(i.end_time).valueOf()>time && dayjs(i.start_time).valueOf()<=time)
								})
								// console.log(arr);
		 					 commit('setSplike',arr)
		 				 }
		 			 } catch(err){
		 				 console.log(err)
		 			 }
		 },
	 },
}