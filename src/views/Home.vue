<template>
	<div>
	    <div class="row">
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid col-grid--auto-height">
	                <p class="title">Мой карман: {{moneyFormatting(money)}}</p>
	            </div>
	            <TodoList :complited="false" :todos="displayTodo(false)"/>
	        </div>
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid">
	                <p class="title">Мои доходы:</p>
	                <div class="list">
	                	<div class="list-element" v-for="incomeElement in income">
	                		<p class="list-element__name">{{incomeElement.name}}</p>
	                		<p>Сумма: {{moneyFormatting(incomeElement.value)}}</p>
	                		<p>Дата: {{incomeElement.date}}</p>
	                	</div>
	                	<div class="list-element" v-if="!income.length">
	                		<p>Доходов нет</p>                		
	                	</div>
	                </div>
	            </div>
	        </div>
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid">
	                <p class="title">Мои расходы:</p>
	                <div class="list">
	                	<div class="list-element" v-for="expenditure in expenses">
	                		<p class="list-element__name">{{expenditure.name}}</p>
	                		<p>Сумма: {{moneyFormatting(expenditure.value)}}</p>
	                		<p>Тип: {{formattingTypeName(expenditure.type,namesOfTypes)}}</p>
	                		<p>Дата: {{expenditure.date}}</p>                		
	                	</div>
	                	<div class="list-element" v-if="!expenses.length">
	                		<p>Пока расходов нет</p>                		
	                	</div>
	                </div>
	            </div>
	        </div>
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid">
	            	<div class="list">
	            		<p class="title">Сводка за месяц:</p>
	            		<Chart :chartCategories="chartCategories()" :chartData="chartData()" v-if="expenses.length"/>
	            		<div class="list-element">
	                		<p v-for="type in typesConsumption">{{formattingTypeName(type,namesOfTypes)}}: {{summary(type)}}</p>           			
	            		</div>            		
	            		<div class="list-element">
	                		<p class="list-element__name">Всего потрачено: {{summary(false)}}</p>          			
	            		</div>
	            	</div>

	            </div>
	        </div>
	    </div>
	    <div class="row">
		    <createEvent />
		    <createTodo />    	
	        <div class="col-3 col-md-6 col-sm-12">
	            <TodoList :complited="true" :todos="displayTodo(true)"/>
	        </div>
	        <changeType />
	    </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import changeType from '@/components/Home/changeType'
import createEvent from '@/components/Home/createEvent'
import Chart from '@/components/Home/Chart'
import TodoList from '@/components/Home/TodoList'
import createTodo from '@/components/Home/CreateTodo'
import moment from 'moment';
export default {
	name: 'Home',
	components: {
		changeType,
		createEvent,
		Chart,
		createTodo,
		TodoList,
	},
	computed:{
	    ...mapGetters([
	      'money',
	      'typesConsumption',
	      'income',
	      'expenses',
	      'namesOfTypes',
	      'todoList',
	      'todoIdCount'
	    ])
	},
	data(){
		return{

		}
	},
	methods:{
		summary(type,noFormating){
			let result = 0
			if(type){
				this.expenses.forEach(el => {
					if(el.type === type){
						result += el.value
					}
				})					
			} else{
				this.expenses.forEach(el => {
					result += el.value
				})
			}

			return noFormating ? result : this.moneyFormatting(result)
		},
		chartCategories(){
			const labels = []
			this.typesConsumption.forEach((el)=> {
				labels.push(this.formattingTypeName(el,this.namesOfTypes))
			});
			return labels
		},
		chartData(){
			const chartData = []
			this.typesConsumption.forEach((el)=> {
				chartData.push(this.summary(el,true))
			});
			return chartData
		},
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
		momentGetMonth(){
			return moment(new Date()).locale('ru').format('MMMM')
		}
	},
	mounted(){
		// console.log(this.summary('food'))
	}
}
</script>

<style lang="sass">
.title
	border-bottom: 2px solid var(--primary)
	padding-bottom: 5px
	margin-bottom: 5px

.text-centred
	text-align: center

.list
	max-height: 600px
	overflow-y: hidden
	.list-element
		padding: 7px 0
		border-bottom: 2px solid var(--primary)
		&__name
			font-weight: 500
			font-size: 17px
		&__date
			font-size: 12px
		button
			margin-top: 10px

canvas
	margin-top: 20px
</style>
