import fly from "../../http/api.js"

export default {
	namespaced:true,
	 state:{
		 goods:[],
		 list:[]
	 },
	 mutations:{
		 setGoods(state,data){
			 state.goods=data
		 },
		 setList(state,data){
			 state.list=data
		 }
	 },
	 actions:{
		 // 全部商品
		 async getGoods({commit}){
			 try {
				 let res = await fly.getGoods()
				 if(res.code===200){
					 // console.log(res.data);
					 res.data.unshift({name:'全部商品'})
					 commit('setGoods',res.data)
				 }
			 } catch(err){
				 console.log(err)
			 }
		 },
		 // 搜素商品
		 async search({commit},params){
		 			 try {
		 				 let res = await fly.search(params)
		 				 if(res.code===200){
		 					 // console.log(res.data);
		 					 commit('setList',res.data)
		 				 }
		 			 } catch(err){
		 				 console.log(err)
		 			 }
		 },
		 }

}