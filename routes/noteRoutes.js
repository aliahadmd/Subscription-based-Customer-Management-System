import express from "express"; 
import Note from "../models/Note.js";
import asyncHandler from "express-async-handler";
import {createNote, getNotes, viewNote, deleteNote, updateNote} from '../controllers/noteControllers.js'
import {isAuthenticated} from '../middlewares/authMiddleware.js'


const router=express.Router()

//getnotes.....................
router.get('/',isAuthenticated, getNotes)

//create note....................
// get create note page
router.get('/create', isAuthenticated, (req,res)=>{
    res.render('dashboard/createNote', { layout: 'layout/sidebarLayout'})
})
// create note
router.post('/create', isAuthenticated, createNote)

//view single note....................
router.get('/view/:id', isAuthenticated, viewNote)

// delete note.....................
router.get('/delete/:id', isAuthenticated, deleteNote)

// update note.........................
router.get('/update/:id', isAuthenticated, asyncHandler(async (req, res) => {
    const note = await Note.findByPk(req.params.id);
    res.render('dashboard/updateNote', { note, layout: 'layout/sidebarLayout' });
}));

router.post('/update/:id', isAuthenticated, updateNote);




export default router
