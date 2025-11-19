import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // make sure this exists



export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login: in real case, validate with API
    if (username && password) {
      navigate("/dashboard");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="login-page">
      {/* Top right fuel image */}
  <img src="/fuel-icon.png" alt="Fuel Symbol" className="fuel-icon" />

      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label>Forgot Password?</label>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>

      <footer>
        <p>© 2025</p>
        <p>LEADING FUEL AUTOMATION COMPANY</p>
      </footer>
    </div>
  );
}
