import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';
import './BoardPage.css';

function BoardPage() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [showCreateCardForm, setShowCreateCardForm] = useState(false);
  const [cards, setCards] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [owner, setOwner] = useState('');

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await api.get(`/boards/${id}`);
        setBoard(response.data);
        const cardResponse = await api.get(`/boards/${id}/cards`);
        setCards(cardResponse.data);
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };
    fetchBoard();
  }, [id]);

  const createCard = async () => {
    try {
      const newCard = {
        title,
        description,
        gifUrl,
        owner
      };
      const response = await api.post(`/boards/${id}/cards`, newCard);
      setCards([...cards, response.data]);
      setTitle('');
      setDescription('');
      setGifUrl('');
      setOwner('');
      setShowCreateCardForm(false);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  return (
    <div className="board-page">
      {board && <h1>{board.title}</h1>}
      <button onClick={() => setShowCreateCardForm(true)}>
        Create a Card
      </button>
      {showCreateCardForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowCreateCardForm(false)}>&times;</span>
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
              placeholder="Enter GIF URL"
              value={gifUrl}
              onChange={(e) => setGifUrl(e.target.value)}
            />
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
      <div>
        {cards.map((card) => (
          <div key={card.id}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            {card.gifUrl && <img src={card.gifUrl} alt="GIF" />}
            <p>{card.owner}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardPage;
