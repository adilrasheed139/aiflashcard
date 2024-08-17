import { useState } from "react";
import { QUERY_CREATECARDS } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";

export default function AIPlayground() {
  const [formData, setFormData] = useState({
    title: '',
    front: '',
    back: '',
    cardCount: 0
  });

  const [getCards, { loading, error, data }] = useLazyQuery(QUERY_CREATECARDS, {
    fetchPolicy: 'network-only',
  });

  if (error) console.log(error);

  const flashCards = data ? JSON.parse(data.createCards)['flashcards'] : [];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: name === 'cardCount' ? parseInt(value, 10) || 10 : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    getCards({ variables: { 
      title: formData.title, 
      front: formData.front, 
      back: formData.back,
      cardCount: formData.cardCount
    } });
  };

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {flashCards && flashCards.length > 0 && (
        <div>
          <h4>{formData.title} Deck</h4>
          <div style={styles.cardContainer}>
            {flashCards.map((card, index) => (
              <div style={styles.card} key={index}>
                <p>{card.frontText}</p>
                <hr />
                <p>{card.backText}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2>AI Deck Builder Playground</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label}>Title:  
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label style={styles.label}>Front:
          <input type="text" name="front" value={formData.front} onChange={handleChange} />
        </label>
        <label style={styles.label}>Back:  
          <input type="text" name="back" value={formData.back} onChange={handleChange} />
        </label>
        <label style={styles.label}>Count: 
          <input type="number" name="cardCount" value={formData.cardCount} onChange={handleChange} step="1" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

const styles = {
  label: {
    display: 'block',
    padding: '10px'
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px'
  },
  card: {
    padding: '10px',
    border: 'solid black 2px',
    width: '150px',
    height: '250px'
  }
};
