<template>
  <div id="app">
    <!-- Header Section -->
    <header class="bg-primary text-white py-4 shadow">
      <div class="container text-center">
        <h1 class="animate__animated animate__fadeInDown">Donation Platform</h1>
        <nav class="nav justify-content-center mt-3">
          <router-link to="/" class="nav-link text-white">Home</router-link>
          <router-link to="/login" class="nav-link text-white">Login</router-link>
          <router-link to="/signup" class="nav-link text-white">Sign Up</router-link>
          <router-link to="/dashboard" class="nav-link text-white">Dashboard</router-link>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container my-5">
      <div class="animate__animated animate__fadeInUp">
        <router-view />
      </div>
    </main>


    <footer class="bg-light py-3 shadow">
      <div class="container text-center">
        <p class="m-0">&copy; 2024 Donation Platform. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>

#app {
  font-family: "Arial", sans-serif;
}

header h1 {
  font-size: 3rem;
  font-weight: bold;
}

nav .nav-link:hover {
  text-decoration: underline;
  font-weight: bold;
}

main {
  min-height: 60vh;
}
</style>
