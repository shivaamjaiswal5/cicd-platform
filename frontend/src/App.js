import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await axios.get("http://localhost:5000/status");
      setStatus(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (url, msg) => {
    try {
      await axios.post(url);
      alert(msg);
      fetchStatus();
    } catch {
      alert("❌ Action failed");
    }
  };

  // 🎯 Traffic calculation
  const v1 = status?.pods?.filter(p => p.name.includes("v1")).length || 0;
  const v2 = status?.pods?.filter(p => p.name.includes("v2")).length || 0;
  const total = v1 + v2;

  const v1Percent = total ? Math.round((v1 / total) * 100) : 0;
  const v2Percent = total ? Math.round((v2 / total) * 100) : 0;

  return (
    <div style={{
      ...container,
      background: dark ? "#0f172a" : "#f1f5f9",
      color: dark ? "#fff" : "#000",
      transition: "0.3s"
    }}>

      {/* Sidebar */}
      <div style={{
        ...sidebar,
        background: dark ? "#020617" : "#1e293b"
      }}>
        <h2>🚀 DevOps</h2>

        <button
          onClick={() => setDark(!dark)}
          style={toggleBtn}
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "30px" }}>

        <h1 style={title}>CI/CD Control Panel</h1>

        {/* Cards */}
        <div style={cardContainer}>
          <GlassCard title="Status" value="Running" color="#22c55e" />
          <GlassCard title="Versions" value={`${v1} v1 / ${v2} v2`} color="#3b82f6" />
          <GlassCard title="Traffic Mode" value="Canary ⚡" color="#f59e0b" />
        </div>

        {/* 🔥 TRAFFIC STATS */}
        <div style={glass}>
          <h3>Traffic Distribution</h3>

          <p>🔵 v1: <b>{v1Percent}%</b></p>
          <p>🟠 v2: <b>{v2Percent}%</b></p>

          <div style={progressBar}>
            <div style={{
              width: `${v1Percent}%`,
              background: "#3b82f6",
              height: "100%",
              borderRadius: "10px 0 0 10px"
            }}></div>

            <div style={{
              width: `${v2Percent}%`,
              background: "#f59e0b",
              height: "100%"
            }}></div>
          </div>
        </div>

        {/* Live Status */}
        <div style={glass}>
          <h3>Live Kubernetes Status</h3>

          {loading ? (
            <p>⏳ Loading...</p>
          ) : (
            status.pods.map((p, i) => (
              <p key={i}>
                🟢 <b>{p.name}</b> — {p.status}
              </p>
            ))
          )}
        </div>

        {/* Actions */}
        <div style={glass}>
          <h3>Deployment Actions</h3>

          <button onClick={() => handleAction("http://localhost:5000/deploy", "🚀 Deploy")} style={btn("#22c55e")}>
            Deploy 🚀
          </button>

          <button onClick={() => handleAction("http://localhost:5000/rollback", "🔁 Rollback")} style={btn("#ef4444")}>
            Rollback 🔁
          </button>

          <button onClick={() => handleAction("http://localhost:5000/auto-rollback", "⚠️ Auto Rollback")} style={btn("#f97316")}>
            Auto Rollback ⚠️
          </button>

        </div>
      </div>
    </div>
  );
}

/* 🎨 Components */

const GlassCard = ({ title, value, color }) => (
  <div style={{
    ...glass,
    borderTop: `4px solid ${color}`
  }}>
    <p>{title}</p>
    <h3 style={{ color }}>{value}</h3>
  </div>
);

/* 🎨 Styles */

const container = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif"
};

const sidebar = {
  width: "230px",
  color: "#fff",
  padding: "20px"
};

const title = {
  fontWeight: "600"
};

const cardContainer = {
  display: "flex",
  gap: "20px",
  marginTop: "20px"
};

const glass = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "15px",
  backdropFilter: "blur(10px)",
  background: "rgba(255,255,255,0.2)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
};

const btn = (color) => ({
  marginRight: "10px",
  padding: "10px 20px",
  borderRadius: "10px",
  border: "none",
  background: color,
  color: "#fff",
  cursor: "pointer",
  marginTop: "10px"
});

const toggleBtn = {
  marginTop: "20px",
  padding: "8px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer"
};

const progressBar = {
  display: "flex",
  height: "12px",
  marginTop: "10px",
  borderRadius: "10px",
  overflow: "hidden",
  background: "#e5e7eb"
};

export default App;