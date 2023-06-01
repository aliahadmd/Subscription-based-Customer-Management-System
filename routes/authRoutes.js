import express from "express";
const router = express.Router();
import {signupControllers, signinControllers} from "../controllers/authControllers.js";

//show signup.ejs page
router.get("/signup", (req, res) => {
    res.render("signup");
});

//signup post route
router.post("/signup", signupControllers)

// Signin route
router.get('/signin', (req, res) => {
    res.render('signin');
  });

//signin post route
router.post("/signin", signinControllers)

export default router;
