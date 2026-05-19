import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import "./App.css";
import AddNote from "./component/AddNote";
import NoteContainer from "./component/NoteContainer";

function App() {
  const [cards, setCards] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  const filteredCards = cards.filter((note) =>
    note.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Fetch Notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(
          "https://mern-notes-api-ohev.onrender.com/notes"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Delete Note
  const deleteNote = async (id) => {
    try {
      const res = await fetch(
        `https://mern-notes-api-ohev.onrender.com/notes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete note");
      }

      setCards((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  // Add Note
  const addNote = async () => {

    // Prevent empty note
    if (!titleInput.trim() || !contentInput.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://mern-notes-api-ohev.onrender.com/notes",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            title: titleInput,
            content: contentInput,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to add note");
      }

      const newNote = await res.json();

      setCards((prevNotes) => [...prevNotes, newNote]);

      setTitleInput("");
      setContentInput("");

    } catch (err) {
      console.log(err);
    }
  };

  // Edit Note
  const editNote = (id, title, content) => {
    setEditId(id);
    setTitleInput(title);
    setContentInput(content);
  };

  // Save Edited Note
  const editNoteSave = async () => {
    try {
      const res = await fetch(
        `https://mern-notes-api-ohev.onrender.com/notes/${editId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            title: titleInput,
            content: contentInput,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update note");
      }

      const updated = await res.json();

      setCards((prev) =>
        prev.map((n) => (n._id === editId ? updated : n))
      );

      setEditId(null);
      setTitleInput("");
      setContentInput("");

    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <div className="MainLayout">

        <NoteContainer
          cards={filteredCards}
          deleteNote={deleteNote}
          editNote={editNote}
        />

        <AddNote
          titleInput={titleInput}
          setTitleInput={setTitleInput}
          contentInput={contentInput}
          setContentInput={setContentInput}
          addNote={addNote}
          editId={editId}
          editNoteSave={editNoteSave}
        />

      </div>
    </>
  );
}

export default App;