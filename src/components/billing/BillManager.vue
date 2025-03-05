<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useMethodStore } from '@/stores/Methods'
import { useRoute } from 'vue-router'

import BillCreate from './BillCreate.vue'
import BillOrderCreate from './BillOrderCreate.vue'
import BillShow from './BillShow.vue'

const route = useRoute()
const appointmentId = Number(route.query.appointmentId)

const methodStore = useMethodStore()
const bill = ref<any>(null)
const appointment = ref<any>(null)

async function fetchBill() {
  await methodStore.fetchMethodDetail('appointment', appointmentId)
  appointment.value = methodStore.getDetail('appointment')?.data || []
  bill.value = appointment.value.billing
  console.log(bill.value)
}

onMounted(() => {
  fetchBill()
})

function onBillCreated(newBillId: number) {
  fetchBill()
}

function onDetailsCreated() {
  fetchBill()
}
</script>

<template>
  <div class="bill-manager">
    <h1>Billing for Appointment #{{ appointmentId }}</h1>
    <div v-if="!bill">
      <BillCreate :appointmentId="appointmentId" @created="onBillCreated" />
    </div>
    <div v-else-if="bill && (!bill.billItems || bill.billItems.length === 0)">
      <BillOrderCreate
        :billId="bill.id"
        :appointmentId="appointmentId"
        @detailsCreated="onDetailsCreated"
      />
    </div>
    <div v-else>
      <BillShow :appointmentId="appointmentId" />
    </div>
  </div>
</template>

<style scoped>
.bill-manager {
  padding: 1rem;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 1rem;
  color: lightslategrey;
}
</style>
