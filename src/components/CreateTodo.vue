<template>
	<div class="col-3 col-sm-12">
		<div class="col-grid">
			<p class="title">Создать задание</p>
			<form @submit.prevent="addTodo">
				<input type="text" v-model="text" placeholder="Что-то сделать">
				<button type="submit">Создать задание</button>
			</form>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default{
	name:"createTodo",
	computed:{
	    ...mapGetters([
	      'typesConsumption',
	      'namesOfTypes',
	      'randomMoments',
	      'todoIdCount'
	    ])
	},
	data(){
		return {
			text: '',
			date: this.setTime(),
		}
	},
	methods:{
		generateTodoId(){
			return this.todoIdCount
		},
		setTime(){
			return moment(new Date).format('DD.MM.YYYY, HH:mm')
		},
		addTodo(){
			const todo = {id:this.generateTodoId(),text:this.text,dateCreate:this.date,complited:false}
			this.$store.dispatch('addTodoIdCount')
			this.$store.dispatch('addTodo',todo)
			this.text = ''
		}
	},
	mounted(){

	}
}
</script>

<style lang="sass" scoped="">
	.label
		margin-top: 10px
</style>