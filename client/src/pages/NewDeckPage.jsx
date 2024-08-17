import { useEffect, useState } from "react";
import Form from "../components/Form";
import { QUERY_CREATECARDS } from "../utils/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_DECK } from "../utils/mutations";
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Auth from '../utils/auth';

export default function NewDeckPage() {
    const navigate = useNavigate();
    const [addDeckMutation, addDeckObj] = useMutation(ADD_DECK);
    const [flashCards, setFlashCards] = useState([]);
    const [deckInfo, setDeckInfo] = useState({
        title: '',
        description: '',
    });
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    const [state, setState] = useState('generate');

    const [getCards, { loading, error, data }] = useLazyQuery(QUERY_CREATECARDS, {
        fetchPolicy: 'network-only'
    });

    const generateCards = (cardCount) => {
        console.log('generateCards called with:', cardCount);
        cardCount = parseInt(cardCount, 10);
        if (isNaN(cardCount)) cardCount = 10;
        getCards({
            variables: {
                title: deckInfo.title,
                frontText: frontText,
                backText: backText,
                cardCount: cardCount
            }
        });
    };

    const addCard = () => {
        console.log('addCard called with:', frontText, backText);
        setFlashCards([...flashCards, { frontText, backText }]);
        setState('addCard');
    };

    const saveDeck = () => {
        if (!flashCards) return;

        addDeckMutation({
            variables: {
                title: deckInfo.title,
                description: deckInfo.description,
                cardData: JSON.stringify(flashCards)
            },
        });

        setFlashCards([]);
        setState('saving');
    };

    useEffect(() => {
        if (!loading && data) {
            const createCards = JSON.parse(data.createCards);

            if (createCards.message) {
                console.log(createCards.message);
                navigate(`/login`);
                return;
            }

            const cards = createCards.flashCards || createCards.flashcards || [];
            if (!flashCards.length) {
                setFlashCards(cards);
                setState('addCard');
            } else {
                setFlashCards([...flashCards, ...cards]);
                setState('addCard');
            }
        }
    }, [loading, data]);

    useEffect(() => {
        if (!addDeckObj.loading) {
            if (addDeckObj.data) {
                const id = addDeckObj.data.addDeck._id;
                if (!id) {
                    navigate(`/login`);
                    return;
                }
                setState('saving');
                window.location.assign(`/deck/${id}/${Auth.getUser()?.data._id}`);
                return;
            }
            if (addDeckObj.error) {
                console.log("Error Saving deck");
            }
        }
    }, [addDeckObj]);

    let value = 'START';
    if (state === 'addCard') value = 'ADDCARD_FRONT';
    else if (flashCards.length) value = 'GENERATE';

    return (
        <>
            {state === 'generate' && (
                <Form formState={value} newDeck={{ setDeckInfo, setFrontText, setBackText, generateCards, addCard }} />
            )}
            {state === 'addCard' && (
                <Form formState={value} addCard={{ setFrontText, setBackText, addCard, setState: () => setState('generate') }} />
            )}
            {state === 'saving' && (
                <Form formState='SAVING' saving={{ title: "Saving", text: `Saving ${deckInfo.title}` }} />
            )}

            {error && <h2>Issue with creating Flash Cards.</h2>}
            {flashCards.length > 0 && (
                <>
                    <h3 style={styles.title}>{deckInfo.title}</h3>
                    <div style={styles.container}>
                        <div style={styles.cardContainer}>
                            {flashCards.map((jsonData, index) => (
                                <Card key={index} frontText={jsonData.frontText} backText={jsonData.backText} />
                            ))}
                        </div>
                    </div>
                    {(!loading || !addDeckObj.loading) && (
                        <div className="form-container">
                            <button onClick={saveDeck}>Save Deck</button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

const styles = {
    title: {
        textAlign: 'center',
        fontSize: '32px',
        padding: '10px'
    },
    container: {
        margin: '32px auto',
        maxWidth: '1200px',
        textAlign: 'center'
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        justifyContent: 'center'
    }
};
