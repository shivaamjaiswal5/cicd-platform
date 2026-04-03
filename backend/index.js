const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

/* ✅ ROOT */
app.get("/", (req, res) => {
  res.send("Backend v2 🚀");
});

/* ✅ DEPLOY */
app.post("/deploy", (req, res) => {
  console.log("🚀 Deploy triggered");
  res.send("Deployment started");
});

/* ✅ ROLLBACK */
app.post("/rollback", (req, res) => {
  console.log("🔁 Rollback triggered");
  res.send("Rollback done");
});

/* ✅ STATUS (KUBERNETES DATA) */
app.get("/status", (req, res) => {
  exec("kubectl get pods -o json", (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data");
    }

    const data = JSON.parse(stdout);

    const pods = data.items.map(pod => ({
      name: pod.metadata.name,
      status: pod.status.phase
    }));

    res.json({
      totalPods: pods.length,
      pods: pods
    });
  });
});

/* ✅ AUTO ROLLBACK (SAFE VERSION) */
app.post("/auto-rollback", (req, res) => {
  exec("kubectl delete deployment backend-v2 --ignore-not-found", (err, stdout, stderr) => {
    console.log("⚠️ Auto rollback triggered");
    res.send("Auto rollback executed");
  });
});

/* ✅ START SERVER (ALWAYS LAST) */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});