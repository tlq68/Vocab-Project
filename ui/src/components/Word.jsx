import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const Word = (props) => {
 
  return (
    <div className='word-container note'>
      <Accordion>
        <Accordion.Item eventKey={props.eventKey}>
        <Accordion.Header>{props.word}</Accordion.Header>
          <Accordion.Body>
            <p className="wordType part-of-speech"> {props.type} ({props.gender})</p>
            <p className="translation">{props.translation}</p>
            <hr></hr>
            <p className="description">{props.description}</p>
            <p className="location">{props.location} Term</p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Word