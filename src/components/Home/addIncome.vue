<template>
	<div class="col-6 col-sm-12">
		<div class="col-grid">
			<p class="title">Добавить приход</p>
			<input type="text">
			<button>
				Добавить
			</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
	name:'addIncome',
	computed:{
	    ...mapGetters([
	      'typesConsumption',
	    ])
	},
	data(){
		return{

		}
	},
	methods:{

	},
	mounted(){
		
	}
}	
</script>

<style lang="sass">
	
</style>