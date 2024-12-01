<template>
    <div class="mx-auto" style="max-width: 400px;">
      <h2 class="text-center text-primary animate__animated animate__fadeIn">Login</h2>
      <form @submit.prevent="handleLogin" class="mt-4">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" placeholder="Enter your password" />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        if (this.email && this.password) {
          console.log('Logging in:', { email: this.email, password: this.password });
          alert('Login successful!');
          this.email = '';
          this.password = '';
        } else {
          alert('Please fill in all fields!');
        }
      },
    },
  };
  </script>
  