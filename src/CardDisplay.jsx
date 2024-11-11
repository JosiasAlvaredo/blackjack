import React from 'react';

const CardDisplay = ({ title, cards }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                {cards.map(card => (
                    <img key={card.code} src={card.image} alt={card.code} style={{ width: '100px' }} />
                ))}
            </div>
        </div>
    );
};

export default CardDisplay;