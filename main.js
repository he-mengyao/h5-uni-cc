import Vue from 'vue'
import App from './App'
import ccUI from 'cc-ui-uni-app'
import api from './http/api.js'
import store from './store/index.js'
import utils from './utils/index.js'
import io from '@hyoga/uni-socket.io'; 


Vue.prototype.$store=store
Vue.prototype.$api=api
Vue.prototype.$utils=utils

const socket = io('http://localhost:3000', { 
query: {}, 
transports: [ 'websocket', 'polling' ], 
timeout: 5000, 
}); 
Vue.prototype.$socket= socket

Vue.use(ccUI)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
