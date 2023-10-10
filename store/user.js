export default {
	namespaced :true,
	
	state : () => ({
		address : JSON.parse(uni.getStorageSync('address') || '{}') ,
		token : uni.getStorageSync('token') || '',
		userInfo : JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		backInfo : null
	}),
	mutations : {
		updateAddress(state,address){
			state.address = address
			this.commit('m_user/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		updateToken(state,token){
			state.token = token
			this.commit("m_user/saveToken")
		},
		saveToken(state){
			uni.setStorageSync('token',state.token)
		},
		updateUserInfo(state,userInfo){
			state.userInfo = userInfo
			this.commit("m_user/saveUserInfo")
		},
		saveUserInfo(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		} ,
		updateBackInfo(state,info){
			state.backInfo = info
		}
	},
	getters : {
		add(state){
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}