// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBUmun4oZUueZdM-gTzniXAhRLHvC8OkwI",
    authDomain: "tireshopinventory.firebaseapp.com",
    projectId: "tireshopinventory",
    storageBucket: "tireshopinventory.firebasestorage.app",
    messagingSenderId: "819501091286",
    appId: "1:819501091286:web:29b6c5867ed82ae4a3bc77"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form handler
document.getElementById("inventory-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("price").value);
  const size = document.getElementById("size").value;

  try {
    await addDoc(collection(db, "inventory"), {
      brand,
      model,
      quantity,
      price,
      size,
      addedAt: new Date()
    });

    document.getElementById("message").textContent = "Tire added successfully!";
    document.getElementById("inventory-form").reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    document.getElementById("message").textContent = "Error adding tire.";
  }
});

// Display inventory in table
function renderInventory(docs) {
    const tbody = document.querySelector("#inventory-table tbody");
    tbody.innerHTML = ""; // Clear previous rows
  
    docs.forEach((doc) => {
      const data = doc.data();
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${data.brand}</td>
        <td>${data.model}</td>
        <td>${data.quantity}</td>
        <td>${data.price.toFixed(2)}</td>
        <td>${data.size}</td>
      `;
  
      tbody.appendChild(row);
    });
  }
  
  // Live update inventory table
  onSnapshot(query(inventoryRef), (snapshot) => {
    renderInventory(snapshot.docs);
  });