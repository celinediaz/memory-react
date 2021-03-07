import React, { useState } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
const Board = ({cards, flipCard}) => {
    cards = Array.from(cards);
    return (
        <div className="container">
            {cards.map((value, index) => {
                return <Card key={index} image={value.image} face={value.face} onclick={flipCard} index={index}/>
            })}
        </div>
    )
}
Board.propTypes = {
    cards: PropTypes.array.isRequired
}
export default Board
