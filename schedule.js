// schedule.js
import { getDatabase, ref, set, update, remove } from "firebase/database";

// Function to schedule a new service
export const scheduleService = (serviceId, serviceData) => {
  const db = getDatabase();
  set(ref(db, 'schedule/' + serviceId), serviceData)
    .then(() => {
      console.log("Service scheduled successfully.");
    })
    .catch((error) => {
      console.error("Error scheduling service:", error);
    });
};

// Function to update an existing service schedule
export const updateService = (serviceId, serviceData) => {
  const db = getDatabase();
  const updates = {};
  updates['/schedule/' + serviceId] = serviceData;
  update(ref(db), updates)
    .then(() => {
      console.log("Service updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating service:", error);
    });
};

// Function to delete a service schedule
export const deleteService = (serviceId) => {
  const db = getDatabase();
  remove(ref(db, 'schedule/' + serviceId))
    .then(() => {
      console.log("Service removed successfully.");
    })
    .catch((error) => {
      console.error("Error removing service:", error);
    });
};

// Function to retrieve all scheduled services
export const getAllServices = () => {
  const db = getDatabase();
  const scheduleRef = ref(db, 'schedule/');
  scheduleRef.once('value', (snapshot) => {
    const scheduleData = snapshot.val();
    console.log(scheduleData);
  });
};
