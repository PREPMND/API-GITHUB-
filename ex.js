const express = require('express');
const fetch_url = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/readme", (req, res) => {
  const { user_name, repo_name } = req.body;

  console.log("📥 Incoming request:", { user_name, repo_name });

  if (!user_name || !repo_name) {
    console.log("❌ Missing username or repository name.");
    return res.status(400).send("USERNAME and REPOSITORY name required!");
  }

  const url = `https://api.github.com/repos/${user_name}/${repo_name}/readme`;
  console.log("🌐 Fetching from GitHub:", url);

  fetch_url(url, {
    headers: {
      "User-Agent": "request-readme-any",
      "Accept": "application/vnd.github.v3+json"
    }
  })
    .then(response => {
      console.log("🔁 GitHub API status:", response.status);
      if (!response.ok) {
        throw new Error(`GitHub API responded with status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.content) {
        console.log("❌ README content missing in GitHub response");
        return res.status(500).send("README content not found.");
      }

      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      res.setHeader("Content-Type", "text/plain");
      console.log("✅ README fetched successfully.");
      res.send(content);
    })
    .catch(err => {
      console.error("🔥 Server error:", err.message);
      res.status(500).send("Server Error: " + err.message);
    });
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
