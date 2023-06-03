import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

const signupControllers = asyncHandler(async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // There are validation errors
    const errorMessages = errors.array().map((error) => error.msg);
    return res.render('signup', { errors: errorMessages });
  }
    const { name, email, phone_number, vat, address, password, role } = req.body;
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    // create a new user
    const user = await User.create({
        name,
        email,
        phone_number,
        vat,
        address,
        password,
        role
    });
    // redirect to login page
    res.redirect('/signin');

})

// signin controller
const signinControllers = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // There are validation errors
    const errorMessages = errors.array().map((error) => error.msg);
    return res.render('signin', { errors: errorMessages });
  }

  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ where: { email } });

  if (!user) {
    const errorMessages = ['Invalid email or password'];
    return res.render('signin', { errors: errorMessages });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const errorMessages = ['Invalid email or password'];
    return res.render('signin', { errors: errorMessages });
  }

  // Set user role and userId in session
  req.session.role = user.role;
  req.session.userId = user.id; // Assuming your User model has an 'id' field

  // Redirect to dashboard
  res.redirect('/dashboard');
});




export {signupControllers, signinControllers};