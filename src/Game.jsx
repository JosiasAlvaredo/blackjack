import React, { useEffect, useState } from 'react';
import CardDisplay from './CardDisplay';
import "./Game.css"
const Game = () => {
    const [deckId, setDeckId] = useState('');
    const [playerCards, setPlayerCards] = useState([]);
    const [dealerCards, setDealerCards] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [result, setResult] = useState('');
    const [playerScore, setPlayerScore] = useState(0); // Añadir estado para la puntuación del jugador

    useEffect(() => {
        const fetchDeck = async () => {
            const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
            const data = await response.json();
            setDeckId(data.deck_id);
            drawInitialCards(data.deck_id);
        };
        fetchDeck();
    }, []);

    const drawInitialCards = async (deckId) => {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`);
        const data = await response.json();
        setPlayerCards(data.cards.slice(0, 2));
        setDealerCards(data.cards.slice(2, 4));
        setPlayerScore(calculateScore(data.cards.slice(0, 2))); // Calcular puntuación inicial del jugador
    };

    const drawCard = async (isPlayer) => {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        const data = await response.json();
        if (isPlayer) {
            const newCards = [...playerCards, data.cards[0]];
            setPlayerCards(newCards);
            const newScore = calculateScore(newCards);
            setPlayerScore(newScore); // Actualizar la puntuación del jugador
            if (newScore > 21) {
                setResult('Perdiste!'); // Mensaje de pérdida
                setGameOver(true);
            }
        } else {
            setDealerCards(prev => [...prev, data.cards[0]]);
        }
    };

    const calculateScore = (cards) => {
        let score = 0;
        let aces = 0;
        cards.forEach(card => {
            if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
                score += 10;
            } else if (card.value === 'ACE') {
                aces += 1;
                score += 11; // inicialmente contar como 11
            } else {
                score += parseInt(card.value);
            }
        });
        while (score > 21 && aces) {
            score -= 10; // contar el as como 1 en lugar de 11
            aces -= 1;
        }
        return score;
    };

    const checkWinner = () => {
        const dealerScore = calculateScore(dealerCards);
        if (playerScore > 21) {
            setResult('Perdiste!'); // Verificar si el jugador ya ha perdido
        } else if (dealerScore > 21 || playerScore > dealerScore) {
            setResult('¡Ganaste!');
        } else if (playerScore < dealerScore) {
            setResult('¡El dealer gana!');
        } else {
            setResult('¡Es un empate!');
        }
        setGameOver(true);
    };

    return (
        <div className="game-container">
            <CardDisplay className='main-game' title="Cartas del Jugador" cards={playerCards} />
            <CardDisplay className='main-game' title="Cartas del Dealer" cards={dealerCards} />
            <h2>Puntuación del Jugador: {playerScore}</h2>
            <div className='button-container'>
            <button onClick={() => drawCard(true)} disabled={gameOver} class="gradient-button button-pedir">Pedir Carta</button>
            <button onClick={() => { drawCard(false); checkWinner(); }} disabled={gameOver} class="gradient-button button-plantarse">Plantarse</button>
            </div>
            {gameOver && <h2>{result}</h2>}
        </div>
    );
};

export default Game;