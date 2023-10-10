export default {
	namespaced : true,
	
	state : ()=> ({
		cart : JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	mutations : {
		addToCart(state,goods){
			const findItem = state.cart.find(x=> x.goods_id === goods.goods_id)
			if(!findItem) {
				state.cart.push(goods)
			}else {
				findItem.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateState(state,goods){
			let item = state.cart.find(x => x.goods_id === goods.goods_id)
			if(item){
				item.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		updateNum(state,goods){
			let item = state.cart.find(x => x.goods_id === goods.goods_id)
			if(item) {
				item.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		deleteGoods(state,goods_id){
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		checkOrNot(state,newState){
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},
	getters : {
		total(state) {
			return state.cart.reduce((pre,cur)=>{
				return pre += cur.goods_count
			},0)
		},
		checkAll(state){
			return state.cart.every(x => x.goods_state)
		},
		allPrice(state){
			return state.cart.reduce((pre,cur) => cur.goods_state?pre+=cur.goods_price*cur.goods_count:pre ,0)
		},
		allCount(state){
			return state.cart.reduce((pre,cur)=> cur.goods_state?pre+=cur.goods_count:pre ,0)
		}
	}
}