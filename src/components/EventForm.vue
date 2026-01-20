<template>
  <div class="event-form-container">
    <div class="form-header">
      <h2>{{ isEditing ? 'Редагування події' : 'Створення нової події' }}</h2>
      <button @click="$emit('close')" class="close-button">✕</button>
    </div>
    
    <form @submit.prevent="handleSubmit" class="event-form">
      <div class="form-group">
        <label for="title">Назва події *</label>
        <input
          id="title"
          type="text"
          v-model="form.title"
          required
          placeholder="Введіть назву події"
          class="form-input"
        />
      </div>
      
      <div class="form-group">
        <label for="description">Короткий опис *</label>
        <textarea
          id="description"
          v-model="form.description"
          required
          placeholder="Короткий опис події"
          class="form-textarea"
          rows="3"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="fullDescription">Детальний опис</label>
        <textarea
          id="fullDescription"
          v-model="form.fullDescription"
          placeholder="Детальний опис події"
          class="form-textarea"
          rows="5"
        ></textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="date">Дата проведення *</label>
          <input
            id="date"
            type="date"
            v-model="form.date"
            required
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="time">Час проведення *</label>
          <input
            id="time"
            type="time"
            v-model="form.time"
            required
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="location">Місце проведення *</label>
        <input
          id="location"
          type="text"
          v-model="form.location"
          required
          placeholder="Адреса або назва місця"
          class="form-input"
        />
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="category">Категорія *</label>
          <select
            id="category"
            v-model="form.category"
            required
            class="form-select"
          >
            <option value="">Оберіть категорію</option>
            <option value="Технології">Технології</option>
            <option value="Мистецтво">Мистецтво</option>
            <option value="Бізнес">Бізнес</option>
            <option value="Музика">Музика</option>
            <option value="Спорт">Спорт</option>
            <option value="Освіта">Освіта</option>
            <option value="Екологія">Екологія</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="status">Статус *</label>
          <select
            id="status"
            v-model="form.status"
            required
            class="form-select"
          >
            <option value="draft">Чернетка</option>
            <option value="active">Активна</option>
            <option value="upcoming">Скоро</option>
          </select>
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="organizer">Організатор *</label>
          <input
            id="organizer"
            type="text"
            v-model="form.organizer"
            required
            placeholder="Назва організатора"
            class="form-input"
          />
        </div>
        
        <div class="form-group">
          <label for="capacity">Кількість місць *</label>
          <input
            id="capacity"
            type="number"
            v-model="form.capacity"
            required
            min="1"
            placeholder="Максимальна кількість учасників"
            class="form-input"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="image">URL зображення</label>
        <input
          id="image"
          type="url"
          v-model="form.image"
          placeholder="https://example.com/image.jpg"
          class="form-input"
        />
      </div>
      
      <div class="form-actions">
        <button type="button" @click="$emit('close')" class="cancel-button">
          Скасувати
        </button>
        <button type="submit" class="submit-button">
          {{ isEditing ? 'Зберегти зміни' : 'Створити подію' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EventForm',
  props: {
    event: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'save'],
  data() {
    return {
      form: {
        title: '',
        description: '',
        fullDescription: '',
        date: '',
        time: '',
        location: '',
        category: '',
        status: 'draft',
        organizer: '',
        capacity: 100,
        image: ''
      }
    }
  },
  computed: {
    isEditing() {
      return !!this.event
    }
  },
  mounted() {
    if (this.event) {
      this.form = { ...this.event }
    }
  },
  methods: {
    handleSubmit() {
      // Валідація
      if (!this.form.title.trim() || !this.form.description.trim()) {
        alert('Заповніть всі обов\'язкові поля')
        return
      }
      
      // Встановлення зображення за замовчуванням
      if (!this.form.image) {
        this.form.image = "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800"
      }
      
      this.$emit('save', { ...this.form })
    }
  }
}
</script>

<style scoped>
.event-form-container {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 0;
  margin-bottom: 2rem;
}

.form-header h2 {
  margin: 0;
  color: #111827;
  font-size: 1.5rem;
  font-weight: 700;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: #f3f4f6;
  color: #374151;
}

.event-form {
  padding: 0 2rem 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 600;
  font-size: 0.875rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f9fafb;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #2563eb;
  background: white;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.cancel-button {
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-button:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

.submit-button {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
}

@media (max-width: 768px) {
  .event-form-container {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .form-header {
    padding: 1.5rem 1.5rem 0;
  }
  
  .event-form {
    padding: 0 1.5rem 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .form-actions {
    flex-direction: column-reverse;
  }
  
  .cancel-button,
  .submit-button {
    width: 100%;
    justify-content: center;
  }
}
</style>