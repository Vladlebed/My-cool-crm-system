<template>
	<div class="list height-auto">
		<input type="text" v-model="name" placeholder="Название">
		<p class="title">
			Иконка: {{emojiSelected}} 
			<template v-if="!emojiSelected">не выбрана</template>
			<i v-if="emojiSelected" @click="emojiSelected = ''" class="fa fa-times" aria-hidden="true"></i>
		</p>
		<button @click="emojiesShow = !emojiesShow" class="crm-btn">
			<template v-if="!emojiesShow"> Показать </template>
			<template v-else> Скрыть </template>
			список иконок
		</button>
		<div v-show="emojiesShow">
			<vue-custom-scrollbar class="emojies-list">
				<span class="emoji" v-for="emoji in emojiesList" @click="emojiSelected = emoji">
					{{emoji}}
				</span>
			</vue-custom-scrollbar>				
		</div>
		<p class="title">Цвет на графике:</p>
		<div class="color-picker">
			<chrome-picker v-model="chartColor"/>
		</div>
		<button class="crm-btn" @click="createCategory()">Создать</button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import emojies from '@/assets/emojies'
import { Chrome } from 'vue-color'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import { transliterate as tr, slugify } from 'transliteration';
export default{
	name:'ChangeType',
	components:{
		vueCustomScrollbar,
		'chrome-picker': Chrome,
	},
	computed:{
	    prewview(event){
	    	return this.name + ' ' + this.emojiSelected
	    },
	    translite(){
	    	return tr(this.name)
	    }
	},	
	data(){
		return {
			emojiesList: [...emojies],
			emojiesShow: false,
			emojiSelected: '',
			name: '',
			chartColor: '',
		}
	},
	methods:{
		setEmoji(emoji){
			this.name += emoji
		},
		createCategory(){
			const category = {
				chartColor: this.chartColor.hex,
				name: this.name,
				icon: this.emojiSelected,
				translite: this.translite
			}
			console.log(category)
			// this.$store.dispatch('createCategory',category)
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

.fa-times
	cursor: pointer

.color-picker
	display: flex
	justify-content: center
	.vc-chrome
		width: 100%
</style>