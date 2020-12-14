<template>
	<div class="menu">
		<div class="menu__list">
			<router-link class="menu__element link" to="/" active-class="active" exact>
				<div class="link__icon">
					<i class="fa fa-home" aria-hidden="true"></i>
				</div>
				<span class="link__text">Home</span>
			</router-link>
			<router-link class="menu__element link" to="/crm" active-class="active">
				<div class="link__icon">
					<i class="fa fa-credit-card-alt" aria-hidden="true"></i>
				</div>
				<span class="link__text">CRM</span>
			</router-link>
			<router-link class="menu__element link" to="/todo" active-class="active">
				<div class="link__icon">
					<i class="fa fa-list-ol" aria-hidden="true"></i>
				</div>
				<span class="link__text">Todo</span>
			</router-link>
			<router-link class="menu__element link" to="/apps" active-class="active">
				<div class="link__icon">
					<i class="fa fa-rocket" aria-hidden="true"></i>
				</div>
				<span class="link__text">Apps</span>
			</router-link>
			<router-link class="menu__element link" to="/goals-and-dreams" active-class="active">
				<div class="link__icon">
					<i class="fa fa-heart" aria-hidden="true"></i>
				</div>
				<span class="link__text">Dream</span>
			</router-link>
			<div class="menu__element link bottom" to="/" active-class="active">
				<div class="link__icon">
					<i class="fa fa-sign-out" aria-hidden="true"></i>
				</div>
				<span class="link__text">Exit</span>
			</div>
		</div>
	</div>
</template>

<script>
export default{
	name: 'Menu',
	data(){
		return {

		}
	}
}
</script>

<style lang="sass" scoped>
	
	.menu
		position: fixed
		left: 0
		top: 0
		height: 100vh
		width: 60px
		background: var(--grid)
		padding: 0 5px
		display: flex
		flex-direction: column
		justify-content: space-between
		&__list
			width: 100%
			height: 100%
			display: flex
			flex-direction: column
			justify-content: center
			padding-top: 15px
		.link
			margin-bottom: 15px
			text-align: center
			&.active
				.link__icon
					background: var(--dark)
					color: var(--text-other)
			&__icon
				width: 50px
				height: 50px
				background:  var(--primary)
				color: var(--text-other)
				display: flex
				align-items: center
				justify-content: center
				font-size: 25px
				border-radius: 50%
			&__text
				color: var(--dark)
			&.bottom
				margin-top: auto
	@import '@/assets/style/_menuMobile.sass'
</style>	