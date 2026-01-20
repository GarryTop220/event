<template>
  <div class="event-card" @click="goToEvent">
    <div class="event-image">
      <img :src="event.image" :alt="event.title" />
      <div class="event-status" :class="statusClass">
        {{ statusText }}
      </div>
    </div>
    
    <div class="event-content">
      <div class="event-meta">
        <span class="event-category">{{ event.category }}</span>
        <span class="event-date">{{ formatDate(event.date) }}</span>
      </div>
      
      <h3 class="event-title">{{ event.title }}</h3>
      <p class="event-description">{{ event.description }}</p>
      
      <div class="event-details">
        <div class="event-location">
          <span class="icon">📍</span>
          {{ event.location }}
        </div>
        <div class="event-time">
          <span class="icon">🕐</span>
          {{ event.time }}
        </div>
      </div>
      
      <div class="event-stats">
        <div class="capacity-info">
          <div class="capacity-bar">
            <div 
              class="capacity-fill" 
              :style="{ width: capacityPercentage + '%' }"
            ></div>
          </div>
          <span class="capacity-text">
            {{ event.registeredCount }}/{{ event.capacity }} учасників
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
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
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    goToEvent() {
      this.$router.push(`/event/${this.event.id}`)
    }
  }
}
</script>

<style scoped>
.event-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.event-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.event-card:hover .event-image img {
  transform: scale(1.05);
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

.event-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.event-category {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.event-date {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.event-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.event-description {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 1rem 0;
  flex-grow: 1;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.event-location,
.event-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;
}

.icon {
  font-size: 1rem;
}

.event-stats {
  margin-top: auto;
}

.capacity-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.capacity-bar {
  width: 100%;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.capacity-fill {
  height: 100%;
  background: linear-gradient(90deg, #059669, #10b981);
  transition: width 0.3s ease;
}

.capacity-text {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

@media (max-width: 768px) {
  .event-content {
    padding: 1rem;
  }
  
  .event-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>