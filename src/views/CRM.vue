<template>
	<div class="CRM">
		<div class="row">
			<div class="col-12">
				<div class="col-grid header">
					<date-picker v-model="month" format="MM-YYYY" type="month" placeholder="Select month"></date-picker>
				</div>
			</div>
		</div>
	    <div class="row">
	        <div class="col-3 col-md-6 col-sm-12">
	            <div class="col-grid" v-if="transactionsLoad.load">
	                <p class="title">Мои доходы: <input type="text" placeholder="Поиск" v-model="searchIncome"></p>
	                <vue-custom-scrollbar class="list">
	                	<div class="list-element" v-for="incomeElement in displayList(income,searchIncome).slice().reverse()">
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
	            <div class="col-grid" v-if="transactionsLoad.load">
	                <p class="title">Мои расходы: <input type="text" placeholder="Поиск" v-model="searchExpenses"></p>
	                <vue-custom-scrollbar class="list">
	                	<div class="list-element" v-for="expenditure in displayList(expenses,searchExpenses).slice().reverse()">
	                		<p class="list-element__name">{{expenditure.name}} <i class="fa fa-times" aria-hidden="true"></i></p>
	                		<p>Сумма: {{moneyFormatting(expenditure.value)}}</p>
	                		<p>На что: {{`${formattingTypeName(expenditure.type,typesConsumption)}`}}</p>
	                		<p>Дата: {{expenditure.date}}</p>                		
	                	</div>
	                	<div class="list-element" v-if="!expenses.length">
	                		<p>Расходов нет</p>                		
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
	            <div class="col-grid" v-if="transactionsLoad.load">
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
	        	<div class="col-grid" v-if="transactionsLoad.load">
	        		<CreateEvent :month="month"/>
	        		<button class="crm-btn" @click="modalShow = true">Добавить / изменить тип расходов</button>
	        	</div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>
	        </div>
	    </div>
	    <div class="row">
	    	<div class="col-8 col-md-12">
	    		<div class="col-grid" v-if="transactionsLoad.load" >
	    			<p class="title">Общий график: </p>
	    			<div class="chart-box">
	    			
	    			</div>
	    		</div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>	    		
	    	</div>
	    	<div class="col-4 col-sm-12">
	    		<div class="col-grid" v-if="transactionsLoad.load" >
	    			<p class="title">График по категориям: </p>
	    			<div class="chart-box">
	    				<Chart 
		    				:chartCategories="chartCategories()" 
		    				:chartData="chartData()" 
		    				:chartColors="chartColors()" 
		    				v-if="expenses.length"
	    				/>
	    			</div>
	    		</div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>
	    	</div>
	    </div>
	    <div class="row">
	    	<div class="col-4 col-sm-12">
	    		<Debts v-if="transactionsLoad.load" :income="false"/>
	    	</div>
	    	<div class="col-4 col-sm-12">
	    		<Debts v-if="transactionsLoad.load" :income="true"/>
	    	</div>
	    	<div class="col-4 col-sm-12">
	    		<div class="col-grid">
	    			<p class="title">Заметки</p>
	    			<textarea name="" id="" cols="30" rows="10" class="notes" placeholder="Ну и нафига они нужны?"></textarea>
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
	filters: {

	},
	data(){
		return{
			isLoad: true,
			month: new Date(),
			searchIncome: '',
			searchExpenses: '',
			modalShow: false,
			transactionsLoad:{
				load: false
			}
		}
	},
	methods:{
		summary(type,noFormating){
			let result = 0
			if(type){
				this.expenses.forEach(el => {
					if(el.type === type.translite){
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
				labels.push(el.name + el.icon)
			});
			return labels
		},
		chartColors(){
			const colors = []
			this.typesConsumption.forEach((el)=> {
				colors.push(el.chartColor)
			});
			return colors			
		},
		chartData(){
			const chartData = []
			this.typesConsumption.forEach((el)=> {
				chartData.push(this.summary(el,true))
			});
			return chartData
		}
	},
	async created(){
		this.$store.dispatch('getMoneyCount')
		this.$store.dispatch('getTypesConsumption')
		await this.$store.dispatch('getTransactions',{date: moment(this.month).format('MM-YYYY')})
		this.transactionsLoad.load = true
	},
	mounted(){
		
	},
	watch:{
		month: function () {
			this.$store.dispatch('getTransactions',{date: moment(this.month).format('MM-YYYY')})
		},
		money: function(oldValue,newValue) {
			if(oldValue != newValue){
				console.log('запуск!')
				this.$store.dispatch('setMoneyCount', this.money)
			}
		}
	}
}
</script>

<style lang="sass">
	.header
		display: flex
		justify-content: center
		align-items: center
		padding: 0 10px
	.list
		height: 300px
	.chart-box
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
	.notes
		width: 100%
		max-height: 100%
		padding: 15px 0
		font-size: 16px
		font-family: 'Inter', sans-serif;
		font-weight: 600
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