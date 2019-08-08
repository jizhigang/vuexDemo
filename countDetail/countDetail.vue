<template>
	<view>
		<view class="count-style">count={{count}},name={{name}}</view>
		<button @click="jiajia">++</button> 
		<button @click="jianjian">--</button>
		<button @click="changeName">name修改为tony</button>
	</view>
</template>

<script>
	// import {
	// 	mapState
	// } from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			// ...mapState(['global_count'])
			count(){
				return this.$store.state.global_count
			},
			name(){
				return this.$store.state.global_name
			}
		},
		methods: {
			jiajia: function(){
				// this.$store.commit('increment')
				this.$store.dispatch('a')
			},
			jianjian: function(){
				// this.$store.commit('reduction')
				this.$store.dispatch('b')
			},
			changeName: function(){
				// this.$store.commit('setName')
				this.$store.dispatch('d','tony')
			}
		}
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
