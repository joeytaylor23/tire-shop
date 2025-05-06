// inventory.js
import { getDatabase, ref, set, update, remove, child } from "firebase/database";

// Function to add a new tire to the inventory
export const addTire = (tireId, tireData) => {
  const db = getDatabase();
  set(ref(db, 'inventory/' + tireId), tireData)
    .then(() => {
      console.log("Tire added successfully.");
    })
    .catch((error) => {
      console.error("Error adding tire:", error);
    });
};

// Function to update an existing tire in the inventory
export const updateTire = (tireId, tireData) => {
  const db = getDatabase();
  const updates = {};
  updates['/inventory/' + tireId] = tireData;
  update(ref(db), updates)
    .then(() => {
      console.log("Tire updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating tire:", error);
    });
};

// Function to delete a tire from inventory
export const deleteTire = (tireId) => {
  const db = getDatabase();
  remove(ref(db, 'inventory/' + tireId))
    .then(() => {
      console.log("Tire removed successfully.");
    })
    .catch((error) => {
      console.error("Error removing tire:", error);
    });
};

// Function to retrieve all tires in inventory
export const getAllTires = () => {
  const db = getDatabase();
  const inventoryRef = ref(db, 'inventory/');
  inventoryRef.once('value', (snapshot) => {
    const inventoryData = snapshot.val();
    console.log(inventoryData);
  });
};
