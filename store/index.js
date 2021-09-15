import Vue from "vue"
import Vuex from 'vuex'
import home from './home/index.js'
import search from './search/index.js'
import detail from './detail/index.js'
import categ from './categ/index.js'
import user from './user/index.js'
import cart from './goods/goods.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutation: {
	},
	actions: {

	},
	modules: {
		home,
		search,
		detail,
		categ,
		user,
		cart
	}
})
