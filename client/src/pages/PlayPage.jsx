import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import '../assets/css/play.css';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';

export default function PlayPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState([]);
  const [wrongDeck, setWrongDeck] = useState([]);
  const [index, setIndex] = useState(0);

  const { deckId, userId } = useParams();

  // Gets card data from the server
  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });

  useEffect(() => {
    if (data) {
      const deck = data?.user?.decks || [];
      const findDeck = deck.find((arr) => arr._id === deckId);
      const dataCards = findDeck?.cards || [];
      setCards(shuffleArray(dataCards));
    }
  }, [data, deckId]);

  const shuffleArray = (array) => {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const delayedSetIndex = (value) => {
    setTimeout(() => {
      setIndex(value);
    }, 200);
  };

  const resetDeck = () => {
    setCards(shuffleArray(wrongDeck));
    setWrongDeck([]);
    delayedSetIndex(0);
  };

  const handlePlayAgain = () => {
    setCards(shuffleArray(cards));
    setWrongDeck([]);
    delayedSetIndex(0);
  };

  const handleCorrectAnswer = () => {
    if (index < cards.length - 1) {
      delayedSetIndex(index + 1);
    } else {
      resetDeck();
    }
    setIsFlipped(false);
  };

  const handleWrongDeckAnswer = (card) => {
    setWrongDeck((prevWrongDeck) => [...prevWrongDeck, card]);
    if (index < cards.length - 1) {
      delayedSetIndex(index + 1);
    } else {
      resetDeck();
    }
    setIsFlipped(false);
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      {cards.length > 0 && index <= cards.length - 1 ? (
        <section className="play-flip-card-container">
          <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`} onClick={handleFlipCard}>
            <figure className="flip-card-front">
              <h2>{cards[index].frontText}</h2>
            </figure>
            <figure className="flip-card-back">
              <h2>{cards[index].backText}</h2>
              <p>{cards[index].backText}</p>
            </figure>
          </div>
          {isFlipped && (
            <section className="play-buttons">
              <button className="wrong" onClick={() => handleWrongDeckAnswer(cards[index])}>Wrong</button>
              <button className="right" onClick={handleCorrectAnswer}>Right</button>
            </section>
          )}
        </section>
      ) : (
        <section className="play-flip-card-container">
          <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`} onClick={handleFlipCard}>
            <figure className="flip-card-front">
              <h2>END</h2>
            </figure>
            <figure className="flip-card-back">
              <h2>END</h2>
            </figure>
          </div>
          <section className="play-buttons">
            <Link to={`/dashboard/${userId}`}>
              <button>Go Back to Dashboard</button>
            </Link>
            <button className="right" onClick={handlePlayAgain}>Play Again</button>
          </section>
        </section>
      )}
    </>
  );
}
