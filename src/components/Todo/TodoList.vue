<template>
	<div class="col-grid">
    	<p class="title" v-if="complited">Выполненные дела: <input type="text" placeholder="Найти" v-model="search"></p>
    	<p class="title" v-else>Список дел: <input type="text" placeholder="Найти" v-model="search"></p>
	    <vue-custom-scrollbar class="list">
	    	<div class="list-element" v-for="todo in displayList(todos,search)">
	    		<p class="list-element__name">
	    			{{todo.text}} <i class="fa fa-times" aria-hidden="true"></i>
	    		</p>
	    		<p class="list-element__date">
	    			Создано: {{todo.dateCreate}}
	    		</p>
	    		<p class="list-element__date" v-if="complited">
	    			Выполнено: {{todo.dateComplited}}
	    		</p>
	    		<template>
		    		<button @click="$store.dispatch('changeTodoStatus',{id:todo.id})" class="crm-btn" v-if="complited" >
		    			Обратно в список задач
		    		</button>
		    		<button @click="todoComplited(todo.id)" class="crm-btn" v-else>
		    			Сделано
		    		</button>
	    		</template>
	    	</div>

	    	<div v-if="!todos.length">
	    		<p v-if="complited">Ничо не сделал :(</p>
	    		<p v-else>Дел нету, сижу пержу</p>
	    	</div>
	    	<p v-else-if="todos.length && !displayList(todos,search).length">
	    		Ничего не найдено
	    	</p>
	    </vue-custom-scrollbar>
	</div>
</template>

<script>
import moment from 'moment';
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default{
	name:'todoList',
	props:['complited','todos'],
	components: {
		vueCustomScrollbar
	},
	methods:{
		todoComplited(todoId){
			const dateComplited = moment(new Date).format('DD.MM.YYYY, HH:mm')
			this.$store.dispatch('changeTodoStatus',{id:todoId,date:dateComplited})
		}
	},
	data(){
		return{
			search: ''
		}
	}
}
</script>

<style lang="sass" scoped>
	.list
		height: 80vh
</style>