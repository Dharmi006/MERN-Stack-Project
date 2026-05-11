import { useState } from "react"
import "../Notecard.css"
export default function Notecard({id,title,content,deleteNote,editNote,editId}){
    return(
            <div className="Card">
                <div className="CardContent">
                    <h5>{title}</h5>
                    <p>{content}</p>
                </div>
            <div className="Buttons">
              <button onClick={()=>editNote(id,title,content)}><i className="fa-solid fa-pen-to-square"></i></button> 
              <button onClick={()=>deleteNote(id)}><i className="fa-solid fa-trash"></i></button>
            </div>
       </div> 
    );
};