import firebase from 'firebase/app'

export default{
	state:{
		income:[],
		expenses:[],		
	},
	mutations:{
		async createEvent(state,event){
			console.log(event)
			if(event.body.isIncome) {
				state.income.push(event.body) 
				state.money += +event.body.value
				await firebase.database().ref(`/users/${event.uid}/transactions/${event.month}/income`).push(event.body)
			} else {
				state.expenses.push(event.body)
				state.money -= +event.body.value
				await firebase.database().ref(`/users/${event.uid}/transactions/${event.month}/expenses`).push(event.body)
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
	},
	actions:{
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
	},
	getters:{
		income: s=> s.income,
		expenses: s=> s.expenses,		
	}
}