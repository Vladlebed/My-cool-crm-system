import Notes from '@/views/apps/Notes.vue'
import CRM from '../views/CRM.vue'
import Todo from '../views/Todo.vue'

export default [
  {
    path: '/apps/notes',
    name: 'Notes',
    meta: {layout: 'main', auth: true},
    component: Notes
  },
  {
    path: '/apps/crm',
    name: 'CRM',
    meta: {layout: 'main', auth: true},
    component: CRM
  },   
  {
    path: '/apps/todo',
    name: 'Todo',
    meta: {layout: 'main', auth: true},
    component: Todo
  }, 
]