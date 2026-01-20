<template>
  <div class="search-filter">
    <div class="search-container">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Пошук подій..."
          v-model="localSearchQuery"
          @input="updateSearch"
          class="search-input"
        />
      </div>
      
      <div class="filter-box">
        <span class="filter-icon">🏷️</span>
        <select
          v-model="localSelectedCategory"
          @change="updateCategory"
          class="category-select"
        >
          <option value="all">Всі категорії</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>
    
    <div class="results-info" v-if="searchQuery || selectedCategory !== 'all'">
      Знайдено {{ filteredCount }} {{ getEventWord(filteredCount) }}
      <button @click="clearFilters" class="clear-filters">
        Очистити фільтри
      </button>
    </div>
  </div>
</template>

<script>
import { eventStore } from '../stores/eventStore.js'

export default {
  name: 'SearchFilter',
  props: {
    searchQuery: String,
    selectedCategory: String,
    filteredCount: Number
  },
  data() {
    return {
      localSearchQuery: this.searchQuery,
      localSelectedCategory: this.selectedCategory
    }
  },
  computed: {
    categories() {
      return eventStore.getCategories()
    }
  },
  watch: {
    searchQuery(newVal) {
      this.localSearchQuery = newVal
    },
    selectedCategory(newVal) {
      this.localSelectedCategory = newVal
    }
  },
  methods: {
    updateSearch() {
      this.$emit('update-search', this.localSearchQuery)
    },
    updateCategory() {
      this.$emit('update-category', this.localSelectedCategory)
    },
    clearFilters() {
      this.localSearchQuery = ''
      this.localSelectedCategory = 'all'
      this.$emit('update-search', '')
      this.$emit('update-category', 'all')
    },
    getEventWord(count) {
      const remainder = count % 10
      if (remainder === 1 && count !== 11) return 'подія'
      if ([2, 3, 4].includes(remainder) && ![12, 13, 14].includes(count)) return 'події'
      return 'подій'
    }
  }
}
</script>

<style scoped>
.search-filter {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.search-container {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: center;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #9ca3af;
  font-size: 1.2rem;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;
}

.search-input:focus {
  outline: none;
  border-color: #2563eb;
  background: white;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.filter-box {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 200px;
}

.filter-icon {
  position: absolute;
  left: 1rem;
  color: #9ca3af;
  font-size: 1.2rem;
  z-index: 1;
}

.category-select {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 1rem;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-select:focus {
  outline: none;
  border-color: #2563eb;
  background: white;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.results-info {
  margin-top: 1.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #374151;
  font-weight: 500;
}

.clear-filters {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filters:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
}

@media (max-width: 768px) {
  .search-filter {
    padding: 1.5rem;
  }
  
  .search-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .filter-box {
    min-width: auto;
  }
  
  .results-info {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>