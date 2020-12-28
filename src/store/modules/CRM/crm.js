import firebase from 'firebase/app'

//modules
import debts from '@/store/modules/CRM/modules/debts'

export default{
	state:{
		money:0,
		categories:[],
		income:[],
		expenses:[],
		note: ''
	},
	mutations:{
		setMoneyCount(state,moneyCount){
			state.money = moneyCount
		},
		setCategories(state,categories){
			if(categories){
				const categoriesArray = []
				Object.keys(categories).forEach((key) => {
					categoriesArray.push({
						name: categories[key].name,
						chartColor: categories[key].chartColor,
						icon: categories[key].icon,
						translite: categories[key].translite,
						id: key
					})					
				})
				state.categories = categoriesArray
			} else {
				state.categories = []
			}
		},
		async createEvent(state,event){
			console.log(event)
			if(event.body.isIncome) {
				await firebase.database().ref(`/users/${event.uid}/transactions/${event.month}/income`).push(event.body)
				state.income.push(event.body) 
				console.log('before',state.money)
				state.money += event.body.value
				console.log('after',state.money)
			} else {
				await firebase.database().ref(`/users/${event.uid}/transactions/${event.month}/expenses`).push(event.body)
				state.expenses.push(event.body)
				state.money -= event.body.value
			}
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
				state.income = transactionsIncomeArray
				state.expenses = transactionsExpensesArray
			} else {
				state.income = []
				state.expenses = []
			}
		},
		async getNote(state,uid){
			const note = (await firebase.database().ref(`/users/${uid}/CRM/note`).once('value')).val()
			note ? state.note = note : state.note = ''
		}
	},
	actions:{
		async getMoneyCount({dispatch,commit}){
			try {
				const uid = await dispatch('getUid')
				const money = (await firebase.database().ref(`/users/${uid}/info/money`).once('value')).val() || 0
				commit('setMoneyCount',money)
			} catch(e) {
				console.log(e);
			}			
		},
		async getCategories({dispatch,commit}){
			try {
				const uid = await dispatch('getUid')
				const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val()
				commit('setCategories',categories)
			} catch(e) {
				console.log(e);
			}			
		},
		async createCategory({dispatch,commit},category){
			try {
				const uid = await dispatch('getUid')
				await firebase.database().ref(`/users/${uid}/categories`).push(category)
				dispatch('getCategories')
			} catch(e) {
				console.log(e);
			}				
		},
		async setMoneyCount({dispatch,commit},money){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/info`).update({
				money
			})
			commit('setMoneyCount',money)
		},
		async getTransactions({dispatch,commit},{date}){
			try {
				const uid = await dispatch('getUid')
				const transactions = (await firebase.database().ref(`/users/${uid}/transactions/${date}`).once('value')).val()
				// commit('setTransactions',transactions)
				return transactions
			} catch(e) {
				console.log(e);
			}			
		},
		setTransactions({commit},transactions){
			commit('setTransactions',transactions)
		},
		async createEvent({dispatch,commit},event){
			event.uid = await dispatch('getUid')
			commit('createEvent',event)
		},
		async saveNote({dispatch,commit},note){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/CRM`).update({
				note
			})
		},
		async getNote({dispatch,commit}){
			const uid = await dispatch('getUid')
			commit('getNote',uid)
		}
	},
	getters:{
		money: s=> s.money,
		categories: s=> s.categories,
		income: s=> s.income,
		expenses: s=> s.expenses,
		note: s=> s.note		
	},
	modules:{
		debts,		
	}
}