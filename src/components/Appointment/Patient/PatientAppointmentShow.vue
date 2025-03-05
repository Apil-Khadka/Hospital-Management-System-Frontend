<script setup lang="ts">
import CardItem from '@/components/cardItem.vue'
import AppointmentItem from '../appointmentItem.vue'
import { useMethodStore } from '@/stores/Methods'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const appointmentStore = useMethodStore()
const router = useRouter()

const appointments = ref()

onMounted(async () => {
  await appointmentStore.fetchMethodAll('appointment')
  appointments.value = appointmentStore.getDetailAll('appointment')?.data || []
})

function goToAppointmentDetails(appointmentId: number) {
  router.push({
    path: '/patient/appointment-details',
    query: { appointmentId: appointmentId.toString() },
  })
}
</script>

<template>
  <AppointmentItem>
    <template #header> Appointment List </template>
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
          <button @click="goToAppointmentDetails(appointment.id)">Go to Details</button>
        </template>
      </CardItem>
    </div>
  </AppointmentItem>
</template>
