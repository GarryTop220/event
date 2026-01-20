<template>
  <div class="home-page">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Знайдіть найкращі події
          <span class="gradient-text">у вашому місті</span>
        </h1>
        <p class="hero-description">
          Відкрийте для себе цікаві конференції, виставки, концерти та багато іншого. 
          Приєднуйтеся до спільноти активних людей!
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">{{ totalEvents }}</span>
            <span class="stat-label">Подій</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ totalParticipants }}</span>
            <span class="stat-label">Учасників</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ categoriesCount }}</span>
            <span class="stat-label">Категорій</span>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Події" />
      </div>
    </div>
    
    <div class="content-section">
      <div class="container">
        <SearchFilter
          :search-query="searchQuery"
          :selected-category="selectedCategory"
          :filtered-count="filteredEvents.length"
          @update-search="updateSearch"
          @update-category="updateCategory"
        />
        
        <div class="events-grid" v-if="filteredEvents.length">
          <EventCard
            v-for="event in filteredEvents"
            :key="event.id"
            :event="event"
          />
        </div>
        
        <div class="no-events" v-else>
          <div class="no-events-icon">🔍</div>
          <h3>Події не знайдено</h3>
          <p>Спробуйте змінити критерії пошуку або очистити фільтри</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'
import SearchFilter from '../components/SearchFilter.vue'
import { eventStore } from '../stores/eventStore.js'

export default {
  name: 'Home',
  components: {
    EventCard,
    SearchFilter
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all'
    }
  },
  computed: {
    filteredEvents() {
      eventStore.searchQuery = this.searchQuery
      eventStore.selectedCategory = this.selectedCategory
      return eventStore.getFilteredEvents()
    },
    totalEvents() {
      return eventStore.events.filter(event => event.status !== 'draft').length
    },
    totalParticipants() {
      return eventStore.events.reduce((total, event) => total + event.registeredCount, 0)
    },
    categoriesCount() {
      return eventStore.getCategories().length
    }
  },
  methods: {
    updateSearch(query) {
      this.searchQuery = query
    },
    updateCategory(category) {
      this.selectedCategory = category
    }
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 0;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 1.5rem 0;
}

.gradient-text {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  margin: 0 0 2rem 0;
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #ffd700;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.hero-image {
  position: relative;
}

.hero-image img {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: rotate(3deg);
  transition: transform 0.3s ease;
}

.hero-image img:hover {
  transform: rotate(0deg) scale(1.02);
}

.content-section {
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
  min-height: 100vh;
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
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

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .events-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 0;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stats {
    justify-content: center;
    gap: 1.5rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .content-section {
    padding: 2rem 0;
  }
}
</style>