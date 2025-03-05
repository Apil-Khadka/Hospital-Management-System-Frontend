<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useMethodStore } from '@/stores/Methods'

const methodStore = useMethodStore()

interface PrescriptionDetail {
  medication_id: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
}

const form = ref({
  appointment_id: '',
  diagnosis: '',
  notes: '',
  // An array to hold one or more prescription details
  details: [] as PrescriptionDetail[],
})

// Add an initial detail row so the user sees one by default
form.value.details.push({
  medication_id: '',
  dosage: '',
  frequency: '',
  duration: '',
  instructions: '',
})

function addDetail() {
  form.value.details.push({
    medication_id: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
  })
}

async function submitPrescription() {
  try {
    // First, create the prescription
    const prescriptionResponse = methodStore.createMethodDetail('prescription', {
      appointment_id: form.value.appointment_id,
      diagnosis: form.value.diagnosis,
      notes: form.value.notes,
    })

    // Get the newly created prescription ID
    const prescriptionId = prescriptionResponse.data.id

    // Now, create each prescription detail entry with the prescription_id attached
    for (const detail of form.value.details) {
      await methodStore.createMethodDetail('detail/prescription', {
        prescription_id: prescriptionId,
        medication_id: detail.medication_id,
        dosage: detail.dosage,
        frequency: detail.frequency,
        duration: detail.duration,
        instructions: detail.instructions,
      })
    }
    alert('Prescription and details created successfully!')
  } catch (error) {
    console.error('Error creating prescription', error)
  }
}
</script>

<template>
  <div class="prescription-form">
    <h2>Create Prescription</h2>
    <form @submit.prevent="submitPrescription">
      <!-- Prescription Basic Info -->
      <div>
        <label for="appointment_id">Appointment ID</label>
        <input type="text" id="appointment_id" v-model="form.appointment_id" required />
      </div>
      <div>
        <label for="diagnosis">Diagnosis</label>
        <input type="text" id="diagnosis" v-model="form.diagnosis" required />
      </div>
      <div>
        <label for="notes">Notes</label>
        <textarea id="notes" v-model="form.notes"></textarea>
      </div>

      <hr />

      <!-- Prescription Detail(s) -->
      <h3>Prescription Details (Medicines)</h3>
      <div v-for="(detail, index) in form.details" :key="index" class="prescription-detail">
        <h4>Medication {{ index + 1 }}</h4>
        <div>
          <label :for="'medication_id_' + index">Medication ID</label>
          <input
            type="text"
            :id="'medication_id_' + index"
            v-model="detail.medication_id"
            required
          />
        </div>
        <div>
          <label :for="'dosage_' + index">Dosage</label>
          <input type="text" :id="'dosage_' + index" v-model="detail.dosage" required />
        </div>
        <div>
          <label :for="'frequency_' + index">Frequency</label>
          <input type="text" :id="'frequency_' + index" v-model="detail.frequency" required />
        </div>
        <div>
          <label :for="'duration_' + index">Duration</label>
          <input type="text" :id="'duration_' + index" v-model="detail.duration" required />
        </div>
        <div>
          <label :for="'instructions_' + index">Instructions</label>
          <input type="text" :id="'instructions_' + index" v-model="detail.instructions" />
        </div>
        <hr />
      </div>
      <button type="button" @click="addDetail">Add Medication</button>
      <button type="submit">Submit Prescription</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.prescription-form {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 8px;
}

.prescription-form form div {
  margin-bottom: 1rem;
}

.prescription-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.prescription-form input,
.prescription-form textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.prescription-form button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #3498db;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.prescription-form button[type='button'] {
  background-color: #2ecc71;
  margin-right: 1rem;
}
</style>
