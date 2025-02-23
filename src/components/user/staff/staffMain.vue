<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useAuthStore } from '@/stores/authStore.ts'
import StaffCreate from '@/components/user/staff/staffCreate.vue'
import StaffShow from '@/components/user/staff/staffShow.vue'
import StaffUpdate from '@/components/user/staff/staffUpdate.vue'

const authStore = useAuthStore();
const hasStaffDetail = ref(false);
const showUpdate = ref(false);

onMounted(async () => {
  const userInfo = await authStore.userInfo();
  hasStaffDetail.value = !!userInfo.user.detail;
});

function handleUpdate() {
  showUpdate.value = true;
}
</script>

<template>
  <div>
    <staff-create v-if="!hasStaffDetail"></staff-create>
    <div v-else-if="hasStaffDetail && !showUpdate">
      <staff-show></staff-show>
      <button @click="handleUpdate">Update Patient Detail</button>
    </div>
    <staff-update v-if="showUpdate"></staff-update>
  </div>
</template>
