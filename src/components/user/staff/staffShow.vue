<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userItem from '../userItem.vue'
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const staffStore = useMethodStore()
const authStore = useAuthStore()
const staff = ref<any>(null)
const staffId = ref<number>(0)
const errorMessage = ref<string | null>(null)

onMounted(async () => {
  const userInfo = await authStore.userInfo()
  staffId.value = userInfo.user.detail.id
  await staffStore.fetchMethodDetail('staff', staffId.value)
  staff.value = staffStore.getDetail('staff')?.data || null
})

async function handleDelete() {
  try {
    if (staff.id) {
      await staffStore.deleteMethodDetail('staff', staff.id)
      window.location.reload()
    }
  } catch (error) {
    errorMessage.value = 'Failed to delete patient detail'
  }
}
</script>

<template>
  <user-item>
    <template #header>
      <h2>Staff Detail</h2>
    </template>
    <div v-if="staffStore.loading">Loading...</div>
    <div v-else>
      <div v-if="staff">
        <p><strong>User Name:</strong> {{ staff.user_name }}</p>
        <p><strong>Department Name:</strong> {{ staff.department_name }}</p>
        <p><strong>Specialization:</strong> {{ staff.specialization }}</p>
        <p><strong>Qualification:</strong> {{ staff.qualification }}</p>
        <p><strong>Salary: </strong>{{ staff.salary }}</p>
        <p><strong>Experience Years:</strong> {{ staff.experience_years }}</p>
        <p><strong>License Number:</strong> {{ staff.license_number }}</p>
        <p><strong>Date of Birth:</strong> {{ staff.date_of_birth }}</p>
        <p><strong>Gender:</strong> {{ staff.gender }}</p>
        <p><strong>Phone Number:</strong> {{ staff.phone_number }}</p>
        <p><strong>Temporary Address:</strong> {{ staff.temporary_address }}</p>
        <p><strong>Permanent Address:</strong> {{ staff.permanent_address }}</p>
        <p><strong>Employment Status:</strong> {{ staff.employment_status }}</p>
        <p><strong>Shift Details:</strong> {{ staff.shift_details }}</p>
        <p>
          <strong>Emergency Contact Name:</strong>
          {{ staff.emergency_contact_name }}
        </p>
        <p>
          <strong>Emergency Contact Relationship:</strong>
          {{ staff.emergency_contact_relationship }}
        </p>
        <p>
          <strong>Emergency Contact Phone:</strong>
          {{ staff.emergency_contact_phone }}
        </p>
      </div>
    </div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <template #footer>
      <button @click="handleDelete">Delete Patient</button>
    </template>
  </user-item>
</template>
