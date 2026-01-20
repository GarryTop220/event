<template>
  <div class="admin-page">
    <div class="admin-header">
      <div class="container">
        <h1 class="page-title">Адміністрування подій</h1>
        <p class="page-description">
          Керування подіями - створення, редагування та видалення
        </p>
        
        <div class="admin-stats">
          <div class="stat-card">
            <span class="stat-number">{{ totalEvents }}</span>
            <span class="stat-label">Всього подій</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ activeEvents }}</span>
            <span class="stat-label">Активні</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ draftEvents }}</span>
            <span class="stat-label">Чернетки</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="admin-content">
      <div class="container">
        <div class="admin-actions">
          <button @click="showCreateForm" class="create-button">
            ➕ Створити нову подію
          </button>
          
          <div class="filter-controls">
            <select v-model="statusFilter" class="status-filter">
              <option value="all">Всі статуси</option>
              <option value="active">Активні</option>
              <option value="upcoming">Скоро</option>
              <option value="draft">Чернетки</option>
            </select>
          </div>
        </div>
        
        <div class="events-table-container">
          <table class="events-table">
            <thead>
              <tr>
                <th>Подія</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Учасники</th>
                <th>Категорія</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="event in filteredEvents" 
                :key="event.id"
                class="event-row"
              >
                <td class="event-info">
                  <div class="event-image-small">
                    <img :src="event.image" :alt="event.title" />
                  </div>
                  <div class="event-details">
                    <h4 class="event-title-small">{{ event.title }}</h4>
                    <p class="event-location-small">{{ event.location }}</p>
                  </div>
                </td>
                <td class="event-date">
                  <div class="date-time">
                    <span class="date">{{ formatDate(event.date) }}</span>
                    <span class="time">{{ event.time }}</span>
                  </div>
                </td>
                <td class="event-status">
                  <span class="status-badge" :class="getStatusClass(event.status)">
                    {{ getStatusText(event.status) }}
                  </span>
                </td>
                <td class="event-participants">
                  <div class="participants-info">
                    <span class="participants-count">
                      {{ event.registeredCount }}/{{ event.capacity }}
                    </span>
                    <div class="participants-bar">
                      <div 
                        class="participants-fill"
                        :style="{ width: (event.registeredCount / event.capacity * 100) + '%' }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td class="event-category">
                  <span class="category-badge">{{ event.category }}</span>
                </td>
                <td class="event-actions">
                  <div class="action-buttons">
                    <button 
                      @click="viewEvent(event.id)" 
                      class="action-button view"
                      title="Переглянути"
                    >
                      👁️
                    </button>
                    <button 
                      @click="editEvent(event)" 
                      class="action-button edit"
                      title="Редагувати"
                    >
                      ✏️
                    </button>
                    <button 
                      @click="deleteEvent(event)" 
                      class="action-button delete"
                      title="Видалити"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div class="no-events" v-if="filteredEvents.length === 0">
            <div class="no-events-icon">📋</div>
            <h3>Події не знайдено</h3>
            <p>Створіть нову подію або змініть фільтр статусу</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Модальне вікно форми -->
    <div class="modal-overlay" v-if="showForm" @click="closeForm">
      <div class="modal-content" @click.stop>
        <EventForm
          :event="editingEvent"
          @save="saveEvent"
          @close="closeForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EventForm from '../components/EventForm.vue'
import { eventStore } from '../stores/eventStore.js'

export default {
  name: 'Admin',
  components: {
    EventForm
  },
  data() {
    return {
      showForm: false,
      editingEvent: null,
      statusFilter: 'all'
    }
  },
  computed: {
    filteredEvents() {
      const events = eventStore.events
      if (this.statusFilter === 'all') {
        return events
      }
      return events.filter(event => event.status === this.statusFilter)
    },
    totalEvents() {
      return eventStore.events.length
    },
    activeEvents() {
      return eventStore.events.filter(event => event.status === 'active').length
    },
    draftEvents() {
      return eventStore.events.filter(event => event.status === 'draft').length
    }
  },
  methods: {
    showCreateForm() {
      this.editingEvent = null
      this.showForm = true
    },
    editEvent(event) {
      this.editingEvent = event
      this.showForm = true
    },
    closeForm() {
      this.showForm = false
      this.editingEvent = null
    },
    saveEvent(eventData) {
      if (this.editingEvent) {
        // Редагування існуючої події
        eventStore.updateEvent(eventData)
      } else {
        // Створення нової події
        eventStore.addEvent(eventData)
      }
      this.closeForm()
    },
    deleteEvent(event) {
      if (confirm(`Ви впевнені, що хочете видалити подію "${event.title}"?`)) {
        eventStore.deleteEvent(event.id)
      }
    },
    viewEvent(id) {
      this.$router.push(`/event/${id}`)
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },
    getStatusClass(status) {
      return `status-${status}`
    },
    getStatusText(status) {
      const statusMap = {
        active: 'Активна',
        upcoming: 'Скоро',
        draft: 'Чернетка'
      }
      return statusMap[status] || status
    }
  }
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
}

.admin-header {
  background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%);
  color: white;
  padding: 3rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
}

.page-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0 0 2rem 0;
}

.admin-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
  font-weight: 600;
}

.admin-content {
  padding: 3rem 0;
}

.admin-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.create-button {
  background: linear-gradient(135deg, #059669, #047857);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.create-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(5, 150, 105, 0.3);
}

.filter-controls {
  display: flex;
  gap: 1rem;
}

.status-filter {
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-filter:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.events-table-container {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.events-table {
  width: 100%;
  border-collapse: collapse;
}

.events-table th {
  background: #f8fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

.events-table td {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.event-row:hover {
  background: #f9fafb;
}

.event-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 250px;
}

.event-image-small {
  width: 60px;
  height: 60px;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
}

.event-image-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-details {
  flex: 1;
}

.event-title-small {
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

.event-location-small {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
}

.date-time {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.date {
  font-weight: 600;
  color: #111827;
}

.time {
  color: #6b7280;
  font-size: 0.875rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.status-active {
  background: linear-gradient(135deg, #059669, #047857);
}

.status-upcoming {
  background: linear-gradient(135deg, #d97706, #b45309);
}

.status-draft {
  background: linear-gradient(135deg, #6b7280, #4b5563);
}

.participants-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 80px;
}

.participants-count {
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
}

.participants-bar {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.participants-fill {
  height: 100%;
  background: linear-gradient(90deg, #059669, #10b981);
  transition: width 0.3s ease;
}

.category-badge {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  background: none;
  border: 2px solid #e5e7eb;
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button.view {
  border-color: #3b82f6;
  color: #3b82f6;
}

.action-button.view:hover {
  background: #3b82f6;
  color: white;
}

.action-button.edit {
  border-color: #f59e0b;
  color: #f59e0b;
}

.action-button.edit:hover {
  background: #f59e0b;
  color: white;
}

.action-button.delete {
  border-color: #ef4444;
  color: #ef4444;
}

.action-button.delete:hover {
  background: #ef4444;
  color: white;
}

.no-events {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
}

.no-events-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-events h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #374151;
}

.no-events p {
  font-size: 1.1rem;
  margin: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
}

@media (max-width: 1024px) {
  .events-table-container {
    overflow-x: auto;
  }
  
  .events-table {
    min-width: 900px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .admin-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .create-button {
    text-align: center;
  }
  
  .modal-overlay {
    padding: 1rem;
  }
  
  .admin-stats {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .stat-card {
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
}
</style>