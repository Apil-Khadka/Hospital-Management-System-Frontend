<script setup lang="ts">
import { ref } from 'vue'
import UserMain from '@/components/user/user/userMain.vue'
import PatientMain from '@/components/user/patient/patientMain.vue'
</script>

<template>
  <div class="container">
    <h3>User</h3>
    <user-main />
    <h3>Details</h3>
    <patient-main />
  </div>
</template>
