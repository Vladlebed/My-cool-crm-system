<template>
	<div class="menu">
		<div class="menu__list">
			<router-link class="menu__element link" to="/" active-class="active" exact>
				<div class="link__icon">
					<i class="fa fa-home" aria-hidden="true"></i>
				</div>
				<span class="link__text">Home</span>
<!-- 				<span class="link__note">
					<i class="fa fa-bell" aria-hidden="true"></i>
				</span> -->
			</router-link>
			<!-- Список добавленных приложений -->

			<router-link v-for="app in getMenu" class="menu__element link" :to="app.route" active-class="active">
				<div class="link__icon">
					<i class="fa" :class="app.classIcon"  aria-hidden="true"></i>
				</div>
				<span class="link__text">{{app.name}}</span>
			</router-link>
<!-- 			<router-link class="menu__element link" to="/todo" active-class="active">
				<div class="link__icon">
					<i class="fa fa-list-ol" aria-hidden="true"></i>
				</div>
				<span class="link__text">Todo</span>
			</router-link>
			<router-link class="menu__element link" to="/goals-and-dreams" active-class="active">
				<div class="link__icon">
					<i class="fa fa-heart" aria-hidden="true"></i>
				</div>
				<span class="link__text">Dream</span>
			</router-link> -->
			<router-link class="menu__element link" to="/apps" active-class="active" exact>
				<div class="link__icon">
					<i class="fa fa-rocket" aria-hidden="true"></i>
				</div>
				<span class="link__text">Apps</span>
			</router-link>
			<div class="menu__element link bottom" @click.prevent="logout" active-class="active">
				<div class="link__icon">
					<i class="fa fa-sign-out" aria-hidden="true"></i>
				</div>
				<span class="link__text">Exit</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
	name: 'Menu',
	computed:{
	    ...mapGetters([
	      'getMenu',
	    ])
	},
	data(){
		return {

		}
	},
	methods:{
		async logout() {
			await this.$store.dispatch('logout')
			this.$router.push('/login')
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
		width: 75px
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
			position: relative
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
				margin: 0 auto
			&__text
				color: var(--dark)
			&.bottom
				margin-top: auto
			&__note
				position: absolute
				right: 0px
				top: 0px
				border-radius: 50%
				background: #F41A1A
				width: 20px
				height: 20px
				display: flex
				justify-content: center
				align-items: center
				.fa
					color: var(--text-other)
					font-size: 12px
	@import '@/assets/style/_menuMobile.sass'
</style>	