import React, { useState, useEffect } from 'react';
import './styles.css';

const pokemonList = [
  'bulbasaur', 'charmander', 'squirtle', 'pikachu',
  'jigglypuff', 'meowth', 'psyduck', 'snorlax'
];

const shufflePokemons = () => [...pokemonList, ...pokemonList]
  .sort(() => Math.random() - 0.5)
  .map((name, index) => ({ id: index, name, flipped: false, matched: false }));

function MemoryGame() {
  const [cards, setCards] = useState(shufflePokemons());
  const [selected, setSelected] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (cards[first].name === cards[second].name) {
        setCards(prevCards => prevCards.map(card =>
          card.id === first || card.id === second ? { ...card, matched: true } : card
        ));
      } else {
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card =>
            card.id === first || card.id === second ? { ...card, flipped: false } : card
          ));
        }, 1000);
      }
      setSelected([]);
    }
  }, [selected, cards]);

  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setGameWon(true);
    }
  }, [cards]);

  const handleCardClick = (id) => {
    if (selected.length < 2 && !cards[id].flipped && !cards[id].matched) {
      setCards(prevCards => prevCards.map(card =>
        card.id === id ? { ...card, flipped: true } : card
      ));
      setSelected(prevSelected => [...prevSelected, id]);
    }
  };

  const resetGame = () => {
    setCards(shufflePokemons());
    setSelected([]);
    setGameWon(false);
  };

  return (
    <div className="game-container">
      {gameWon ? (
        <div className="win-message">
          <h2>Parabéns! Você venceu!</h2>
          <button onClick={resetGame}>Jogar Novamente</button>
        </div>
      ) : (
        <div className="game-board">
          {cards.map(card => (
            <div key={card.id} className={`card ${card.flipped || card.matched ? 'flipped' : ''}`} onClick={() => handleCardClick(card.id)}>
              {card.flipped || card.matched ? <img src={`https://img.pokemondb.net/sprites/home/normal/${card.name}.png`} alt={card.name} /> : '❓'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
