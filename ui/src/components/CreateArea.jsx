import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { blue } from "@material-ui/core/colors";

import Accordion from 'react-bootstrap/Accordion';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  function collapse(event) {
    setExpanded(false);

    setNote({
      title: "",
      content: ""
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
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            type="text"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoFocus
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
        <Zoom in={isExpanded}>
          <Fab className="red" onClick={collapse}>
            <RemoveIcon />
          </Fab>
        </Zoom>
      </form>

      <div className="articles__container">

        {words.map((word, index) => 
          <div key={word.id} className='word-container note'>
              <Accordion>
                <Accordion.Item eventKey={index}>
                <Accordion.Header>{word.word}</Accordion.Header>
                  <Accordion.Body>
                  <p className="wordType part-of-speech"> {word.type} ({word.gender})</p>
                <p className="translation">{word.translation}</p>
                <hr></hr>
                <p className="description">{word.description}</p>
                <p className="location">{word.location} Term</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
          </div>
        )}

       

       
      </div>
    </div>
  );
}

export default CreateArea;
