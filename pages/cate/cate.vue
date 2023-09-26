<template>
	<view>
		<my-search @click="goToSearch"></my-search> 
		<view class="scroll-view-container">
			<scroll-view class="scroll-view-left" scroll-y="true" :style="{height : wh + 'px'}">
				<view v-for="(item,index) in cateList" :key="index" @click="changeIndex(index)"
					:class="['scroll-view-left-item',active === index?'active':'']">{{item.cat_name}}</view>
			</scroll-view>
			<scroll-view class="scroll-view-right" scroll-y="true" :style="{height : wh + 'px'}" :scroll-top="scrollTop">
				<view class="scroll-view-right-item" v-for="(item,index) in level2" :key="index">
					<view class="item-title">
						/{{item.cat_name}}/
					</view>
					<view class="body-container">
						<view class="item-body" v-for="(item2,index2) in item.children" :key="index2" @click="goToGoodsList(item)">
							<image :src="item2.cat_icon">
							</image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				cateList: [],
				level2: [],
				active: 0,
				scrollTop : 0
			};
		},
		onLoad() {
			//获取设备信息
			this.wh = uni.getSystemInfoSync().windowHeight - 50
			//获取左侧数据
			this.getSearchList()
		},
		methods: {
			//获取左侧数据
			async getSearchList() {
				const {
					data: res
				} = await uni.$http.get('api/public/v1/categories')
				if (res.meta.status === 200) {
					this.cateList = res.message
					this.level2 = this.cateList[0].children
				} else uni.$showMsg()

			},
			//改变激活项
			changeIndex(index) {
				this.active = index
				this.level2 = this.cateList[index].children
				this.scrollTop = this.scrollTop?0:1
			},
			//跳转到列表
			goToGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
				})
			},
			// 跳转到搜索
			goToSearch(){
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.scroll-view-left {
			width: 240rpx;
			background-color: #f7f7f7;

			.scroll-view-left-item {
				position: relative;
				line-height: 120rpx;
				text-align: center;
				font-size: 24rpx;

				&.active {
					background-color: #fff;

					&::before {
						content: '';
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
						display: block;
						height: 60rpx;
						width: 6rpx;
						background-color: #C00000;

					}
				}
			}
		}

		.scroll-view-right {
			background-color: #fff;

			.scroll-view-right-item {
				.item-title {
					font-weight: bold;
					text-align: center;
					padding: 30rpx 0;
					font-size: 24rpx;
				}

				.body-container {
					display: flex;
					flex-wrap: wrap;
					.item-body {
						display: flex;
						width: 33%;
						margin-bottom: 20rpx;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						image {
							width: 120rpx;
							height: 120rpx;
						}

						text {
							font-size: 24rpx;
						}
					}
				}
			}

		}
	}
</style>