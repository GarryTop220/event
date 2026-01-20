import { reactive } from 'vue'
import { events as initialEvents } from '../data/events.js'

export const eventStore = reactive({
  events: [...initialEvents],
  searchQuery: '',
  selectedCategory: 'all',
  
  getFilteredEvents() {
    return this.events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      const matchesCategory = this.selectedCategory === 'all' || event.category === this.selectedCategory
      const isActive = event.status === 'active' || event.status === 'upcoming'
      
      return matchesSearch && matchesCategory && isActive
    })
  },
  
  getEventById(id) {
    return this.events.find(event => event.id === parseInt(id))
  },
  
  addEvent(event) {
    const newEvent = {
      ...event,
      id: Math.max(...this.events.map(e => e.id)) + 1,
      registeredCount: 0
    }
    this.events.push(newEvent)
  },
  
  updateEvent(updatedEvent) {
    const index = this.events.findIndex(event => event.id === updatedEvent.id)
    if (index !== -1) {
      this.events[index] = updatedEvent
    }
  },
  
  deleteEvent(id) {
    const index = this.events.findIndex(event => event.id === id)
    if (index !== -1) {
      this.events.splice(index, 1)
    }
  },
  
  getCategories() {
    const categories = [...new Set(this.events.map(event => event.category))]
    return categories.sort()
  }
})