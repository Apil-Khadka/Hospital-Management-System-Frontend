<script setup lang="ts">
import { ref, defineProps } from 'vue'
import CreatePrescription from './CreatePrescription.vue'
import AddPrescriptionDetails from './AddPrescriptionDetails.vue'

const props = defineProps<{ appointmentId: number }>()
const prescriptionId = ref<number | null>(null)
const detailsAdded = ref(false)

function onPrescriptionCreated(id: number) {
  prescriptionId.value = id
}

function onDetailsAdded() {
  detailsAdded.value = true
  alert('Prescription and details added successfully!')
}
</script>

<template>
  <div class="prescription-manager">
    <h1>Prescription for Appointment {{ appointmentId }}</h1>
    <div v-if="!prescriptionId">
      <CreatePrescription :appointmentId="appointmentId" @created="onPrescriptionCreated" />
    </div>
    <div v-else-if="!detailsAdded">
      <AddPrescriptionDetails :prescriptionId="prescriptionId" @detailsAdded="onDetailsAdded" />
    </div>
    <div v-else>
      <p>Prescription process complete.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.prescription-manager {
  /* Style as needed */
}
</style>
