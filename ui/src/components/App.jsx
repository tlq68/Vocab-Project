import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import Word from "./Word";
import CreateArea from "./CreateArea";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [notes, setNotes] = useState([Object.keys(localStorage)][0]);

  
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(title, id) {
    localStorage.removeItem(title)
    console.log(localStorage)
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

      <div>
        {notes.map((key, index) => {
           return (
        
            <Note
              key={index}
              id={index}
              title={key}
              content={localStorage[key]}
              onDelete={deleteNote}
            />
           )
        
        })
        
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
