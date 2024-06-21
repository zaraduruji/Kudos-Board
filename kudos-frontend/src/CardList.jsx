import React, { useState, useEffect } from 'react';
import api from './api';
import './CardList.css';

function CardList({ boardId }) {
  const [cards, setCards] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [message, setMessage] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [owner, setOwner] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        console.log(`Fetching cards for board with id: ${boardId}`);
        const response = await api.get(`/boards/${boardId}/cards`);
        console.log('Cards data:', response.data);
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, [boardId]);

  const createCard = async () => {
    try {
      const newCard = {
        message,
        gifUrl,
        owner,
      };
      const response = await api.post(`/boards/${boardId}/cards`, newCard);
      setCards([...cards, response.data]);
      setMessage('');
      setGifUrl('');
      setOwner('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  const deleteCard = async (id) => {
    try {
      await api.delete(`/cards/${id}`);
      setCards(cards.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="card-list">
      <h2>Cards</h2>
      <button onClick={() => setShowCreateForm(true)}>Create a Card</button>
      {showCreateForm && (
        <div className="create-card-form">
          <input
            type="text"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
      )}
      <div className="cards">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <p>{card.message}</p>
            {card.gifUrl && <img src={card.gifUrl} alt="GIF" />}
            <p>{card.owner}</p>
            <button onClick={() => deleteCard(card.id)}>Delete Card</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
