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
	        		<CreateEvent :month="month"/>
	        		<button class="crm-btn" @click="createCategories = true">Добавить / изменить тип расходов</button>
	        	</div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>
	        </div>
	        <incomeList :isLoad="transactionsLoad.load"/>
	        <expensesList :isLoad="transactionsLoad.load"/>

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
	                		<p v-for="type in categories">{{type.name + type.icon}}: {{summary(type)}}</p>           			
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
	    </div>
	    <div class="row">
<!-- 	    	<div class="col-8 col-md-12">
	    		<div class="col-grid" v-if="transactionsLoad.load" >
	    			<p class="title">Общий график: </p>
	    			<div class="chart-box">
	    			
	    			</div>
	    		</div>
	            <div class="col-grid grid-loader-box" v-else>
	            	<div class="grid-loader-box__loader">
	            		
	            	</div>
	            </div>	    		
	    	</div> -->

	    	<div class="col-4 col-sm-12">
	    		<Debts v-if="transactionsLoad.load" :income="false"/>
	    	</div>
	    	<div class="col-4 col-sm-12">
	    		<Debts v-if="transactionsLoad.load" :income="true"/>
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
	    	<Notes />
	    </div>
	    <ConfirmAction v-if="modalShow" @confirm="confirmationNotification()" :deleteFunction="deleteFunction" @сancel="modalShow = false" />	
	    <Modal v-if="createCategories" @close="createCategories = false"/>	
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
import ConfirmAction from '@/components/Interface/ConfirmAction'
import Modal from '@/components/Interface/Modal'
import incomeList from '@/components/CRM/incomeList'
import expensesList from '@/components/CRM/expensesList'
import Notes from '@/components/CRM/Notes'

export default{
	name: 'CRM',
	components: {
		CreateEvent,
		Chart,
		Debts,
		ChangeType,
		vueCustomScrollbar,
		DatePicker,
		ConfirmAction,
		Modal,
		incomeList,
		expensesList,
		Notes
	},
	computed:{
	    ...mapGetters([
	      'money',
	      'categories',
	      'income',
	      'expenses',
	      'todoList',
	    ])
	},
	filters: {

	},
	data(){
		return{
			isLoad: true,
			month: new Date(),
			search: {
				income: '',
				expenses: ''
			},
			modalShow: false,
			transactionsLoad:{
				load: false
			},
			deleteFunction: null,
			createCategories: false,
			notes: ''
		}
	},
	methods:{
		summary(type,noFormating){
			console.log('run')
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
			this.categories.forEach((el)=> {
				labels.push(el.name + el.icon)
			});
			return labels
		},
		chartColors(){
			const colors = []
			this.categories.forEach((el)=> {
				colors.push(el.chartColor)
			});
			return colors			
		},
		chartData(){
			const chartData = []
			this.categories.forEach((el)=> {
				chartData.push(this.summary(el,true))
			});
			return chartData
		},
		confirmationNotification(){
			this.modalShow = false
			this.$notify({
			  group: 'foo',
			  type: 'success',
			  text: 'Объект был удалён'
			});				
		},
	},
	async created(){
		this.$store.dispatch('getMoneyCount')
		this.$store.dispatch('getCategories')
		const transactions = await this.$store.dispatch('getTransactions',{date: moment(this.month).format('MM-YYYY')})
		this.$store.dispatch('setTransactions',transactions)
		this.transactionsLoad.load = true
	},
	mounted(){

	},
	watch:{
		month: async function () {
			const transactions = await this.$store.dispatch('getTransactions',{date: moment(this.month).format('MM-YYYY')})
			await this.$store.dispatch('setTransactions',transactions)
		},
		money: function(oldValue,newValue) {
			console.log(oldValue,newValue)
			if(oldValue != newValue){
				this.$store.dispatch('setMoneyCount', this.money)
			}
		},
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