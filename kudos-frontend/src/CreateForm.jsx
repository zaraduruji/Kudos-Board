import React, { useState } from 'react';
import './CreateForm.css';

function CreateForm({ displayForm, createBoard }) {
  const [boardData, setBoardData] = useState({
    title: '',
    category: '',
    author: '',
    imgUrl: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBoardData({ ...boardData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createBoard(boardData);
    displayForm();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={displayForm}>&times;</button>
        <h2>Create a New Board</h2>
        <form onSubmit={handleSubmit}>
          <p>Title:</p>
          <input
            name="title"
            type="text"
            placeholder="Enter title"
            value={boardData.title}
            onChange={handleInputChange}
          />
          <p>Category:</p>
          <select
            name="category"
            value={boardData.category}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select category</option>
            <option value="Recent">Recent</option>
            <option value="Celebration">Celebration</option>
            <option value="Thank You">Thank You</option>
            <option value="Inspiration">Inspiration</option>
          </select>
          <p>Author:</p>
          <input
            name="author"
            type="text"
            placeholder="Enter author name"
            value={boardData.author}
            onChange={handleInputChange}
          />
          <p>Image URL:</p>
          <input
            name="imgUrl"
            type="text"
            placeholder="Enter image URL"
            value={boardData.imgUrl}
            onChange={handleInputChange}
          />
          <button type="submit">Create Board</button>
        </form>
      </div>
    </div>
  );
}

export default CreateForm;
