// src/components/StationCard.js
import React from "react";

export default function StationCard({ station }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      margin: "10px",
      borderRadius: "5px"
    }}>
      <h3>{station?.name || "Station Name"}</h3>
      <p>ID: {station?.id || "ID"}</p>
      <p>Status: {station?.status || "Unknown"}</p>
    </div>
  );
}
