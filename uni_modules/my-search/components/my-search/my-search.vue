<template>
	<view class="search-container" :style="{'background-color':bgcolor}" @click="searchHandler">
		<view class="search-box" :style="{'border-radius' : borderRadius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text>搜索</text>
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				
			}
		},
		props : {
			bgcolor : {
				type : String,
				default : "#C00000"
			},
			borderRadius : {
				type : Number,
				default : 18
			}
		},
		methods : {
			//触发自定义函数
			searchHandler(){
				this.$emit('click')
			}
		}
	}
</script>
<style lang="scss">
	.search-container {
		// background-color: #C00000;
		height: 45px;
		padding: 0 10px;
		padding-top: 5px;
		.search-box {
			background-color: #fff;
			height: 72rpx;
			// border-radius: 36rpx;
			width: 100%;
			text-align: center;
			line-height: 72rpx;
			text {
				margin-left: 10rpx;
			}
		}
	}
</style>
