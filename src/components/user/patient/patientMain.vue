<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PatientCreate from '@/components/user/patient/patientCreate.vue'
import PatientUpdate from '@/components/user/patient/patientUpdate.vue'
import PatientShow from '@/components/user/patient/patientShow.vue'
import { useAuthStore } from '@/stores/authStore.ts'

const authStore = useAuthStore();
const hasPatientDetail = ref(false);
const showUpdate = ref(false);

onMounted(async () => {
  const userInfo = await authStore.userInfo();
  hasPatientDetail.value = !!userInfo.user.detail;
});

function handleUpdate() {
  showUpdate.value = true;
}
</script>

<template>
  <div>
    <patient-create v-if="!hasPatientDetail"></patient-create>
    <div v-else-if="hasPatientDetail && !showUpdate">
      <patient-show></patient-show>
      <button @click="handleUpdate">Update Patient Detail</button>
    </div>
    <patient-update v-if="showUpdate"></patient-update>
  </div>
</template>
