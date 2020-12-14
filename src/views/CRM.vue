<template>
	<div class="CRM">
		<div class="row">
			<div class="col-12">
				<div class="col-grid header">
					<p class="title no-border">Выбранный год и месяц: {{momentGetMonth()}}</p>
					<div class="select-month">
						<p>Выбранный год и месяц</p>
						<date-picker v-model="month" format="MM-YYYY" type="month" placeholder="Select month"></date-picker>
					</div>	
				</div>
			</div>
		</div>
	    <div class="row">
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid" v-if="isLoad">
	                <p class="title">Мои доходы: <input type="text" placeholder="Поиск" v-model="searchIncome"></p>
	                <vue-custom-scrollbar class="list">
	                	<div class="list-element" v-for="incomeElement in displayList(income,searchIncome)">
	                		<p class="list-element__name">{{incomeElement.name}} <i class="fa fa-times" aria-hidden="true"></i></p>
	                		<p>Сумма: {{moneyFormatting(incomeElement.value)}}</p>
	                		<p>Дата: {{incomeElement.date}}</p>
	                	</div>
	                	<div class="list-element" v-if="!income.length">
	                		<p>Доходов нет</p>                		
	                	</div>
	                	<div class="list-element" v-if="income.length && !displayList(income,searchIncome).length">
	                		<p>Ничего не найдено</p>                		
	                	</div>
	                </vue-custom-scrollbar>
	            </div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>
	        </div>
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid" v-if="isLoad">
	                <p class="title">Мои расходы: <input type="text" placeholder="Поиск" v-model="searchExpenses"></p>
	                <vue-custom-scrollbar class="list">
	                	<div class="list-element" v-for="expenditure in displayList(expenses,searchExpenses)">
	                		<p class="list-element__name">{{expenditure.name}} <i class="fa fa-times" aria-hidden="true"></i></p>
	                		<p>Сумма: {{moneyFormatting(expenditure.value)}}</p>
	                		<p>На что: {{expenditure.type.name + expenditure.type.icon}}</p>
	                		<p>Дата: {{expenditure.date}}</p>                		
	                	</div>
	                	<div class="list-element" v-if="!expenses.length">
	                		<p>Пока расходов нет</p>                		
	                	</div>
	                	<div class="list-element" v-if="expenses.length && !displayList(expenses,searchExpenses).length">
	                		<p>Ничего не найдено</p>                		
	                	</div>
	                </vue-custom-scrollbar>
	            </div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>
	        </div>
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid" v-if="isLoad">
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
	                		<p v-for="type in typesConsumption">{{type.name + type.icon}}: {{summary(type)}}</p>           			
	            		</div>            		
	            		<div class="list-element">
	                		<p class="list-element__name">Всего потрачено: {{summary(false)}}</p>          			
	            		</div>
	            	</vue-custom-scrollbar>
	            </div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>
	        </div>
	        <div class="col-3 col-md-6 col-sm-12">
	        	<div class="col-grid" v-if="isLoad">
	        		<CreateEvent />
	        		<button class="crm-btn" @click="modalShow = true">Добавить / изменить тип расходов</button>
	        	</div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>
	        </div>
	    </div>
	    <div class="row">
	    	<div class="col-4 col-sm-12">
	    		<Debts v-if="isLoad" :income="false"/>
	    	</div>
	    	<div class="col-4 col-sm-12">
	    		<Debts v-if="isLoad" :income="true"/>
	    	</div>
	    	<div class="col-4 col-sm-12">
	    		<div class="col-grid" v-if="isLoad" >
	    			<p class="title">График: </p>
	    			<div class="chart-box">
	    				<Chart :chartCategories="chartCategories()" :chartData="chartData()" v-if="expenses.length"/>
	    			</div>
	    		</div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>
	    	</div>
	    </div>
	    <transition name="fade" mode="out-in">
	    	<Modal v-if="modalShow" @close="modalShow = false"/>
	    </transition>	
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CreateEvent from '@/components/CRM/CreateEvent'
import Chart from '@/components/CRM/Chart'
import ChangeType from '@/components/CRM/ChangeType'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import moment from 'moment'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import Debts from '@/components/CRM/Debts'
import Modal from '@/components/Interface/Modal'

export default{
	name: 'CRM',
	components: {
		CreateEvent,
		Chart,
		Debts,
		ChangeType,
		vueCustomScrollbar,
		DatePicker,
		Modal
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
			isLoad: true,
			month: null,
			searchIncome: '',
			searchExpenses: '',
			modalShow: false
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
				labels.push(el.name)
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
	.header
		display: flex
		justify-content: space-between
		padding: 0 10px
	.list
		height: 300px
	.chart-box
		width: 350px
		margin: 0 auto
		canvas
		    margin-top: 20px
	.grid-loader-box
		height: 300px
		display: flex
		align-items: center
		justify-content: center
		&__loader
			width: 50px
			height: 50px
			border: 4px solid var(--primary)
			border-top: 4px solid transparent
			animation: speen .7s linear infinite
			border-radius: 50%
</style>

<style lang="scss">
	@keyframes speen{
		0%{
			transform:rotateZ(0deg)
		}
		100%{
			transform:rotateZ(360deg)
		}
	}
</style>