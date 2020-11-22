<template>
	<div class="col-3 col-md-6 col-sm-12">
		<div class="col-grid">
			<div class="list">
				<p class="title">Мои долги и должники</p>
				<div class="list-element me" v-for="debt in debts" :class="{me:debt.me,someone:!debt.me}">
		    		<p class="list-element__name">
		    			{{debt.name}}
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
		    		<button>Выполнено</button>				
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
	name:'Debts',
	computed:{
	    ...mapGetters([
	    	'debts'
	    ])
	},
}	
</script>

<style lang="sass" scoped>
.list
	.list-element
		border: none
		padding-left: 10px
		margin-bottom: 10px
		&.me
			border-left: 4px solid #3CDC96
			background: rgba(60, 220, 150,0.1)
		&.someone
			border-left: 4px solid #F93131
			background: rgba(249, 49, 49,0.1)
</style>