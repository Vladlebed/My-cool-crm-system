<template>
	<div class="notes">
		<div class="container">
			<div class="col-grid main-grid">
				<div class="row">
					<div class="col-12">
						<p class="app-name">Заметки</p>
							
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name: 'Notes'
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
</style>