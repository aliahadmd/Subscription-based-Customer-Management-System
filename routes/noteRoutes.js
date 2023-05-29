import express from "express"; 
import Note from "../models/note.js";
import asyncHandler from "express-async-handler";
import {createNote, getNotes, viewNote, deleteNote, updateNote} from '../controllers/noteControllers.js'


const router=express.Router()

//getnotes
router.get('/',getNotes)

//create note
router.get('/create',(req,res)=>{
    res.render('dashboard/createNote')
})

router.post('/create',createNote)

//view single note
router.get('/view/:id',viewNote)

// delete note
router.get('/delete/:id',deleteNote)

// update note
router.get('/update/:id', asyncHandler(async (req, res) => {
    const note = await Note.findByPk(req.params.id);
    res.render('dashboard/updateNote', { note });
}));

router.post('/update/:id', updateNote);




export default router
