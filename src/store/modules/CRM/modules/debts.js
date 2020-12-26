import firebase from 'firebase/app'

export default{
	state:{
		debts:[],
		debtsIncome:[],		
	},
	mutations:{
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
		},
	},
	actions:{
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
		async getDebts({dispatch,commit}){
			try {
				const uid = await dispatch('getUid')
				const debts = (await firebase.database().ref(`/users/${uid}/debts`).once('value')).val()
				commit('setDebts',debts)	
			} catch(e) {
				console.log(e);
			}			
		},
	},
	getters:{
		debts: s=> s.debts,
		debtsIncome: s=> s.debtsIncome,		
	}
}