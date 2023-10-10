<template>
	<view class="">
		<view class="userTop">
			<image :src="userInfo.avatarUrl" class="avator"></image>
			<text class="nickname">{{userInfo.nickName}}</text>
		</view>
		<view class="pannelList">
			<view class="pannel pannel1">
				<view class="pannel1Item">
					<text>8</text>
					<text>收藏的店铺</text>
				</view>
				<view class="pannel1Item">
					<text>14</text>
					<text>收藏的商品</text>
				</view>
				<view class="pannel1Item">
					<text>18</text>
					<text>关注的商品</text>
				</view>
				<view class="pannel1Item">
					<text>84</text>
					<text>足迹</text>
				</view>
			</view>
			<view class="pannel pannel2">
				<view class="pannel-head">
					我的订单
				</view>
				<view class="pannel-body">
					<view class="body-item">
						<image class="image" src="/static/my-icons/icon1.png"></image>
						<text>待付款</text>
					</view>
					<view class="body-item">
						<image class="image" src="/static/my-icons/icon2.png"></image>
						<text>待发货</text>
					</view>
					<view class="body-item">
						<image class="image" src="/static/my-icons/icon3.png"></image>
						<text>退款/退货</text>
					</view>
					<view class="body-item">
						<image class="image" src="/static/my-icons/icon4.png"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="pannel pannel3">
				<view class="pannel3item">
					<text>收货地址</text>
					<uni-icons type="right"></uni-icons>
				</view>
				<view class="pannel3item">
					<text>联系客服</text>
					<uni-icons type="right"></uni-icons>
				</view>
				<view class="pannel3item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState('m_user', ['userInfo'])
		},
		methods : {
			...mapMutations('m_user',['updateAddress','updateToken','updateUserInfo']),
			async logout(){
				const [err,suc] = await uni.showModal({
					title: '提示',
					content: '确定退出?'
				}).catch(err => err)
				if(!err && suc.confirm) {
					this.updateAddress({})
					this.updateToken('')
					this.updateUserInfo({})
				}
			}
		}
	}
</script>
<style lang="scss">
	.pannelList {
		padding: 0 10px;
		margin-top: -10px;

		.pannel {
			background-color: #fff;
			// padding: 10px;
			border-radius: 5px;
			margin-bottom: 10px;

			&.pannel1 {
				padding: 10px;
				display: flex;
				justify-content: space-evenly;

				.pannel1Item {
					font-size: 14px;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
			}

			&.pannel2 {
				.pannel-head {
					padding: 10px;
					border-bottom: 1px solid #efefef;
					font-size: 14px;
				}

				.pannel-body {
					display: flex;
					justify-content: space-around;
					
					padding: 10px 0;

					.body-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
					}

					.image {
						width: 60rpx;
						height: 60rpx;
						margin-bottom: 3px;
					}

					text {
						font-size: 12px;
					}
				}
			}
			.pannel3item {
				font-size: 14px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px;
			}
			.pannel3item:nth-child(n+2) {
				border-top: 1px solid #efefef;
			}
		}

		height: 700rpx;
	}

	.userTop {
		width: 100%;
		height: 400rpx;
		background-color: #C00000;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.avator {
			width: 180rpx;
			height: 180rpx;
			border-radius: 50%;
			border: 2px solid #FFF;
			box-shadow: 0 1px 5px black;
			margin-bottom: 20rpx;
		}

		.nickname {
			color: #fff;
			font-weight: bold;
			font-size: 16px;
		}
	}
</style>