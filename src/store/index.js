import Vue from 'vue'
import Vuex from 'vuex'
import namesOfTypes from '@/assets/namesOfTypes'
import randomMoments from '@/assets/randomMoments'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		auth:false,
		money:40000,
		todo:[
			{id:0,text:'Покурить', dateCreate:'18.11.2020, 23:00',dateComplited:null, complited: false}
		],
		todoIdCount:1,
		typesConsumption:[
			'food',
			'fun',
			'housing',
			'motorcycle',
			'alco',
			'sigar',
			'energy',
			'trouble',
			'other',
		],
		namesOfTypes,
		randomMoments,
		income:[
			{name:'Зарплата',value:40000,date:'16.11.2020',isIncome:true},
		],
		expenses:[
			{name:'Хранение байка',value:1000,date:'07.11.2020',type:'motorcycle',isIncome:false},
			// {name:'Магазин',value:170,date:'17.11.2020',type:'food',isIncome:false},
			// {name:'Магазин',value:200,date:'15.11.2020',type:'food',isIncome:false},
		]
	},
	mutations: {
		createEvent(state,event){
			if(event.isIncome) {
				state.income.push(event) 
				state.money += event.value
			} else {
				state.expenses.push(event)
				state.money -= event.value
			}
		},
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
		addTodoIdCount(state){
			state.todoIdCount++
		}
	},
	actions: {
		createEvent({commit},event){
			commit('createEvent',event)
		},
		addTodo({commit},todo){
			commit('addTodo',todo)
		},
		changeTodoStatus({commit},data){
			commit('changeTodoStatus',data)
		},
		editTodo({commit},id,todo){
			commit('editTodo',id,todo)
		},
		removeTodo({commit},id){
			commit('removeTodo',id)
		},
		addTodoIdCount({commit}){
			commit('addTodoIdCount')
		}
	},
	modules: {

	},
	getters:{
		money: s=> s.money,
		typesConsumption: s=> s.typesConsumption,
		income: s=> s.income,
		expenses: s=> s.expenses,
		namesOfTypes: s=> s.namesOfTypes,
		randomMoments: s=> s.randomMoments,
		todoList: s=> s.todo,
		todoIdCount: s=> s.todoIdCount
	}
})
