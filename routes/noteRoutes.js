import express from "express"; 
import multer from "multer";
import path from "path";
import Note from "../models/Note.js";
import asyncHandler from "express-async-handler";
import {createNote, getNotes, viewNote, deleteNote, updateNote} from '../controllers/noteControllers.js'
import {isAuthenticated} from '../middlewares/authMiddleware.js'

const router=express.Router()


// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extname = path.extname(file.originalname);
      cb(null, uniqueSuffix + extname);
    }
  });

// Create multer instance with storage configuration
const upload = multer({ storage: storage });


//getnotes.....................
router.get('/',isAuthenticated, getNotes)

//create note....................
// get create note page
router.get('/create', isAuthenticated, (req,res)=>{
    res.render('dashboard/createNote', { layout: 'layout/sidebarLayout'})
})
// create note
router.post('/create', isAuthenticated, upload.single('logo'), createNote)

//view single note....................
router.get('/view/:id', isAuthenticated, viewNote)

// delete note.....................
router.get('/delete/:id', isAuthenticated, deleteNote)

// update note.........................
router.get('/update/:id', isAuthenticated, asyncHandler(async (req, res) => {
    const note = await Note.findByPk(req.params.id);
    res.render('dashboard/updateNote', { note, layout: 'layout/sidebarLayout' });
}));

//update note
router.post('/update/:id', isAuthenticated, upload.single('logo'), updateNote)







export default router
