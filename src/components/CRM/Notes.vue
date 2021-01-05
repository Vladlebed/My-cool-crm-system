<template>
	<div class="col-4 col-sm-12">
		<div class="col-grid">
			<p class="title" @click="getNoteState()">Заметки</p>
			<textarea name="" id="" cols="30" rows="10" class="notes" placeholder="Напиши что нибудь" v-model="text"></textarea>
		</div>
	</div>	
</template>

<style lang="sass" scoped>
	.notes
		width: 100%
		max-height: 100%
		padding: 15px 0
		font-size: 16px
		font-family: 'Inter', sans-serif;
		font-weight: 600	
</style>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default{
	name: 'Notes',
	computed:{
	    ...mapGetters([
	      'note',
	    ])		
	},
	data(){
		return {
			text: ''
		}
	},
	methods:{
		saveNote(){
			this.$store.dispatch('saveNote',this.text)
		},
	},
	created(){
		this.debouncedGetNote = _.debounce(this.saveNote, 1000)
	},
	async mounted(){
		await this.$store.dispatch('getNote')
		this.text = this.note
	},
	watch:{
		text: function(){
			this.debouncedGetNote()
		},
		note: function(){
			this.text = this.note
		}		
	}
}
</script>