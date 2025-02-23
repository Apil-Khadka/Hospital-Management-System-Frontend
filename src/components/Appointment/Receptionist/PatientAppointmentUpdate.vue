<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'
import AppointmentItem from '../appointmentItem.vue'

const staffStore = useMethodStore()
const appointmentStore = useMethodStore()
const authStore = useAuthStore()

const doctors = ref([])
const appointments = ref([])

const form = ref({
  status: '',
  notes: '',
})

onMounted(async () => {
  form.value.status = 'scheduled'

  const userInfo = await authStore.userInfo()
  form.value.patient_id = userInfo.user.detail.id
  await appointmentStore.fetchMethodAll('appointment')
  appointments.value = appointmentStore.getDetailAll('appointment')?.data || []
})

async function updateAppointment() {
  const payload = { ...form.value }
  await staffStore.createMethodDetail('appointment', payload)
  // window.location.reload()
}
</script>

<template>
  <AppointmentItem>
    <template #header>
      <h2>update Appointment</h2>
    </template>
    <form @submit.prevent="createAppointment">
      <input type="hidden" v-model="form.patient_id" />
      <div>
        <label for="staff_id">Doctor:</label>
        <select id="staff_id" v-model="form.staff_id" required>
          <option value="">Select Doctor</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            Name: {{ doctor.detail.user_name }} - Specialization: {{ doctor.detail.specialization }}
          </option>
        </select>
      </div>
      <div>
        <label for="appointment_date">Appointment Date:</label>
        <input type="date" id="appointment_date" v-model="form.appointment_date" required />
      </div>
      <div>
        <label for="appointment_time">Appointment Time:</label>
        <input type="time" id="appointment_time" v-model="form.appointment_time" required />
      </div>
      <div>
        <label for="type">Type:</label>
        <select id="type" v-model="form.type" required>
          <option value="">Select Type</option>
          <option value="routine">Routine</option>
          <option value="emergency">Emergency</option>
          <option value="follow_up">Follow-up</option>
          <option value="consultation">Consultation</option>
        </select>
      </div>
      <div>
        <label for="notes">Notes:</label>
        <textarea id="notes" v-model="form.notes" required></textarea>
      </div>
      <button type="submit">Create</button>
    </form>
    <template #footer>
      <p>Please fill out all required fields.</p>
    </template>
  </AppointmentItem>
</template>
