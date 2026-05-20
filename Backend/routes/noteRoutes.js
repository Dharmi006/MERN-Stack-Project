const express = require("express");
const router = express.Router();
const authMiddleware  =require("../middleware/authMiddleware")
const {
    getNotes,
    addNotes,
    deleteNote,
    editNote
} = require ("../Controller/noteController");

router.get("/notes",authMiddleware,getNotes);
router.post("/notes",authMiddleware,addNotes);
router.delete("/notes/:id",authMiddleware,deleteNote);
router.put("/notes/:editId",authMiddleware,editNote);

module.exports = router;