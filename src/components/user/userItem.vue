<template>
  <div class="user-item">
    <header class="user-item-header">
      <slot name="header"></slot>
    </header>
    <div class="user-item-body">
      <slot></slot>
    </div>
    <footer class="user-item-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.user-item {
  border: 1px solid #92d8c1;
  border-radius: 4px;
  padding: 16px;
  margin: 16px 0;
  background-color: #c1cf5b;
  color: black;
}

.user-item-header,
.user-item-footer {
  background-color: rgba(102, 31, 152, 0.64);
  padding: 8px;
}

.user-item-body {
  padding: 16px;
}
</style>
