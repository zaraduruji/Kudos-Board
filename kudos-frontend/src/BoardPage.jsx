import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api';
import './BoardPage.css';

const GIPHY_API_KEY = 'f39S6vxscEJlfREIW40560VpgeHo5m5d';

function BoardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [showCreateCardForm, setShowCreateCardForm] = useState(false);
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [owner, setOwner] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [selectedGifUrl, setSelectedGifUrl] = useState('');

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await api.get(`/boards/${id}`);
        setBoard(response.data);
        const cardResponse = await api.get(`/boards/${id}/cards`);
        setCards(cardResponse.data);
      } catch (error) {
        console.error('Error fetching board details:', error);
      }
    };
    fetchBoard();
  }, [id]);

  useEffect(() => {
    const searchGifs = async () => {
      if (searchTerm) {
        try {
          const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=8`
          );
          const data = await response.json();
          setGifs(data.data);
        } catch (error) {
          console.error('Error fetching GIFs:', error);
        }
      }
    };
    searchGifs();
  }, [searchTerm]);

  const createCard = async () => {
    if (!title || !description || !selectedGifUrl) {
      setErrorMessage('Please fill out all required fields and select a GIF.');
      return;
    }
    try {
      const newCard = { title, description, gifUrl: selectedGifUrl, owner };
      const response = await api.post(`/boards/${id}/cards`, newCard);
      setCards([...cards, response.data]);
      setTitle('');
      setDescription('');
      setGifUrl('');
      setOwner('');
      setShowCreateCardForm(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating card:', error);
      setErrorMessage('Error creating card. Please try again.');
    }
  };

  const upvoteCard = async (cardId) => {
    try {
      const response = await api.put(`/cards/${cardId}/upvote`);
      setCards(cards.map(card => card.id === cardId ? response.data : card));
    } catch (error) {
      console.error('Error upvoting card:', error);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await api.delete(`/cards/${cardId}`);
      setCards(cards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="board-page">
      {board && <h1>{board.title}</h1>}
      <button onClick={() => navigate('/')}>Back to Home</button>
      <button onClick={() => setShowCreateCardForm(true)}>
        Create a Card
      </button>
      {showCreateCardForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowCreateCardForm(false)}>&times;</span>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
              type="text"
              placeholder="Enter card title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter card description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search for a GIF"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="gif-grid">
              {gifs.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  onClick={() => setSelectedGifUrl(gif.images.fixed_height.url)}
                  className={selectedGifUrl === gif.images.fixed_height.url ? 'selected' : ''}
                />
              ))}
            </div>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
            <button onClick={createCard}>Create Card</button>
          </div>
        </div>
      )}
      <div className="cards-container">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            {card.gifUrl && <img src={card.gifUrl} alt="GIF" />}
            <p>{card.owner}</p>
            <button onClick={() => upvoteCard(card.id)}>Upvote: {card.upVote}</button>
            <button onClick={() => deleteCard(card.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardPage;
