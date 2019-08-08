# vuexDemo
vuex简单使用


Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式，本文会介绍怎么使用vuex，比较简单，如果想对vuex有更深入的理解可以去看官方地址
<https://vuex.vuejs.org/zh/>
### 一、创建store
1. 在工程根目录新建文件夹`store`
2. 在store文件夹中新建`index.js`
```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		global_count: 1,
		global_name:'张三'
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
	}
})

export default store
```
3. 在`main.js`挂载store
```
import store from './store'  
Vue.prototype.$store = store 
```


### 二、在`index.vue`中使用(同步)
`index.vue`中代码为
```
<template>
	<view class="content">		
                <!-- 自定义导航栏，使用colurui -->
		<cu-custom bgColor="bg-white solid-bottom">
			<block slot="content">相册</block>
		</cu-custom>
		<view>
			<view class="count-style">count={{global_count}},name={{global_name}}</view>
			<button @click="increase">++</button>
			<button @click="reduction">--</button>
			<button @click="setCount">赋值100</button>
			<button @click="setName">那么修改为abc</button>
			<button @click="push">跳转到第二页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed:{
			global_count(){
				return this.$store.state.global_count
			},
			global_name(){
				return this.$store.state.global_name
			}
		},
		onLoad() {
		},
		methods: {
			increase: function(){
				this.$store.commit('increment')
			},
			reduction: function(){
				this.$store.commit('reduction');
			},
			setCount: function(){
				this.$store.commit('setCount',100)
			},
			setName: function(){
				this.$store.commit('setName','abc')
			},
			push: function(){
				uni.navigateTo({
					url: 'countDetail/countDetail',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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
```

  `countDetail.vue`中代码为
```
<template>
	<view>
		<cu-custom bgColor="bg-white solid-bottom" :isBack="true">
			<block slot="content">第二页</block>
		</cu-custom>
		<view class="count-style">count={{global_count}},name={{global_name}}</view>
		<button @click="jiajia">++</button> 
		<button @click="jianjian">--</button>
		<button @click="changeName">name修改为tony</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed:{
			global_count(){
				return this.$store.state.global_count
			},
			global_name(){
				return this.$store.state.global_name
			}
		},
		methods: {
			jiajia: function(){
				this.$store.commit('increment')
			},
			jianjian: function(){
				this.$store.commit('reduction')
			},
			changeName: function(){
				this.$store.commit('setName')
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
```


