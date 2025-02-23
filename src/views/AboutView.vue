<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>
<template>
  <div class="mainabout">
    <div class="about">
      <h1>This is an about page</h1>
    </div>
    <div class="counter">
      <p>Count: {{ counter.count }}</p>
      <p>Double Count: {{ counter.doubleCount }}</p>
      <button @click="counter.increment">Increment</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mainabout {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  background-color: #a5a583;
}

.about {
  text-align: center;
  margin-bottom: 20px;
}

.counter {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #89c76a;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.counter p {
  margin: 5px 0;
}

.counter button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.counter button:hover {
  background-color: #0056b3;
}

@media (min-width: 1024px) {
  .mainabout {
    flex-direction: row;
  }
  .about,
  .counter {
    margin: 0 20px;
  }
}
</style>
