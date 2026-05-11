import { useState } from "react";
import { useEffect } from "react";
import NoteCard from "./Notecard";
import "../NoteContainer.css";

export default function NoteContainer({cards,deleteNote,editNote}){
    return(
        <div className="NoteSection">
          <h2>Welcome back!</h2>
          <p className="subtitle">Here are your notes</p>
          <div className="NoteContainer">
            {cards.map((note)=>(
                 <NoteCard 
                    key={note._id}
                    id={note._id}
                    title = {note.title}
                    content={note.content}
                    deleteNote={deleteNote}
                    editNote={editNote}
                 />
            ))} 
        </div>
    </div>
   )};