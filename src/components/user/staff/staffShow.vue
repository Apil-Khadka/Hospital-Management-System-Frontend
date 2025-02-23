<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userItem from '../userItem.vue';
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const staffStore = useMethodStore()
const authStore = useAuthStore();
const staffId = ref<number>(0);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  const userInfo = await authStore.userInfo();
  staffId.value = userInfo.user.detail.id;
  await staffStore.fetchMethodDetail('staff',staffId.value);
  console.log(staffStore.infoDetail)
});



async function handleDelete() {
  try {
    if (staffStore.infoDetail && staffStore.infoDetail.data.id) {
      await staffStore.deleteMethodDetail('staff',staffStore.infoDetail.data.id);
      window.location.reload()
    }
  } catch (error) {
    errorMessage.value = 'Failed to delete patient detail';
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
    <div v-if="staffStore.infoDetail">
      <p><strong>User Name:</strong> {{ staffStore.infoDetail.data.user_name }}</p>
      <p><strong>Department Name:</strong> {{ staffStore.infoDetail.data.department_name }}</p>
      <p><strong>Specialization:</strong> {{ staffStore.infoDetail.data.specialization }}</p>
      <p><strong>Qualification:</strong> {{ staffStore.infoDetail.data.qualification }}</p>
      <p> <strong>Salary: </strong>{{staffStore.infoDetail.data.salary}}</p>
      <p><strong>Experience Years:</strong> {{ staffStore.infoDetail.data.experience_years }}</p>
      <p><strong>License Number:</strong> {{ staffStore.infoDetail.data.license_number }}</p>
      <p><strong>Date of Birth:</strong> {{ staffStore.infoDetail.data.date_of_birth }}</p>
      <p><strong>Gender:</strong> {{ staffStore.infoDetail.data.gender }}</p>
      <p><strong>Phone Number:</strong> {{ staffStore.infoDetail.data.phone_number }}</p>
      <p><strong>Temporary Address:</strong> {{ staffStore.infoDetail.data.temporary_address }}</p>
      <p><strong>Permanent Address:</strong> {{ staffStore.infoDetail.data.permanent_address }}</p>
      <p><strong>Employment Status:</strong> {{ staffStore.infoDetail.data.employment_status }}</p>
      <p><strong>Shift Details:</strong> {{ staffStore.infoDetail.data.shift_details }}</p>
      <p><strong>Emergency Contact Name:</strong> {{ staffStore.infoDetail.data.emergency_contact_name }}</p>
      <p><strong>Emergency Contact Relationship:</strong> {{ staffStore.infoDetail.data.emergency_contact_relationship }}</p>
      <p><strong>Emergency Contact Phone:</strong> {{ staffStore.infoDetail.data.emergency_contact_phone }}</p>
    </div>
    </div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <template #footer>
      <button @click="handleDelete">Delete Patient</button>
    </template>
  </user-item>
</template>
