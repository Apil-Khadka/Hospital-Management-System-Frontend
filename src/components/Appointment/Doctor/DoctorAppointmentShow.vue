<script setup lang="ts">
import CardItem from '@/components/cardItem.vue'
import AppointmentItem from '../appointmentItem.vue'
import PrescriptionManager from '@/components/doctor/prescription/PrescriptionManager.vue'
import LabOrderManager from '@/components/doctor/laborder/LabOrderManager.vue'
import { useMethodStore } from '@/stores/Methods'
import { ref, onMounted } from 'vue'

const appointmentStore = useMethodStore()

const appointments = ref([])

// For updating appointment status/notes
const editedStatus = ref<{ [key: number]: string }>({})
const editedNotes = ref<{ [key: number]: string }>({})

// To control which appointment’s PrescriptionManager is visible
const visiblePrescriptionManager = ref<number | null>(null)
// To control which appointment’s LabOrderManager is visible
const visibleLabOrderManager = ref<number | null>(null)

onMounted(async () => {
  await appointmentStore.fetchMethodAll('doctor/appointment')
  appointments.value = appointmentStore.getDetailAll('doctor/appointment')?.data || []
  console.log(appointments.value)
})

function togglePrescriptionManager(appointmentId: number) {
  visiblePrescriptionManager.value =
    visiblePrescriptionManager.value === appointmentId ? null : appointmentId
}

function toggleLabOrderManager(appointmentId: number) {
  visibleLabOrderManager.value =
    visibleLabOrderManager.value === appointmentId ? null : appointmentId
}

async function updateAppointment(appointmentId: number) {
  // Retrieve new status and notes for the given appointment id
  const status = editedStatus.value[appointmentId] || ''
  const notes = editedNotes.value[appointmentId] || ''

  try {
    // Update the appointment using your method store
    await appointmentStore.updateMethodDetail('appointment', appointmentId, { status, notes })
    // Update local data
    const index = appointments.value.findIndex((app) => app.id === appointmentId)
    if (index !== -1) {
      appointments.value[index].status = status
      appointments.value[index].notes = notes
    }
  } catch (error) {
    console.error('Error updating appointment', error)
  }
}
</script>

<template>
  <AppointmentItem>
    <template #header> Appointment List </template>
    <div style="max-height: 600px; max-width: 900px; overflow-y: auto">
      <div v-for="appointment in appointments" :key="appointment.id" style="margin-bottom: 2rem">
        <!-- Toggle buttons for PrescriptionManager and LabOrderManager -->
        <button @click="togglePrescriptionManager(appointment.id)">
          {{
            visiblePrescriptionManager === appointment.id
              ? 'Close Prescription Form'
              : 'Create Prescription'
          }}
        </button>
        <button @click="toggleLabOrderManager(appointment.id)">
          {{
            visibleLabOrderManager === appointment.id ? 'Close Lab Order Form' : 'Create Lab Order'
          }}
        </button>

        <!-- Conditionally render PrescriptionManager -->
        <PrescriptionManager
          v-if="visiblePrescriptionManager === appointment.id"
          :appointmentId="appointment.id"
          @close="togglePrescriptionManager(appointment.id)"
        />

        <!-- Conditionally render LabOrderManager -->
        <LabOrderManager
          v-if="visibleLabOrderManager === appointment.id"
          :appointmentId="appointment.id"
          @close="toggleLabOrderManager(appointment.id)"
        />

        <!-- Appointment Card -->
        <CardItem
          :class="{
            cancelled: appointment.status === 'cancelled',
            completed: appointment.status === 'completed',
            'no-show': appointment.status === 'no_show',
          }"
        >
          <template #header>
            Patient: {{ appointment.patient.user.firstname }}
            {{ appointment.patient.user.lastname }}
          </template>
          <template #body>
            <p>Type: {{ appointment.type }}</p>
            <p>Blood Group: {{ appointment.patient.blood_group }}</p>
            <p>Notes: {{ appointment.notes }}</p>
            <p>Appointment Date: {{ appointment.appointment_date }}</p>
            <p>Appointment Time: {{ appointment.appointment_time }}</p>
            <!-- Update form: inputs to change status and add an optional note -->
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
            </div>
          </template>
          <template #footer>
            <p>Patient Mrn: {{ appointment.patient.mrn }}</p>
            <p>Phone Number: {{ appointment.patient.phone }}</p>
          </template>
        </CardItem>
      </div>
    </div>
  </AppointmentItem>
</template>

<style lang="scss" scoped>
.cancelled {
  background-color: #ffe6e6;
  border: 1px solid red;
}

.completed {
  background-color: #e6ffe6;
  border: 1px solid green;
}

.no-show {
  background-color: #ffffe6;
  border: 1px solid yellow;
}
</style>
