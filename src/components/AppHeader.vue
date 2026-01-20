<template>
  <header class="app-header">
    <div class="header-container">
      <div class="logo">
        <router-link to="/" class="logo-link">
          <span class="logo-icon">🎉</span>
          <span class="logo-text">EventPortal</span>
        </router-link>
      </div>
      
      <nav class="main-nav">
        <router-link 
          to="/" 
          class="nav-link"
          :class="{ active: $route.name === 'Home' }"
        >
          <span class="nav-icon">🏠</span>
          Події
        </router-link>
        <router-link 
          to="/admin" 
          class="nav-link"
          :class="{ active: $route.name === 'Admin' }"
        >
          <span class="nav-icon">⚙️</span>
          Адмін
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  transition: transform 0.2s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 2rem;
}

.logo-text {
  background: linear-gradient(45deg, #ffffff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  position: relative;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.nav-link.active {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .main-nav {
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.5rem;
  }
}
</style>

<script>
export default {
  name: 'AppHeader'
}
</script>