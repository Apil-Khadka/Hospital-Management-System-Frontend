<script setup lang="ts">
import { ref } from 'vue'
import PatientAppointmentCreate from './PatientAppointmentCreate.vue'
import PatientAppointmentShow from './PatientAppointmentShow.vue'
</script>

<template>
  <div class="appointment-container">
    <PatientAppointmentCreate />
    <PatientAppointmentShow />
  </div>
</template>

<style scoped>
.appointment-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 750px;
  max-width: 900px;
  overflow-y: auto;
}
</style>
