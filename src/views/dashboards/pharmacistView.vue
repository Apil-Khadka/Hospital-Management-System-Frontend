<script setup lang="ts"></script>

<template>
  <div class="sidebar_down">
    <ul>
      <li>
        <RouterLink to="/pharmacist/profile" active-class="active-link">Profile</RouterLink>
      </li>
      <li>
        <RouterLink to="/pharmacist/prescription" active-class="active-link"
          >Prescriptions</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/pharmacist/medication" active-class="active-link">Medications</RouterLink>
      </li>
    </ul>
  </div>

  <router-view />
</template>

<style scoped>
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
