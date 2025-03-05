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

const props = defineProps<{ prescriptionId: number }>()
const emit = defineEmits<{ (e: 'detailsAdded'): void }>()

const methodStore = useMethodStore()

// List of medications for the dropdown
const medications = ref(null)

onMounted(async () => {
  await methodStore.fetchMethodAll('category/medication')
  medications.value = methodStore.getDetailAll('category/medication') || null
  console.log(medications.value)
})

// Detail rows (start with one row)
const details = ref<PrescriptionDetail[]>([
  {
    medication_id: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
  },
])

function addDetail() {
  details.value.push({
    medication_id: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
  })
}

async function submitDetails() {
  try {
    for (const detail of details.value) {
      await methodStore.createMethodDetail('detail/prescription', {
        prescription_id: props.prescriptionId,
        medication_id: detail.medication_id,
        dosage: detail.dosage,
        frequency: detail.frequency,
        duration: detail.duration,
        instructions: detail.instructions,
      })
    }
    emit('detailsAdded')
  } catch (error) {
    console.error('Error creating prescription details:', error)
  }
}
</script>

<template>
  <div class="add-prescription-details">
    <h2>Add Prescription Details</h2>
    <div v-for="(detail, index) in details" :key="index" class="detail-row">
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
    <button type="button" @click="addDetail">Add Another Medication</button>
    <button type="button" @click="submitDetails">Submit Prescription Details</button>
  </div>
</template>

<style scoped lang="scss">
.add-prescription-details {
  /* Style as needed */
}
</style>
