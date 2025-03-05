<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useMethodStore } from '@/stores/Methods'

const props = defineProps<{ appointmentId: number }>()
const emit = defineEmits<{ (e: 'created', id: number): void }>()

const methodStore = useMethodStore()

const form = ref({
  appointment_id: props.appointmentId,
  diagnosis: '',
  notes: '',
})

async function submitForm() {
  try {
    await methodStore.createMethodDetail('prescription', {
      appointment_id: form.value.appointment_id,
      diagnosis: form.value.diagnosis,
      notes: form.value.notes,
    })
    const response = methodStore.getDetail('prescription')?.data
    const newPrescriptionId = response.id
    emit('created', newPrescriptionId)
  } catch (error) {
    console.error('Error creating prescription:', error)
  }
}
</script>

<template>
  <div class="create-prescription">
    <h2>Create Prescription</h2>
    <form @submit.prevent="submitForm">
      <!-- appointment_id is pre-filled and hidden -->
      <input type="hidden" v-model="form.appointment_id" />
      <div>
        <label for="diagnosis">Diagnosis</label>
        <input type="text" id="diagnosis" v-model="form.diagnosis" required />
      </div>
      <div>
        <label for="notes">Notes</label>
        <textarea id="notes" v-model="form.notes"></textarea>
      </div>
      <button type="submit">Create Prescription</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.create-prescription {
  /* Style as needed */
}
</style>
