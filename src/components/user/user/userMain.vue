<script setup lang="ts">
import { ref } from 'vue'
import UserShow from '@/components/user/user/userShow.vue'
import UserUpdate from '@/components/user/user/userUpdate.vue'

const showUpdate = ref(false);

function handleUpdate() {
  showUpdate.value = true;
}
</script>

<template>
  <div>
    <div v-if="!showUpdate">
      <user-show></user-show>
      <button @click="handleUpdate">Update user Detail</button>
    </div>
    <user-update v-if="showUpdate"></user-update>
  </div>
</template>
