<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
  <div class="sidebar_down">
<ul>
  <li>  <RouterLink to="/patient/profile">Profile</RouterLink> </li>
    <li> <RouterLink to="/patient/appointment">Appointment</RouterLink> </li>
 </ul>
  </div>
  <router-view />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
