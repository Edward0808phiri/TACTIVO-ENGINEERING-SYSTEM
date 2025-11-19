import React, { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button onClick={() => setCollapsed(!collapsed)}>☰</button>

      {!collapsed && (
        <>
          <h2 className="menu-title">Menu</h2>
          <div className="menu-item">Dashboard</div>
          <div className="menu-item">Transactions</div>
          <div className="menu-item">Pumps</div>
          <div className="menu-item">Reports</div>
          <div className="menu-item">Settings</div>
        </>
      )}
    </div>
  );
}
