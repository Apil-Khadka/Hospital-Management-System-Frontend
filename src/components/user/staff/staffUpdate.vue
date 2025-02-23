<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserItem from '@/components/user/userItem.vue'
import { useMethodStore } from '@/stores/Methods.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const staffStore = useMethodStore()
const departmentStore = useMethodStore()
const authStore = useAuthStore();
const staffId = ref<number>(0);
const form = ref({
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
  emergency_contact_phone: ''
})
const originalForm = ref({ ...form.value })
const departments = ref<Array<{ id: number, name: string }>>([])

onMounted(async () => {
  const userInfo = await authStore.userInfo()
  staffId.value = userInfo.user.detail.id
  await staffStore.fetchMethodDetail('staff', staffId.value)
  await departmentStore.fetchMethodAll('department')
  departments.value = departmentStore.infoAll?.data

  if (staffStore.infoDetail) {
    form.value = { ...staffStore.infoDetail.data }
    originalForm.value = { ...staffStore.infoDetail.data }
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

async function updateStaff() {
  const payload = getChangedFields()
  if (Object.keys(payload).length > 0) {
    await staffStore.updateMethodDetail('staff', staffId.value, payload)
    window.location.reload()
  }
}
</script>

<template>
  <userItem>
    <template #header>
      <h2>Update Staff Detail</h2>
    </template>
    <div v-if="staffStore.loading">Loading...</div>
    <form v-else @submit.prevent="updateStaff">
      <div>
        <label for="department_id">Department:</label>
        <select id="department_id" v-model="form.department_id">
          <option value="">Select Department</option>
          <option v-for="department in departments" :key="department.id" :value="department.id">
            {{ department.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="specialization">Specialization:</label>
        <input type="text" id="specialization" v-model="form.specialization" />
      </div>
      <div>
        <input type="text" id="qualification" v-model="form.qualification" />
      </div>
      <div>
        <label for="experience_years">Experience Years:</label>
        <input type="number" id="experience_years" v-model="form.experience_years" />
      </div>
      <div>
        <label for="salary">Salary:</label>
        <input type="number" id="salary" v-model="form.salary" />
      </div>
      <div>
        <label for="license_number">License Number:</label>
        <input type="text" id="license_number" v-model="form.license_number" />
      </div>
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
        <label for="phone_number">Phone Number:</label>
        <input type="tel" id="phone_number" v-model="form.phone_number" />
      </div>
      <div>
        <label for="temporary_address">Temporary Address:</label>
        <input type="text" id="temporary_address" v-model="form.temporary_address" />
      </div>
      <div>
        <input type="text" id="permanent_address" v-model="form.permanent_address" />
      </div>
      <div>
        <label for="employment_status">Employment Status:</label>
        <select id="employment_status" v-model="form.employment_status">
          <option value="">Select Status</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>
      </div>
      <div>
        <label for="shift_details">Shift Details:</label>
        <input type="text" id="shift_details" v-model="form.shift_details" />
      </div>
      <div>
        <label for="emergency_contact_name">Emergency Contact Name:</label>
        <input type="text" id="emergency_contact_name" v-model="form.emergency_contact_name" />
      </div>
      <div>
        <label for="emergency_contact_relationship">Emergency Contact Relationship:</label>
        <input type="text" id="emergency_contact_relationship" v-model="form.emergency_contact_relationship" />
      </div>
      <div>
        <label for="emergency_contact_phone">Emergency Contact Phone:</label>
        <input type="tel" id="emergency_contact_phone" v-model="form.emergency_contact_phone" />
      </div>
      <button type="submit">Update</button>
    </form>
    <template #footer>
      <p>Make your changes and submit to update the staff detail.</p>
    </template>
  </userItem>
</template>
