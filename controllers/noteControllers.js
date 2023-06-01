import Note from "../models/Note.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";



// get notes for customers
const getNotes = asyncHandler(async (req, res) => {
    // Check if the user is a customer
  if (req.session.role === 'customer') {
    // find only logged in user notes with user details
    const notes = await Note.findAll({
        where: {
            userId: req.session.userId,
        },
        include: User,
    });
    res.render("dashboard/dashboard", { notes, layout: 'layout/sidebarLayout' });
  } else if (req.session.role === 'subscriber' || req.session.role === 'admin') {
   // find all notes with user details
    const notes = await Note.findAll({ include: User });
    res.render("dashboard/dashboard", { notes, layout: 'layout/sidebarLayout'});
   
  } else {
    res.redirect('signin');
  }
});


//create note
const createNote = asyncHandler(async (req, res) => {
    if (req.session.role === 'customer') {
    const { logo, title, kmPerMonth, price, truckType, description } = req.body;
    await Note.create({
        logo,
        title,
        kmPerMonth,
        price,
        truckType,
        description,
        userId: req.session.userId, // Set the userId field to the current user's userId

    });
    res.redirect("/dashboard")} else {
        res.redirect('signin');
      };
});


//view single note
const viewNote = asyncHandler(async (req, res) => {
    if (req.session.role === 'customer'|| req.session.role === 'subscriber' || req.session.role === 'admin') {
        const note = await Note.findByPk(req.params.id, { include: User });
    res.render("dashboard/viewnote", { note, layout: 'layout/sidebarLayout'});
    };
});

// delete single note
const deleteNote = asyncHandler(async (req, res) => {
    if (req.session.role === 'customer' || req.session.role === 'admin') {
    await Note.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.redirect("/dashboard")};
});

//update single note
const updateNote = asyncHandler(async (req, res) => {
    const { logo, title, kmPerMonth, price, truckType, description } = req.body;
    if (req.session.role === 'customer' || req.session.role === 'admin') {
    await Note.update(
        {
            logo,
            title,
            kmPerMonth,
            price,
            truckType,
            description,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );
    res.redirect("/dashboard")};
   
});





export { createNote, getNotes, viewNote, deleteNote, updateNote};