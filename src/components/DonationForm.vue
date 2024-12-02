<template>
  <div>
    <h3>Make a Donation</h3>
    <form @submit.prevent="addDonation">
      <input v-model="donorName" type="text" placeholder="Your Name" required />
      <input v-model.number="amount" type="number" placeholder="Donation Amount" required />
      <textarea v-model="message" placeholder="Message (optional)"></textarea>
      <button type="submit">Submit Donation</button>
    </form>

    <h4>Recent Donations</h4>
    <ul v-if="donations.length > 0">
      <li v-for="(donation, index) in donations" :key="index">
        <strong>{{ donation.donorName }}</strong> donated {{ donation.amount }} - 
        {{ donation.message || "No message" }} ({{ new Date(donation.timestamp).toLocaleString() }})
      </li>
    </ul>
    <p v-else>No donations available yet. Be the first to donate!</p>
  </div>
</template>

<script>
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default {
  data() {
    return {
      donorName: "",
      amount: "",
      message: "",
      donations: [], 
    };
  },
  methods: {
    async addDonation() {
      try {
        if (!this.donorName || !this.amount || this.amount <= 0) {
          alert("Please enter valid details.");
          return;
        }

        const newDonation = {
          donorName: this.donorName,
          amount: this.amount,
          message: this.message || null,
          timestamp: new Date(),
        };

       
        await addDoc(collection(db, "donations"), newDonation);

       
        this.donorName = "";
        this.amount = "";
        this.message = "";
        alert("Donation added successfully!");
      } catch (error) {
        console.error("Error adding donation:", error.message);
        alert("An error occurred. Please try again.");
      }
    },
    listenForDonations() {
      const q = query(collection(db, "donations"), orderBy("timestamp", "desc"));

     
      onSnapshot(q, (snapshot) => {
        this.donations = snapshot.docs.map((doc) => doc.data());
      });
    },
  },
  created() {
    this.listenForDonations();
  },
};
</script>
