import React, { useState, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [text, setText] = useState('');
  const editorRef = useRef(null);

  const handleBlur = () => {
    const lines = text.split('\n');
    const newLines = lines.map((line) => {
      if (line.endsWith('.')) {
        return line;
      } else {
        return line + '.';
      }
    });
    setText(newLines.join('\n'));
  };

  const handleComment = (lineNumber, comments) => {
    console.log(lineNumber);
    axios
      .post('/api/comments', { lineNumber, comments })
      .then((res) => {
        console.log(res);
      });
  };

  const handleBoldClick = () => {
    document.execCommand('bold', false, null);
  };

  const handleItalicClick = () => {
    document.execCommand('italic', false, null);
  };

  return (
    <div className="text-editor container">
      <div className="toolbar row">
        <div className="col">
          <button className="btn btn-outline-secondary" onClick={handleBoldClick}>
            <strong>B</strong>
          </button>
          <button className="btn btn-outline-secondary" onClick={handleItalicClick}>
            <i>I</i>
          </button>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="editor form-control"
        onInput={(event) => setText(event.target.innerText)}
        onBlur={handleBlur}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <CommentsSection onComment={handleComment} />
    </div>
  );
}

function CommentsSection({ onComment }) {
  const [lineNumber, setLineNumber] = useState(0);
  const [comments, setComments] = useState('');

  const handleCommentSubmit = () => {
    onComment(lineNumber, comments);
    setComments('');
  };

  return (
    <div className="comments-section row">
      <div className="col-1">
        <input
          type="number"
          className="form-control"
          value={lineNumber}
          onChange={(event) => setLineNumber(event.target.value)}
        />
      </div>
      <div className="col-2">
          <label>Line Number</label>
      </div>
      <div className="col-6">
        <input
          type="text"
          className="form-control"
          value={comments}
          onChange={(event) => setComments(event.target.value)}
        />
      </div>
      <div className="col-3">
        <button className="btn btn-primary" onClick={handleCommentSubmit}>
          Comment
        </button>
      </div>
    </div>
  );
}

export default App;
