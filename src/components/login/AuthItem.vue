<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import IconGoogleLogo from '@/components/icons/IconGoogleLogo.vue'

// Define your trusted backend origin from your environment config
const allowedOrigin = import.meta.env.VITE_API_URL

const handleGoogleAuth = () => {
  // Open the OAuth login in a popup window
  window.open(
    `${allowedOrigin}/api/auth/google/redirect`,
    "_blank",
    "width=500,height=600"
  );
};

const messageHandler = (event: MessageEvent) => {


  if (event.data && event.data.token) {
    // Store the token securely (sessionStorage in this case)
    sessionStorage.setItem("auth_token", event.data.token);
    // Optionally, update your app state or redirect the user
    window.location.reload();
  }
};

onMounted(async () => {
  window.addEventListener('message', messageHandler);



  // Optional: Redirect if already authenticated
  if (sessionStorage.getItem('auth_token')) {
    window.location.href = '/about';
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('message', messageHandler);
});
</script>

<template>
  <div class="main">
    <div class="heading">
      <slot name="heading"></slot>
    </div>
    <div class="form-item">
      <slot name="form"></slot>
      <button @click="handleGoogleAuth" class="google-btn">
        <IconGoogleLogo />
        Continue with Google
      </button>
    </div>
  </div>
</template>


<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: gray;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.heading {
  font-size: 1.5rem;
  font-weight: bold;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Apply styles to elements inside the default slot */
:deep(.form-item input),
:deep(.form-item select),
:deep(.form-item textarea) {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Style the button */
.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s ease-in-out;

  &:hover {
    background: #f1f1f1;
  }
}

.google-btn svg {
  width: 20px;
  height: 20px;
}
</style>
