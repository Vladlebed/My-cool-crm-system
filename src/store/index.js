import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Auth'
import namesOfTypes from '@/assets/namesOfTypes'
import randomMoments from '@/assets/randomMoments'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		money:100,
		todo:[
			{id:0,text:'Посмотреть фильм', dateCreate:'18.11.2020, 23:00',dateComplited:null, complited: false}
		],
		todoIdCount:1,
		typesConsumption:[
			{id:1,name:'Еда',icon:'🍏',chartColor:'rgba(255, 99, 132, 0.2)'},
			{id:2,name:'Развлечения',icon:'😎',chartColor:'rgba(255, 99, 132, 0.2)'},
			{id:3,name:'Аренда квартиры',icon:'💰',chartColor:'rgba(255, 99, 132, 0.2)'},
			{id:4,name:'Мотоцикл',icon:'💕',chartColor:'rgba(255, 99, 132, 0.2)'},
			{id:5,name:'Алкоголь',icon:'🍺',chartColor:'rgba(255, 99, 132, 0.2)'},
			{id:6,name:'Сигареты',icon:'🔪',chartColor:'rgba(255, 99, 132, 0.2)'},
			{id:7,name:'Энергетики',icon:'🍼',chartColor:'rgba(255, 99, 132, 0.2)'},
			{id:8,name:'Нежданы',icon:'🦆',chartColor:'rgba(255, 99, 132, 0.2)'},
			{id:9,name:'Остальные',icon:'📦',chartColor:'rgba(255, 99, 132, 0.2)'},
		],
		namesOfTypes,
		randomMoments,
		debts:[
			{me:true,name:'Илья',description:'Роллы',value:495,date:'08.12.2020',complited:false},
			{me:true,name:'Илья',description:'На хуйню',value:200,date:'25.11.2020',complited:false},
			{me:true,name:'Илья',description:'Вареники лол',value:45,date:'22.11.2020',complited:true},
			{me:false,name:'Мама',description:'Выкуп барабанов у Некита',value:10000,date:'22.11.2020',complited:false},
			{me:true,name:'Илья',description:'Масло',value:45,date:'21.11.2020',complited:true},
			{me:true,name:'Илья',description:'Часть суммы от аренды квартиры на осетинской',value:300,date:'14.11.2020',complited:false},
		],
		debtsIncome:[
			{me:true,name:'Илья',description:'Купил пиво',value:90,date:'11.12.2020'},
		],
		income:[
			// {name:'Зарплата',value:40000,date:'16.11.2020',isIncome:true},
		],
		expenses:[
			// {name:'Хранение байка',value:1000,date:'07.11.2020',type:'motorcycle',isIncome:false},
		]
	},
	mutations: {
		createEvent(state,event){
			if(event.isIncome) {
				state.income.push(event) 
				state.money += event.value
			} else {
				state.expenses.push(event)
				state.money -= event.value
			}
		},
		addTodo(state,todo){
			state.todo.push(todo)
		},
		changeTodoStatus(state,data){
			const el = state.todo.find(t => t.id === data.id)
			el.complited = !el.complited
			el.complited ? el.dateComplited = data.date : el.dateComplited = null
		},
		editTodo(state,id,todo){
			const el = state.todo.find(t => t.id === id)
			el.text = todo
		},
		removeTodo(state,id){
			state.todo.splice(state.todo.findIndex(t => t.id === id),1)
		},
		addTodoIdCount(state){
			state.todoIdCount++
		},
		changeDebt(state,debt){
			state.debts.push(debt)
		},
		addDebts(state,debt){
			state.debts.push(debt)
		},
		addDebtsIcnome(state,debt){
			state.debtsIncome.push(debt)
		},
		changeDebt(state,id,value,date){
			let debt = state.debts.find(t => t.id === t)
			if(value){
				debt.value = value
				debt.history.push({date,value})
			} else {
				debt.complited = !debt.complited
			}
		}
	},
	// modules:{
	// 	Auth
	// },
	actions: {
		async login({dispatch,commit},{email,password}){
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password)
			} catch(e) {
				throw e
				console.log(e)
			}
		},
		async register({dispatch},{email,password,name}){
			try{
				await firebase.auth().createUserWithEmailAndPassword(email,password)
				const uid = await dispatch('getUid')
				await firebase.database().ref(`/users/${uid}/info`).set({
					bill: 0,
					name,
				})
			} catch(e){
				throw e
				console.log(e)
			}
		},
		getUid(){
			const user = firebase.auth().currentUser
			return user ? user.uid : null
		},
		createEvent({commit},event){
			commit('createEvent',event)
		},
		addTodo({commit},todo){
			commit('addTodo',todo)
		},
		changeTodoStatus({commit},data){
			commit('changeTodoStatus',data)
		},
		editTodo({commit},id,todo){
			commit('editTodo',id,todo)
		},
		removeTodo({commit},id){
			commit('removeTodo',id)
		},
		addTodoIdCount({commit}){
			commit('addTodoIdCount')
		},
		changeDebt({commit},id,value,date){
			commit('changeDebt',id,value,date)
		},
		addDebts({commit},debt){
			commit('addDebts',debt)
		},
		addDebtsIcnome({commit},debt){
			commit('addDebtsIcnome',debt)
		}
	},
	modules: {

	},
	getters:{
		money: s=> s.money,
		typesConsumption: s=> s.typesConsumption,
		income: s=> s.income,
		expenses: s=> s.expenses,
		namesOfTypes: s=> s.namesOfTypes,
		randomMoments: s=> s.randomMoments,
		todoList: s=> s.todo,
		todoIdCount: s=> s.todoIdCount,
		debts: s=> s.debts,
		debtsIncome: s=> s.debtsIncome,
	}
})
