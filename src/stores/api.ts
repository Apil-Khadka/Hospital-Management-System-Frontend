// stores/api.ts
import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
  state: () => ({
    // For example, you might store an authentication token here
    token: sessionStorage.getItem('auth_token') || null,
  }),
  actions: {
    async apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
      // Default options with common headers
      const defaultOptions: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Optionally include an auth header if a token is available
          ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
        },
      }

      // Merge default options with any provided options
      const mergedOptions: RequestInit = {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...(options.headers || {}),
        },
      }

      return fetch(url, mergedOptions)
    },
  },
})
