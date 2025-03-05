<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue'
import { useApiStore } from '@/stores/api.ts'

interface HeadOfDepartment {
  id: number
  firstname?: string
  lastname?: string
  email: string
  detail: {
    date_of_birth: string
    department_name: string
    emergency_contact_name: string
    emergency_contact_phone: string
    emergency_contact_relationship: string
    employment_status: string
    experience_years: number
    gender: string
    license_number: string
    permanent_address: string
    phone_number: string
    qualification: string
    shift_details: string
    specialization: string
    temporary_address: string
    user_name: string
  }
}

interface Department {
  id: number
  name: string
  contact_number: string
  description: string
  email: string
  head_of_department: HeadOfDepartment
  location: string
}

const apiStore = useApiStore()
const data = ref<Department[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await apiStore.apiFetch(
      'GET',
      `${import.meta.env.VITE_API_URL}/api/department`
    )
    const responseData = await response.json()
    // Check if responseData has a "data" property and use it
    data.value = responseData.data || responseData
    console.log('Fetched Data:', toRaw(data.value))
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Departments</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <div v-if="data.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="department in data"
          :key="department.id"
          class="bg-white p-4 rounded-lg shadow-md"
        >
          <h2 class="text-xl font-semibold">{{ department.name }}</h2>
          <p class="text-sm text-gray-600">{{ department.description }}</p>
          <p class="mt-2"><strong>Contact:</strong> {{ department.contact_number }}</p>
          <p><strong>Email:</strong> {{ department.email }}</p>
          <p><strong>Location:</strong> {{ department.location }}</p>

          <div v-if="department.head_of_department" class="mt-4 p-3 border-t">
            <h3 class="text-lg font-medium">Head of Department</h3>
            <p>
              <strong>Name:</strong> {{ department.head_of_department.firstname }}
              {{ department.head_of_department.lastname }}
            </p>
            <p><strong>Email:</strong> {{ department.head_of_department.email }}</p>
            <p><strong>Phone:</strong> {{ department.head_of_department.detail.phone_number }}</p>
            <p>
              <strong>Specialization:</strong>
              {{ department.head_of_department.detail.specialization }}
            </p>
            <p>
              <strong>Experience:</strong>
              {{ department.head_of_department.detail.experience_years }} years
            </p>
          </div>
        </div>
      </div>
      <p v-else class="text-center text-gray-500">No departments available.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.p-6 {
  padding: 1.5rem;
}

.text-2xl {
  font-size: 1.5rem;
}

.font-bold {
  font-weight: bold;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-center {
  text-align: center;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.md\:grid-cols-2 {
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.lg\:grid-cols-3 {
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.gap-6 {
  gap: 1.5rem;
}

.bg-white {
  background-color: rgba(142, 198, 97, 0.32);
}

.p-4 {
  padding: 1rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-xl {
  font-size: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}

.text-sm {
  font-size: 0.875rem;
}

.text-gray-600 {
  color: #4a5568;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.p-3 {
  padding: 0.75rem;
}

.border-t {
  border-top: 1px solid #0572ef;
}

.text-lg {
  font-size: 1.125rem;
}

.font-medium {
  font-weight: 500;
}

.text-gray-500 {
  color: #a0aec0;
}
</style>
