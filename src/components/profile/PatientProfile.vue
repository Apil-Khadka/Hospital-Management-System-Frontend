<script setup lang="ts">
import { ref } from 'vue'
import UserMain from '@/components/user/user/userMain.vue'
import PatientMain from '@/components/user/patient/patientMain.vue'

const showUserMain = ref(false)
const showPatientMain = ref(false)

function toggleUserMain() {
  showUserMain.value = !showUserMain.value
}

function togglePatientMain() {
  showPatientMain.value = !showPatientMain.value
}
</script>

<template>
  <div class="container">
    <div class="user-container" @click="toggleUserMain">
      <h3>User Main</h3>
      <transition name="fade">
        <user-main v-if="showUserMain" />
      </transition>
    </div>
    <div class="patient-container" @click="togglePatientMain">
      <h3>Patient Main</h3>
      <transition name="fade">
        <patient-main v-if="showPatientMain" />
      </transition>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
h3 {
  color: #212bd6;
}

.user-container,
.patient-container {
  border: 1px solid #6ac9ca;
  padding: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
