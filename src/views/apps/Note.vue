<template>
	<div class="container">
		<div class="col-grid main-grid" v-if="isLoad">
			<div class="row">
				<div class="col-12">
					<input v-model="noteName" class="note-name" placeholder="Название заметки" tabindex="1">
					<router-link to="/apps/notes" class="crm-btn">К списку заметок</router-link>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<textarea v-model="noteValue" class="note-text" placeholder="Текст" tabindex="2"></textarea>
				</div>
			</div>
			<div class="row">
				<div class="col-12 btns-container">
					<button class="crm-btn" @click="removeNote()">Удалить заметку</button>
					<button class="crm-btn" @click="noteClone()">Клонировать заметку</button>
				</div>
			</div>
		</div>
		<div class="col-grid main-grid" v-else>
			<div class="loader">
				<p>Загрузка</p>
			</div>
		</div>
		<ConfirmAction v-if="modalShow" @confirm="noteHasRemoved()" :deleteFunction="removeFunction" @сancel="canselRemove" text="Вы уверены что хотите удалить заметку?"/>
	</div>
</template>

<script>
import _ from 'lodash'
import ConfirmAction from '@/components/Interface/ConfirmAction'

export default{
	name:'Note',
	components:{
		ConfirmAction
	},
	data(){
		return{
			noteId: this.$router.history.current.params.id,
			noteName: 'Название заметки',
			noteValue: 'Пустая заметка',
			isLoad: false,
			modalShow: false,
			removeFunction: null,
		}
	},
	methods:{
		async updateNote(){
			await this.$store.dispatch('updateNote',{id:this.noteId,title: this.noteName,text: this.noteValue})
		},
		async noteClone(){
			const id = await this.$store.dispatch('createNote',{title: this.noteName + ' (Clone)', text: this.noteValue})
			this.$router.push(`/apps/notes/${id}`)			
		},
		async removeNote(){
			if(this.noteValue){
				this.modalShow = true
				this.removeFunction = ()=> {
					this.removeFunction = this.$store.dispatch('removeNote',this.noteId)
				}
			} else {
				await this.$store.dispatch('removeNote',this.noteId)
				this.$router.push(`/apps/notes`)
			}			
		},
		noteHasRemoved(){
			this.$router.push(`/apps/notes`)
		},
		canselRemove(){
			this.modalShow = false
			this.removeFunction = null
		}
	},
	async created(){
		this.saveNoteValues = _.debounce(this.updateNote, 700)
		const note = await this.$store.dispatch('getNote',this.noteId)
		this.noteName = note[1].title
		this.noteValue = note[1].text
		setTimeout(()=>{
			this.isLoad = true
		},0)
	},
	watch:{
		noteName: function(){
			this.isLoad ? this.saveNoteValues() : false
		},
		noteValue: function(){
			this.isLoad ? this.saveNoteValues() : false
		},
	}
}	
</script>

<style lang="sass" scoped>
	.main-grid
		margin: 0
	.note-name
		font-family: 'Inter', sans-serif
		font-size: 25px
		font-weight: 600
		width: 100%
	.note-text
		font-family: 'Inter', sans-serif
		font-size: 20px
		font-weight: 500
		background: var(--text)
		color: var(--text-other)
		width: 100%
		padding: 15px
		resize: none
		min-height: 80vh
		border-radius: 7px
	.btns-container
		display: flex
	.crm-btn
		max-width: 200px
		margin-right: 10px
		&:last-child
			margin-right: 0
	.loader
		width: 100%
		height: 100vh
		display: flex
		justify-content: center
		align-items: center
</style>