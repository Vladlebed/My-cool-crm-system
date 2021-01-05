<template>
	<div class="apps">
		<div class="container">
			<div class="col-grid main-grid">
				<div class="row">
					<div class="col-12">
						<div class="col-grid">
							<p class="apps__title">Приложения</p>
							<p class="apps__page-description">Всевозможные полезные приблуды, которые упрощают жизнь</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-3 col-md-6 col-sm-12 flipper-container" v-for="app in appsList">
						<router-link to="/apps/notes">
							<div class="col-grid card">
								<div class="card__front">
									<p class="card__title">{{app.name}}</p>
									<i class="fa card__icon" :class="app.classIcon" aria-hidden="true"></i>
								</div>
								<div class="card__back">
									<p class="card__title title-back">{{app.description}}</p>
									<button class="card__btn" 
										@click.prevent="setAppInMenu({name: app.name, route: app.route, classIcon: app.classIcon})"
										v-if="!getMenu.find(t=> t.name === app.name)"
									>
										Добавить в меню
									</button>
									<button 
										class="card__btn" 
										@click.prevent="removeAppInMenu(app.name)"
										v-else
									>
										Убрать из меню
									</button>
								</div>
							</div>						
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
	name: "Apps",
	computed:{
	    ...mapGetters([
	      'getMenu',
	    ])
	},
	data(){
		return {
			appsList: [
				{name: 'Заметки', description: 'Записывай, создавай, редактируй!', route:'/apps/notes',classIcon:'fa-sticky-note-o'},
				{name: 'Calc', description: 'Всевозможные решения нерешаемых проблем!', route:'/apps/calc', classIcon:'fa-calculator'},
				{name: 'Timer', description: 'Очень полезен, например для замеров скорости сборки кубика рубика. Вжух!', route:'/apps/timer', classIcon:'fa-clock-o'},
				{name: 'Todo', description: 'Появлились дела? Собираешься в магазин? Заведи свой список дел и отмечай выполненные', route:'/apps/todo', classIcon:'fa-list-alt'},
				{name: 'Dreams', description: 'Создай список стран которые хочешь посетить, запиши в лист своё желание прыгнуть с парашютом или купить себе новую машину и вперёд покорять новые вершины!', route:'/apps/dreams', classIcon:'fa-star'},
				{name: 'CRM', description: 'Начни учёт своих доходов и расходов. Деньги любят счёт', route:'/apps/crm', classIcon:'fa-credit-card-alt'}
			]
		}
	},
	methods:{
		setAppInMenu(appData){
			this.$store.dispatch('setAppInMenu',appData)
		},
		removeAppInMenu(appName){
			this.$store.dispatch('removeAppInMenu',appName)
		}
	}
}
</script>

<style lang="sass" scoped>
	.apps
		padding-top: 20px
		&__title
			font-size: 30px
			font-weight: 800
			// text-align: center
		&__page-description
			font-size: 18px
			color: var(--text)
			margin-top: 15px
		.main-grid
			margin: 0
	.card
		background: var(--primary)
		box-sizing: border-box
		height: 200px
		transform-style: preserve-3d
		transition: .3s ease
		position: relative
		&__front,
		&__back
			position: absolute
			top: 0
			left: 0
			backface-visibility: hidden
			width: 100%
			height: 100%
			border-radius: 7px
			padding: 10px
		&__front
			z-index: 2
			transform: rotateY(0deg)
			display: flex
			align-items: center
			justify-content: center
			flex-direction: column
		&__back
			transform: rotateY(-180deg)
			background: var(--text)
			display: flex
			justify-content: space-between
			flex-direction: column
		&__title
			color: var(--text-other)
			font-size: 20px
			font-weight: 800
			&.title-back
				font-size: 16px
				font-weight: 500
		&__icon
			font-size: 35px
			color: var(--text-other)
			padding-top: 20px
		&__btn
			width: 100%
			height: 30px
			display: flex
			justify-content: center
			align-items: center
			background: var(--primary)
			color: var(--text-other)
			font-size: 16px
			font-weight: 600
			cursor: pointer
			border-radius: 7px
	.flipper-container
		transform-style: preserve-3d
		perspective: 1200
		&:hover
			.card
				transform: rotateY(180deg)	
		// &:hover
		// 	p
		// 		color: var(--text)
</style>