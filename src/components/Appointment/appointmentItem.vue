<template>
  <div class="appointment-item">
    <header class="appointment-item-header">
      <slot name="header"></slot>
    </header>
    <div class="appointment-item-body">
      <slot></slot>
    </div>
    <footer class="appointment-item-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.appointment-item {
  border: 1px solid #92d8c1;
  border-radius: 4px;
  padding: 16px;
  margin: 16px 0;
  background-color: #c1cf5b;
  color: black;
}

.appointment-item-header,
.appointment-item-footer {
  background-color: rgba(102, 31, 152, 0.64);
  padding: 8px;
}

.appointment-item-body {
  padding: 16px;
}
strong {
  color: #2ac166;
}
</style>
