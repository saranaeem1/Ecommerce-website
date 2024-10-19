import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import http from "http";
import portfinder from "portfinder";
import cors from "cors";
import passport from "passport"; 
import session from "express-session"; 
import "./config/passport.js";

// Config env
dotenv.config();

// Validate essential environment variables
const requiredEnvVars = [
  "SESSION_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing environment variable: ${varName}`);
  }
});

// Database config
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Session middleware (required for Passport)
app.use(
  session({
    secret: process.env.SESSion_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/feedback", feedbackRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome",
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send({ status: "UP" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    success: false,
    message: "Internal Server Error",
  });
});

// Dynamically find an available port using portfinder
portfinder
  .getPortPromise()
  .then((port) => {
    // Create HTTP server
    const server = http.createServer(app);

    // Start listening on the determined port
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log("Closed all connections.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  })
  .catch((err) => {
    console.error("Error finding an available port:", err);
  });

app.get("/api/v1/auth/google/callback", (req, res) => {
  const { name, email, id: googleId } = req.user;

  User.findOne({ email }, (err, user) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }

    if (user) {
      const token = generateToken(user); // Your token generation logic
      return res
        .status(200)
        .json({ success: true, message: "User logged in", token });
    } else {
      const newUser = new User({
        name,
        email,
        googleId,
        // Other defaults as necessary
      });

      newUser.save((err, savedUser) => {
        if (err) {
          console.error(err);
          return res
            .status(400)
            .json({ success: false, message: "Error saving user", error: err });
        }
        const token = generateToken(savedUser); // Your token generation logic
        return res
          .status(201)
          .json({ success: true, message: "User registered", token });
      });
    }
  });
});
