import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Word from "./Word";
import CreateArea from "./CreateArea";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  const [words, setWords] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/entries')
      const jsonResult = await result.json();

      setWords(jsonResult)
    }

    fetchData();
  }, [])

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />

      <div className="vocabulary__container">
        {words.map((word, index) => 
          <Word 
            key={index}
            eventKey={index}
            word={word.word}
            type={word.type}
            gender={word.gender}
            translation={word.translation}
            description={word.description}
            location={word.location}
          /> 
        )}
      </div>

      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
