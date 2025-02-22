<script setup lang="ts">
import AuthItem from '@/components/login/AuthItem.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const deviceName = navigator.userAgent;

const handleSubmit = async (event: Event) => {
  event.preventDefault()

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
      device: `${deviceName}`,
    }),
  })

  const data = await response.json()
  if(data)
  {
    sessionStorage.setItem("auth_token", data.access_token);
  }
  console.log(data)
  if (sessionStorage.getItem('auth_token')) {
    window.location.href = '/about';
  }
}
</script>

<template>
  <AuthItem>
    <template #heading>
      <h1>Login</h1>
    </template>
    <template #form>
      <form @submit="handleSubmit">
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email" name="email" />
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </template>
  </AuthItem>
</template>

<style scoped>
/* Add your styles here */
</style>
