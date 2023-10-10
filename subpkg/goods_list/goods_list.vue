<template>
	<view>
		<view class="list-container">
			<my-goods v-for="(item,index) in listInfo" :key="index"  :goods="item"></my-goods>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				listInfo: [],
				total: [],
				isLoading : false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getListInfo()
		},
		methods: {
			async getListInfo(cb) {
				this.isLoading = true
				const {data: res} = await uni.$http.get('api/public/v1/goods/search',this.queryObj)
				this.isLoading = false
				if (res.meta.status === 200) {
					this.listInfo = [...this.listInfo,...res.message.goods]
					this.total = res.message.total
				} else uni.$showMsg()
				cb && cb()
			},
		},
		onReachBottom() {
			if(this.isLoading) return
			if(this.queryObj.pagesize * this.queryObj.pagenum >= this.total) {
				uni.$showMsg('没有更多了...')
				return
			}
			this.queryObj.pagenum++
			this.getListInfo()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 0
			this.listInfo = [],
			this.total = [],
			this.isLoading = false
			this.getListInfo(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
</style>