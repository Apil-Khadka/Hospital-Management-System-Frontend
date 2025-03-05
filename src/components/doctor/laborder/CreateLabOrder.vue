<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useMethodStore } from '@/stores/Methods'

const props = defineProps<{ appointmentId: number }>()
const emit = defineEmits<{ (e: 'created', id: number): void }>()
const methodStore = useMethodStore()

const form = ref({
  appointment_id: props.appointmentId,
  status: 'ordered', // default value; adjust as needed
  notes: '',
})

async function submitForm() {
  try {
    await methodStore.createMethodDetail('laborder', {
      appointment_id: form.value.appointment_id,
      status: form.value.status,
      notes: form.value.notes,
    })
    const response = methodStore.getDetail('laborder')
    console.log(response.value)
    const newLabOrderId = response.data.id
    emit('created', newLabOrderId)
  } catch (error) {
    console.error('Error creating lab order:', error)
  }
}
</script>

<template>
  <div class="create-laborder">
    <h2>Create Lab Order</h2>
    <form @submit.prevent="submitForm">
      <!-- appointment_id is pre-filled and hidden -->
      <input type="hidden" v-model="form.appointment_id" />
      <div>
        <label for="status">Status</label>
        <select id="status" v-model="form.status" required>
          <option value="ordered">Ordered</option>
          <option value="sample_collected">Sample Collected</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label for="notes">Notes</label>
        <textarea id="notes" v-model="form.notes"></textarea>
      </div>
      <button type="submit">Create Lab Order</button>
    </form>
  </div>
</template>

<style scoped>
.create-laborder {
  /* Add your styles here */
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>
