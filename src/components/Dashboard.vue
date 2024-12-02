<template>
  <div>
    <h2 class="text-center text-info animate__animated animate__fadeIn">Dashboard</h2>
    <p class="text-muted text-center mt-3">Manage your donations and view your progress.</p>

  
    <div class="mt-4">
      <h3 class="text-center" v-if="!isEditing">Add Donation</h3>
      <h3 class="text-center" v-if="isEditing">Edit Donation</h3>
      <form @submit.prevent="isEditing ? updateDonation() : addDonation()" class="mx-auto" style="max-width: 400px;">
        <div class="mb-3">
          <label for="donorName" class="form-label">Donor Name</label>
          <input
            type="text"
            id="donorName"
            v-model="donation.donorName"
            class="form-control"
            placeholder="Enter your name"
            required
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
            required
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
        <button type="submit" class="btn btn-primary w-100">
          {{ isEditing ? "Update Donation" : "Submit Donation" }}
        </button>
        <button v-if="isEditing" @click="cancelEdit" class="btn btn-secondary w-100 mt-2">Cancel</button>
      </form>
    </div>

   
    <div v-if="donations.length" class="mt-5">
      <h3 class="text-center">Donations</h3>
      <transition-group name="fade" tag="ul" class="list-group mx-auto" style="max-width: 600px;">
        <li
          v-for="donation in donations"
          :key="donation.id"
          class="list-group-item donation-card animate__animated animate__fadeIn"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>{{ donation.donorName }}</strong> donated ₱{{ donation.amount ? donation.amount.toFixed(2) : "0.00" }}
              <p class="m-0 text-muted">{{ donation.message }}</p>
              <small class="text-muted">{{ donation.date.toLocaleString() }}</small>
            </div>
            <div>
              <button @click="editDonation(donation)" class="btn btn-sm btn-warning me-2">Edit</button>
              <button @click="deleteDonation(donation.id)" class="btn btn-sm btn-danger">Delete</button>
            </div>
          </div>
        </li>
      </transition-group>
    </div>
    <div v-else class="text-center mt-5">
      <p class="text-muted">No donations available yet. Be the first to donate!</p>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default {
  data() {
    return {
      donations: [],
      donation: {
        id: null,
        donorName: "",
        amount: "",
        message: "",
      },
      isEditing: false,
    };
  },
  methods: {
    async addDonation() {
      try {
        if (this.donation.donorName && this.donation.amount) {
          const docRef = await addDoc(collection(db, "donations"), {
            donorName: this.donation.donorName,
            amount: parseFloat(this.donation.amount) || 0,
            message: this.donation.message || "",
            date: new Date(),
          });

          console.log("Donation added with ID:", docRef.id);
          alert("Donation added successfully!");
          this.resetForm();
          this.fetchDonations();
        } else {
          alert("Please fill in all required fields!");
        }
      } catch (error) {
        console.error("Error adding donation:", error);
        alert("An error occurred while adding the donation.");
      }
    },
    async fetchDonations() {
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        this.donations = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            donorName: data.donorName || "Anonymous",
            amount: data.amount || 0,
            message: data.message || "No message",
            date: data.date ? data.date.toDate() : new Date(),
          };
        });
      } catch (error) {
        console.error("Error fetching donations:", error);
        alert("An error occurred while fetching donations.");
      }
    },
    async deleteDonation(id) {
      try {
        await deleteDoc(doc(db, "donations", id));
        alert("Donation deleted successfully!");
        this.fetchDonations();
      } catch (error) {
        console.error("Error deleting donation:", error);
        alert("An error occurred while deleting the donation.");
      }
    },
    editDonation(donation) {
      this.donation = { ...donation }; 
      this.isEditing = true;
    },
    async updateDonation() {
      try {
        const docRef = doc(db, "donations", this.donation.id);
        await updateDoc(docRef, {
          donorName: this.donation.donorName,
          amount: parseFloat(this.donation.amount) || 0,
          message: this.donation.message || "",
        });
        alert("Donation updated successfully!");
        this.resetForm();
        this.fetchDonations();
      } catch (error) {
        console.error("Error updating donation:", error);
        alert("An error occurred while updating the donation.");
      }
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.donation = {
        id: null,
        donorName: "",
        amount: "",
        message: "",
      };
      this.isEditing = false;
    },
  },
  created() {
    this.fetchDonations();
  },
};
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.donation-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  background: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}


.donation-card:hover {
  background: #e9ecef;
  transform: scale(1.02);
  transition: all 0.3s ease-in-out;
}


.me-2 {
  margin-right: 0.5rem;
}
</style>
