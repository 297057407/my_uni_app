<template>
	<view class="my-box">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import setBadge from '@/mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	export default {
		mixins : [setBadge],
		data() {
			return {
				
			}
		},
		computed : {
			...mapState('m_user',['token'])
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F4F4F4;
	}
</style>
