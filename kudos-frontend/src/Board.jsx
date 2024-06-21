// import React, {useState} from 'react';
import "./Board.css";
const boardImg = 'https://picsum.photos/200';


function Board({title, image, category, displayBoard, handleDelete, id}) {
    return (
        <div className="board">
            <img src={boardImg} alt='board'/>
            <h3>{title}</h3>
            <p>{category}</p>
            <div className="delete-and-view-buttons">
                <button className="view-button" onClick={displayBoard}>View Board</button>
                <button className="delete-button" onClick={() => handleDelete(id)}>Delete Board</button>
            </div>
        </div>
    )
}

export default Board;
