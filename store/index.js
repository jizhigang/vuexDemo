import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		global_count: 1,
		global_name:'张三',
		global_arr: [{'name':'张零','score':88},
					{'name':'张一','score':66},
					{'name':'张二','score':44}]
	},
	
	getters:{
		goodStudentNum: (state) => (min,max) => {
			return state.global_arr.filter(todo => todo.score>=min&&todo.score<max).length
		}
	},
	mutations:{
		//global_count自增函数
		increment (state){
			state.global_count++
		},
		//global_count自减函数
		reduction (state){
			state.global_count--
		},
		//给global_count赋值
		setCount (state,num){
			state.global_count=num
		},
		//给global_name赋值
		setName (state,n){
			state.global_name=n
		}
	},
	
	
	actions:{
		a: function(context){
			//处理复杂逻辑
			context.commit('increment');
		},
		b: function(context){
			//处理复杂逻辑
			context.commit('reduction');
		},
		c: function(context,num){
			//处理复杂逻辑
			context.commit('setCount',num);
		},
		d: function(context,n){
			//处理复杂逻辑
			context.commit('setName',n)
		}
	},
})

export default store