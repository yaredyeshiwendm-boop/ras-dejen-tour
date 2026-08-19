const express = require("express");
const path = require("path");
const { query, testDatabase } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ─────────────────────────────────────────────
// HEALTH
// ─────────────────────────────────────────────

app.get("/api/health", async (req, res) => {
  try {
    const db = await testDatabase();

    res.json({
      success: true,
      server: "Ras Dejen Tour",
      database: "connected",
      time: db.now
    });
  } catch (error) {
    console.error("Health error:", error.message);

    res.status(500).json({
      success: false,
      server: "Ras Dejen Tour",
      database: "disconnected"
    });
  }
});

// ─────────────────────────────────────────────
// PLACES
// ─────────────────────────────────────────────

app.get("/api/places", async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM places ORDER BY id ASC"
    );

    res.json({
      success: true,
      places: result.rows
    });
  } catch (error) {
    console.error("Places error:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to load places"
    });
  }
});

// ─────────────────────────────────────────────
// TOURS
// ─────────────────────────────────────────────

app.get("/api/tours", async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM tours ORDER BY id ASC"
    );

    res.json({
      success: true,
      tours: result.rows
    });
  } catch (error) {
    console.error("Tours error:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to load tours"
    });
  }
});

// ─────────────────────────────────────────────
// HOTELS
// ─────────────────────────────────────────────

app.get("/api/hotels", async (req, res) => {
  try {
    const result = await query(
      "SELECT * FROM hotels ORDER BY id ASC"
    );

    res.json({
      success: true,
      hotels: result.rows
    });

  } catch (error) {

    console.error("Hotels error:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to load hotels"
    });

  }
});

// ─────────────────────────────────────────────
// CREATE USER
// ─────────────────────────────────────────────

app.post("/api/users", async (req, res) => {
  try {
    const {
      telegram_id,
      first_name,
      username
    } = req.body;

    if (!telegram_id) {
      return res.status(400).json({
        success: false,
        error: "telegram_id is required"
      });
    }

    const result = await query(
      `INSERT INTO users
        (telegram_id, first_name, username)
       VALUES ($1, $2, $3)
       ON CONFLICT (telegram_id)
       DO UPDATE SET
         first_name = EXCLUDED.first_name,
         username = EXCLUDED.username
       RETURNING *`,
      [telegram_id, first_name || null, username || null]
    );

    res.json({
      success: true,
      user: result.rows[0]
    });
  } catch (error) {
    console.error("User error:", error.message);

    res.status(500).json({
      success: false,
      error: "Failed to save user"
    });
  }
});

// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// START SERVER
// ─────────────────────────────────────────────

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Ras Dejen Tour running on port ${PORT}`);
});
