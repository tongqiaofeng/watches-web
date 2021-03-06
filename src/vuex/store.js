import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		baseUrl: 'http://192.168.0.164:8082/app/WatchEx/api',
		// baseUrl: 'http://192.168.1.3/app/WatchEx/api',
		// baseUrl: 'http://192.168.0.233:9000/app/WatchEx/api',
		// baseUrl: 'http://test.wistechx.cn:9000/app/WatchEx/api',
		// baseUrl: 'http://hk.wistechx.cn:8084/app/WatchEx/api',
		isLogin: false,
		token: null,
		nick: '', //用户昵称

		imgUrl: '',
		productsList: '',
		allowBack: false
	},
	mutations: {
		// 更改用户状态信息
		// userStatus(state, token) {
		// 	if (token) {
		// 		state.isLogin = true;
		// 	} else if (token == null) {
		// 		// 退出登录的时候清空sessionStorage里的内容
		// 		sessionStorage.setItem('token', '');
		// 		sessionStorage.setItem('nick', '');
		// 		state.isLogin = false;
		// 		state.token = '';
		// 	}
		// },

		userToken(state, token) {
			if (token) {
				state.token = token;
			} else {
				state.token = null;
			}
		},

		nick(state, nick) {
			if (nick) {
				state.nick = nick;
			} else {
				state.nick = '';
			}
		},
		allowBack(state, allowBack) {
			state.allowBack = false;
		},

	},
	actions: {
		// 应用mutations
		setToken({
			commit
		}, token) {
			commit('userToken', token)
		},

		setNick({
			commit
		}, nick) {
			commit('nick', nick)
		},

		updateAppSetting({
			commit
		}, allowBack) {
			commit('allowBack', false)
		},
	},
	modules: {}
});