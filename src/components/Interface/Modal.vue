<template>
	<div class="modal-wrapper" @click="closeModal">
		<div class="modal-content">
			<div class="modal-header">
				<p class="title">
					Добавить тип расходов
					<i class="fa fa-times modal-close" aria-hidden="true" @click="$emit('close')"></i>
				</p>
			</div>
			<div class="modal-body">
				<ChangeType @close="$emit('close')"/>
			</div>
		</div>
	</div>
</template>

<script>
import ChangeType from '@/components/CRM/ChangeType'
export default{
	name: 'Modal',
	components:{
		ChangeType
	},
	methods:{
		closeModal(event){
			event.target === this.$el ? this.$emit('close') : false
		}
	}
}
</script>

<style lang="sass">
	.modal-wrapper
		position: fixed
		top: 0
		left: 0
		width: 100vw
		height: 100vh
		display: flex
		align-items: center
		justify-content: center
		background: rgba(0,0,0,0.3)
		.modal-content
			min-width: 320px
			min-height: 500px
			background: var(--grid)
			border-radius: 10px
			box-shadow: 0px 7px 12px 0px rgba(50, 50, 50, 0.75)
			.modal-close
				font-size: 20px
				color: var(--text)
				cursor: pointer
		.modal-header
			.title
				padding: 10px
				font-size: 20px
				font-weight: 600
		.modal-body
			padding: 10px
			.title
				border: none
</style>