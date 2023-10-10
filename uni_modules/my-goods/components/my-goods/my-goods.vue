<template>
	<view class="list-item">
		<view class="item-left">
			<radio v-if="showRadio" :checked="goods.goods_state" @click="emitChangeState" color="#C00000" />
			<image :src="goods.goods_small_logo || defaultImg" @click="goDetail(goods)"></image>
		</view>
		<view class="item-right">
			<view class="right-top" @click="goDetail(goods)">{{goods.goods_name}}</view>
			<view class="right-bottom">
				<text>￥{{goods.goods_price | toFixed}}</text>
				<uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="emitChangeNum"></uni-number-box>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				defaultImg: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			goDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			},
			emitChangeState(){
				this.$emit("changeState",{
					goods_id : this.goods.goods_id,
					goods_state : !this.goods.goods_state
				})
			},
			emitChangeNum(val){
				this.$emit("changeNum",{
					goods_id : this.goods.goods_id,
					goods_count : +val
				})
			}
		}

	}
</script>

<style lang="scss">
	.list-item {
		display: flex;
		border-bottom: 2px solid #cccccc;
		width: 100%;
		height: 260rpx;
		padding: 10rpx 0;
		.item-left {
			width: 300rpx;
			line-height: 300rpx;
			margin-right: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 300rpx;
				height: 100%;
			}
		}

		.item-right {
			padding-right: 10rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.right-top {
				font-size: 13px;
			}

			.right-bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				text {
					font-size: 16px;
					color: #C00000;
				}
			}
		}
	}
</style>