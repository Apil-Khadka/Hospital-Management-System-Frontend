// src/stores/authStore.ts
import { defineStore } from 'pinia'
import router from '@/router'
import { ref } from 'vue'

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
  },
})
