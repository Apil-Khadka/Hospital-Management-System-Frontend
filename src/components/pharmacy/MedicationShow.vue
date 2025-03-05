<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useMethodStore } from '@/stores/Methods'
import CardItem from '@/components/cardItem.vue'

const methodStore = useMethodStore()

// ---------- Medication Categories ----------
const categories = ref<any[]>([])

async function fetchCategories() {
  await methodStore.fetchMethodAll('category/medication')
  categories.value = methodStore.getDetailAll('category/medication') || []
  console.log(categories.value)
}

onMounted(() => {
  fetchCategories()
})

// Form for creating a new category
const newCategory = ref({
  name: '',
  description: '',
})

async function createCategory() {
  try {
    await methodStore.createMethodDetail('category/medication', {
      name: newCategory.value.name,
      description: newCategory.value.description,
    })
    alert('Category created successfully.')
    newCategory.value = { name: '', description: '' }
    fetchCategories()
  } catch (error) {
    console.error('Error creating category:', error)
  }
}

// ---------- Medications ----------
const medications = ref<any[]>([])

async function fetchMedications() {
  await methodStore.fetchMethodAll('medication')
  medications.value = methodStore.getDetailAll('medication')?.data || []
}

onMounted(() => {
  fetchMedications()
})

// ---------- Category Filter ----------
// If no category is selected (empty string), show all medications
const selectedCategory = ref<string>('')

const filteredMedications = computed(() => {
  return selectedCategory.value
    ? medications.value.filter((med) => med.category.id === selectedCategory.value)
    : medications.value
})

// ---------- New Medication Form ----------
const newMedication = ref({
  generic_name: '',
  category_id: '',
  unit_price: 0,
})

async function createMedication() {
  try {
    await methodStore.createMethodDetail('medication', {
      generic_name: newMedication.value.generic_name,
      category_id: newMedication.value.category_id,
      unit_price: newMedication.value.unit_price,
    })
    alert('Medication created successfully.')
    newMedication.value = { generic_name: '', category_id: '', unit_price: 0 }
    fetchMedications()
  } catch (error) {
    console.error('Error creating medication:', error)
  }
}

// ---------- Inline Editing for Medications ----------
const editMedicationData = ref<{
  [key: number]: { generic_name: string; category_id: string; unit_price: number }
}>({})

function startEditingMedication(medication: any) {
  editMedicationData.value[medication.id] = {
    generic_name: medication.generic_name,
    category_id: medication.category.id, // assuming medication.category is an object with id and name
    unit_price: medication.unit_price,
  }
}

async function updateMedication(medicationId: number) {
  try {
    const data = editMedicationData.value[medicationId]
    await methodStore.updateMethodDetail('medication', medicationId, data)
    alert('Medication updated successfully.')
    fetchMedications()
  } catch (error) {
    console.error('Error updating medication:', error)
  }
}
</script>

<template>
  <div class="medication-manager">
    <h2>Medication Categories</h2>
    <div class="new-category-form">
      <form @submit.prevent="createCategory">
        <div>
          <label for="cat-name">Category Name</label>
          <input type="text" id="cat-name" v-model="newCategory.name" required />
        </div>
        <div>
          <label for="cat-description">Description</label>
          <textarea id="cat-description" v-model="newCategory.description"></textarea>
        </div>
        <button type="submit">Create Category</button>
      </form>
    </div>
    <div class="category-list">
      <h3>Existing Categories</h3>
      <div v-for="cat in categories" :key="cat.id" class="category-item">
        <p>{{ cat.name }}</p>
        <p>{{ cat.description }}</p>
      </div>
    </div>

    <h2>Medications</h2>
    <!-- Filter by Category -->
    <div class="medication-filter">
      <label for="med-filter">Filter by Category:</label>
      <select id="med-filter" v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div class="new-medication-form">
      <form @submit.prevent="createMedication">
        <div>
          <label for="med-name">Generic Name</label>
          <input type="text" id="med-name" v-model="newMedication.generic_name" required />
        </div>
        <div>
          <label for="med-category">Category</label>
          <select id="med-category" v-model="newMedication.category_id" required>
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="med-price">Unit Price</label>
          <input type="number" id="med-price" v-model="newMedication.unit_price" min="0" required />
        </div>
        <button type="submit">Create Medication</button>
      </form>
    </div>

    <!-- List Existing Medications with Inline Editing -->
    <div class="medication-list">
      <h3>Existing Medications</h3>
      <div v-for="med in filteredMedications" :key="med.id" style="margin-bottom: 1rem">
        <CardItem>
          <template #header> Medication: {{ med.generic_name }} </template>
          <template #body>
            <p>Category: {{ med.category.name }}</p>
            <p>Unit Price: {{ med.unit_price }}</p>
            <div v-if="!editMedicationData[med.id]">
              <button @click="startEditingMedication(med)">Edit</button>
            </div>
            <div v-else>
              <div>
                <label>Generic Name</label>
                <input type="text" v-model="editMedicationData[med.id].generic_name" />
              </div>
              <div>
                <label>Category</label>
                <select v-model="editMedicationData[med.id].category_id">
                  <option value="" disabled>Select Category</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              <div>
                <label>Unit Price</label>
                <input type="number" v-model="editMedicationData[med.id].unit_price" min="0" />
              </div>
              <button @click="updateMedication(med.id)">Save</button>
            </div>
          </template>
          <template #footer>
            <p>ID: {{ med.id }}</p>
          </template>
        </CardItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
.medication-manager {
  padding: 1rem;
  max-width: 900px;
  max-height: 800px;
  overflow-y: auto;
}
.new-category-form,
.category-list,
.new-medication-form,
.medication-list,
.medication-filter {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #e0f7fa;
  border-radius: 8px;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  color: darkblue;
}
input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.4rem 0.8rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.category-item {
  background: #b2ebf2;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  color: darkblue;
}
</style>
