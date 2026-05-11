import { useState,useEffect } from 'react'
import Navbar from "./component/Navbar";
import "./App.css"
import AddNote from './component/AddNote';
import NoteContainer from './component/NoteContainer'

function App() {
  const [cards ,setCards] = useState([]);
    const [titleInput,setTitleInput] = useState("");
    const [contentInput,setContentInput] = useState("");
    const[editId,setEditId] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const filteredCards = cards.filter((note) =>
    note.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    useEffect(()=>{
        fetch("http://localhost:8080/notes")
        .then((res)=> res.json())
        .then((data)=>{  
            setCards(data);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[]);

    //delete note
    const deleteNote = async(id) =>{
         await fetch(`http://localhost:8080/notes/${id}`,{
            method:"DELETE"
        });
        setCards((prevNotes) =>
            prevNotes.filter((note)=>note._id !== id)
        );  
    }
   // add note
    const addNote = async() => {
        await fetch("http://localhost:8080/notes",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify({title: titleInput ,content:contentInput}),
         })
       .then((res) => res.json())
       .then((newNote) => {
        setCards((prevNotes) => [...prevNotes, newNote]);
        setTitleInput("");
        setContentInput("");
       })
      .catch((err) => console.log(err));
     }

     //edit note
     const editNote = (id, title, content) => {
     setEditId(id);
     setTitleInput(title);
     setContentInput(content);
    }
     const editNoteSave = async () => {
     await fetch(`http://localhost:8080/notes/${editId}`, {
     method: "PUT",
     headers: { "content-type": "application/json" },
     body: JSON.stringify({ title: titleInput, content: contentInput }),
    })
  .then((res) => res.json())
  .then((updated) => {
    setCards((prev) => prev.map((n) => n._id === editId ? updated : n));
    setEditId(null);
    setTitleInput("");
    setContentInput("");
  })
  .catch((err) => console.log(err));
 }
  return (
    <>
      <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="MainLayout">
         <NoteContainer cards={filteredCards} deleteNote={deleteNote}  editNote={editNote} />
         <AddNote titleInput={titleInput}
          setTitleInput={setTitleInput}
          contentInput={contentInput}
          setContentInput={setContentInput}
          addNote={addNote}
          editId={editId} editNoteSave={editNoteSave} />
      </div>
      </>
  );
}
export default App;
