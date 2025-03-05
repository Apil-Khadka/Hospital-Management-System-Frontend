<!-- AddBillDetails.vue -->
<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { useMethodStore } from '@/stores/Methods'

interface BillDetail {
  billable_id: string
  billable_type: string
  quantity: number
  status: string
}

const props = defineProps<{ billId: number }>()
const emit = defineEmits<{ (e: 'detailsAdded'): void }>()
const methodStore = useMethodStore()

// Start with one detail row by default.
const details = ref<BillDetail[]>([
  {
    billable_id: '',
    billable_type: '',
    quantity: 1,
    status: 'pending',
  },
])

function addDetail() {
  details.value.push({
    billable_id: '',
    billable_type: '',
    quantity: 1,
    status: 'pending',
  })
}

async function submitDetails() {
  try {
    // Loop over each detail row and create a bill detail.
    for (const detail of details.value) {
      await methodStore.createMethodDetail('item/bill', {
        bill_id: props.billId,
        billable_id: detail.billable_id,
        billable_type: detail.billable_type,
        quantity: detail.quantity,
        status: detail.status,
      })
    }
    emit('detailsAdded')
  } catch (error) {
    console.error('Error creating bill details:', error)
  }
}
</script>

<template>
  <div class="add-bill-details">
    <h2>Add Bill Order Details</h2>
    <div v-for="(detail, index) in details" :key="index" class="detail-row">
      <div>
        <label :for="'billable_id_' + index">Billable ID</label>
        <input
          type="text"
          :id="'billable_id_' + index"
          v-model="detail.billable_id"
          required
          placeholder="Enter ID"
        />
      </div>
      <div>
        <label :for="'billable_type_' + index">Billable Type</label>
        <select :id="'billable_type_' + index" v-model="detail.billable_type" required>
          <option value="" disabled>Select Type</option>
          <option value="labtest">Lab Test</option>
          <option value="medication">Medication</option>
        </select>
      </div>
      <div>
        <label :for="'quantity_' + index">Quantity</label>
        <input type="number" :id="'quantity_' + index" v-model="detail.quantity" min="1" required />
      </div>
      <div>
        <label :for="'status_' + index">Status</label>
        <select :id="'status_' + index" v-model="detail.status" required>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <hr />
    </div>
    <button type="button" @click="addDetail">Add Another Item</button>
    <button type="button" @click="submitDetails">Submit Bill Details</button>
  </div>
</template>

<style scoped>
.add-bill-details {
  padding: 1rem;
  background: #f7f7f7;
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
