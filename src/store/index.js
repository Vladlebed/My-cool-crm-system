import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import moment from 'moment'

// Modules
import CRM from '@/store/modules/CRM/crm'
import todo from '@/store/modules/Todo/todo'
import auth from '@/store/modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {

	},
	mutations: {

	},
	actions: {
		getUid(){
			const user = firebase.auth().currentUser
			return user ? user.uid : null
		},
	},
	modules: {
		auth,
		CRM,
		todo,
	},
	getters:{

	}
})
