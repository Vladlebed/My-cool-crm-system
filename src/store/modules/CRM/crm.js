import firebase from 'firebase/app'

//modules
import transactions from '@/store/modules/CRM/modules/transactions'
import debts from '@/store/modules/CRM/modules/debts'

export default{
	state:{
		money:0,
		typesConsumption:[],	
	},
	mutations:{
		setMoneyCount(state,moneyCount){
			state.money = moneyCount
		},
		setTypesConsumption(state,typesConsumption){
			state.typesConsumption = typesConsumption
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
		async getTypesConsumption({dispatch,commit}){
			try {
				const uid = await dispatch('getUid')
				const typesConsumption = (await firebase.database().ref(`/users/${uid}/typesConsumption`).once('value')).val()
				commit('setTypesConsumption',typesConsumption)
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
		typesConsumption: s=> s.typesConsumption,		
	},
	modules:{
		transactions,
		debts,		
	}
}