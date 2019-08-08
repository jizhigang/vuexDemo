<template>
	<view class="content">		
		
		<view>
			<view class="count-style">count={{global_count}},name={{global_name}},goodStuNum={{goodStudentNum(60,77)}}</view>
			<button @click="increase">++</button>
			<button @click="reduction">--</button>
			<button @click="setCount">赋值100</button>
			<button @click="setName">那么修改为abc</button>
			<button @click="push">跳转到第二页</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState(['global_count','global_name']),
			...mapGetters(['goodStudentNum']),
			// global_count(){
			// 	return this.$store.state.global_count
			// },
			// global_name(){
			// 	return this.$store.state.global_name
			// }
			// goodStudentNum(){
			// 	return this.$store.getters.goodStudentNum(60,77)
			// },
		},
		onLoad() {
			console.log('加载完成了');
		},
		methods: {
			increase: function(){
				console.log('到这里了');
				// this.$store.commit('increment')
				this.$store.dispatch('a');
			},
			reduction: function(){
				// this.$store.commit('reduction');
				this.$store.dispatch('b')
			},
			setCount: function(){
				// this.$store.commit('setCount',100)
				this.$store.dispatch('c',100)
			},
			setName: function(){
				// this.$store.commit('setName','abc')
				this.$store.dispatch('d','abc')
			},
			push: function(){
				uni.navigateTo({
					url: '../../countDetail/countDetail',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		},
	}
</script>

<style>
	.count-style{
		width: 750upx;
		height: 100upx; 
		text-align: center;
		line-height: 100upx;
		font-size: 40upx; 
		color: #DD524D;
	}

</style>
