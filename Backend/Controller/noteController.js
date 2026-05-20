const Notes = require("../models/note");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.find({user:req.user.id,});
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.addNotes = async (req, res) => {
  try {
    let { title, content } = req.body;

    const newNote = new Notes({
      title,
      content,
      user:req.user.id,
    });

    await newNote.save();
    res.json(newNote);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    let deleteNote = await Notes.findByIdAndDelete(req.params.id);
    res.json({ message: "deleted" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.editNote = async (req, res) => {
  try {
    let { title, content } = req.body;
    let editId = req.params.editId;

    let updatedData = await Notes.findByIdAndUpdate(
      editId,
      { title, content },
      { new: true }
    );

    res.json(updatedData);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};