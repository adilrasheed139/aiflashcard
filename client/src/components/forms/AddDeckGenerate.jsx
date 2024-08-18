import { useRef, useState } from "react";
import PropTypes from 'prop-types';

AddDeckGenerate.propTypes = {
  onClick: PropTypes.func.isRequired,
  generateCards: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
};

export default function AddDeckGenerate({ onClick, generateCards, addCard }) {
  const countRef = useRef(null);
  const [countValue, setCountValue] = useState(10);

  const submitClick = (e) => {
    e.preventDefault();
    console.log("Generating cards:", countValue);
    generateCards(countValue);
    onClick();
  };

  return (
    <section className="form-group">
      <div className="select-group">
        <label htmlFor="card-count">How many cards would you like to generate?</label>
        <select
          id="card-count"
          ref={countRef}
          defaultValue="10"
          onChange={() => setCountValue(countRef.current.value)}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
        </select>
      </div>
      <section style={styles.section} className="form-submit">
        <button style={styles.margin} onClick={submitClick}>
          Generate {countValue} cards
        </button>

        <button style={styles.button} onClick={addCard}>
          I will create my own
        </button>
      </section>
    </section>
  );
}

const styles = {
  section: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px',
  },
  margin: {
    margin: '15px',
    flexGrow: '5',
  },
  button: {
    fontSize: '14px',
    margin: '15px',
    flexGrow: '0',
  },
};
