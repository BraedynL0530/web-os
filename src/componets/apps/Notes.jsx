import { useState, useEffect } from "react";
import '../../css/Notes.css';

function Notes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedId, setSelectedId] = useState(null);

  const activeNote = notes.find(n => n.id === selectedId);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      title: "Untitled",
      text: ""
    };

    setNotes(prev => [...prev, newNote]);
    setSelectedId(newNote.id);
  };

  const updateNote = (field, value) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === selectedId
          ? { ...note, [field]: value }
          : note
      )
    );
  };

  return (
    <div className="notes-app">
        <div className="note-list">
        {notes.map(note => (
          <div
            key={note.id}
            className={`note ${note.id === selectedId ? "active" : ""}`}
            onClick={() => setSelectedId(note.id)}
          >
            {note.title}
          </div>
        ))}
      </div>
        <div className="notes-editor">

        <button onClick={addNote}>+ New Note</button>

        {activeNote ? (
          <>
            <input
              value={activeNote.title}
              onChange={(e) => updateNote("title", e.target.value)}
            />

            <textarea
              value={activeNote.text}
              onChange={(e) => updateNote("text", e.target.value)}
            />
          </>
        ) : (
          <div className="empty-state">
            Select or create a note
          </div>
        )}

      </div>
    </div>
  );
}

export default Notes;