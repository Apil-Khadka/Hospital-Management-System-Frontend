<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userItem from '../userItem.vue';
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const patientStore = useMethodStore()
const authStore = useAuthStore();
const patientId = ref<number>(0);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  const userInfo = await authStore.userInfo();
  patientId.value = userInfo.user.detail.id;
  await patientStore.fetchMethodDetail('patient',patientId.value);
});



async function handleDelete() {
  try {
    if (patientStore.infoDetail && patientStore.infoDetail.data.id) {
      await patientStore.deleteMethodDetail('patient',patientStore.infoDetail.data.id);
      window.location.reload()
    }
  } catch (error) {
    errorMessage.value = 'Failed to delete patient detail';
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
      <div v-if="patientStore.infoDetail">
        <p><strong>MRN:</strong> {{ patientStore.infoDetail.data.mrn }}</p>
        <p><strong>Date of Birth:</strong> {{ patientStore.infoDetail.data.date_of_birth }}</p>
        <p><strong>Gender:</strong> {{ patientStore.infoDetail.data.gender }}</p>
        <p><strong>Blood Group:</strong> {{ patientStore.infoDetail.data.blood_group }}</p>
        <p><strong>Address:</strong> {{ patientStore.infoDetail.data.address }}</p>
        <p><strong>Phone:</strong> {{ patientStore.infoDetail.data.phone }}</p>
        <p><strong>Emergency Contact Name:</strong> {{ patientStore.infoDetail.data.emergency_contact_name }}</p>
        <p><strong>Emergency Contact Phone:</strong> {{ patientStore.infoDetail.data.emergency_contact_phone }}</p>
        <p><strong>Emergency Contact Relationship:</strong> {{ patientStore.infoDetail.data.emergency_contact_relationship }}</p>
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
    <template #footer>
      <button @click="handleDelete">Delete Patient</button>
    </template>
  </userItem>
</template>
