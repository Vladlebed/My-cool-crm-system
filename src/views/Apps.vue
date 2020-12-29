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
					<div class="col-3 col-md-6 col-sm-12 flipper-container">
						<router-link to="/apps/notes">
							<div class="col-grid card">
								<div class="card__front">
									<p class="card__title">Заметки</p>
									<i class="fa fa-sticky-note-o card__icon" aria-hidden="true"></i>
								</div>
								<div class="card__back">
									<p class="card__title title-back">Записывай, создавай, редактируй!</p>
									<button class="card__btn" 
										@click.prevent="setAppInMenu({name: 'Заметки',route:'/apps/notes',classIcon:'fa-sticky-note-o'})"
										v-if="!getMenu.find(t=> t.name === 'Заметки')"
									>
										Добавить в меню
									</button>
									<button 
										class="card__btn" 
										@click.prevent="removeAppInMenu('Заметки')"
										v-else
									>
										Убрать из меню
									</button>
								</div>
							</div>						
						</router-link>
					</div>
					<div class="col-3 col-md-6 col-sm-12 flipper-container">
						<router-link to="/apps/calc">
							<div class="col-grid card">
								<div class="card__front">
									<p class="card__title">Калькулятор</p>
									<i class="fa fa-calculator card__icon" aria-hidden="true"></i>
								</div>
								<div class="card__back">
									<p class="card__title title-back">Всевозможные решения нерешаемых проблем!</p>
									<button class="card__btn" 
										@click.prevent="setAppInMenu({name: 'Calc',route:'/apps/calc',classIcon:'fa-calculator'})"
										v-if="!getMenu.find(t=> t.name === 'Calc')"
									>
										Добавить в меню
									</button>
									<button class="card__btn" 
										@click.prevent="removeAppInMenu('Calc')"
										v-else
									>
										Убрать из меню
									</button>
								</div>
							</div>						
						</router-link>
					</div>
					<div class="col-3 col-md-6 col-sm-12 flipper-container">
						<router-link to="/apps/timer">
							<div class="col-grid card">
								<div class="card__front">
									<p class="card__title">Секундомер</p>
									<i class="fa fa-clock-o card__icon" aria-hidden="true"></i>
								</div>
								<div class="card__back">
									<p class="card__title title-back">Очень полезен, например для замеров скорости сборки кубика рубика. Вжух!</p>
									<button class="card__btn" 
										@click.prevent="setAppInMenu({name: 'Timer',route:'/apps/timer',classIcon:'fa-clock-o'})"
										v-if="!getMenu.find(t=> t.name === 'Timer')"
										>
										Добавить в меню
									</button>
									<button 
										class="card__btn" 
										@click.prevent="removeAppInMenu('Timer')"
										v-else
										>
										Убрать из меню
									</button>
								</div>
							</div>						
						</router-link>
					</div>
					<div class="col-3 col-md-6 col-sm-12 flipper-container">
						<router-link to="/apps/todo">
							<div class="col-grid card">
								<div class="card__front">
									<p class="card__title">To-Do Лист</p>
									<i class="fa fa-list-alt card__icon" aria-hidden="true"></i>
								</div>
								<div class="card__back">
									<p class="card__title title-back">Появлились дела? Собираешься в магазин? Заведи свой список дел и отмечай выполненные</p>
									<button class="card__btn" 
										@click.prevent="setAppInMenu({name: 'Todo',route:'/apps/todo',classIcon:'fa-list-alt'})"
										v-if="!getMenu.find(t=> t.name === 'Todo')"
										>
										Добавить в меню
									</button>
									<button 
										class="card__btn" 
										@click.prevent="removeAppInMenu('Todo')"
										v-else
										>
										Убрать из меню
									</button>
								</div>
							</div>						
						</router-link>
					</div>
				</div>
				<div class="row">
					<div class="col-3 col-md-6 col-sm-12 flipper-container">
						<router-link to="/apps/dreams">
							<div class="col-grid card">
								<div class="card__front">
									<p class="card__title">Мечты и цели</p>
									<i class="fa fa-star card__icon" aria-hidden="true"></i>
								</div>
								<div class="card__back">
									<p class="card__title title-back">Создай список стран которые хочешь посетить, запиши в лист своё желание прыгнуть с парашютом или купить себе новую машину и вперёд покорять новые вершины!</p>
									<button class="card__btn" 
										@click.prevent="setAppInMenu({name: 'Dreams',route:'/apps/dreams',classIcon:'fa-star'})"
										v-if="!getMenu.find(t=> t.name === 'Dreams')"
										>
										Добавить в меню
									</button>
									<button 
										class="card__btn" 
										@click.prevent="removeAppInMenu('Dreams')"
										v-else
										>
										Убрать из меню
									</button>
								</div>
							</div>						
						</router-link>
					</div>
					<div class="col-3 col-md-6 col-sm-12 flipper-container">
						<router-link to="/apps/crm">
							<div class="col-grid card">
								<div class="card__front">
									<p class="card__title">CRM</p>
									<i class="fa fa-credit-card-alt card__icon" aria-hidden="true"></i>
								</div>
								<div class="card__back">
									<p class="card__title title-back">Начни учёт своих доходов и расходов. Деньги любят счёт</p>
									<button class="card__btn" 
										@click.prevent="setAppInMenu({name: 'CRM',route:'/apps/crm',classIcon:'fa-credit-card-alt'})"
										v-if="!getMenu.find(t=> t.name === 'CRM')"
										>
										Добавить в меню
									</button>
									<button 
										class="card__btn" 
										@click.prevent="removeAppInMenu('CRM')"
										v-else
										>
										Убрать из меню
									</button>
								</div>
							</div>						
						</router-link>
					</div>
					<div class="col-3 col-md-6 col-sm-12 flipper-container">
						<router-link to="/apps/notes">
							<div class="col-grid card">
								<div class="card__front">
									<p class="card__title">Пустой блок</p>
								</div>
								<div class="card__back">
									<p class="card__title title-back">Lorem ipsum, dolor sit amet consectetur adipisicing, elit. Iste perspiciatis voluptate sunt fugiat, repellat laboriosam beatae, inventore dignissimos suscipit debitis aperiam quasi nemo ab laudantium ducimus quod ullam nulla harum.</p>
									<button class="card__btn">Добавить в меню</button>
								</div>
							</div>						
						</router-link>
					</div>
					<div class="col-3 col-md-6 col-sm-12 flipper-container">
						<router-link to="/apps/notes">
							<div class="col-grid card">
								<div class="card__front">
									<p class="card__title">Пустой блок</p>
								</div>
								<div class="card__back">
									<p class="card__title title-back">Lorem ipsum, dolor sit amet consectetur adipisicing, elit. Iste perspiciatis voluptate sunt fugiat, repellat laboriosam beatae, inventore dignissimos suscipit debitis aperiam quasi nemo ab laudantium ducimus quod ullam nulla harum.</p>
									<button class="card__btn">Добавить в меню</button>
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