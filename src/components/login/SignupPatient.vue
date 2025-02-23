<script setup lang="ts">
import AuthItem from '@/components/login/AuthItem.vue'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.ts'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')

const handleSubmit = async (event: Event) => {
  event.preventDefault()

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    }),
  })

  const data = await response.json()
  if(data)
  {
  useAuthStore().loginSuccess(data.token, data.user_role);
  }

  if(sessionStorage.getItem('auth_token'))
  {
    useAuthStore().calculateRoute();
  }
  console.log(data)
}
</script>

<template>
  <AuthItem>
    <template #heading>
      <h1>Signup</h1>
    </template>
    <template #form>
      <form @submit="handleSubmit">
        <label for="firstname">First Name</label>
        <input v-model="firstname" type="text" id="firstname" name="firstname" />
        <label for="lastname">Last Name</label>
        <input v-model="lastname" type="text" id="lastname" name="lastname" />
        <label for="email">Email</label>
        <input v-model="email" type="text" id="email" name="email" />
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" name="password" />
        <button type="submit">Signup</button>
      </form>
    </template>
  </AuthItem>
</template>
