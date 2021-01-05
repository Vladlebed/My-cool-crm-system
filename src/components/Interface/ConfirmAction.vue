<template>
	<div class="confirm-window">
		<div class="confirm-element">
			<div class="confirm-element__head">
				<p>{{text || 'Удалить этот элемент?'}}</p>
			</div>
			<div class="confirm-element__btns">
				<button class="crm-btn" @click="confirm()">Да</button>
				<button class="crm-btn" @click="сancel()">Нет</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ConfirmAction',
	props:['deleteFunction','text'],
	methods:{
		confirm(){
			if(this.deleteFunction){
				this.deleteFunction()
				this.$emit('confirm')
			}
		},
		сancel(){
			this.$emit('сancel')
		}
	},
	mounted(){
		console.log()
	}
}
</script>

<style lang="sass">
	.confirm-window
		width: 100vw
		height: 100vh
		position: fixed
		top: 0
		left: 0
		background: rgba(0,0,0,0.5)
		display: flex
		justify-content: center
		align-items: center
		z-index: 100
	.confirm-element
		min-height: 120px
		background: #fff
		border-radius: 15px
		&__head
			padding: 15px
			font-size: 20px
			font-weight: 600
			text-align: center
		&__btns
			padding: 15px
			display: flex
			button
				margin: 0 5px

</style>