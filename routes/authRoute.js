import express from "express";
import passport from "passport";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { getAllUsers } from "../controllers/userController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import JWT from "jsonwebtoken";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// Get all users
router.get("/users", requireSignIn, isAdmin, getAllUsers);

// Initiate Google Authentication
router.get(
  "/google",
  (req, res, next) => {
    req.session.redirect = req.query.redirect || "/dashboard/user";
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = JWT.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const redirect = req.session.redirect || "/";
    delete req.session.redirect;

    res.redirect(
      `http://localhost:3000/login?token=${token}&user=${encodeURIComponent(
        JSON.stringify(req.user)
      )}&redirect=${redirect}`
    );
  }
);

export default router;
