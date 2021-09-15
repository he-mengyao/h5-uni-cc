import fly from "../../http/api.js"

export default {
	namespaced:true,
	 state:{
		 categ:[],
	 },
	 mutations:{
		 setCateg(state,data){
			 state.categ=data
		 }
	 },
	 actions:{
		 // 全部商品
		 async getCategory({commit}){
			 try {
				 let res = await fly.getCategory()
				 if(res.code===200){
					 // console.log(res.data);
					 res.data.map((i)=>i.title=i.name)
					 commit('setCateg',res.data)
				 }
			 } catch(err){
				 console.log(err)
			 }
		 },
		 }

}