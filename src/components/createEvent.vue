<template>
	<div class="col-3 col-sm-12">
		<div class="col-grid">
			<form @submit.prevent="createEvent">
				<p class="title">Добавить событие</p>
				<select v-model="isIncome">
					<option :value="true">
						Доход
					</option>				
					<option :value="false">
						Расход
					</option>
				</select>
				<input type="text" v-model="name" :placeholder=" 'Например: ' + randomPlaceholder(false)">
				<input type="text" v-model="value" placeholder="500">
				<select v-model="type" v-if="!isIncome">
					<option :value="null" disabled>Выбери тип</option>
					<option v-for="(type,i) in typesConsumption" :value="type" :selected="!i">
						{{formattingTypeName(type,namesOfTypes)}}
					</option>
				</select>
				<button type="submit">
					Добавить
				</button>				
			</form>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
export default{
	name:'createEvent',
	computed:{
	    ...mapGetters([
	      'typesConsumption',
	      'namesOfTypes',
	      'randomMoments',
	    ])
	},
	data(){
		return{
			name:null,
			value:null,
			date:moment(new Date()).format('DD.MM.YYYY'),
			type:null,
			isIncome:true,
		}
	},
	methods:{
		randomPlaceholder(){
			const rand = Math.floor(Math.random() * Math.floor(this.randomMoments.length));
			return this.randomMoments[rand]
		},
		createEvent(){
			console.log(isNaN(this.value / 1))
			if(!this.isIncome && !this.type) {
				this.notifyForRequiredFields()
				return false					
			}
			if(!this.name || !this.value){
				this.notifyForRequiredFields()
				return false
			}
			if(isNaN(this.value / 1)){
				this.notifyForRequiredFields('Значением может быть только число')
				return false
			}
			if(isNaN(this.value / 1)){
				this.notifyForRequiredFields('Значением может быть только число')
				return false
			}

			if(this.isIncome) this.type = null
			const event = {
				name:this.name,
				value:+this.value,
				date:this.date,
				type:this.type,
				isIncome:this.isIncome ? true : false 
			}
			this.$store.dispatch('createEvent',event).then(()=> {
				this.name = null
				this.value = null
				this.date = moment(new Date()).format('DD.MM.YYYY')
				this.type = null
				this.isIncome = true
			})
		},
		notifyForRequiredFields(err){
			this.$notify({
			  group: 'foo',
			  title: 'Ошибка',
			  type:'error',
			  text: err || 'Заполни все поля'
			});
		}
	},
	mounted(){

	}
}	
</script>

<style lang="sass">
	
</style>