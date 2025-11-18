// src/App.js
import React, { useEffect, useState } from "react";

function App() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081"); // change to your server URL

    ws.onopen = () => {
      console.log("Connected to TACTPOS-SID WebSocket");
    };

    ws.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);

        // Extract TagInformation packets only
        if (data.Packets && Array.isArray(data.Packets)) {
          const tagPackets = data.Packets.filter(
            (p) => p.Type === "TagInformation"
          ).map((p) => p.Data);

          if (tagPackets.length > 0) {
            setTags((prev) => [...prev, ...tagPackets]);
          }
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    };

    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (err) => console.error("WebSocket error:", err);

    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>TACTPOS Dashboard</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#4CAF50", color: "white" }}>
          <tr>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Tag ID</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Valid</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Payment Form</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Present</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, index) => (
            <tr key={index} style={{ textAlign: "center" }}>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{tag.Tag}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{tag.Name}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {tag.Valid ? "Yes" : "No"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {tag.PaymentFormName || "N/A"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {tag.Present ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
