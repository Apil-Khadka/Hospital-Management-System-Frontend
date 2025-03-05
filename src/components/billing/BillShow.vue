<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'
import { useMethodStore } from '@/stores/Methods'

const props = defineProps<{ appointmentId: number }>()
const methodStore = useMethodStore()

const bill = ref<any>([])
const appointment = ref<any>(null)

onMounted(async () => {
  try {
    await methodStore.fetchMethodDetail('appointment', props.appointmentId)
    appointment.value = methodStore.getDetail('appointment')?.data || null
    bill.value = appointment.value?.billing || {
      id: null,
      total_amount: 0,
      payment_method: '',
      status: '',
      paid_amount: 0,
      billItems: [],
    }
  } catch (error) {
    console.error('Error fetching bill:', error)
  }
})

async function updateBillDetail(detail: any) {
  try {
    await methodStore.updateMethodDetail('item/bill', detail.id, {
      quantity: detail.quantity,
      status: detail.status,
    })
    alert('Bill detail updated successfully.')
  } catch (error) {
    console.error('Error updating bill detail:', error)
  }
}

async function updateBill() {
  try {
    if (!bill.value || !bill.value.id) return

    const updateData: any = {
      paid_amount: bill.value.paid_amount,
    }

    if (bill.value.status !== appointment.value?.billing?.status) {
      updateData.status = bill.value.status
    }

    await methodStore.updateMethodDetail('bill', bill.value.id, updateData)
    alert('Bill updated successfully.')
  } catch (error) {
    console.error('Error updating bill:', error)
  }
}
</script>

<template>
  <div class="bill-show">
    <h2>Total Amount: Rs.{{ bill?.total_amount || 0 }}</h2>
    <p><strong>Payment Method:</strong> {{ bill?.payment_method || 'N/A' }}</p>

    <p>
      <strong>Status:</strong>
      <select v-model="bill.status">
        <option :value="bill.status">{{ bill.status }}</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </p>

    <p>
      <strong>Paid Amount:</strong>
      <input type="number" v-model="bill.paid_amount" min="0" style="width: 100px" />
    </p>

    <button @click="updateBill">Update Bill</button>

    <div class="bill-details">
      <h3>Bill Items</h3>
      <div v-for="item in bill?.billItems || []" :key="item.id" class="detail-item">
        <p>
          Billable: {{ item.billable.generic_name || item.billable.name }}<br />
          Quantity:
          <input type="number" v-model="item.quantity" min="1" style="width: 60px" /><br />
          Status:
          <select v-model="item.status">
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button @click="updateBillDetail(item)">Update Detail</button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bill-show {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  color: darkgreen;
  max-width: 900px;
  max-height: 600px;
  overflow-y: auto;
}

.bill-details {
  margin-top: 1rem;
}

.detail-item {
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 0.5rem;
}

button:hover {
  background: #0056b3;
}
</style>
