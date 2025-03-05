<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import { useMethodStore } from '@/stores/Methods'

interface BillDetail {
  billable_id: string
  billable_type: string
  quantity: number
  status: string
  name: string // Added for display purposes
}

const medications = ref<any>([])
const labtests = ref<any>([])
const appointment = ref<any>([])
const details = ref<BillDetail[]>([]) // Automatically populated details

const props = defineProps<{ billId: number; appointmentId: number }>()
const emit = defineEmits<{ (e: 'detailsCreated'): void }>()
const methodStore = useMethodStore()

function populateDetails() {
  details.value = [
    // Map medications to bill details
    ...medications.value.map((med: any) => ({
      billable_id: med.id.toString(),
      billable_type: 'medication',
      quantity: 1,
      status: 'pending',
      name: med.generic_name, // Display name
    })),
    // Map lab tests to bill details
    ...labtests.value.map((lab: any) => ({
      billable_id: lab.id.toString(),
      billable_type: 'labtest',
      quantity: 1,
      status: 'pending',
      name: lab.name, // Display name
    })),
  ]
}

onMounted(async () => {
  // Fetch medications and lab tests data here
  await methodStore.fetchMethodDetail('appointment', props.appointmentId)
  appointment.value = methodStore.getDetail('appointment')?.data || []

  console.log('appointment', appointment.value)

  medications.value =
    appointment.value.prescriptions?.flatMap((prescription) => prescription.details) || []
  medications.value = medications.value.map((detail) => detail.medication) || []

  labtests.value = appointment.value.laborders?.flatMap((laborder) => laborder.details) || []
  labtests.value = labtests.value.map((detail) => detail.labtest) || []

  console.log('medications', medications.value)
  console.log('labtests', labtests.value)

  // Populate details array automatically
  populateDetails()
})

async function submitDetails() {
  try {
    for (const detail of details.value) {
      await methodStore.createMethodDetail('item/bill', {
        bill_id: props.billId,
        billable_id: detail.billable_id,
        billable_type: detail.billable_type,
        quantity: detail.quantity,
        status: detail.status,
      })
    }
    emit('detailsCreated')
  } catch (error) {
    console.error('Error creating bill details:', error)
  }
}
</script>

<template>
  <div class="bill-order-create">
    <h2>Add Bill Order Details</h2>
    <div v-for="(detail, index) in details" :key="index" class="detail-row">
      <label :for="'billable_id_' + index">Item:</label>
      <input
        type="text"
        :id="'billable_id_' + index"
        v-model="detail.name"
        disabled
        placeholder="Item Name"
      />

      <label :for="'billable_type_' + index">Billable Type:</label>
      <input type="text" :id="'billable_type_' + index" v-model="detail.billable_type" disabled />

      <label :for="'quantity_' + index">Quantity:</label>
      <input type="number" :id="'quantity_' + index" v-model="detail.quantity" min="1" required />

      <label :for="'status_' + index">Status:</label>
      <select :id="'status_' + index" v-model="detail.status" required>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <hr />
    </div>

    <button type="button" @click="submitDetails">Submit Bill Details</button>
  </div>
</template>

<style scoped>
.bill-order-create {
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 8px;
}
.detail-row {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input,
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
