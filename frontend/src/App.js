import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/status")
      .then(res => setStatus(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDeploy = async () => {
    try {
      await axios.post("http://localhost:5000/deploy");
      alert("🚀 Deployment Triggered");
    } catch (error) {
      alert("❌ Deploy failed");
      console.error(error);
    }
  };

  const handleRollback = async () => {
    try {
      await axios.post("http://localhost:5000/rollback");
      alert("🔁 Rollback Triggered");
    } catch (error) {
      alert("❌ Rollback failed");
      console.error(error);
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Inter, sans-serif",
      background: "#f1f5f9"
    }}>

      {/* Sidebar */}
      <div style={{
        width: "230px",
        background: "#1e293b",
        color: "#fff",
        padding: "20px"
      }}>
        <h2 style={{ fontWeight: "600" }}>🚀 DevOps</h2>

        <div style={{ marginTop: "30px" }}>
          <p style={menuItem}>Dashboard</p>
          <p style={menuItem}>Deployments</p>
          <p style={menuItem}>Monitoring</p>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "30px" }}>

        <h1 style={{ fontWeight: "600", color: "#0f172a" }}>
          CI/CD Control Panel
        </h1>

        {/* Cards */}
        <div style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px"
        }}>

          <div style={{ ...card, borderTop: "4px solid #22c55e" }}>
            <p>Status</p>
            <h3 style={{ color: "#16a34a" }}>Running</h3>
          </div>

          <div style={{ ...card, borderTop: "4px solid #3b82f6" }}>
            <p>Version</p>
            <h3>v1</h3>
          </div>

          <div style={{ ...card, borderTop: "4px solid #f59e0b" }}>
            <p>Traffic</p>
            <h3>Canary Active</h3>
          </div>

        </div>

        {/* 🔥 LIVE STATUS CARD */}
        <div style={{
          marginTop: "20px",
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
        }}>
          <h3>Live Kubernetes Status</h3>

          {status ? (
            <>
              <p><b>Total Pods:</b> {status.totalPods}</p>

              {status.pods.map((p, i) => (
                <p key={i}>
                  {p.name} — {p.status}
                </p>
              ))}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Action Panel */}
        <div style={{
          marginTop: "30px",
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
        }}>
          <h2 style={{ fontWeight: "500", color: "#0f172a" }}>
            Deployment Actions
          </h2>

          <div style={{ marginTop: "15px" }}>
            
            <button onClick={handleDeploy} style={deployBtn}>
              Deploy 🚀
            </button>

            <button onClick={handleRollback} style={rollbackBtn}>
              Rollback 🔁
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}

const card = {
  flex: 1,
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
};

const menuItem = {
  marginBottom: "12px",
  cursor: "pointer",
  opacity: 0.8
};

const deployBtn = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#22c55e",
  color: "#fff",
  marginRight: "10px",
  cursor: "pointer",
  fontWeight: "500"
};

const rollbackBtn = {
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#ef4444",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500"
};

export default App;