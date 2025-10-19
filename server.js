const express = require("express");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Logging setiap file diakses
  server.use((req, res, nextFn) => {
    if (req.url.startsWith("/uploads")) {
      console.log(`📂 [Static] ${req.method} ${req.url}`);
    }
    nextFn();
  });

  // Serve folder uploads
  server.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

  // Biarkan Next.js tangani route lain
  server.all("*", (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
