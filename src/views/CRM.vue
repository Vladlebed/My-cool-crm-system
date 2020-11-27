<template>
	<div class="CRM">
		<div class="row">
			<div class="col-12">
				<div class="col-grid">
					<p class="title no-border">Месяц: {{momentGetMonth()}}</p>
				</div>
			</div>
		</div>
	    <div class="row">
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid">
	                <p class="title">Мои доходы: <input type="text" placeholder="Поиск"></p>
	                <vue-custom-scrollbar class="list">
	                	<div class="list-element" v-for="incomeElement in income">
	                		<p class="list-element__name">{{incomeElement.name}} <i class="fa fa-times" aria-hidden="true"></i></p>
	                		<p>Сумма: {{moneyFormatting(incomeElement.value)}}</p>
	                		<p>Дата: {{incomeElement.date}}</p>
	                	</div>
	                	<div class="list-element" v-if="!income.length">
	                		<p>Доходов нет</p>                		
	                	</div>
	                </vue-custom-scrollbar>
	            </div>
	        </div>
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid">
	                <p class="title">Мои расходы: <input type="text" placeholder="Поиск"></p>
	                <vue-custom-scrollbar class="list">
	                	<div class="list-element" v-for="expenditure in expenses">
	                		<p class="list-element__name">{{expenditure.name}} <i class="fa fa-times" aria-hidden="true"></i></p>
	                		<p>Сумма: {{moneyFormatting(expenditure.value)}}</p>
	                		<p>Тип: {{formattingTypeName(expenditure.type,namesOfTypes)}}</p>
	                		<p>Дата: {{expenditure.date}}</p>                		
	                	</div>
	                	<div class="list-element" v-if="!expenses.length">
	                		<p>Пока расходов нет</p>                		
	                	</div>
	                </vue-custom-scrollbar>
	            </div>
	        </div>
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid">
	            	<vue-custom-scrollbar class="list height-auto">
		                <p class="title no-border">Мой карман:
		                	<template v-if="money">
		                		{{moneyFormatting(money)}}
		                	</template>
		                	<template v-else>
		                		пусто
		                	</template>
		                </p>	            		
	            		<p class="title">Сводка за месяц:</p>
	            		
	            		<div class="list-element">
	                		<p v-for="type in typesConsumption">{{formattingTypeName(type,namesOfTypes)}}: {{summary(type)}}</p>           			
	            		</div>            		
	            		<div class="list-element">
	                		<p class="list-element__name">Всего потрачено: {{summary(false)}}</p>          			
	            		</div>
	            	</vue-custom-scrollbar>
	            </div>
	        </div>
	        <div class="col-3 col-md-6 col-sm-12">
	        	<div class="col-grid">
	        		<CreateEvent />
	        		<ChangeType />
	        	</div>
	        </div>
	    </div>
	    <div class="row">
	    	<Debts />
	    	<div class="col-6 col-sm-12">
	    		<div class="col-grid">
	    			<p class="title">График: </p>
	    			<div class="chart-box">
	    				<Chart :chartCategories="chartCategories()" :chartData="chartData()" v-if="expenses.length"/>
	    			</div>
	    		</div>
	    	</div>
	    </div>	
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateEvent from '@/components/Home/CreateEvent'
import Chart from '@/components/Home/Chart'
import ChangeType from '@/components/Home/ChangeType'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import moment from 'moment'

import TodoList from '@/components/Home/TodoList'
import CreateTodo from '@/components/Home/CreateTodo'
import Debts from '@/components/Home/Debts'

export default{
	name: 'CRM',
	components: {
		CreateEvent,
		Chart,
		CreateTodo,
		TodoList,
		Debts,
		ChangeType,
		vueCustomScrollbar
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
		momentGetMonth(){
			return moment(new Date()).locale('ru').format('MMMM')
		}
	}
}
</script>

<style lang="sass">
	.list
		height: 300px
	.chart-box
		width: 350px
		margin: 0 auto
		canvas
			
		    margin-top: 20px	
</style>