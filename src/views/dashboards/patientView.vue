<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="sidebar_down">
    <ul>
      <li><RouterLink to="/patient/profile" active-class="active-link">Profile</RouterLink></li>
      <li>
        <RouterLink to="/patient/appointment" active-class="active-link">Appointment</RouterLink>
      </li>
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
.sidebar_down ul {
  list-style-type: none;
  padding: 0;
}

.sidebar_down li {
  margin: 1rem 0;
}

.sidebar_down li .active-link {
  font-weight: bold;
  color: #3498db; /* Active link color */
}
</style>
