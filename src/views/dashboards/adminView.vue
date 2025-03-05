<script setup lang="ts">
import { useMethodStore } from '@/stores/Methods'
import { ref } from 'vue'

const methodStore = useMethodStore()
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')

const createUser = async () => {
  try {
    await methodStore.createMethodDetail('user', {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    })
    // Optionally, reset the form fields
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    password.value = ''
  } catch (error) {
    console.error('Error creating user:', error)
  }
}
</script>

<template>
  <div>
    <h1>Create New User</h1>
    <form @submit.prevent="createUser">
      <div>
        <label for="firstName">First Name:</label>
        <input id="firstName" v-model="firstName" type="text" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input id="lastName" v-model="lastName" type="text" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Create User</button>
    </form>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
