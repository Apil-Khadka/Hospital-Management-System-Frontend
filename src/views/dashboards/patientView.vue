<script setup lang="ts">
import { useApiStore } from '@/stores/api.ts'

const apiStore = useApiStore()
const response =  apiStore.apiFetch('GET', `api/auth/info`)
console.log(response)
</script>
<template>
  <div>
    <h1>This is an patient panel</h1>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
