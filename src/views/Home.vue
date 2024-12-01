<template>
    <div class="text-center">
      <h2 class="animate__animated animate__zoomIn">Welcome to the Donation Platform</h2>
      <p class="text-muted mt-3">Make a difference by supporting causes you care about.</p>
      <button @click="getStarted" class="btn btn-primary btn-lg mt-3 animate__animated animate__pulse animate__infinite">
        Get Started
      </button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      getStarted() {
        alert('Redirecting to Sign-Up page...');
        this.$router.push('/signup');
      },
    },
  };
  </script>
  