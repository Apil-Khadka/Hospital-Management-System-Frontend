<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useMethodStore } from '@/stores/Methods'

interface PrescriptionDetail {
  medication_id: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
}

const props = defineProps<{
  appointmentId: number | null
}>()

const emit = defineEmits(['close'])
const methodStore = useMethodStore()

// Form state
const form = ref({
  // Pre-fill appointment_id from the prop (hidden in the form)
  appointment_id: props.appointmentId || '',
  diagnosis: '',
  notes: '',
  // Array for one or more prescription details
  details: [] as PrescriptionDetail[],
})

// Add an initial detail row so the user sees one detail by default
form.value.details.push({
  medication_id: '',
  dosage: '',
  frequency: '',
  duration: '',
  instructions: '',
})

// Medications list to populate select options
const medications = ref([])

async function fetchMedications() {
  await methodStore.fetchMethodAll('category/medication')
  medications.value = (await methodStore.getDetailAll('category/medication')?.data) || []
  console.log(medications.value)
}

onMounted(async () => {
  fetchMedications()
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
    // Create the prescription
    const prescriptionResponse = await methodStore.createMethodDetail('prescription', {
      appointment_id: form.value.appointment_id,
      diagnosis: form.value.diagnosis,
      notes: form.value.notes,
    })
    // Get the newly created prescription id
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
    alert('Prescription created successfully')
    emit('close')
  } catch (error) {
    console.error('Error creating prescription', error)
  }
}
</script>

<template>
  <div class="prescription-form">
    <h2>Create Prescription</h2>
    <form @submit.prevent="submitPrescription">
      <!-- Hidden appointment_id -->
      <input type="hidden" v-model="form.appointment_id" />

      <div>
        <label for="diagnosis">Diagnosis</label>
        <input type="text" id="diagnosis" v-model="form.diagnosis" required />
      </div>
      <div>
        <label for="notes">Notes</label>
        <textarea id="notes" v-model="form.notes"></textarea>
      </div>
      <hr />

      <!-- Prescription Details -->
      <h3>Prescription Details (Medications)</h3>
      <div v-for="(detail, index) in form.details" :key="index" class="detail-row">
        <div>
          <label :for="'medication_' + index">Medication</label>
          <select :id="'medication_' + index" v-model="detail.medication_id" required>
            <option value="" disabled>Select Medication</option>
            <option v-for="med in medications" :key="med.id" :value="med.id">
              {{ med.name }}
            </option>
          </select>
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
    <button type="button" @click="$emit('close')">Cancel</button>
  </div>
</template>

<style scoped lang="scss">
.prescription-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.prescription-form form > div {
  margin-bottom: 1rem;
}

.prescription-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.prescription-form input,
.prescription-form textarea,
.prescription-form select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.prescription-form button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
