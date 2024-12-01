<template>
    <div class="mx-auto" style="max-width: 400px;">
      <h2 class="text-center text-success animate__animated animate__fadeIn">Sign Up</h2>
      <form @submit.prevent="handleSignup" class="mt-4">
        <div class="mb-3">
          <label for="name" class="form-label">Full Name</label>
          <input type="text" id="name" v-model="name" class="form-control" placeholder="Enter your full name" />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" placeholder="Create a password" />
        </div>
        <button type="submit" class="btn btn-success w-100">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      handleSignup() {
        if (this.name && this.email && this.password) {
          console.log('Signing up:', { name: this.name, email: this.email, password: this.password });
          alert('Sign-up successful!');
          this.name = '';
          this.email = '';
          this.password = '';
        } else {
          alert('Please fill in all fields!');
        }
      },
    },
  };
  </script>
  