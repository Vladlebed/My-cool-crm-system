import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

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
	},
	displayList(list,search){
		if(!search) return list
		else {
			let re = new RegExp(search, 'i') 
			return list.filter((el) => {
				return re.test(JSON.stringify(el)) ? true : false
			})
		}		
	}
  }
}

Vue.use(Notifications)
Vue.mixin(globalMethods)

firebase.initializeApp({
	apiKey: "AIzaSyB8u1jKgcxlVeRva1QmUYHhZ0m_8-r7Hsg",
	authDomain: "my-cool-crm.firebaseapp.com",
	databaseURL: "https://my-cool-crm.firebaseio.com",
	projectId: "my-cool-crm",
	storageBucket: "my-cool-crm.appspot.com",
	messagingSenderId: "1129947099",
	appId: "1:1129947099:web:fae016581a7349b41311fe"
})

let app

firebase.auth().onAuthStateChanged(()=>{
	if(!app){
		app = new Vue({
		  router,
		  store,
		  render: h => h(App)
		}).$mount('#app')		
	}
})


