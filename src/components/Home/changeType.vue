<template>
	<div class="list height-auto">
		<p class="title">Добавить тип расходов </p>
		<input type="text" v-model="type" placeholder="Название">
		<p class="title">Иконка (Если нужно)</p>
		<button @click="emojiesShow = !emojiesShow">
			<template v-if="!emojiesShow"> Показать </template>
			<template v-else> Скрыть </template>
			список иконок
		</button>
		<div v-show="emojiesShow">
			<vue-custom-scrollbar class="emojies-list">
				<span class="emoji" v-for="emoji in emojiesList" @click="setEmoji(emoji)">
					{{emoji}}
				</span>
			</vue-custom-scrollbar>				
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
	    prewview(event){
	    	return this.type + ' ' + this.emojiSelected
	    }
	},	
	data(){
		return {
			emojiesList: [...emojies],
			emojiesShow: false,
			type: '',
		}
	},
	methods:{
		setEmoji(emoji){
			this.type += emoji
		}
	},
	mounted(){

	}
}
</script>

<style lang="sass">
	
</style>

<style lang="sass" scoped>
.emojies-list
	max-height: 230px
	display: flex
	flex-wrap: wrap
	.emoji
		font-size: 12px
		display: block
		width: 10%
		text-align: center
		padding: 2px 0
		cursor: pointer
.list
	margin-top: 12px
</style>