const express = require("express");
const router = express.Router();

const {
    getNotes,
    addNotes,
    deleteNote,
    editNote
} = require ("../Controller/noteController");

router.get("/notes",getNotes);
router.post("/notes",addNotes);
router.delete("/notes/:id",deleteNote);
router.put("/notes/:editId",editNote);

module.exports = router;