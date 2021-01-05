<template>
	<div class="col-grid">
    	<p class="title" v-if="complited">Выполненные дела: <input type="text" placeholder="Найти" v-model="search"></p>
    	<p class="title" v-else>Список дел: <input type="text" placeholder="Найти" v-model="search"></p>
	    <vue-custom-scrollbar class="list">
	    	<div class="list-element" v-for="todo in displayTodoList()">
	    		<div class="list-element__name">
	    			<span>{{todo.text}}</span>
	    			<span>
	    				<i class="fa fa-pencil-square-o" aria-hidden="true"></i>
	    				<i class="fa fa-times" aria-hidden="true" @click="removeTodo(todo.id)"></i>
	    			</span>
	    		</div>
	    		<p class="list-element__date">
	    			Создано: {{todo.dateCreate}}
	    		</p>
	    		<p class="list-element__date" v-if="complited">
	    			Выполнено: {{todo.dateComplited}}
	    		</p>
	    		<template>
		    		<button @click="changeTodoStatus(todo.id)" class="crm-btn" v-if="complited" >
		    			Обратно в список задач
		    		</button>
		    		<button @click="todoComplited(todo.id)" class="crm-btn" v-else>
		    			Сделано
		    		</button>
	    		</template>
	    	</div>
	    	<div v-if="!todos.length">
	    		<p>Пусто</p>
	    	</div>
	    	<p v-else-if="todos.length && !displayList(todos,search).length">
	    		Ничего не найдено
	    	</p>
	    </vue-custom-scrollbar>
	    <ConfirmAction v-if="modalShow" @confirm="confirmationNotification()" :deleteFunction="removeFunction" @сancel="canselDelete" />
	</div>
</template>

<script>
import moment from 'moment';
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import ConfirmAction from '@/components/Interface/ConfirmAction'
export default{
	name:'todoList',
	props:['complited','todos'],
	components: {
		vueCustomScrollbar,
		ConfirmAction
	},
	methods:{
		todoComplited(id){
			const date = moment(new Date).format('DD.MM.YYYY, HH:mm')
			this.$store.dispatch('changeTodoStatus',{id,date})
		},
		changeTodoStatus(id){
			this.$store.dispatch('changeTodoStatus',{id})
		},
		removeTodo(id){
			this.modalShow = true
			this.removeFunction = ()=> {
				this.removeFunction = this.$store.dispatch('removeTodo',id)
			}
		},
		confirmationNotification(){
			this.modalShow = false
			this.$notify({
			  group: 'foo',
			  type: 'success',
			  text: 'Объект был удалён'
			});				
		},
		canselDelete(){
			this.modalShow = false
			this.removeFunction = null
		},
		displayTodoList(){
			const todoList = this.displayList(this.todos,this.search)
			if(todoList) return todoList.slice().reverse()
			else return []
		}
	},
	data(){
		return{
			modalShow: false,
			removeFunction: null,
			search: ''
		}
	}
}
</script>

<style lang="sass" scoped>
	.list
		height: 80vh
		.list-element
			&__name

</style>