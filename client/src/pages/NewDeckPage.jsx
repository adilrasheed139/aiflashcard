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
    const [deckInfo, setInfo] = useState({
        title: '',
        description: '',
    });
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    const [state, setState] = useState('generate');

    const [getCards, { loading, error, data }] = useLazyQuery(QUERY_CREATECARDS, {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            console.log("Data received:", data);
            
            // Ensure data is in the correct format
            const createCards = data.createCards || [];
            if (Array.isArray(createCards)) {
                setFlashCards(createCards);
                setState('addCard');
            } else {
                console.error('Unexpected response format:', createCards);
                navigate(`/login`);
            }
        },
        onError: (error) => {
            console.error('Error fetching cards:', error);
            setState('generate'); // Optionally reset state on error
        }
    });

    const saveDeck = () => {
        if (!flashCards.length) return;

        addDeckMutation({
            variables: {
                title: deckInfo.title,
                description: deckInfo.description,
                cardData: JSON.stringify(flashCards),
            },
        });

        setFlashCards([]);
        setState('saving');
    };

    const generateCards = (cardCount) => {
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
        setFlashCards([
            ...flashCards, { frontText: frontText, backText: backText }
        ]);
        setState('addCard');
    };

    useEffect(() => {
        if (addDeckObj.data) {
            if (addDeckObj.data.addDeck._id === null) {
                navigate(`/login`);
                return;
            }
            const id = addDeckObj.data.addDeck._id;
            setState('saving');
            window.location.assign(`/deck/${id}/${Auth.getUser()?.data._id}`);
        }
        if (addDeckObj.error) {
            console.log("Error Saving deck");
        }
    }, [addDeckObj]);

    return (
        <>
            {state === 'generate' && (
                <Form formState="START" newDeck={{ setInfo, setFrontText, setBackText, generateCards, addCard }} />
            )}
            {state === 'addCard' && (
                <Form formState="ADDCARD_FRONT" addCard={{ setFrontText, setBackText, addCard, setBackToGenerate: () => setState('generate') }} />
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
                            {flashCards.map((card, index) => (
                                <Card key={index} frontText={card.frontText} backText={card.backText} />
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
        padding: '10px',
    },
    container: {
        margin: '32px auto',
        maxWidth: '1200px',
        textAlign: 'center',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '5px',
        justifyContent: 'center',
    },
};
