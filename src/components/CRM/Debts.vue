<template>
	<div class="col-grid">
		
		<p class="title search">
			<template v-if="!income">
				Долги / Должники	
			</template>
			<template v-else>
				Закрытые долги
			</template> 
			<input type="text" placeholder="Поиск" v-model="search">
		</p>

		<template v-if="!income">
			<vue-custom-scrollbar class="list">
				<div class="list-element me" v-for="debt in displayList(debts,search).slice().reverse()" :class="{me:debt.me,someone:!debt.me}">
		    		<p class="list-element__name">
		    			{{debt.name}} <i class="fa fa-times" aria-hidden="true"></i>
		    		</p>
		    		<p class="list-element__description">
		    			{{debt.description}}
		    		</p>
		    		<p class="list-element__value">
		    			{{moneyFormatting(debt.value)}}
		    		</p>
		    		<p class="list-element__date">
		    			Когда: {{debt.date}}
		    		</p>
		    		<p class="list-element__date" v-if="debt.deadline">
		    			Дедлайн: {{debt.deadline}}
		    		</p>
		    		<button class="crm-btn">Выполнено</button>				
				</div>
				<p v-if="!debts">В этом месяце пусто</p>
				<p v-if="debts && !displayList(debts,search).length">Ничего не найдено</p>
			</vue-custom-scrollbar>
			<p>Всего мне должны: {{moneyFormatting(debtsSum(true))}}</p>
			<p>Всего я должнен: {{moneyFormatting(debtsSum(false))}}</p>			
		</template>

		<template v-else>
			<vue-custom-scrollbar class="list">
				<div class="list-element me" v-for="debtIncome in displayList(debtsIncome,search).slice().reverse()">
		    		<p class="list-element__name">
		    			<template v-if="!income">Кому я отдал: </template>
		    			<template v-else>Кто мне отдал: </template>
		    			{{debtIncome.name}} <i class="fa fa-times" aria-hidden="true"></i>
		    		</p>
		    		<p class="list-element__description">
		    			{{debtIncome.description}}
		    		</p>
		    		<p class="list-element__value">
		    			{{moneyFormatting(debtIncome.value)}}
		    		</p>
		    		<p class="list-element__date">
		    			Когда: {{debtIncome.date}}
		    		</p>
		    		<button class="crm-btn">Выполнено</button>				
				</div>
				<p v-if="!debtsIncome">Нет возвращённых долгов</p>
				<p v-if="debtsIncome && !displayList(debtsIncome,search).length">Ничего не найдено</p>
			</vue-custom-scrollbar>				
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default{
	name:'Debts',
	props:['income'],
	components: {
		vueCustomScrollbar
	},
	computed:{
	    ...mapGetters([
	    	'debts',
	    	'debtsIncome',
	    ])
	},
	data(){
		return {
			search: ''
		}
	},
	methods:{
		debtsSum(forMe){
			let myDebts = 0,
				debtsToMe = 0

			this.debts.forEach(el=>{
				el.me ? debtsToMe += el.value : myDebts += el.value
			})

			if(this.debtsIncome){
				this.debtsIncome.forEach(el => {
					if(el.me){
						debtsToMe -= el.value
					} else {
						myDebts -= el.value
					}
				})
			}

			return forMe ? debtsToMe : myDebts
		}
	},
	created(){
		this.$store.dispatch('getDebts')
	},
	mounted(){

	}
}	
</script>

<style lang="sass" scoped>
.list
	overflow-y: hidden
	.list-element
		border: none
		padding: 0px 10px
		margin-bottom: 10px
		&.me
			border-left: 4px solid #3CDC96
			background: rgba(60, 220, 150,0.1)
		&.someone
			border-left: 4px solid #F93131
			background: rgba(249, 49, 49,0.1)
	i
		margin-right: 15px
	button
		max-width: 300px
</style>