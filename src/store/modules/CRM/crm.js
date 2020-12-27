import firebase from 'firebase/app'

//modules
import transactions from '@/store/modules/CRM/modules/transactions'
import debts from '@/store/modules/CRM/modules/debts'

export default{
	state:{
		money:0,
		categories:[],	
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
	},
	getters:{
		money: s=> s.money,
		categories: s=> s.categories,		
	},
	modules:{
		transactions,
		debts,		
	}
}