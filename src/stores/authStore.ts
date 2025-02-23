// src/stores/authStore.ts
import { defineStore } from 'pinia'
import router from '@/router'
import { ref } from 'vue'
import { useApiStore } from '@/stores/api.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    userRole: '',
  }),
  actions: {
    loginSuccess(token: string, userRole: string) {
      this.token = token
      this.userRole = userRole
      sessionStorage.setItem('auth_token', token)
      sessionStorage.setItem('user_role', userRole)
      this.calculateRoute()
    },
    calculateRoute() {
      const userRole = sessionStorage.getItem('user_role') || null
      switch (userRole) {
        case 'admin':
          router.push('/admin')
          break
        case 'patient':
          router.push('/patient')
          break
        case 'doctor':
          router.push('/doctor')
          break
        case 'nurse':
          router.push('/nurse')
          break
        default:
          router.push('/dashboard')
      }
    },
    logout() {
      sessionStorage.clear()
      router.push('/')
    },
    isLoggedIn() {
      const auth_token = ref(sessionStorage.getItem('auth_token') || null)
      return ref(!!auth_token.value)
    },
    async userInfo() {
      try {
        const apiStore = useApiStore();
        const response = await apiStore.apiFetch('GET', 'api/auth/info');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
  },
})