![效果图.gif](https://upload-images.jianshu.io/upload_images/3305752-d0b3d90716dd5924.gif?imageMogr2/auto-orient/strip)


### 三、使用`actions`（可以实现异步修改）

Action 类似于 mutation，不同在于：
- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。


一个异步操作的小例子：
```
incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }

```



```
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		global_count: 1,
		global_name:'张三'
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
			//处理异步逻辑
			context.commit('increment');
		},
		b: function(context){
			//处理异步逻辑
			context.commit('reduction');
		},
		c: function(context,num){
			//处理复杂逻辑
			context.commit('setCount',num);
		},
		d: function(context,n){
			//处理异步逻辑
			context.commit('setName',n)
		}
	},
})

export default store
```

`index.vue`代码为
```
<template>
	<view class="content">		
	       <!-- 自定义导航栏，使用colurui -->
		<cu-custom bgColor="bg-white solid-bottom">
			<block slot="content">相册</block>
		</cu-custom>
		<view>
			<view class="count-style">count={{global_count}},name={{global_name}}</view>
			<button @click="increase">++</button>
			<button @click="reduction">--</button>
			<button @click="setCount">赋值100</button>
			<button @click="setName">那么修改为abc</button>
			<button @click="push">跳转到第二页</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed:{
			global_count(){
				return this.$store.state.global_count
			},
			global_name(){
				return this.$store.state.global_name
			}
		},
		onLoad() {
		},
		methods: {
			increase: function(){
				this.$store.dispatch('a');
			},
			reduction: function(){
				this.$store.dispatch('b')
			},
			setCount: function(){
				this.$store.dispatch('c',100)
			},
			setName: function(){
				this.$store.dispatch('d','abc')
			},
			push: function(){
				uni.navigateTo({
					url: 'countDetail/countDetail',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
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

```

`countDetail.vue`代码为
```
<template>
	<view>
		<cu-custom bgColor="bg-white solid-bottom" :isBack="true">
			<block slot="content">第二页</block>
		</cu-custom>
		<view class="count-style">count={{global_count}},name={{global_name}}</view>
		<button @click="jiajia">++</button> 
		<button @click="jianjian">--</button>
		<button @click="changeName">name修改为tony</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			global_count(){
				return this.$store.state.global_count
			},
			global_name(){
				return this.$store.state.global_name
			}
		},
		methods: {
			jiajia: function(){
				this.$store.dispatch('a')
			},
			jianjian: function(){
				this.$store.dispatch('b')
			},
			changeName: function(){
				this.$store.dispatch('d','Tony')
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

```

运行效果同上


### 四、对象展开运算符`mapState`
如果当前页面需要用到多个状态的时候我们需要在计算属性`computed `写多个声明，这回有些冗余，那么我们可以使用对象展开运算符`mapState`
```
<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
			}
		},
		computed:{
			...mapState(['global_count','global_name'])
			// global_count(){
			// 	return this.$store.state.global_count
			// },
			// global_name(){
			// 	return this.$store.state.global_name
			// }
		},
		onLoad() {
		},
		methods: {
			increase: function(){
				this.$store.dispatch('a');
			},
			reduction: function(){
				this.$store.dispatch('b')
			},
			setCount: function(){
				this.$store.dispatch('c',100)
			},
			setName: function(){
				this.$store.dispatch('d','abc')
			},
			push: function(){
				uni.navigateTo({
					url: 'countDetail/countDetail',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	}
</script>
```


### 五、`Getter`
我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：

store中的state
```
	state:{
		global_count: 1,
		global_name:'张三',
		global_arr: [{'name':'张零','score':88},
					{'name':'张一','score':66},
					{'name':'张二','score':44}]
	},
```

我们要筛选出60分以上的学生，那么我们可以在当前页面的计算属性中：
```
computed: {
    goodStudentNum(){
	  return this.$store.state.global_arr.filter(todo=>todo.score>=60).length
    }
}
```

页面渲染
```
		<view>
			<view class="count-style">count={{global_count}},name={{global_name}},goodStuNum={{goodStudentNum}}</view>
			<button @click="increase">++</button>
			<button @click="reduction">--</button>
			<button @click="setCount">赋值100</button>
			<button @click="setName">那么修改为abc</button>
			<button @click="push">跳转到第二页</button>
		</view>
```


![WechatIMG433.png](https://upload-images.jianshu.io/upload_images/3305752-d7f8dbf863d25fc6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果多个页面都需要使用筛选那么就需要写很多次，Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。

```
const store = new Vuex.Store({
  state:{
		global_count: 1,
		global_name:'张三',
		global_arr: [{'name':'张零','score':88},
					{'name':'张一','score':66},
					{'name':'张二','score':44}]
	},
  getters: {
    goodStudentNum: state => {
      return state. global_arr.filter(todo => todo. score>=60).length
    }
  }
})
```

使用
```
computed:{
			...mapState(['global_count','global_name']),
			goodStudentNum(){
				return this.$store.getters.goodStudentNum
			},
		},
```


我们也可以从页面传入参数，例如传入要筛选的最小分数和最大分数
```
	getters:{
		goodStudentNum: (state) => (min,max) => {
			return state.global_arr.filter(todo => todo.score>=min&&todo.score<max).length
		}
	},
```

```
computed:{
			...mapState(['global_count','global_name']),
			goodStudentNum(){
				return this.$store.getters.goodStudentNum(60,77)
			},
		},
```


![WechatIMG434.png](https://upload-images.jianshu.io/upload_images/3305752-3b92e65c5bf3f5cc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



 `Getter`也有辅助函数`mapGetter`
```
		<view>
			<view class="count-style">count={{global_count}},name={{global_name}},goodStuNum={{goodStudentNum(60,77)}}</view>
			<button @click="increase">++</button>
			<button @click="reduction">--</button>
			<button @click="setCount">赋值100</button>
			<button @click="setName">那么修改为abc</button>
			<button @click="push">跳转到第二页</button>
		</view>
```

```
import {
		mapState,
		mapGetters
	} from 'vuex';
```
```
		computed:{
			...mapState(['global_count','global_name']),
			...mapGetters(['goodStudentNum']),
			// goodStudentNum(){
			// 	return this.$store.getters.goodStudentNum(60,77)
			// },
		},
```

如果不使用store的方法，那么可以使用自定义的方法名跟其对应起来
```
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters. goodStudentNum `
  doneCount: 'goodStudentNum'
})
```
