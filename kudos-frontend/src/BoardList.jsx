import React from 'react';
import Board from './Board';
import "./BoardList.css";

function BoardList({ boards, handleDisplayBoardPage, handleDelete, filter, searchTerm }) {
  const filteredBoards = boards.filter(board =>
    (filter === 'All' || board.category === filter) &&
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="board-list">
      {filteredBoards.map((board, index) => (
        <Board
          key={index}
          title={board.title}
          image={board.imgUrl}
          category={board.category}
          displayBoard={handleDisplayBoardPage}
          handleDelete={handleDelete}
          id={board.id}
        />
      ))}
    </div>
  );
}

export default BoardList;
