import React from "react";

const RestaurantInfoBox = ({
  restaurantType,
  fullAddress,
  workingHours,
  userRating,
  busynessScore,
  onClose,
}) => {
  return (
    <div style={styles.container}>
      <button style={styles.closeButton} onClick={onClose}>
        &times;
      </button>
      <h2 style={styles.header}>Restaurant Details</h2>
      <div style={styles.detail}>
        <strong>Type:</strong> {restaurantType || "Loading..."}
      </div>
      <div style={styles.detail}>
        <strong>Address:</strong> {fullAddress || "Loading..."}
      </div>
      <div style={styles.detail}>
        <strong>Working Hours:</strong> {workingHours || "Loading..."}
      </div>
      <div style={styles.detail}>
        <strong>User Rating:</strong> {userRating || "Loading..."}
      </div>
      <div style={styles.detail}>
        <strong>Busyness:</strong> {busynessScore || "Loading..."}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    bottom: "10%",
    right: "5%",
    width: "300px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },
  header: {
    fontSize: "18px",
    marginBottom: "10px",
    color: "#333",
  },
  detail: {
    fontSize: "14px",
    margin: "8px 0",
    color: "#555",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#999",
  },
};

export default RestaurantInfoBox;