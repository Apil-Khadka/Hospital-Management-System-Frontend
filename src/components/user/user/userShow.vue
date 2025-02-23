<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userItem from '../userItem.vue';
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const userStore = useMethodStore()
const authStore = useAuthStore();
const userId = ref<number>(0);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  const userInfo = await authStore.userInfo();
  userId.value = userInfo.user.id;
  await userStore.fetchMethodDetail('user',userId.value);
  console.log(userStore.infoDetail.data)
});
</script>

<template>
  <user-item>
    <template #header>
      <h2>User Detail</h2>
    </template>
    <div v-if="userStore.loading">Loading...</div>
    <div v-else>
    <div v-if="userStore.infoDetail">
      <p><strong>First Name:</strong> {{ userStore.infoDetail.data.firstname }}</p>
      <p><strong>Last Name:</strong> {{ userStore.infoDetail.data.lastname }}</p>
      <p><strong>Email:</strong> {{ userStore.infoDetail.data.email }}</p>
    </div>
    </div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <template #footer>

    </template>
  </user-item>
</template>
