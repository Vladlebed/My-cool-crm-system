import Notes from '@/views/apps/Notes.vue'
import Note from '@/views/apps/Note.vue'
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
    path: '/apps/notes/:id',
    name: 'Note',
    meta: {layout: 'main', auth: true},
    component: Note
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