<template>
    <div class="col-3 col-md-6 col-sm-12">
        <div class="col-grid" v-if="isLoad">
            <p class="title">Мои доходы: <input type="text" placeholder="Поиск" v-model="search"></p>
            <vue-custom-scrollbar class="list">
            	<div class="list-element" v-for="incomeElement in displayList(income,search).slice().reverse()">
            		<p class="list-element__name">{{incomeElement.name}} <i class="fa fa-times" aria-hidden="true"></i></p>
            		<p>Сумма: {{moneyFormatting(incomeElement.value)}}</p>
            		<p>Дата: {{incomeElement.date}}</p>
            	</div>
            	<div class="list-element" v-if="!income.length">
            		<p>Доходов нет</p>                		
            	</div>
            	<div class="list-element" v-if="income.length && !displayList(income,search).length">
            		<p>Ничего не найдено</p>                		
            	</div>
            </vue-custom-scrollbar>
        </div>
        <div class="col-grid grid-loader-box" v-else>
        	<div class="grid-loader-box__loader"></div>
        </div>
    </div>	
</template>

<script>
import { mapGetters } from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
export default{
	name:"incomeList",
	props:['isLoad'],
	components:{
		vueCustomScrollbar
	},
	computed: {
	    ...mapGetters([
	      'income',
	    ])		
	},
	data() {
		return {
			search: ''
		}
	}
}
</script>