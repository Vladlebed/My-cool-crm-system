<template>
	<div class="Todo">
	    <div class="row">
	        <div class="col-4 col-md-6 col-sm-12">
	            <div class="col-grid">
	                <TodoList :complited="false" :todos="displayTodo(false)"/>
	            </div>
	        </div>
	        <CreateTodo /> 
	        <div class="col-4 col-md-6 col-sm-12">
	            <div class="col-grid">
	                <TodoList :complited="true" :todos="displayTodo(true)"/>
	            </div>
	        </div>
	    </div>	
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoList from '@/components/Todo/TodoList'
import CreateTodo from '@/components/Todo/CreateTodo'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
	name: 'Todo',
	components: {
		CreateTodo,
		TodoList,
		vueCustomScrollbar
	},
	computed:{
	    ...mapGetters([
	      'todoList',
	    ])
	},
	data(){
		return{
			isLoad: false
		}
	},
	methods:{
		displayTodo(isComplite){
			if(!this.todoList.length) return false
			if(isComplite){
				return this.todoList.filter(el => {
					if(el.complited) return true
				})
			} else {
				return this.todoList.filter(el => {
					if(!el.complited) return true
				})				
			}
		},
	},
	async created(){
		await this.$store.dispatch('getTodos')
		this.isLoad = true
	},
	mounted(){
		// console.log(this.summary('food'))
	}
}
</script>

<style lang="sass">
	
</style>