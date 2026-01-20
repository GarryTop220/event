<template>
  <div class="event-detail" v-if="event">
    <div class="event-hero">
      <div class="hero-content">
        <div class="hero-image">
          <img :src="event.image" :alt="event.title" />
          <div class="event-status" :class="statusClass">
            {{ statusText }}
          </div>
        </div>
        
        <div class="hero-info">
          <div class="breadcrumb">
            <router-link to="/" class="breadcrumb-link">Події</router-link>
            <span class="breadcrumb-separator">→</span>
            <span class="breadcrumb-current">{{ event.title }}</span>
          </div>
          
          <span class="event-category">{{ event.category }}</span>
          <h1 class="event-title">{{ event.title }}</h1>
          <p class="event-description">{{ event.description }}</p>
          
          <div class="event-meta-grid">
            <div class="meta-item">
              <span class="meta-icon">📅</span>
              <div class="meta-content">
                <span class="meta-label">Дата</span>
                <span class="meta-value">{{ formatDate(event.date) }}</span>
              </div>
            </div>
            
            <div class="meta-item">
              <span class="meta-icon">🕐</span>
              <div class="meta-content">
                <span class="meta-label">Час</span>
                <span class="meta-value">{{ event.time }}</span>
              </div>
            </div>
            
            <div class="meta-item">
              <span class="meta-icon">📍</span>
              <div class="meta-content">
                <span class="meta-label">Місце</span>
                <span class="meta-value">{{ event.location }}</span>
              </div>
            </div>
            
            <div class="meta-item">
              <span class="meta-icon">👤</span>
              <div class="meta-content">
                <span class="meta-label">Організатор</span>
                <span class="meta-value">{{ event.organizer }}</span>
              </div>
            </div>
          </div>
          
          <div class="capacity-section">
            <div class="capacity-header">
              <span class="capacity-title">Реєстрація учасників</span>
              <span class="capacity-count">{{ event.registeredCount }}/{{ event.capacity }}</span>
            </div>
            <div class="capacity-bar">
              <div 
                class="capacity-fill" 
                :style="{ width: capacityPercentage + '%' }"
              ></div>
            </div>
            <div class="capacity-status">
              <span v-if="capacityPercentage < 80" class="status-available">
                ✅ Місця доступні
              </span>
              <span v-else-if="capacityPercentage < 100" class="status-limited">
                ⚠️ Обмежена кількість місць
              </span>
              <span v-else class="status-full">
                ❌ Реєстрація закрита
              </span>
            </div>
          </div>
          
          <button 
            class="register-button"
            :disabled="capacityPercentage >= 100"
            @click="registerForEvent"
          >
            {{ registerButtonText }}
          </button>
        </div>
      </div>
    </div>
    
    <div class="event-content">
      <div class="container">
        <div class="content-grid">
          <div class="main-content">
            <section class="description-section">
              <h2>Детальна інформація</h2>
              <div class="description-content">
                <p>{{ event.fullDescription }}</p>
              </div>
            </section>
            
            <section class="program-section">
              <h2>Програма заходу</h2>
              <div class="program-content">
                <div class="program-item">
                  <span class="program-time">{{ event.time }}</span>
                  <div class="program-details">
                    <h4>Реєстрація учасників</h4>
                    <p>Прибуття та реєстрація учасників, отримання матеріалів</p>
                  </div>
                </div>
                
                <div class="program-item">
                  <span class="program-time">{{ addMinutes(event.time, 30) }}</span>
                  <div class="program-details">
                    <h4>Відкриття заходу</h4>
                    <p>Вітальне слово організаторів та презентація програми</p>
                  </div>
                </div>
                
                <div class="program-item">
                  <span class="program-time">{{ addMinutes(event.time, 60) }}</span>
                  <div class="program-details">
                    <h4>Основна частина</h4>
                    <p>{{ event.title }} - основна програма заходу</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          <div class="sidebar">
            <div class="info-card">
              <h3>Швидка інформація</h3>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">Категорія:</span>
                  <span class="info-value">{{ event.category }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Статус:</span>
                  <span class="info-value status" :class="statusClass">{{ statusText }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Місць всього:</span>
                  <span class="info-value">{{ event.capacity }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Зареєстровано:</span>
                  <span class="info-value">{{ event.registeredCount }}</span>
                </div>
              </div>
            </div>
            
            <div class="share-card">
              <h3>Поділитися подією</h3>
              <div class="share-buttons">
                <button @click="shareEvent('facebook')" class="share-button facebook">
                  📘 Facebook
                </button>
                <button @click="shareEvent('twitter')" class="share-button twitter">
                  🐦 Twitter
                </button>
                <button @click="copyLink" class="share-button link">
                  🔗 Копіювати посилання
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="not-found" v-else>
    <h2>Подію не знайдено</h2>
    <p>Можливо, подія була видалена або ви перейшли за неправильним посиланням.</p>
    <router-link to="/" class="back-button">Повернутися до списку подій</router-link>
  </div>
</template>

<script>
import { eventStore } from '../stores/eventStore.js'

export default {
  name: 'EventDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    event() {
      return eventStore.getEventById(this.id)
    },
    statusClass() {
      return `status-${this.event.status}`
    },
    statusText() {
      const statusMap = {
        active: 'Активна',
        upcoming: 'Скоро',
        draft: 'Чернетка'
      }
      return statusMap[this.event.status] || this.event.status
    },
    capacityPercentage() {
      return (this.event.registeredCount / this.event.capacity) * 100
    },
    registerButtonText() {
      if (this.capacityPercentage >= 100) return 'Реєстрація закрита'
      if (this.capacityPercentage >= 80) return 'Останні місця!'
      return 'Зареєструватися'
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('uk-UA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    addMinutes(timeString, minutes) {
      const [hours, mins] = timeString.split(':').map(Number)
      const totalMinutes = hours * 60 + mins + minutes
      const newHours = Math.floor(totalMinutes / 60)
      const newMins = totalMinutes % 60
      return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`
    },
    registerForEvent() {
      if (this.capacityPercentage >= 100) return
      
      // Симуляція реєстрації
      const updatedEvent = { ...this.event }
      updatedEvent.registeredCount = Math.min(updatedEvent.registeredCount + 1, updatedEvent.capacity)
      eventStore.updateEvent(updatedEvent)
      
      alert('Ви успішно зареєструвалися на подію!')
    },
    shareEvent(platform) {
      const url = window.location.href
      const text = `Подивіться на цю цікаву подію: ${this.event.title}`
      
      let shareUrl = ''
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          break
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
          break
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400')
      }
    },
    copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Посилання скопійовано!')
      })
    }
  }
}
</script>

<style scoped>
.event-detail {
  min-height: 100vh;
}

.event-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0 4rem;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 3rem;
  align-items: start;
}

.hero-image {
  position: relative;
}

.hero-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.event-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
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

.hero-info {
  padding-top: 1rem;
}

.breadcrumb {
  margin-bottom: 1rem;
  font-size: 0.875rem;
  opacity: 0.8;
}

.breadcrumb-link {
  color: inherit;
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
}

.event-category {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.event-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.event-description {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0 0 2rem 0;
}

.event-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
}

.meta-icon {
  font-size: 1.5rem;
}

.meta-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.75rem;
  opacity: 0.8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.meta-value {
  font-weight: 600;
}

.capacity-section {
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}

.capacity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.capacity-title {
  font-weight: 600;
}

.capacity-count {
  font-weight: 700;
  font-size: 1.1rem;
}

.capacity-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.capacity-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.3s ease;
}

.capacity-status {
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.status-available {
  color: #10b981;
}

.status-limited {
  color: #f59e0b;
}

.status-full {
  color: #ef4444;
}

.register-button {
  width: 100%;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.register-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.4);
}

.register-button:disabled {
  background: #6b7280;
  cursor: not-allowed;
  opacity: 0.6;
}

.event-content {
  background: #f8fafc;
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
}

.main-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.description-section,
.program-section {
  margin-bottom: 3rem;
}

.description-section h2,
.program-section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1.5rem 0;
}

.description-content {
  color: #374151;
  line-height: 1.8;
  font-size: 1.1rem;
}

.program-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.program-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  border-left: 4px solid #2563eb;
}

.program-time {
  font-weight: 700;
  color: #2563eb;
  min-width: 60px;
  font-size: 1.1rem;
}

.program-details h4 {
  margin: 0 0 0.5rem 0;
  color: #111827;
  font-weight: 600;
}

.program-details p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card,
.share-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.info-card h3,
.share-card h3 {
  margin: 0 0 1.5rem 0;
  color: #111827;
  font-weight: 700;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.info-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.info-label {
  font-weight: 500;
  color: #6b7280;
}

.info-value {
  font-weight: 600;
  color: #111827;
}

.info-value.status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  color: white;
}

.share-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.share-button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.share-button.facebook {
  background: #1877f2;
  color: white;
}

.share-button.twitter {
  background: #1da1f2;
  color: white;
}

.share-button.link {
  background: #6b7280;
  color: white;
}

.share-button:hover {
  transform: translateY(-1px);
  filter: brightness(110%);
}

.not-found {
  max-width: 600px;
  margin: 4rem auto;
  text-align: center;
  padding: 2rem;
}

.not-found h2 {
  color: #111827;
  margin-bottom: 1rem;
}

.not-found p {
  color: #6b7280;
  margin-bottom: 2rem;
}

.back-button {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  display: inline-block;
  transition: all 0.2s ease;
}

.back-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .event-meta-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding: 0 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .event-title {
    font-size: 2rem;
  }
  
  .main-content {
    padding: 1.5rem;
  }
  
  .program-item {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .program-time {
    min-width: auto;
  }
}
</style>