import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

const globalMethods = {
  methods: {
	formattingTypeName(name,namesOfTypes){
		if(namesOfTypes && namesOfTypes.find(t => t.value === name)){
			return namesOfTypes.find(t => t.value === name).translate
		}
		return name
	},
	// Вот тут мне пришлось немного поднарпячь мозги
	// На вход есть число, которое должно разделяться разделителем
	// через одну тысячу, миллион, и т.д.
	// Т.е. пробел через каждые 3 символа... Ооокей
	moneyFormatting(money){
		const subfix = '₽'
		const separator = '.'
		if(money.length < 4) return money + subfix //Нафига напрягать лишний раз кампудахтер)
		else {
			// Переводим число в строку и пробегаемся циклом, 
			// добавляя кажыдй символ в новый массив
			const str = money.toString()
			let arr = []
			for(let i = 0;i<str.length;i++){
				arr.push(str[i])
			}
			// Разворачиваем его, т.к. считать отступы будем справа
			arr = arr.reverse()
			// После этого, задаём последовательность
			// через которую нужно будет выставлять разделитель
			let step = 3
			// Маппим массив в ставляем на каждом 3м шаге наш разделитель
			return arr.map((el,i)=>{
				if(i == step){
					step = step * 2
					return el + separator
				} else {
					return el
				}
			})
			//Переворачиваем обратно, объеденяем в строку и добавляем постфикс
			.reverse()
			.join('') + subfix			
		}
	}
  }
}

Vue.use(Notifications)
Vue.mixin(globalMethods)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
