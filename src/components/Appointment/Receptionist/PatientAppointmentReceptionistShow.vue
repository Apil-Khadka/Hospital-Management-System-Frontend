<script setup lang="ts">
import CardItem from '@/components/cardItem.vue'
import AppointmentItem from '../appointmentItem.vue'
import { useMethodStore } from '@/stores/Methods'
import { ref, onMounted } from 'vue'

const appointmentStore = useMethodStore()

const appointments = ref()

onMounted(async () => {
  await appointmentStore.fetchMethodAll('all/appointment')
  appointments.value = appointmentStore.getDetailAll('all/appointment')?.data || []
})
</script>

<template>
  <AppointmentItem>
    <template #header> Appointment List </template>
    <div style="max-height: 500px; max-width: 900px; overflow-y: auto">
      <div v-for="appointment in appointments" :key="appointment.id">
        <CardItem>
          <template #header> Doctor: {{ appointment.doctor.user_name }} </template>
          <template #body>
            <p>Type: {{ appointment.type }}</p>
            <p>Status: {{ appointment.status }}</p>
            <p>Notes: {{ appointment.notes }}</p>
            <p>Appointment Date: {{ appointment.appointment_date }}</p>
            <p>Appointment Time: {{ appointment.appointment_time }}</p>
          </template>
          <template #footer>
            <p>Department: {{ appointment.doctor.department_name }}</p>
            <p>Phone Number: {{ appointment.doctor.phone_number }}</p>
          </template>
        </CardItem>
      </div>
    </div>
  </AppointmentItem>
</template>
