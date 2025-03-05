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

<style scoped lang="scss">
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

/* Center content for header and body */
.card-header {
  background-color: var(--color-background-header);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-heading-dark);
  text-align: center;
}

.card-body {
  background-color: var(--color-background-body);
  color: var(--color-text-dark);
  text-align: center;
}

/* Footer items are displayed in a row with space-between to push items to the corners */
.card-footer {
  background-color: var(--color-background-footer);
  color: var(--color-text-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 1024px) {
  .card {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }
}
</style>
