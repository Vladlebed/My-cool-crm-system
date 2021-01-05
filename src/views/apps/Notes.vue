<template>
	<div class="notes">
		<div class="container">
			<div class="col-grid main-grid">
				<div class="row">
					<div class="col-12">
						<p class="app-name">Заметки</p>
					</div>
				</div>
				<div class="row">
					<div class="col-12 notes-list">
						<div class="notes-el notes-add" @click="createNote()">
							<p>Создать заметку</p>
							<i class="fa fa-plus" aria-hidden="true"></i>
						</div>
						<router-link class="notes-el" v-for="note in notesList" :to="`/apps/notes/${note.id}`" >
							<p>{{note.title || 'Безымянная заметка'}}</p>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
	name: 'Notes',
	computed:{
	    ...mapGetters([
	      'notesList',
	    ])		
	},
	methods:{
		async createNote(){
			const id = await this.$store.dispatch('createNote')
			this.$router.push(`/apps/notes/${id}`)
		},
		noteOpen(id){
			this.$router.push(`/apps/notes/${id}`)
		}
	},
	created(){
		this.$store.dispatch('getAllNotes')
	}
}	
</script>

<style lang="sass" scoped>
	.notes
		padding-top: 15px
		.app-name
			font-size: 25px
			font-weight: 600
			color: var(--text)
	.main-grid
		margin: 0

	.notes-list
		display: flex
		flex-wrap: wrap
	.notes-el
		width: 250px
		height: 250px
		background: var(--primary)
		display: flex
		justify-content: center
		align-items: center
		flex-direction: column
		cursor: pointer
		border-radius: 7px
		transition: .2s
		margin-right: 10px
		padding: 10px
		p
			color: var(--text-other)
			font-size: 18px
			font-weight: 600
		i
			font-size: 30px
			color: var(--text-other)
			margin-top: 10px
		&:hover
			background: var(--text)
		&.notes-add
			p
				font-size: 25px
</style>