<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserItem from '@/components/user/userItem.vue'
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const patientStore = useMethodStore()
const authStore = useAuthStore()
const patient = ref<any>(null)
const patientId = ref<number>(0)
const form = ref({
  date_of_birth: '',
  gender: '',
  blood_group: '',
  address: '',
  phone: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  emergency_contact_relationship: '',
})
const originalForm = ref({ ...form.value })

onMounted(async () => {
  const userInfo = await authStore.userInfo()
  patientId.value = userInfo.user.detail.id
  await patientStore.fetchMethodDetail('patient', patientId.value)
  patient.value = patientStore.getDetail('patient')?.data || null
  if (patient.value) {
    form.value = { ...patient.value }
    originalForm.value = { ...patient.value }
  }
})

function getChangedFields() {
  const changedFields = {}
  for (const key in form.value) {
    if (form.value[key] !== originalForm.value[key]) {
      changedFields[key] = form.value[key]
    }
  }
  return changedFields
}

async function updatePatient() {
  const payload = getChangedFields()
  if (Object.keys(payload).length > 0) {
    await patientStore.updateMethodDetail('patient', patientId.value, payload)
    window.location.reload()
  }
}
</script>

<template>
  <userItem>
    <template #header>
      <h2>Update Patient Detail</h2>
    </template>
    <div v-if="patientStore.loading">Loading...</div>
    <form v-else @submit.prevent="updatePatient">
      <div>
        <label for="date_of_birth">Date of Birth:</label>
        <input type="date" id="date_of_birth" v-model="form.date_of_birth" />
      </div>
      <div>
        <label for="gender">Gender:</label>
        <select id="gender" v-model="form.gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <select id="blood_group" v-model="form.blood_group">
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
      <div>
        <input type="text" id="address" v-model="form.address" />
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="form.phone" />
      </div>
      <div>
        <label for="emergency_contact_name">Emergency Contact Name:</label>
        <input type="text" id="emergency_contact_name" v-model="form.emergency_contact_name" />
      </div>
      <div>
        <label for="emergency_contact_phone">Emergency Contact Phone:</label>
        <input type="tel" id="emergency_contact_phone" v-model="form.emergency_contact_phone" />
      </div>
      <div>
        <label for="emergency_contact_relationship">Emergency Contact Relationship:</label>
        <input
          type="text"
          id="emergency_contact_relationship"
          v-model="form.emergency_contact_relationship"
        />
      </div>
      <button type="submit">Update</button>
    </form>
    <template #footer>
      <p>Make your changes and submit to update the patient detail.</p>
    </template>
  </userItem>
</template>
