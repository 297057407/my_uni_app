<template>
	<view v-if="detailInfo.goods_name" style="padding-bottom: 50px;">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in detailInfo.pics">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<view class="info-box">
			<view class="price">￥{{ detailInfo.goods_price }}</view>
			<view class="intro">
				<view class="name">{{ detailInfo.goods_name }}</view>
				<view class="star">
					<uni-fav :checked="false" class="favBtn" bg-color="#f8f8f8" bg-color-checked="#eeeeee"
						fg-color="#333333" fg-color-checked="#333333" @click="favClick(3)" />
				</view>
			</view>
			<view class="yf">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="imgInfo"></rich-text>
		<view class="bottom">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex'
	import setBadge from '@/mixins/tabbar-badge.js'
	export default {
		mixins : [setBadge],
		data() {
			return {
				detailInfo: {},
				imgInfo: '',
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.getDetail(options.goods_id)
		},
		computed: {
			...mapGetters('m_cart', ['total'])

		},
		watch: {
			total: {
				handler(newStr){
					const item = this.options.find(x => x.text === '购物车')
					item.info = newStr
				},
				immediate: true
			}
		},
		methods: {
			...mapMutations('m_cart', ['addToCart']),
			async getDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status === 200) {
					this.detailInfo = res.message

					this.imgInfo = this.detailInfo.goods_introduce.replace(/<img /g, '<img style="display: block;"')
						.replace(/webp/g, 'jpg')
				} else uni.$showMsg()
			},
			preview(i) {
				uni.previewImage({
					urls: this.detailInfo.pics.map(v => v.pics_big),
					current: i
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.detailInfo.goods_id,
						goods_name: this.detailInfo.goods_name,
						goods_price: this.detailInfo.goods_price,
						goods_count: 1,
						goods_small_logo: this.detailInfo.goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
				}

			}
		},
	}
</script>

<style lang="scss">
	.bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.info-box {
		padding: 0 20rpx;

		.price {
			color: #C00000;
			font-size: 28rpx;
			margin: 20rpx 0;
		}

		.intro {
			display: flex;
			justify-content: space-between;

			.name {
				font-size: 26rpx;
			}

			.star {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-left: 1px solid #efefef;
			}
		}

		.yf {
			margin: 20rpx 0;
			font-size: 24rpx;
			color: grey;
		}
	}

	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>