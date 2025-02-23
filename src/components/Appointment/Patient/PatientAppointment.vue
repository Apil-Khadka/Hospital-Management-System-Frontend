<script setup lang="ts">
import { ref } from 'vue'
import PatientAppointmentCreate from './PatientAppointmentCreate.vue'
import PatientAppointmentShow from './PatientAppointmentShow.vue'

const isCreateOpen = ref(true)
const isShowOpen = ref(false)

function toggleView() {
  isCreateOpen.value = !isCreateOpen.value
  isShowOpen.value = !isShowOpen.value
}
</script>

<template>
  <div class="appointment-container">
    <button @click="toggleView">Toggle View</button>
    <PatientAppointmentCreate v-if="isCreateOpen" />
    <PatientAppointmentShow v-if="isShowOpen" />
  </div>
</template>

<style scoped>
.appointment-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
