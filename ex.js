<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>README Fetcher</title>
  <link rel="stylesheet" href="PREcss.css">
</head>
<body>
  <nav>
    <h2>Last 5 Repos</h2>
    <ul id="repoHistory"></ul>
  </nav>

  <!-- Main -->
  <div class="main">
    <h1>GitHub README Fetcher</h1>

    <input id="username" placeholder="GitHub Username (e.g. facebook)" />
    <input id="repo" placeholder="Repository Name (e.g. react)" />
    <button id="fetchBtn">Fetch README</button>

    <p id="status"></p>

    <h2>README Content</h2>
    <div id="readme"></div>
  </div>

  <script>
    const usernameInput = document.getElementById("username");
    const repoInput = document.getElementById("repo");
    const statusEl = document.getElementById("status");
    const readmeEl = document.getElementById("readme");
    const historyEl = document.getElementById("repoHistory");

    let repoHistory = JSON.parse(localStorage.getItem("repoHistory")) || [];

    function localHistory() {
      historyEl.innerHTML = "";
      repoHistory.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.user_name + "/" + item.repo_name;
        li.onclick = () => Readme(item.user_name, item.repo_name);
        historyEl.appendChild(li);
      });
    }

    function addToHistory(user_name, repo_name) {
      repoHistory = repoHistory.filter(item => !(item.user_name === user_name && item.repo_name === repo_name));
      repoHistory.unshift({ user_name, repo_name });
      if (repoHistory.length > 5) repoHistory.pop();
      localStorage.setItem("repoHistory", JSON.stringify(repoHistory));
      localHistory();
    }

    function Readme(user_name, repo_name) {
      statusEl.textContent = "Fetching...";

      fetch("http://localhost:3001/api/readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name, repo_name })
      })
        .then(res => {
          if (!res.ok) {
            return res.text().then(errText => {
              throw new Error(errText);
            });
          }
          return res.text();
        })
        .then(text => {
          statusEl.textContent = "Success ✅";
          readmeEl.textContent = text;
          addToHistory(user_name, repo_name);
        })
        .catch(err => {
          statusEl.textContent = "Error: " + err.message;
        });
    }

  document.getElementById("fetchBtn").addEventListener("click", () => {
  const user = usernameInput.value.trim();
  const repo = repoInput.value.trim();
  
  if (!user || !repo) {
    statusEl.textContent = "Please provide both username and repository name.";
    return;
  }

  Readme(user_name, repo_name);
  });


  localHistory();
  </script>
</body>
</html>
