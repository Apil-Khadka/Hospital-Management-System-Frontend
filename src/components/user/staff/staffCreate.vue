<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userItem from '../userItem.vue'
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const staffStore = useMethodStore()
const authStore = useAuthStore()

const form = ref({
  user_id: null,
  department_id: null,
  specialization: '',
  qualification: '',
  experience_years: 0,
  salary: 0,
  license_number: '',
  date_of_birth: '',
  gender: '',
  phone_number: '',
  temporary_address: '',
  permanent_address: '',
  employment_status: '',
  shift_details: '',
  emergency_contact_name: '',
  emergency_contact_relationship: '',
  emergency_contact_phone: '',
})

const departments = ref<Array<{ id: number; name: string }>>([])

onMounted(async () => {
  const userInfo = await authStore.userInfo()
  form.value.user_id = userInfo.user.id
  await staffStore.fetchMethodAll('department')
  departments.value = staffStore.getDetailAll('department')?.data
})

async function createStaff() {
  const payload = { ...form.value }
  await staffStore.createMethodDetail('staff', payload)
  window.location.reload()
}
</script>

<template>
  <userItem>
    <template #header>
      <h2>Create Staff Detail</h2>
    </template>
    <form @submit.prevent="createStaff">
      <input type="hidden" v-model="form.user_id" />
      <div>
        <label for="department_id">Department:</label>
        <select id="department_id" v-model="form.department_id" required>
          <option value="">Select Department</option>
          <option v-for="department in departments" :key="department.id" :value="department.id">
            {{ department.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="specialization">Specialization:</label>
        <input type="text" id="specialization" v-model="form.specialization" required />
      </div>
      <div>
        <label for="qualification">Qualification:</label>
        <input type="text" id="qualification" v-model="form.qualification" required />
      </div>
      <div>
        <label for="experience_years">Experience Years:</label>
        <input type="number" id="experience_years" v-model="form.experience_years" required />
      </div>
      <div>
        <label for="salary">Salary:</label>
        <input type="number" id="salary" v-model="form.salary" required />
      </div>
      <div>
        <label for="license_number">License Number:</label>
        <input type="text" id="license_number" v-model="form.license_number" required />
      </div>
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
        <label for="phone_number">Phone Number:</label>
        <input type="tel" id="phone_number" v-model="form.phone_number" required />
      </div>
      <div>
        <label for="temporary_address">Temporary Address:</label>
        <input type="text" id="temporary_address" v-model="form.temporary_address" required />
      </div>
      <div>
        <label for="permanent_address">Permanent Address:</label>
        <input type="text" id="permanent_address" v-model="form.permanent_address" required />
      </div>
      <div>
        <label for="employment_status">Employment Status:</label>
        <select id="employment_status" v-model="form.employment_status" required>
          <option value="">Select Status</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>
      </div>
      <div>
        <label for="shift_details">Shift Details:</label>
        <input type="text" id="shift_details" v-model="form.shift_details" required />
      </div>
      <div>
        <label for="emergency_contact_name">Emergency Contact Name:</label>
        <input
          type="text"
          id="emergency_contact_name"
          v-model="form.emergency_contact_name"
          required
        />
      </div>
      <div>
        <label for="emergency_contact_relationship">Emergency Contact Relationship:</label>
        <input
          type="text"
          id="emergency_contact_relationship"
          v-model="form.emergency_contact_relationship"
          required
        />
      </div>
      <div>
        <label for="emergency_contact_phone">Emergency Contact Phone:</label>
        <input
          type="tel"
          id="emergency_contact_phone"
          v-model="form.emergency_contact_phone"
          required
        />
      </div>
      <button type="submit">Create</button>
    </form>
    <template #footer>
      <p>Please fill out all required fields.</p>
    </template>
  </userItem>
</template>
