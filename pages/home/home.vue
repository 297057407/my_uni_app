<template>
	<view>
		<!-- 搜索 -->
		<view class="search-box">
			<my-search @click="goToSearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id ">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="catitems">
			<image v-for="(item,index) in catitems" :key="index" :src="item.image_src" class="catImg"
				@click="imageNav(item)"></image>
		</view>
		<!-- 楼层数据 -->
		<view class="floorBox">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<image class="floor-head" :src="item.floor_title.image_src"></image>
				<view class="floor-body">
					<navigator :url="item.product_list[0].navigator_url" class="body-left">
						<image mode="widthFix" :src="item.product_list[0].image_src"
							:style="{width:item.product_list[0].image_width + 'rpx'}">
						</image>
					</navigator>
					<view class="body-right">
						<navigator v-for="(v,i) in item.product_list" v-if="i !== 0" :key="i" :url="v.navigator_url">
							<image :src="v.image_src" mode="widthFix" :style="{width : v.image_width + 'rpx'}"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图数据
				swiperList: [],
				//轮播图下面的导航
				catitems: [],
				//楼层数据
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getCatitems()
			this.getFloorList()
		},
		methods: {
			//获取首页轮播图
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get("api/public/v1/home/swiperdata")
				if (res.meta.status === 200) {
					this.swiperList = res.message
				} else uni.$showMsg()
			},
			//获取轮播图下面的导航
			async getCatitems() {
				const {
					data: res
				} = await uni.$http.get("api/public/v1/home/catitems")
				if (res.meta.status === 200) {
					this.catitems = res.message
				} else uni.$showMsg()
			},
			//点击导航跳转页面
			imageNav(item) {
				switch (item.name) {
					case "分类":
						uni.switchTab({
							url: "/pages/cate/cate"
						})
						break;
					default:
						break;
				}
			},
			//获取楼层数据
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get("api/public/v1/home/floordata")
				if (res.meta.status === 200) {
					res.message.forEach(item => {
						item.product_list.forEach(v => {
							v.navigator_url = "/subpkg/goods_list/goods_list?" + v.navigator_url.split(
								"?")[1]
						})
					})
					this.floorList = res.message
				} else uni.$showMsg()
			},
			//跳转到搜索
			goToSearch(){
				uni.navigateTo({
					url: "/subpkg/search/search"
				})
			}
			
		}
	}
</script>

<style lang="scss">
	// 搜索
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.catitems {
		display: flex;
		justify-content: space-around;
		margin: 20rpx 0;

		.catImg {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floorBox {
		padding-top: 10rpx;

		.floor-item {
			.floor-head {
				width: 100%;
				height: 60rpx;
			}

			.floor-body {
				padding: 10rpx;
				display: flex;

				.body-right {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
				}
			}
		}
	}
</style>