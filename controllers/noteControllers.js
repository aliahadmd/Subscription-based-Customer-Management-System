import Note from "../models/note.js";
import asyncHandler from "express-async-handler";


// get notes
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.findAll();
    res.render("dashboard/dashboard", { notes });
});

//create note
const createNote = asyncHandler(async (req, res) => {
    const { logo, title, kmPerMonth, price, truckType, description } = req.body;
    await Note.create({
        logo,
        title,
        kmPerMonth,
        price,
        truckType,
        description,
    });
    res.redirect("/dashboard");
});


//view single note
const viewNote = asyncHandler(async (req, res) => {
    const note = await Note.findByPk(req.params.id);
    res.render("dashboard/viewNote", { note });
});

// delete single note
const deleteNote = asyncHandler(async (req, res) => {
    await Note.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.redirect("/dashboard");
});

//update single note
const updateNote = asyncHandler(async (req, res) => {
    const { logo, title, kmPerMonth, price, truckType, description } = req.body;
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
    res.redirect("/dashboard");
   
});





export { createNote, getNotes, viewNote, deleteNote, updateNote };