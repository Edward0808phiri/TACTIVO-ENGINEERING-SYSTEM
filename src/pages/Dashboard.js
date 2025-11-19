import React, { useState } from "react";
import "../styles.css";


export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-container">

      {/* SIDENAV */}
      <div className={`sidenav ${collapsed ? "collapsed" : ""}`}>
        <h3>Menu</h3>
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "Open" : "Collapse"}
        </button>

        {!collapsed && (
          <div style={{ marginTop: 20 }}>
            <p>Dashboard</p>
            <p>Pumps</p>
            <p>Transactions</p>
            <p>Reports</p>
            <p>Settings</p>
          </div>
        )}
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="dashboard">

        {/* Right Column */}
        <div style={{ float: "right" }}>
          <div className="alert-box">Live Alerts</div>
        </div>

        <h2>Dashboard</h2>

        <div className="graph-box">Graph 1 (Mock)</div>
        <div className="graph-box">Graph 2 (Mock)</div>
      </div>
    </div>
  );
}
