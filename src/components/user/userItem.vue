<script setup lang="ts">
// No additional script logic required at this time.
</script>

<template>
  <div class="user-item">
    <div class="user-info">
      <h3>User Information</h3>
      <slot name="info"></slot>
    </div>
    <div class="user-details">
      <h3>User Details</h3>
      <slot name="details"></slot>
    </div>
    <div class="user-actions">
      <h3>Actions</h3>
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style scoped>
.user-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #f2f2f2;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  margin: 1rem 0;
}

.user-info,
.user-details,
.user-actions {
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
}

.user-info h3,
.user-details h3,
.user-actions h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #333;
}
</style>
