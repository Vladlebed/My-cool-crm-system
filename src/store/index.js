import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import moment from 'moment'

// Modules
import CRM from '@/store/modules/CRM/crm'
import todo from '@/store/modules/Todo/todo'
import auth from '@/store/modules/auth'
import Notes from '@/store/modules/apps/notes'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		menu:[
			{name: 'CRM',route:'/apps/crm',classIcon:'fa-credit-card-alt'},
			{name: 'Todo',route:'/apps/todo',classIcon:'fa-list-alt'},
		]
	},
	mutations: {
		setAppInMenu(state,appData){
			state.menu.push(appData)
		},
		removeAppInMenu(state,appName){
			state.menu.splice(state.menu.findIndex(t=> t.name === appName),1)
		}
	},
	actions: {
		getUid(){
			const user = firebase.auth().currentUser
			return user ? user.uid : null
		},
		setAppInMenu({commit},appData){
			commit('setAppInMenu',appData)
		},
		removeAppInMenu({commit},appName){
			commit('removeAppInMenu',appName)
		},
	},
	modules: {
		auth,
		CRM,
		todo,
		Notes
	},
	getters:{
		getMenu: s=> s.menu
	}
})
