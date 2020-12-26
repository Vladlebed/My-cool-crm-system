import firebase from 'firebase/app'

export default{
	actions:{
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
	    async logout({commit}) {
			await firebase.auth().signOut()
	    }
	},
}