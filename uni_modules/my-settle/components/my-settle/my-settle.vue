<template>

	<view class="settle-container">
		<label class="radio" @click="checkAllitem">
			<radio color="#C00000" :checked="checkAll" /><text>全选</text>
		</label>
		<view>
			合计:<text class="price">￥{{allPrice}}</text>
		</view>
		<view class="deal" @click="dealHandler">
			<text>结算({{allCount}})</text>
		</view>
	</view>
</template>
<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		data(){
			return {
				second : 3,
				timer : null
			}
		},
		computed: {
			...mapState('m_user',['address','token','backInfo']),
			...mapGetters('m_cart',['checkAll','allPrice','allCount'])
		},
		methods : {
			...mapMutations('m_cart',['checkOrNot']),
			...mapMutations('m_user',['updateBackInfo']),
			checkAllitem(){
				this.checkOrNot(!this.checkAll)
			},
			dealHandler(){
				if(!this.allCount){
					uni.$showMsg("请选择需要结算的商品")
				}else if(JSON.stringify(this.address) === '{}'){
					uni.$showMsg("请先选择地址")
				}else if(!this.token){
					this.showGoToMsg()
					this.timer = setInterval(()=>{
						if(this.second >0){
							this.second--
							this.showGoToMsg()
						}else {
							this.second = 3
							clearInterval(this.timer)
							this.updateBackInfo({
								openType : 'switchTab',
								backUrl : '/pages/cart/cart'
							})
							uni.switchTab({
								url: '/pages/my/my'
							})
						}
					},1000)
				}
			},
			showGoToMsg(){
				uni.showToast({
					mask:true,
					icon: 'none',
					title: '请先登录! ' + this.second + '秒后跳转到登录页面',
					duration: 1500
				})
			}
		}
	}
</script>
<style lang="scss">
.settle-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	font-size: 18px;
	.radio {
		display: flex;
		align-items: center;
	}
	.price {
		color: #C00000;
		font-weight: bold;
	}
	.deal {
		background-color: #C00000;
		color: white;
		height: 100rpx;
		min-width: 200rpx;
		line-height: 100rpx;
		text-align: center;
	}
}
</style>