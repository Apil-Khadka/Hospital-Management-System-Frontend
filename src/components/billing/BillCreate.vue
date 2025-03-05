<!-- BillCreate.vue -->
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useMethodStore } from '@/stores/Methods'

const props = defineProps<{ appointmentId: number }>()
const emit = defineEmits<{ (e: 'created', billId: number): void }>()
const methodStore = useMethodStore()

const paymentMethod = ref('cash')

async function createBill() {
  try {
    const response = await methodStore.createMethodDetail('bill', {
      appointment_id: props.appointmentId,
      payment_method: paymentMethod.value,
    })
    emit('created', response.data.id)
  } catch (error) {
    console.error('Error creating bill:', error)
  }
}
</script>

<template>
  <div class="bill-create">
    <h2>Create Bill Order</h2>
    <form @submit.prevent="createBill">
      <!-- appointment_id is hidden -->
      <input type="hidden" :value="props.appointmentId" />
      <label for="payment_method">Payment Method:</label>
      <select id="payment_method" v-model="paymentMethod">
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="insurance">Insurance</option>
        <option value="online">Online</option>
      </select>
      <button type="submit">Create Bill</button>
    </form>
  </div>
</template>

<style scoped>
.bill-create {
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 8px;
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
</style>
