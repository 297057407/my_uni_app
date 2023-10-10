<template>
	<view class="address-box">
		<view class="address-btn" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" style="border-radius: 0;" @click="chooseAddress">请选择收货地址</button>
		</view>
		<view class="address-detail"  @click="chooseAddress" v-else>
			<view>姓名：{{address.userName}}</view>
			<view>电话：{{address.telNumber}}</view>
			<view>地址：{{add}}</view>
		</view>
		<image src="/static/cart_border@2x.png" class="addrrss-image"></image>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapState('m_user',['address']),			
			...mapGetters('m_user',['add'])
		},
		methods: {
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress() {
				const [err,suc] = await uni.chooseAddress()
				if(err === null && suc.errMsg === "chooseAddress:ok"){
					this.updateAddress(suc)
				}
			}
		}
	}
</script>
<style lang="scss">
	.address-box {
		position: relative;
	
		.address-detail {
			padding: 10rpx 20rpx;
	
			view {
				padding: 5rpx 0;
			}
		}
	
		.addrrss-image {
			width: 100%;
			height: 10rpx;
		}
	}
</style>
