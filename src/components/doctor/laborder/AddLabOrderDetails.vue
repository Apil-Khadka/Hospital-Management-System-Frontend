<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useMethodStore } from '@/stores/Methods'

interface LabOrderDetail {
  lab_test_id: string
  result: string
  result_date: string // using a string for a date input
  remarks: string
}

const props = defineProps<{ labOrderId: number }>()
const emit = defineEmits<{ (e: 'detailsAdded'): void }>()
const methodStore = useMethodStore()

// Fetch available lab tests from the 'labtest' endpoint
const labTests = ref<any[]>([])
async function fetchLabTests() {
  await methodStore.fetchMethodAll('labtest')
  labTests.value = methodStore.getDetailAll('labtest')?.data || []
}
onMounted(() => {
  fetchLabTests()
})

// Start with one detail row by default
const details = ref<LabOrderDetail[]>([
  {
    lab_test_id: '',
    result: '',
    result_date: '',
    remarks: '',
  },
])

function addDetail() {
  details.value.push({
    lab_test_id: '',
    result: '',
    result_date: '',
    remarks: '',
  })
}

async function submitDetails() {
  try {
    for (const detail of details.value) {
      await methodStore.createMethodDetail('detail/laborder', {
        lab_order_id: props.labOrderId,
        lab_test_id: detail.lab_test_id,
        result: detail.result,
        result_date: detail.result_date,
        remarks: detail.remarks,
      })
    }
    emit('detailsAdded')
  } catch (error) {
    console.error('Error creating lab order details:', error)
  }
}
</script>

<template>
  <div class="add-laborder-details">
    <h2>Add Lab Order Details</h2>
    <div v-for="(detail, index) in details" :key="index" class="detail-row">
      <div>
        <label :for="'lab_test_' + index">Lab Test</label>
        <select :id="'lab_test_' + index" v-model="detail.lab_test_id" required>
          <option value="" disabled>Select Lab Test</option>
          <option v-for="test in labTests" :key="test.id" :value="test.id">
            {{ test.name }}
          </option>
        </select>
      </div>
      <div>
        <label :for="'result_' + index">Result</label>
        <input type="text" :id="'result_' + index" v-model="detail.result" />
      </div>
      <div>
        <label :for="'result_date_' + index">Result Date</label>
        <input type="date" :id="'result_date_' + index" v-model="detail.result_date" />
      </div>
      <div>
        <label :for="'remarks_' + index">Remarks</label>
        <input type="text" :id="'remarks_' + index" v-model="detail.remarks" />
      </div>
      <hr />
    </div>
    <button type="button" @click="addDetail">Add Another Lab Test</button>
    <button type="button" @click="submitDetails">Submit Lab Order Details</button>
  </div>
</template>

<style scoped>
.add-laborder-details {
  /* Add your styles here */
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 8px;
}
.detail-row {
  margin-bottom: 1rem;
}
</style>
