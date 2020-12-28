<template>
    <div class="col-3 col-md-6 col-sm-12">
        <div class="col-grid" v-if="isLoad">
            <p class="title">Мои расходы: <input type="text" placeholder="Поиск" v-model="search"></p>
            <vue-custom-scrollbar class="list">
            	<div class="list-element" v-for="expenditure in displayList(expenses,search).slice().reverse()">
            		<p class="list-element__name">{{expenditure.name}} <i class="fa fa-times" aria-hidden="true"></i></p>
            		<p>Сумма: {{moneyFormatting(expenditure.value)}}</p>
            		<p>На что: {{`${formattingTypeName(expenditure.type,categories)}`}}</p>
            		<p>Дата: {{expenditure.date}}</p>                		
            	</div>
            	<div class="list-element" v-if="!expenses.length">
            		<p>Расходов нет</p>                		
            	</div>
            	<div class="list-element" v-if="expenses.length && !displayList(expenses,search).length">
            		<p>Ничего не найдено</p>                		
            	</div>
            </vue-custom-scrollbar>
        </div>
        <div class="col-grid grid-loader-box" v-else>
        	<div class="grid-loader-box__loader">
        		
        	</div>
        </div>
    </div>	
</template>

<script>
import { mapGetters } from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default{
	name:"expensesList",
	props:['isLoad'],
	components:{
		vueCustomScrollbar
	},
	computed: {
	    ...mapGetters([
	      'expenses',
	      'categories',
	    ])
	},
	data() {
		return {
			search: ''
		}
	}	
}
</script>