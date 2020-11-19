<template>
	<div class="col-grid">
	    <div class="list">
	    	<p class="title" v-if="complited">Выполненные дела:</p>
	    	<p class="title" v-else>Список предстоящих дел:</p>
	    	<div class="list-element" v-for="todo in todos">
	    		<p class="list-element__name">
	    			{{todo.text}}
	    		</p>
	    		<p class="list-element__date">
	    			Создано: {{todo.dateCreate}}
	    		</p>
	    		<p class="list-element__date" v-if="complited">
	    			Выполнено: {{todo.dateComplited}}
	    		</p>
	    		<template>
		    		<button @click="$store.dispatch('changeTodoStatus',{id:todo.id})" v-if="complited">
		    			Обратно в список задач
		    		</button>
		    		<button @click="todoComplited(todo.id)" v-else>
		    			Сделано
		    		</button>
	    		</template>
	    	</div>

	    	<div v-if="!todos.length">
	    		<p v-if="complited">Ничо не сделал :(</p>
	    		<p v-else>Дел нету, сижу пержу</p>
	    	</div>
	    </div>
	</div>
</template>

<script>
import moment from 'moment';
export default{
	name:'todoList',
	props:['complited','todos'],
	methods:{
		todoComplited(todoId){
			const dateComplited = moment(new Date).format('DD.MM.YYYY, HH:mm')
			this.$store.dispatch('changeTodoStatus',{id:todoId,date:dateComplited})
		}
	}
}
</script>