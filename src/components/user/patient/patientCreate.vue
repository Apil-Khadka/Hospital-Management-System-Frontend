<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userItem from '../userItem.vue';
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const patientStore = useMethodStore()
const authStore = useAuthStore();

const form = ref({
  user_id: null,
  date_of_birth: '',
  gender: '',
  blood_group: '',
  address: '',
  phone: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  emergency_contact_relationship: ''
})

onMounted(async () => {
  const userInfo = await authStore.userInfo()
  form.value.user_id = userInfo.user.id
})

async function createPatient() {
  const payload = { ...form.value }
  await patientStore.createMethodDetail('patient',payload)
  window.location.reload();
  // Optionally, trigger a navigation to PatientShow.vue after creation
}
</script>

<template>
  <userItem>
    <template #header>
      <h2>Create Patient Detail</h2>
    </template>
    <form @submit.prevent="createPatient">
      <input type="hidden" v-model="form.user_id" />
      <div>
        <label for="date_of_birth">Date of Birth:</label>
        <input type="date" id="date_of_birth" v-model="form.date_of_birth" required />
      </div>
      <div>
        <label for="gender">Gender:</label>
        <select id="gender" v-model="form.gender" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label for="blood_group">Blood Group:</label>
        <select id="blood_group" v-model="form.blood_group" required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
      <div>
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="form.address" required />
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="form.phone" required />
      </div>
      <div>
        <label for="emergency_contact_name">Emergency Contact Name:</label>
        <input type="text" id="emergency_contact_name" v-model="form.emergency_contact_name" required />
      </div>
      <div>
        <label for="emergency_contact_phone">Emergency Contact Phone:</label>
        <input type="tel" id="emergency_contact_phone" v-model="form.emergency_contact_phone" required />
      </div>
     <div>
       <label for="emergency_contact_relationship">Emergency Contact Relationship:</label>
      <input type="text" id="emergency_contact_relationship" v-model="form.emergency_contact_relationship" required />
      </div>
      <button type="submit">Create</button>
    </form>
    <template #footer>
      <p>Please fill out all required fields.</p>
    </template>
  </userItem>
</template>
