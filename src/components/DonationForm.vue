<template>
    <div>
      <h3>Make a Donation</h3>
      <form @submit.prevent="addDonation">
        <input v-model="donorName" type="text" placeholder="Your Name" required />
        <input v-model="amount" type="number" placeholder="Amount" required />
        <button type="submit">Donate</button>
      </form>
    </div>
  </template>
  
  <script>
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    data() {
      return {
        donorName: "",
        amount: "",
      };
    },
    methods: {
      async addDonation() {
        try {
          await addDoc(collection(db, "donations"), {
            donorName: this.donorName,
            amount: this.amount,
            timestamp: new Date(),
          });
          alert("Donation added successfully!");
          this.donorName = "";
          this.amount = "";
        } catch (error) {
          console.error(error.message);
        }
      },
    },
  };
  </script>
  