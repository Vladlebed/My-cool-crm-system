<template>
	<div>
		<form @submit.prevent="createEvent">
			<p class="title">Добавить событие</p>
			<select v-model="isIncome">
				<option :value="true">
					Доход
				</option>				
				<option :value="false">
					Расход
				</option>				
				<option :value="'debt'">
					Долг
				</option>				
				<option :value="'debtRefund'">
					Возврат долга
				</option>
			</select>
			<input type="text" v-model="name" placeholder="Кто мне должен / Кому я должен" v-if="isIncome === 'debt'">
			<input type="text" v-model="name" placeholder="Кто мне вернул / Кому я вернул" v-if="isIncome === 'debtRefund'">
			<input type="text" v-model="text" placeholder="Описание">
			<input type="text" v-model.number="value" placeholder="Сумма">
			<select v-model="type" v-if="!isIncome || isIncome === 'debt' || isIncome === 'debtRefund'">
				<option :value="null" disabled>Выбери категорию</option>

				<template v-if="isIncome != 'debt' && isIncome != 'debtRefund'">
					<option v-for="(type,i) in categories" :value="type.translite" :selected="!i">
						{{type.name + type.icon}}
					</option>
				</template>

				<template v-else>
					<option :value="true">
						Мне должны / Мне вернули
					</option>
					<option :value="false">
						Я должен / Я вернул
					</option>
				</template>

			</select>
			<button type="submit" class="crm-btn">
				Добавить
			</button>				
		</form>		
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import { transliterate as tr, slugify } from 'transliteration';
export default{
	name:'createEvent',
	props:['month'],
	computed:{
	    ...mapGetters([
	      'categories',
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
			text: null
		}
	},
	methods:{
		randomPlaceholder(){
			const rand = Math.floor(Math.random() * Math.floor(this.randomMoments.length));
			return this.randomMoments[rand]
		},
		createEvent(){
			console.log('Create start')
			if(!this.isIncome && !this.type) {
				this.notifyForRequiredFields()
				return false					
			}
			if(!this.text || !this.value){
				this.notifyForRequiredFields()
				return false
			}
			if(isNaN(this.value / 1)){
				this.notifyForRequiredFields('Значением может быть только число')
				return false
			}
			if(this.isIncome) {
				if(this.isIncome === 'debt'){
					const event = {
						me: this.type,
						name: this.name,
						description: this.text,
						value: this.value,
						date: moment(new Date()).format('DD.MM.YYYY'),
						complited: false
					}
					console.log(event)
					this.$store.dispatch('addDebts',event)
					.then(()=> {
						this.name = null
						this.value = null
						this.text = null
						this.date = moment(new Date()).format('DD.MM.YYYY')
						this.isIncome = true
					})
				}
				if(this.isIncome === "debtRefund"){
					const event = {
						me: this.type,
						name: this.name,
						description: this.text,
						value: this.value,
						date: moment(new Date()).format('DD.MM.YYYY'),
						complited: false
					}
					console.log(event)
					this.$store.dispatch('addDebtsIcnome',event)
					.then(()=> {
						this.name = null
						this.value = null
						this.text = null
						this.date = moment(new Date()).format('DD.MM.YYYY')
						this.isIncome = true
					})
				} else {	
					const event = {
						body: {
							name: this.text,
							value: +this.value,
							date: this.date,
							type: null,
							uid: null,
							isIncome: this.isIncome ? true : false
						},
						month: moment(new Date()).format('MM-YYYY')
					}
					this.$store.dispatch('createEvent',event)
					.then(()=> {
						this.name = null
						this.value = null
						this.date = moment(new Date()).format('DD.MM.YYYY')
						this.isIncome = true
					})
				}
			} 
			else{
				const event = {
					body: {
						name: this.text,
						value: +this.value,
						date: this.date,
						type: this.type,
						uid: null,
						isIncome: this.isIncome ? true : false						
					},
					month: moment(new Date()).format('MM-YYYY')
				}
				this.$store.dispatch('createEvent',event)
				.then(()=> {
					this.name = null
					this.value = null
					this.date = moment(new Date()).format('DD.MM.YYYY')
					this.isIncome = true
				})
			}
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

	},
	watch:{
		isIncome: function (argument) {
			console.log('isIncome:',this.isIncome)
		}
	}
}	
</script>

<style lang="sass">
	
</style>