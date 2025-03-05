<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMethodStore } from '@/stores/Methods'
import CardItem from '@/components/cardItem.vue'

const methodStore = useMethodStore()

// State for lab orders
const labOrders = ref<any[]>([])

async function fetchLabOrders() {
  await methodStore.fetchMethodAll('laborder')
  labOrders.value = methodStore.getDetailAll('laborder')?.data || []
}

onMounted(() => {
  fetchLabOrders()
})

// Update a lab order (status and notes)
async function updateLabOrder(order: any) {
  try {
    await methodStore.updateMethodDetail('laborder', order.id, {
      status: order.status,
      notes: order.notes,
    })
    alert(`Lab order ${order.id} updated successfully.`)
    fetchLabOrders()
  } catch (error) {
    console.error('Error updating lab order:', error)
  }
}

async function updateLabOrderDetail(detail: any) {
  try {
    await methodStore.updateMethodDetail('detail/laborder', detail.id, {
      result: detail.result,
      result_date: detail.result_date,
      remarks: detail.remarks,
    })
    alert(`Lab order detail ${detail.id} updated successfully.`)
    fetchLabOrders()
  } catch (error) {
    console.error('Error updating lab order detail:', error)
  }
}
</script>

<template>
  <div class="lab-order-manager">
    <h2>Lab Orders</h2>
    <div v-for="order in labOrders" :key="order.id" style="margin-bottom: 2rem">
      <CardItem>
        <template #header> Lab Order #{{ order.id }} </template>
        <template #body>
          <div class="order-update">
            <label>Status:</label>
            <select v-model="order.status">
              <option value="ordered">Ordered</option>
              <option value="sample_collected">Sample Collected</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <label>Notes:</label>
            <input type="text" v-model="order.notes" />
            <button @click="updateLabOrder(order)">Update Order</button>
          </div>
          <div class="order-details">
            <h3>Order Details</h3>
            <div v-for="detail in order.details" :key="detail.id" class="order-detail">
              <p>Lab Test: {{ detail.lab_test_id }}</p>
              <label>Result (JSON):</label>
              <textarea v-model="detail.result" placeholder="Enter JSON result"></textarea>
              <label>Result Date:</label>
              <input type="date" v-model="detail.result_date" />
              <label>Remarks:</label>
              <input type="text" v-model="detail.remarks" />
              <button @click="updateLabOrderDetail(detail)">Update Detail</button>
            </div>
          </div>
        </template>
        <template #footer>
          <p>Order ID: {{ order.id }}</p>
        </template>
      </CardItem>
    </div>
  </div>
</template>

<style scoped>
.lab-order-manager {
  padding: 1rem;
  max-width: 900px;
  max-height: 800px;
  overflow-y: auto;
}
.order-update {
  margin-bottom: 1rem;
}
.order-update label,
.order-detail label {
  display: block;
  margin-bottom: 0.5rem;
  color: #0f0f;
}
.order-update input,
.order-detail input,
.order-detail textarea,
.order-update select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
.order-detail {
  border: 1px solid #007bff;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}
</style>
