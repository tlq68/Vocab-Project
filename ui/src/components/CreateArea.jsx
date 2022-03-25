import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

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

  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/articles')
      const jsonResult = await result.json();

      setArticles(jsonResult)
    }

    fetchData();
  }, [])
  

  return (
    <div>

          <div className="authors__container">

            <h2>Articles:</h2>
            {articles.map(article => 
              <div key={article.id} className='article__container'>
                <h3>{article.title} {article.content}</h3>
              </div>
            )}
          </div>

      <form action="../../post" method="post" className="create-note">
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

      <form action="../../articles" method="post">
        <input type="text" value='Title Test' name="title"></input>
        <input type="text" value='Content Test' name="content"></input>
        <button type="submit" name="submitButton">submit</button>

      </form>
    </div>
  );
}

export default CreateArea;
