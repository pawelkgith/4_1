"use strict";

const express = require("express");
const app = express();

// define endpoint for exercise 1 here
app.get("/math/circle/:r", (req, res) => {
  const r = parseFloat(req.params.r);

  if (isNaN(r) || r <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const area = (Math.PI * r * r).toFixed(2);
  const circuit = (2 * Math.PI * r).toFixed(2);

  res.json({
    pole: area,
    obwod: circuit,
  });
});

app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);

  if (isNaN(width) || isNaN(height) || width < 0 || height < 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const area = width * height;
  const circumference = width * 2 + height * 2;

  res.json({
    pole: area,
    obwod: circumference,
  });
});

app.get("/math/power/:base/:exponent", (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);
  const optionalRoot = req.query.root === "true";

  if (isNaN(base) || isNaN(exponent) || (optionalRoot && base < 0)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const response = {
    result: Math.pow(base, exponent),
  };

  if (optionalRoot) {
    response.root = Math.sqrt(base);
  }

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
