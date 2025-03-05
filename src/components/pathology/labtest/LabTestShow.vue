<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMethodStore } from '@/stores/Methods'
import CardItem from '@/components/cardItem.vue'

const methodStore = useMethodStore()

// State to store the fetched lab tests
const labTests = ref<any[]>([])

async function fetchLabTests() {
  await methodStore.fetchMethodAll('labtest')
  labTests.value = methodStore.getDetailAll('labtest')?.data || []
}

onMounted(() => {
  fetchLabTests()
})

// Form for creating a new lab test
const newLabTest = ref({
  name: '',
  description: '',
  unit_price: 0,
})

async function createLabTest() {
  try {
    await methodStore.createMethodDetail('labtest', {
      name: newLabTest.value.name,
      description: newLabTest.value.description,
      unit_price: newLabTest.value.unit_price,
    })
    alert('Lab test created successfully.')
    newLabTest.value = { name: '', description: '', unit_price: 0 }
    fetchLabTests()
  } catch (error) {
    console.error('Error creating lab test:', error)
  }
}

// For inline editing – store edit data keyed by lab test id
const editLabTestData = ref<{
  [key: number]: { name: string; description: string; unit_price: number }
}>({})

function startEditing(labTest: any) {
  editLabTestData.value[labTest.id] = {
    name: labTest.name,
    description: labTest.description,
    unit_price: labTest.unit_price,
  }
}

async function updateLabTest(labTestId: number) {
  try {
    const data = editLabTestData.value[labTestId]
    await methodStore.updateMethodDetail('labtest', labTestId, data)
    alert('Lab test updated successfully.')
    fetchLabTests()
  } catch (error) {
    console.error('Error updating lab test:', error)
  }
}
</script>

<template>
  <div class="lab-test-manager">
    <h2>Lab Tests</h2>
    <div class="new-labtest-form">
      <h3>Create New Lab Test</h3>
      <form @submit.prevent="createLabTest">
        <div>
          <label for="name">Name</label>
          <input type="text" v-model="newLabTest.name" id="name" required />
        </div>
        <div>
          <label for="description">Description</label>
          <textarea v-model="newLabTest.description" id="description"></textarea>
        </div>
        <div>
          <label for="unit_price">Unit Price</label>
          <input type="number" v-model="newLabTest.unit_price" id="unit_price" min="0" required />
        </div>
        <button type="submit">Create Lab Test</button>
      </form>
    </div>

    <div class="labtest-list">
      <h3>Existing Lab Tests</h3>
      <div v-for="labTest in labTests" :key="labTest.id" style="margin-bottom: 1rem">
        <CardItem>
          <template #header> Lab Test: {{ labTest.name }} </template>
          <template #body>
            <div v-if="!editLabTestData[labTest.id]">
              <p>Description: {{ labTest.description }}</p>
              <p>Unit Price: {{ labTest.unit_price }}</p>
              <button @click="startEditing(labTest)">Edit</button>
            </div>
            <div v-else>
              <div>
                <label>Name</label>
                <input type="text" v-model="editLabTestData[labTest.id].name" />
              </div>
              <div>
                <label>Description</label>
                <textarea v-model="editLabTestData[labTest.id].description"></textarea>
              </div>
              <div>
                <label>Unit Price</label>
                <input type="number" v-model="editLabTestData[labTest.id].unit_price" min="0" />
              </div>
              <button @click="updateLabTest(labTest.id)">Save</button>
            </div>
          </template>
          <template #footer>
            <p>ID: {{ labTest.id }}</p>
          </template>
        </CardItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lab-test-manager {
  padding: 1rem;
  max-height: 800px;
  max-width: 900px;
  overflow-y: auto;
}
.new-labtest-form,
.labtest-list {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #e0f7fa;
  border-radius: 8px;
  color: #004d40;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input,
textarea {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
</style>
