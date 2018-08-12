import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 0,
		paddleX: 0,
		isLaunch: false
	},
	mutations: {
		increment: state => state.count++,
		decrement: state => state.count--,
		setPaddleX (state, paddleX) {
			state.paddleX = paddleX
		},
		setLaunch (state, isLaunch) {
			state.isLaunch = isLaunch
		}
	},
	getters: {
		getPaddleX: state => state.paddleX
	}
})