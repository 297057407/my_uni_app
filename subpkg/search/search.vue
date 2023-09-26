<template>
	<view>
		<uni-search-bar v-model="kw"  :cancelButton="none" :radius="100" @confirm="search" @input="input" >搜索</uni-search-bar>
		<view v-show="kw.length" class="suggList" v-for="(item,index) in suggList" :key="index" @click="goToDetail(item)">
			<view class="suggListText">
				{{item.goods_name}}
			</view>
			<uni-icons type="right" size="20"></uni-icons>
		</view>
		
		<view class="history" v-show="!kw.length">
			<view class="history-head">
				<view>
					搜索历史
				</view>
				<uni-icons type="trash" size="20" @click="cleanHistory"></uni-icons>
			</view>
			<view class="history-body">
				<uni-tag v-for="(v,i) in historyList" :key="i" :inverted="true" :text="v" @click="goToList(v)" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer : null,
				kw : '',
				suggList : [],
				historyList : []
			}
		},
		onLoad(){
			this.historyList = JSON.parse(uni.getStorageSync('kw')) || []
		},
		methods: {
			input(){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.getData()
				},500)
			},
			//获取搜索内容
			async getData(){
				if(this.kw !== ''){
					const { data : res } = await uni.$http.get('api/public/v1/goods/qsearch?query=' + this.kw)
					if(res.meta.status === 200){
						this.suggList = res.message
						this.addHistory()
					}else uni.$showMsg()
				}else {
					this.suggList = []
				}
			},
			//跳转到商品详情
			goToDetail(item){
				uni.navigateTo({
					url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
				})
			},
			//处理add搜索历史
			addHistory(){
				this.historyList.unshift(this.kw)
				this.historyList = [...new Set(this.historyList)]
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			//清除历史记录
			cleanHistory() {
				uni.showModal({
					content:'确认清除?',
					success :(res) =>{
						if(res.confirm === true){
							this.historyList = []
							uni.setStorageSync('kw','[]')
						}
						
					}
				})
			},
			//跳转到商品列表
			goToList(item){
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?query=" + item
				})
			}
		}
	}
</script>

<style lang="scss">
.suggList {
	display: flex;
	padding: 30rpx 40rpx;
	border-bottom: 1px solid #efefef;
	justify-content: space-between;
	align-items: center;
	.suggListText {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		
	}
}

.history {
	padding: 0 20rpx;
	.history-head {
		display: flex;
		justify-content: space-between;
		padding: 25rpx 15rpx;
		border-bottom: 1px solid #efefef;
		margin-bottom: 10rpx;
	}
	.history-body {
		.uni-tag {
			margin: 10rpx;
		}
	}
}
</style>
