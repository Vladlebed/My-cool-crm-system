import firebase from 'firebase/app'

export default {
	state: {
		notes:[]
	},
	mutations: {
		setNotes(state,notes){
			if(notes){
				const notesArray = []
				Object.keys(notes).forEach((key) => {
					notesArray.push({
						title: notes[key].title,
						text: notes[key].text,
						id: key
					})					
				})
				state.notes = notesArray
			} else {
				state.notes = []
			}			
		}
	},
	actions: {
		async createNote({dispatch,commit},note){
			note = note || {title: '', text: ''}
			const uid = await dispatch('getUid')
			const id = await firebase.database().ref(`/users/${uid}/notes`).push({title: note.title, text: note.text}).key
			return id
		},
		async updateNote({dispatch},note){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/notes/${note.id}`).update({title: note.title,text: note.text})
		},
		async getNote({dispatch},id){
			const uid = await dispatch('getUid')
			const note = (await firebase.database().ref(`/users/${uid}/notes/${id}`).once('value')).val()
			return note
		},
		async getAllNotes({dispatch,commit}){
			const uid = await dispatch('getUid')
			const notes = (await firebase.database().ref(`/users/${uid}/notes`).once('value')).val()
			commit('setNotes',notes)
		},
		async removeNote({dispatch},id){
			const uid = await dispatch('getUid')
			console.log(id)
			await firebase.database().ref(`/users/${uid}/notes/${id}`).remove()
		}
	},
	getters:{
		notesList: s=> s.notes
	}
}