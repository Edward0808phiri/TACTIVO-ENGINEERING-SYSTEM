import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function LiveDataDashboard() {
  const [tagsData, setTagsData] = useState({});

  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io("https://tatatest.onrender.com", {
      transports: ["websocket"], // optional but recommended
    });

    socket.on("connect", () => {
      console.log("Connected with Socket.IO:", socket.id);
    });

    socket.on("pts2-data", (parsed) => {
      const packet = parsed.Packets?.[0];
      if (packet?.Type === "TagInformation") {
        const tagId = packet.Data.Tag;
        setTagsData((prev) => ({
          ...prev,
          [tagId]: packet.Data,
        }));
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Live PTS2 Data</h1>
      <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tag</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Valid</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Payment Form</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Present</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(tagsData).map((tag, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px" }}>{tag.Tag}</td>
              <td style={{ padding: "8px" }}>{tag.Name}</td>
              <td style={{ padding: "8px" }}>{tag.Valid ? "Yes" : "No"}</td>
              <td style={{ padding: "8px" }}>{tag.PaymentFormName || "-"}</td>
              <td style={{ padding: "8px" }}>{tag.Present ? "Yes" : "No"}</td>
            </tr>
          ))}
          {Object.keys(tagsData).length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "8px" }}>
                Waiting for data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LiveDataDashboard;
