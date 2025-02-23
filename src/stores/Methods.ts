// src/stores/patientStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiStore } from '@/stores/api'

export const useMethodStore = defineStore('methods', () => {
  const infoDetail = ref<never | null>(null)
  const infoAll = ref<never | null>(null)
  const loading = ref<boolean>(false)

  async function fetchMethodAll(endpoint : string) {
    loading.value = true
    try {
      const apiStore = useApiStore()
      const response = await apiStore.apiFetch('GET', `api/${endpoint}`)
      infoAll.value = await response.json()
    } catch (error) {
      console.error('Error fetching all:', error)
    } finally {
      loading.value = false
    }
  }

  async function fetchMethodDetail(endpoint : string,detailId: number) {
    loading.value = true
    try {
      const apiStore = useApiStore()
      const response = await apiStore.apiFetch('GET', `api/${endpoint}/${detailId}`)
      infoDetail.value = await response.json()
    } catch (error) {
      console.error('Error fetching detail:', error)
    } finally {
      loading.value = false
    }
  }

  async function createMethodDetail(endpoint : string,payload: any) {
    loading.value = true
    try {
      const apiStore = useApiStore()
      const response = await apiStore.apiFetch('POST', `api/${endpoint}`, payload)
      infoDetail.value = await response.json()
    } catch (error) {
      console.error('Error creating detail:', error)
    } finally {
      loading.value = false
    }
  }

  async function updateMethodDetail(endpoint : string , detailId: number , payload: any) {
    loading.value = true
    try {
      const apiStore = useApiStore()
      const response = await apiStore.apiFetch('PATCH', `api/${endpoint}/${detailId}`, payload)
      infoDetail.value = await response.json()
    } catch (error) {
      console.error('Error updating detail:', error)
    } finally {
      loading.value = false
    }
  }

  async function deleteMethodDetail(endpoint : string,detailId: number) {
    loading.value = true
    try {
      const apiStore = useApiStore()
      await apiStore.apiFetch('DELETE', `api/${endpoint}/${detailId}`)
      infoDetail.value = null
    } catch (error) {
      console.error('Error deleting  detail:', error)
    } finally {
      loading.value = false
    }
  }

  return {
      infoDetail,
      infoAll,
    loading,
    fetchMethodDetail,
    createMethodDetail,
    updateMethodDetail,
    deleteMethodDetail,
    fetchMethodAll,
  }
})
