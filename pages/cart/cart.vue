<template>
	<view >
		<view v-if="cart.length">
			<my-address></my-address>
			<view class="body">
				<uni-swipe-action>
					<uni-swipe-action-item v-for="(goods,i) in cart" :key="i" :right-options="options"
						@click="deleteHandler(goods)">
						<my-goods :show-radio="true" :show-num="true" :goods="goods" @changeNum="changeNum"
							@changeState="changeState"></my-goods>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
			<my-settle></my-settle>
		</view>
		<view v-else class="empty">
			<image src="/static/cart_empty@2x.png" class="cartImg"></image>
			<text class="text">空空如也~</text>
		</view>
	</view>
</template>

<script>
	import setBadge from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations,
	} from 'vuex'
	export default {
		mixins: [setBadge],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		computed: {
			...mapState('m_cart', ['cart'])
		},
		methods: {
			...mapMutations("m_cart", ['updateState', 'updateNum', 'deleteGoods']),
			changeState(e) {
				this.updateState(e)
			},
			changeNum(e) {
				this.updateNum(e)
			},
			deleteHandler(goods) {
				this.deleteGoods(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.head {

		display: flex;
		border: 1px solid #efefef;
		padding: 20rpx;

		text {
			margin-left: 20rpx;
		}
	}
	.empty {
		padding-top: 400rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.cartImg {
			width: 200rpx;
			height: 200rpx;
			margin-bottom: 20rpx;
		}
		.text {
			font-size: 14px;
			color: gray;
		}
	}
</style>