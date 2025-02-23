<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userItem from '../userItem.vue'
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const patientStore = useMethodStore()
const authStore = useAuthStore()
const patient = ref<any>(null)
const patientId = ref<number>(0)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  const userInfo = await authStore.userInfo()
  patientId.value = userInfo.user.detail.id
  await patientStore.fetchMethodDetail('patient', patientId.value)
  patient.value = patientStore.getDetail('patient')?.data || null
})

async function handleDelete() {
  try {
    if (patient.value && patient.value.id) {
      await patientStore.deleteMethodDetail('patient', patient.value.id)
      window.location.reload()
    }
  } catch (error) {
    errorMessage.value = 'Failed to delete patient detail'
  }
}
</script>

<template>
  <userItem>
    <template #header>
      <h2>Patient Detail</h2>
    </template>
    <div v-if="patientStore.loading">Loading...</div>
    <div v-else>
      <div v-if="patient">
        <p><strong>MRN:</strong> {{ patient.mrn }}</p>
        <p><strong>Date of Birth:</strong> {{ patient.date_of_birth }}</p>
        <p><strong>Gender:</strong> {{ patient.gender }}</p>
        <p><strong>Blood Group:</strong> {{ patient.blood_group }}</p>
        <p><strong>Address:</strong> {{ patient.address }}</p>
        <p><strong>Phone:</strong> {{ patient.phone }}</p>
        <p>
          <strong>Emergency Contact Name:</strong>
          {{ patient.emergency_contact_name }}
        </p>
        <p>
          <strong>Emergency Contact Phone:</strong>
          {{ patient.emergency_contact_phone }}
        </p>
        <p>
          <strong>Emergency Contact Relationship:</strong>
          {{ patient.emergency_contact_relationship }}
        </p>
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
    <template #footer>
      <button @click="handleDelete">Delete Patient</button>
    </template>
  </userItem>
</template>
