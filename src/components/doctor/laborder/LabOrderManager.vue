<script setup lang="ts">
import { ref, defineProps } from 'vue'
import CreateLabOrder from './CreateLabOrder.vue'
import AddLabOrderDetails from './AddLabOrderDetails.vue'

const props = defineProps<{ appointmentId: number }>()
const labOrderId = ref<number | null>(null)
const detailsAdded = ref(false)

function onLabOrderCreated(id: number) {
  labOrderId.value = id
}

function onDetailsAdded() {
  detailsAdded.value = true
  alert('Lab order and details added successfully!')
}
</script>

<template>
  <div class="laborder-manager">
    <h1>Lab Order for Appointment {{ appointmentId }}</h1>
    <div v-if="!labOrderId">
      <CreateLabOrder :appointmentId="appointmentId" @created="onLabOrderCreated" />
    </div>
    <div v-else-if="!detailsAdded">
      <AddLabOrderDetails :labOrderId="labOrderId" @detailsAdded="onDetailsAdded" />
    </div>
    <div v-else>
      <p>Lab order process complete.</p>
    </div>
  </div>
</template>

<style scoped>
.laborder-manager {
  /* Add your styles here */
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
