import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { submitFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/submit", requireSignIn, submitFeedback);

export default router;
