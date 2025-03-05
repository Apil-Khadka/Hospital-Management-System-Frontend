<script setup lang="ts">
import { useRouter } from 'vue-router'
import CardItem from '@/components/cardItem.vue'
import AppointmentItem from '../appointmentItem.vue'
import { useMethodStore } from '@/stores/Methods'
import { ref, onMounted } from 'vue'

const appointmentStore = useMethodStore()
const router = useRouter()

const appointments = ref([])

// Create reactive objects to hold new status and notes keyed by appointment id
const editedStatus = ref<{ [key: number]: string }>({})
const editedNotes = ref<{ [key: number]: string }>({})

onMounted(async () => {
  await appointmentStore.fetchMethodAll('all/appointment')
  appointments.value = appointmentStore.getDetailAll('all/appointment')?.data || []
})

async function updateAppointment(appointmentId: number) {
  // Retrieve the new status and notes for the given appointment id;
  // if not provided, default to an empty string.
  const status = editedStatus.value[appointmentId] || ''
  const notes = editedNotes.value[appointmentId] || ''

  try {
    // Call the update method with endpoint, payload, and the appointment id.
    await appointmentStore.updateMethodDetail('appointment', appointmentId, { status, notes })

    // Optionally, update the local data to reflect the changes immediately.
    const index = appointments.value.findIndex((app) => app.id === appointmentId)
    if (index !== -1) {
      appointments.value[index].status = status
      appointments.value[index].notes = notes
    }
  } catch (error) {
    console.error('Error updating appointment', error)
  }
}

function goToBilling(appointmentId: number) {
  router.push({ path: '/receptionist/billing', query: { appointmentId: appointmentId.toString() } })
}
</script>

<template>
  <AppointmentItem>
    <template #header> Appointment List </template>
    <div style="max-height: 600px; max-width: 900px; overflow-y: auto">
      <div v-for="appointment in appointments" :key="appointment.id">
        <CardItem
          :class="{
            cancelled: appointment.status === 'cancelled',
            completed: appointment.status === 'completed',
            'no-show': appointment.status === 'no_show',
          }"
        >
          <template #header> Doctor: {{ appointment.doctor.user_name }} </template>
          <template #body>
            <p>Type: {{ appointment.type }}</p>
            <p>Status: {{ appointment.status }}</p>
            <p>Notes: {{ appointment.notes }}</p>
            <p>Appointment Date: {{ appointment.appointment_date }}</p>
            <p>Appointment Time: {{ appointment.appointment_time }}</p>
            <!-- Update form: inputs to change status and (optionally) add a note -->
            <div style="margin-top: 10px">
              <select v-model="editedStatus[appointment.id]">
                <option value="" disabled>Select new status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </select>
              <input
                type="text"
                v-model="editedNotes[appointment.id]"
                placeholder="Enter note (optional)"
              />
              <button @click="updateAppointment(appointment.id)">Update</button>
              <button @click="goToBilling(appointment.id)">Go to Billing</button>
            </div>
          </template>
          <template #footer>
            <p>Department: {{ appointment.doctor.department_name }}</p>
            <p>Patient Mrn: {{ appointment.patient.mrn }}</p>
          </template>
        </CardItem>
      </div>
    </div>
  </AppointmentItem>
</template>

<style lang="scss" scoped>
/* For appointments with status 'cancelled' */
.cancelled {
  background-color: #ffe6e6; // Light red background
  border: 1px solid red;
}

/* For appointments with status 'completed' */
.completed {
  background-color: #e6ffe6; // Light green background
  border: 1px solid green;
}

/* For appointments with status 'no_show' */
.no-show {
  background-color: #ffffe6; // Light yellow background
  border: 1px solid yellow;
}
</style>
