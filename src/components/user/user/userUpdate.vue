<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserItem from '@/components/user/userItem.vue'
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const userStore = useMethodStore()
const authStore = useAuthStore()
const user = ref<Record<string, unknown> | null>(null)
const userId = ref<number>(0)
const form = ref({
  firstname: '',
  lastname: '',
  password: '',
})
const originalForm = ref({ firstname: '', lastname: '' })

onMounted(async () => {
  const userInfo = await authStore.userInfo()
  userId.value = userInfo.user.id
  await userStore.fetchMethodDetail('user', userId.value)
  user.value = userStore.getDetail('user')?.data || null

  if (user.value) {
    form.value.firstname = user.value.firstname
    form.value.lastname = user.value.lastname
    originalForm.value = { ...form.value }
  }
})

function getChangedFields() {
  const changedFields: Partial<typeof form.value> = {}
  for (const key in form.value) {
    if (
      form.value[key as keyof typeof form.value] !==
        originalForm.value[key as keyof typeof originalForm.value] &&
      key !== 'password'
    ) {
      changedFields[key as keyof typeof form.value] = form.value[key as keyof typeof form.value]
    }
  }
  if (form.value.password) {
    changedFields.password = form.value.password
  }
  return changedFields
}

async function updateUser() {
  const payload = getChangedFields()
  if (Object.keys(payload).length > 0) {
    await userStore.updateMethodDetail('user', userId.value, payload)
    window.location.reload()
  }
}
</script>

<template>
  <userItem>
    <template #header>
      <h2>Update User Detail</h2>
    </template>
    <div v-if="userStore.loading">Loading...</div>
    <form v-else @submit.prevent="updateUser">
      <div>
        <label for="firstname">First Name:</label>
        <input type="text" id="firstname" v-model="form.firstname" />
      </div>
      <div>
        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" v-model="form.lastname" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" />
      </div>
      <button type="submit">Update</button>
    </form>
    <template #footer>
      <p>Make your changes and submit to update the user detail.</p>
    </template>
  </userItem>
</template>
