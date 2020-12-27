import firebase from 'firebase/app'

export default{
	state:{
		auth: (JSON.parse(localStorage.getItem("auth")) || false )
	},
	mutations:{
		setAuth(state){
			state.auth = !state.auth
			localStorage.setItem("auth",state.auth)
		}
	},
	actions:{
		async login({dispatch,commit},{email,password}){
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password)
				commit('setAuth')
			} catch(e) {
				throw e
				console.log(e)
			}
		},
		async register({dispatch,commit},{email,password,name}){
			try{
				await firebase.auth().createUserWithEmailAndPassword(email,password)
				const uid = await dispatch('getUid')
				await firebase.database().ref(`/users/${uid}/info`).set({
					money: 0,
					name,
				})
				commit('setAuth')
			} catch(e){
				throw e
				console.log(e)
			}
		},
	    async logout({commit}) {
			await firebase.auth().signOut()
			commit('setAuth')
	    }
	},
	getters:{
		authState: s => s.auth
	}
}