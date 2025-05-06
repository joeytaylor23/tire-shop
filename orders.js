// orders.js
import { getDatabase, ref, set, update, remove } from "firebase/database";

// Function to create a new customer order
export const createOrder = (orderId, orderData) => {
  const db = getDatabase();
  set(ref(db, 'orders/' + orderId), orderData)
    .then(() => {
      console.log("Order created successfully.");
    })
    .catch((error) => {
      console.error("Error creating order:", error);
    });
};

// Function to update an existing order
export const updateOrder = (orderId, orderData) => {
  const db = getDatabase();
  const updates = {};
  updates['/orders/' + orderId] = orderData;
  update(ref(db), updates)
    .then(() => {
      console.log("Order updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating order:", error);
    });
};

// Function to delete a customer order
export const deleteOrder = (orderId) => {
  const db = getDatabase();
  remove(ref(db, 'orders/' + orderId))
    .then(() => {
      console.log("Order removed successfully.");
    })
    .catch((error) => {
      console.error("Error removing order:", error);
    });
};

// Function to retrieve all customer orders
export const getAllOrders = () => {
  const db = getDatabase();
  const ordersRef = ref(db, 'orders/');
  ordersRef.once('value', (snapshot) => {
    const ordersData = snapshot.val();
    console.log(ordersData);
  });
};
