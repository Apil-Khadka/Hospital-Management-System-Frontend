<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userItem from '../userItem.vue'
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const userStore = useMethodStore()
const authStore = useAuthStore()
const userId = ref<number>(0)
const userDetail = ref<any>(null)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  const userInfo = await authStore.userInfo()
  userId.value = userInfo.user.id
  await userStore.fetchMethodDetail('user', userId.value)
  userDetail.value = userStore.getDetail('user')?.data || null
})
</script>

<template>
  <user-item>
    <template #header>
      <h2>User Detail</h2>
    </template>
    <div v-if="userStore.loading">Loading...</div>
    <div v-else>
      <div v-if="userDetail">
        <p><strong>First Name:</strong> {{ userDetail.firstname }}</p>
        <p><strong>Last Name:</strong> {{ userDetail.lastname }}</p>
        <p><strong>Email:</strong> {{ userDetail.email }}</p>
      </div>
    </div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <template #footer> </template>
  </user-item>
</template>
