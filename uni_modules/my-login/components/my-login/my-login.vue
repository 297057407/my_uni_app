<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100"></uni-icons>
		<button type="primary" class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<text>登陆后尽享更多权益</text>
	</view>
</template>
<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		computed : {
			...mapState('m_user',['backInfo'])
		},
		methods: {
			...mapMutations('m_user',['updateToken','updateUserInfo','updateBackInfo']),
			getUserInfo(e) {
				if (e.detail.errMsg !== 'getUserInfo:ok') return uni.$showMsg("您取消了用户信息授权!")
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			async getToken(info) {
				const [err, suc] = await uni.login()
				if (err || suc.errMsg !== "login:ok") return uni.$showMsg("登陆失败!")
				const query = {
					code: suc.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData:info.rawData,
					signature: info.signature
				}
				const res = await uni.$http.post('api/public/v1/users/wxlogin', query)
				this.updateToken('xujiadeToken')
				this.goBack()
			},
			goBack(){
				if(this.backInfo && this.backInfo.openType === 'switchTab'){
					uni.switchTab({
						url: this.backInfo.backUrl,
						complete :() => {
							this.updateBackInfo(null)
						}
					})
				}
			}

		}
	}
</script>
<style lang="scss">
	.login-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 750rpx;
		position: relative;
		overflow: hidden;

		.login-btn {
			width: 90%;
			margin: 40rpx 0;
			border-radius: 100rpx;
			background-color: #C00000;
		}

		&::after {
			content: '';
			width: 100%;
			height: 100rpx;
			background-color: #f5f5f5;
			position: absolute;
			bottom: 0;
			transform: translateY(50%);
			border-radius: 100%;
		}
	}
</style>