<script setup lang="ts">
import { RouterView, RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.ts'
import { ref, watch } from 'vue'

// Simulate user state by checking localStorage (replace with your auth logic)
const router = useRouter()
const auth = useAuthStore()

watch(auth.isLoggedIn, (isLoggedIn) => {
  if (!isLoggedIn) {
    router.push('/login')
  }
})
const isLoggedIn = ref(auth.isLoggedIn())
function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app">
    <aside class="sidebar">
      <nav>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <!-- <li><RouterLink to="/about">About</RouterLink></li> -->
          <li v-if="!isLoggedIn"><RouterLink to="/login">Login</RouterLink></li>
          <li v-if="!isLoggedIn"><RouterLink to="/signup">Signup</RouterLink></li>
          <li v-else><a @click="logout" class="logout">Logout</a></li>
        </ul>
      </nav>
    </aside>
    <main class="main-container">
      <div class="main-inner-container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Container that holds both the sidebar and main content */
.app {
  display: flex;
  height: 100vh;
  margin: 0;
  padding: 0;
}

/* Logo styling */
</style>
