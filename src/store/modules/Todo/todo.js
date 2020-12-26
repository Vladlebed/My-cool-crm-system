import firebase from 'firebase/app'

export default{
	state:{
		todo:[],
	},
	mutations:{
		addTodo(state,todo){
			state.todo.push(todo)
		},
		changeTodoStatus(state,data){
			const el = state.todo.find(t => t.id === data.id)
			el.complited = !el.complited
			el.complited ? el.dateComplited = data.date : el.dateComplited = null
		},
		editTodo(state,id,todo){
			const el = state.todo.find(t => t.id === id)
			el.text = todo
		},
		removeTodo(state,id){
			state.todo.splice(state.todo.findIndex(t => t.id === id),1)
		},
		setTodos(state,todos){
			if(todos){
				const todosArray = []
				Object.keys(todos).forEach((key) => {
					todosArray.push({
						text: todos[key].text,
						dateCreate: todos[key].dateCreate,
						dateComplited: todos[key].dateComplited,
						complited: todos[key].complited,
						id: key
					})					
				})
				state.todo = todosArray			
			} else {
				state.todo.length = 0
			}
		}
	},
	actions:{
		async getTodos({dispatch,commit}){
			try {
				const uid = await dispatch('getUid')
				const todos = (await firebase.database().ref(`/users/${uid}/todo`).once('value')).val()
				commit('setTodos',todos)
			} catch(e) {
				console.log(e);
			}			
		},
		async addTodo({dispatch,commit},todo){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/todo`).push(todo)
			dispatch('getTodos')
		},
		async changeTodoStatus({dispatch,commit},todoChange){
			const uid = await dispatch('getUid')
			const todoState = (await firebase.database().ref(`/users/${uid}/todo/${todoChange.id}`).once('value')).val()
			if(todoChange.date){
				await firebase.database().ref(`/users/${uid}/todo/${todoChange.id}`).update({
					complited: true,
					dateComplited: todoChange.date
				})				
				dispatch('getTodos')
				// await firebase.database().ref(`/users/${uid}/todo/${todo.id}`).update(todo)
			} else {
				await firebase.database().ref(`/users/${uid}/todo/${todoChange.id}`).update({
					complited: false,
					dateComplited: null
				})
				dispatch('getTodos')				
			}
		},
		editTodo({commit},id,todo){
			commit('editTodo',id,todo)
		},
		async removeTodo({dispatch,commit},id){
			const uid = await dispatch('getUid')
			await firebase.database().ref(`/users/${uid}/todo/${id}`).remove()
			commit('removeTodo',id)
		},
	},
	getters:{
		todoList: s=> s.todo,
	}
}