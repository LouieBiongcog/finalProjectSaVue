<template>
    <div>
      <h2 class="text-center text-info animate__animated animate__fadeIn">Dashboard</h2>
      <p class="text-muted text-center mt-3">Manage your donations and view your progress.</p>
  
      <!-- Add Donation Form -->
      <div class="mt-4">
        <h3 class="text-center">Add Donation</h3>
        <form @submit.prevent="addDonation" class="mx-auto" style="max-width: 400px;">
          <div class="mb-3">
            <label for="donorName" class="form-label">Donor Name</label>
            <input
              type="text"
              id="donorName"
              v-model="donation.donorName"
              class="form-control"
              placeholder="Enter your name"
            />
          </div>
          <div class="mb-3">
            <label for="amount" class="form-label">Donation Amount</label>
            <input
              type="number"
              id="amount"
              v-model="donation.amount"
              class="form-control"
              placeholder="Enter donation amount"
            />
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">Message (optional)</label>
            <textarea
              id="message"
              v-model="donation.message"
              class="form-control"
              placeholder="Write a message"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit Donation</button>
        </form>
      </div>
  
      <!-- Donations List -->
      <div v-if="donations.length" class="mt-5">
        <h3 class="text-center">Donations</h3>
        <ul class="list-group mx-auto" style="max-width: 600px;">
          <li v-for="donation in donations" :key="donation.id" class="list-group-item">
            <strong>{{ donation.donorName }}</strong> donated ₱{{ donation.amount.toFixed(2) }}
            <p class="m-0 text-muted">{{ donation.message }}</p>
            <small class="text-muted">{{ donation.date.toDate().toLocaleString() }}</small>
          </li>
        </ul>
      </div>
      <div v-else class="text-center mt-5">
        <p class="text-muted">No donations available yet. Be the first to donate!</p>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, addDoc, getDocs } from 'firebase/firestore';
  import { db } from '../firebase';
  
  export default {
    data() {
      return {
        donations: [],
        donation: {
          donorName: '',
          amount: '',
          message: '',
        },
      };
    },
    methods: {
      async addDonation() {
        try {
          // Check if required fields are filled
          if (this.donation.donorName && this.donation.amount) {
            // Add donation to Firestore
            const docRef = await addDoc(collection(db, 'donations'), {
              donorName: this.donation.donorName,
              amount: parseFloat(this.donation.amount),
              message: this.donation.message || '',
              date: new Date(),
            });
  
            console.log('Donation added with ID:', docRef.id);
            alert('Donation added successfully!');
  
            // Reset form fields
            this.donation.donorName = '';
            this.donation.amount = '';
            this.donation.message = '';
  
            // After adding, re-fetch donations
            this.fetchDonations();
          } else {
            alert('Please fill in all required fields!');
          }
        } catch (error) {
          console.error('Error adding donation:', error);
          alert('An error occurred while adding the donation.');
        }
      },
      async fetchDonations() {
        try {
          // Fetch all donations from Firestore
          const querySnapshot = await getDocs(collection(db, 'donations'));
          
          // Check if the fetched data is correct
          console.log('Fetched donations:', querySnapshot.docs.map(doc => doc.data()));
  
          // Update donations array
          this.donations = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        } catch (error) {
          console.error('Error fetching donations:', error);
          alert('An error occurred while fetching donations.');
        }
      },
    },
    created() {
      // Fetch donations when the component is created
      this.fetchDonations();
    },
  };
  </script>
  