<script setup lang="ts">
import { ref } from 'vue'
import UserMain from '@/components/user/user/userMain.vue'
import PatientMain from '@/components/user/patient/patientMain.vue'
import StaffMain from '../user/staff/staffMain.vue'

const user_role = sessionStorage.getItem('user_role')
</script>

<template>
  <div class="container" style="max-height: 750px; max-width: 900px; overflow-y: auto">
    <h3>User</h3>
    <user-main />
    <h3>Details</h3>
    <div v-if="user_role === 'patient'">
      <patient-main />
    </div>
    <div v-else>
      <StaffMain />
    </div>
  </div>
</template>
