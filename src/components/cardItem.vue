<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
}

.card-header,
.card-body,
.card-footer {
  padding: 1rem;
}

.card-header {
  background-color: var(--color-background-header);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-heading-dark);
}

.card-body {
  background-color: var(--color-background-body);
  color: var(--color-text-dark);
}

.card-footer {
  background-color: var(--color-background-footer);
  text-align: right;
  color: var(--color-text-dark);
}

@media (min-width: 1024px) {
  .card {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }
}
</style>
