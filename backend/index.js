const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend v2 🚀");
});

app.post("/deploy", (req, res) => {
  console.log("🚀 Deploy triggered");
  res.send("Deployment started");
});

app.post("/rollback", (req, res) => {
  console.log("🔁 Rollback triggered");
  res.send("Rollback done");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
const { exec } = require("child_process");

app.get("/status", (req, res) => {
  exec("kubectl get pods -o json", (err, stdout, stderr) => {
    if (err) {
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