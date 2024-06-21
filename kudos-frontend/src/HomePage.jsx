import React, { useState, useEffect } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import BoardList from './BoardList';
import Footer from './Footer';
import CreateForm from './CreateForm';
import api from './api';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [boards, setBoards] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleDisplayCreateForm = () => {
    setShowCreateForm(!showCreateForm);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await api.get('/boards');
        const boardAndImg = response.data.map(board => ({
          ...board,
          randomImg: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
        }));
        setBoards(boardAndImg);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchBoards();
  }, []);

  const createBoard = async (data) => {
    try {
      const response = await api.post('/boards', data);
      const newBoard = {
        ...response.data,
        randomImg: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
      };
      setBoards([...boards, newBoard]);
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/boards/${id}`);
      setBoards(boards.filter((board) => board.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNavigateToBoardPage = (id) => {
    navigate(`/boards/${id}`);
  };

  return (
    <div className="App">
      <Header handleDisplayCreateForm={handleDisplayCreateForm} />
      <main>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="filter-buttons">
          {['All', 'Recent', 'Celebration', 'Thank You', 'Inspiration'].map((category) => (
            <button key={category} onClick={() => setFilter(category)}>
              {category}
            </button>
          ))}
          <button className="create-board-button" onClick={handleDisplayCreateForm}>Create a New Board</button>
        </div>
        {showCreateForm && (
          <CreateForm
            displayForm={handleDisplayCreateForm}
            createBoard={createBoard}
          />
        )}
        <BoardList
          boards={boards}
          handleDisplayBoardPage={handleNavigateToBoardPage}
          handleDelete={handleDelete}
          filter={filter}
          searchTerm={searchTerm}
        />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
