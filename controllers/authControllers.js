import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

const signupControllers = asyncHandler(async(req,res)=>{
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
const signinControllers = asyncHandler(async(req,res)=>{
    const { email, password } = req.body;
   // Find the user by email
   const user = await User.findOne({ where: { email } });
   if (!user) {
     return res.status(400).json({ message: 'Invalid email or password' });
   }
 // Set user role and userId in session
    req.session.role = user.role;
    req.session.userId = user.id; // Assuming your User model has an 'id' field
   // Redirect or send response
   res.redirect('/dashboard');
})

export {signupControllers, signinControllers};