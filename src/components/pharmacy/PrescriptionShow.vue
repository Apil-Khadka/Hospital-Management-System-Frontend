<!-- PharmacistPrescriptions.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMethodStore } from '@/stores/Methods'
import CardItem from '@/components/cardItem.vue'

const methodStore = useMethodStore()
const prescriptions = ref<any[]>([])

async function fetchPrescriptions() {
  await methodStore.fetchMethodAll('prescription')
  prescriptions.value = methodStore.getDetailAll('prescription')?.data || []
}

onMounted(() => {
  fetchPrescriptions()
})

async function updatePrescriptionDetail(detail: any) {
  try {
    await methodStore.updateMethodDetail('detail/prescription', detail.id, {
      dosage: detail.dosage,
      frequency: detail.frequency,
      duration: detail.duration,
      instructions: detail.instructions,
    })
    alert(`Prescription detail ${detail.id} updated successfully.`)
    fetchPrescriptions()
  } catch (error) {
    console.error('Error updating prescription detail:', error)
  }
}
</script>

<template>
  <div class="pharmacist-prescriptions">
    <h2>Prescriptions</h2>
    <div v-for="prescription in prescriptions" :key="prescription.id" style="margin-bottom: 2rem">
      <CardItem>
        <template #header>
          Prescription #{{ prescription.id }} — Diagnosis: {{ prescription.diagnosis }}
        </template>
        <template #body>
          <p>Notes: {{ prescription.notes }}</p>
          <div v-for="detail in prescription.details" :key="detail.id" class="prescription-detail">
            <h4>Detail #{{ detail.id }}</h4>
            <div>
              <label>Dosage:</label>
              <input type="text" v-model="detail.dosage" />
            </div>
            <div>
              <label>Frequency:</label>
              <input type="text" v-model="detail.frequency" />
            </div>
            <div>
              <label>Duration:</label>
              <input type="text" v-model="detail.duration" />
            </div>
            <div>
              <label>Instructions:</label>
              <input type="text" v-model="detail.instructions" />
            </div>
            <button @click="updatePrescriptionDetail(detail)">Update Detail</button>
          </div>
        </template>
        <template #footer>
          <p>Prescription ID: {{ prescription.id }}</p>
        </template>
      </CardItem>
    </div>
  </div>
</template>

<style scoped>
.pharmacist-prescriptions {
  padding: 1rem;
  max-width: 900px;
  max-height: 800px;
  overflow-y: auto;
}
.prescription-detail {
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  padding: 0.5rem;
  border-radius: 4px;
}
label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: 500;
}
input {
  width: 100%;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.4rem 0.8rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
