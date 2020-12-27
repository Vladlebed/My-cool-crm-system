<template>
	<div class="col-6 col-md-12">
		<div class="col-grid col-grid--auto-height">
			<p class="title">Создать задание</p>
			<form @submit.prevent="addTodo">
				<input type="text" v-model="text" placeholder="Что-то сделать">
				<button type="submit" class="crm-btn">Создать задание</button>
			</form>
		</div>
		
	</div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
export default{
	name:"createTodo",
	components:{
		
	},
	computed:{
	    ...mapGetters([
	      'Categories',
	      'randomMoments'
	    ])
	},
	data(){
		return {
			text: '',
			date: this.setTime(),
		}
	},
	methods:{
		setTime(){
			return moment(new Date).format('DD.MM.YYYY, HH:mm')
		},
		addTodo(){
			if(!this.text || this.text.length < 6 || !this.text.trim()){
				this.$notify({
				  group: 'foo',
				  title: 'Ошибка',
				  type:'error',
				  text: 'Поле не заполено'
				});
				return			
			}
			const todo = {text:this.text,dateCreate:this.date,complited:false}
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