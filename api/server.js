const express = require("express");
const es6Renderer = require("express-es6-template-engine");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { createTransport } = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./models");
const { readFileSync } = require("node:fs");

const packageJson = JSON.parse(readFileSync("./package.json"));

const apiVersion = packageJson.version;

const app = express();
app.engine("html", es6Renderer);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(express.json());
const corsOptions = {
  origin: ["http://localhost:3009"],
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.render("index", {
    locals: {
      title: "Learning Vietnamese",
      meta: {
        title: "Learning Vietnamese",
        description: "Learning Vietnamese",
      },
    },
  });
});

app.get("/api/ping", (req, res) => {
  res.status(200);
  res.json({
    version: `${apiVersion}`,
  });
});

app.use("/api/translations", require("./routes/translations"));
app.use("/api/permissions", require("./routes/permissions"));
app.use("/api/tokens", require("./routes/tokens"));

app.use(express.static("public", { etag: false, lastModified: false }));

app.listen(process.env.INTERNAL_PORT, () => {
  console.log(`Server listening on port ${process.env.INTERNAL_PORT}`);
});
