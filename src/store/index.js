import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './Auth'
import randomMoments from '@/assets/randomMoments'
import firebase from 'firebase/app'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		money:0,
		todo:[],
		todoIdCount:1,
		typesConsumption:[],
		randomMoments,
		debts:[],
		debtsIncome:[],
		income:[],
		expenses:[]
	},
	mutations: {
		async createEvent(state,event){
			if(event.body.isIncome) {
				state.income.push(event.body) 
				state.money += event.body.value
				await firebase.database().ref(`/users/${event.uid}/transactions/${event.month}/income`).push(event.body)
			} else {
				state.expenses.push(event.body)
				state.money -= event.body.value
				await firebase.database().ref(`/users/${event.uid}/transactions/${event.month}/expenses`).push(event.body)
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
		},
		setMoneyCount(state,moneyCount){
			state.money = moneyCount
		},
		setTransactions(state,transactions){
			if(transactions){
				const transactionsIncomeArray = []
				const transactionsExpensesArray = []
				if(transactions.income){
					Object.keys(transactions.income).forEach((key) => {
						transactionsIncomeArray.push({
							name: transactions.income[key].name,
							value: transactions.income[key].value,
							date: transactions.income[key].date,
							isIncome: transactions.income[key].isIncome,
							id: key
						})					
					})
				}
				if(transactions.expenses){
					Object.keys(transactions.expenses).forEach((key) => {
						transactionsExpensesArray.push({
							name: transactions.expenses[key].name,
							value: transactions.expenses[key].value,
							date: transactions.expenses[key].date,
							type: transactions.expenses[key].type,
							isIncome: transactions.expenses[key].isIncome,
							id: key
						})					
					})
				}
				state.income = transactionsIncomeArray || []
				state.expenses = transactionsExpensesArray || []
			} else {
				state.income.length = 0
				state.expenses.length = 0
				console.log(state.income)
			}

		},
		setTypesConsumption(state,typesConsumption){
			state.typesConsumption = typesConsumption
		},
		setDebts(state,debts){
			if(debts){
				const debtsActual = []
				const debtsComplited = []
				if(debts.actual){
					Object.keys(debts.actual).forEach((key) => {
						debtsActual.push({
							me: debts.actual[key].me,
							name: debts.actual[key].name,
							value: debts.actual[key].value,
							date: debts.actual[key].date,
							description: debts.actual[key].description,
							complited: debts.actual[key].complited,
							id: key
						})					
					})
				}
				if(debts.completed){
					Object.keys(debts.completed).forEach((key) => {
						debtsComplited.push({
							me: debts.completed[key].me,
							name: debts.completed[key].name,
							value: debts.completed[key].value,
							date: debts.completed[key].date,
							description: debts.completed[key].description,
							complited: debts.completed[key].complited,
							id: key
						})					
					})
				}
				state.debts = debtsActual
				state.debtsIncome = debtsComplited				
			} else {
				state.debts.length = 0
				state.debtsIncome.length = 0				
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
					money: 0,
					name,
				})
			} catch(e){
				throw e
				console.log(e)
			}
		},
		async getMoneyCount({dispatch,commit}){
			try {
				const uid = await dispatch('getUid')
				const money = (await firebase.database().ref(`/users/${uid}/info/money`).once('value')).val() || 0
				commit('setMoneyCount',money)
			} catch(e) {
				console.log(e);
			}			
		},
		async getTypesConsumption({dispatch,commit}){
			try {
				const uid = await dispatch('getUid')
				const typesConsumption = (await firebase.database().ref(`/users/${uid}/typesConsumption`).once('value')).val()
				commit('setTypesConsumption',typesConsumption)
			} catch(e) {
				console.log(e);
			}			
		},
		async getTodos({dispatch,commit}){
			try {
				const uid = await dispatch('getUid')
				const todos = (await firebase.database().ref(`/users/${uid}/todo`).once('value')).val()
			} catch(e) {
				console.log(e);
			}			
		},
		async getDebts({dispatch,commit}){
			try {
				const uid = await dispatch('getUid')
				const debts = (await firebase.database().ref(`/users/${uid}/debts`).once('value')).val()
				commit('setDebts',debts)	
			} catch(e) {
				console.log(e);
			}			
		},
		async getTransactions({dispatch,commit},{date}){
			try {
				const uid = await dispatch('getUid')
				const transactions = (await firebase.database().ref(`/users/${uid}/transactions/${date}`).once('value')).val()
				commit('setTransactions',transactions)
				return true
			} catch(e) {
				console.log(e);
			}			
		},
		getUid(){
			const user = firebase.auth().currentUser
			return user ? user.uid : null
		},
		async createEvent({dispatch,commit},event){
			event.uid = await dispatch('getUid')
			commit('createEvent',event)
		},
		async setMoneyCount({dispatch,commit},money){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/info`).update({
				money
			})
			commit('setMoneyCount',money)
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
		async addDebts({dispatch,commit},debt){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/debts/actual`).push(debt)
			commit('addDebts',debt)
		},
		async addDebtsIcnome({dispatch,commit},debt){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/debts/completed`).push(debt)
			commit('addDebtsIcnome',debt)
		},
	    async logout({commit}) {
			await firebase.auth().signOut()
	    }		
	},
	modules: {

	},
	getters:{
		money: s=> s.money,
		typesConsumption: s=> s.typesConsumption,
		income: s=> s.income,
		expenses: s=> s.expenses,
		randomMoments: s=> s.randomMoments,
		todoList: s=> s.todo,
		todoIdCount: s=> s.todoIdCount,
		debts: s=> s.debts,
		debtsIncome: s=> s.debtsIncome,
	}
})
