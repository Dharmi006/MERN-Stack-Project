const Notes = require("../models/note");

exports.getNotes = async (req,res)=>{
    const notes =  await Notes.find();
    res.json(notes);
};
exports.addNotes = async(req,res)=>{
    let {title,content} = req.body;

    const newNote =new Notes({
        title:title,
        content:content,
    });
    await newNote.save();
     res.json(newNote);
}

exports.deleteNote = async(req,res)=>{
    let deleteNote = await Notes.findByIdAndDelete(req.params.id);
    console.log(deleteNote);
    res.json({message:"deleted"});
}
exports.editNote = async(req,res)=>{
    let{title,content} = req.body;
    let editId = req.params.editId;
    let updatedData =  await Notes.findByIdAndUpdate(editId,{title:title,content:content},{new:true});
    console.log(updatedData);
    res.json(updatedData);
}