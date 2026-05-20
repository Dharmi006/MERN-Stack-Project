import { useState, useEffect } from "react";
import Login from "./component/Login";
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        setShowLogin(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowLogin(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://mern-notes-api-ohev.onrender.com/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchNotes();
    } else {
      setLoading(false);
      setCards([]);
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCards([]);
    setShowLogin(true);
  };

  const filteredCards = cards.filter((note) =>
    (note.title || "").toLowerCase().includes(searchInput.toLowerCase())
  );

  const deleteNote = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`https://mern-notes-api-ohev.onrender.com/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setCards((prev) => prev.filter((note) => note._id !== id));
  };

  const addNote = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://mern-notes-api-ohev.onrender.com/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: titleInput, content: contentInput }),
    });
    const newNote = await res.json();
    setCards((prev) => [...prev, newNote]);
    setTitleInput("");
    setContentInput("");
  };

  const editNote = (id, title, content) => {
    setEditId(id);
    setTitleInput(title);
    setContentInput(content);
  };

  const editNoteSave = async () => {
    if (!editId) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`https://mern-notes-api-ohev.onrender.com/notes/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: titleInput, content: contentInput }),
    });
    const updated = await res.json();
    setCards((prev) => prev.map((n) => (n._id === editId ? updated : n)));
    setEditId(null);
    setTitleInput("");
    setContentInput("");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // ✅ FIX: authMode and setAuthMode now passed here too
  if (!isLoggedIn) {
    return (
      <>
        <Navbar
          isLoggedIn={isLoggedIn}
          setShowLogin={setShowLogin}
          handleLogout={handleLogout}
        />
        {showLogin && (
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setShowLogin={setShowLogin}
            authMode={authMode}
            setAuthMode={setAuthMode}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setShowLogin={setShowLogin}
        handleLogout={handleLogout}
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
      {showLogin && (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          setShowLogin={setShowLogin}
          authMode={authMode}
          setAuthMode={setAuthMode}
        />
      )}
    </>
  );
}

export default App;