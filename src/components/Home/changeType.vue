<template>
	<div class="col-grid col-grid--auto-height">
		<div class="list">
			<p>Добавить тип расходов </p>
			<p class="title">Название типа: </p>
			<input type="text">
			<p class="title">Иконка (Если нужно)</p>
			<button @click="emojiesShow = !emojiesShow">
				<template v-if="!emojiesShow"> Показать </template>
				<template v-else> Скрыть </template>
				список иконок
			</button>
			<div v-show="emojiesShow">
				<vue-custom-scrollbar class="emojies-list">
					<span class="emoji" v-for="emoji in emojiesList">
						{{emoji}}
					</span>
				</vue-custom-scrollbar>				
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import emojies from '@/assets/emojies'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default{
	name:'ChangeType',
	components:{
		vueCustomScrollbar
	},
	computed:{
	    // ...mapGetters([
	    //   'doneTodosCount',
	    //   'anotherGetter'
	    //   // ...
	    // ])
	},	
	data(){
		return {
			emojiesList: [...emojies],
			emojiesShow: false
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

<style lang="sass" scoped>
.emojies-list
	max-height: 300px
	display: flex
	flex-wrap: wrap
	.emoji
		font-size: 12px
		display: block
		width: 10%
		text-align: center
		padding: 2px 0
</style>