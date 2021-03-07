import React, { useState } from 'react';
import { pic, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16 } from './img';
import './App.css';
import Board from './components/Board';
import PropTypes from 'prop-types';
let elements = [{ image: pic, face: false }, { image: pic2, face: false }, { image: pic3, face: false }, { image: pic4, face: false }, { image: pic5, face: false }, { image: pic6, face: false }, { image: pic7, face: false }, { image: pic8, face: false }, { image: pic9, face: false }, { image: pic10, face: false }, { image: pic11, face: false }, { image: pic12, face: false }, { image: pic13, face: false }, { image: pic14, face: false }, { image: pic15, face: false }, { image: pic16, face: false }, { image: pic, face: false }, { image: pic2, face: false }, { image: pic3, face: false }, { image: pic4, face: false }, { image: pic5, face: false }, { image: pic6, face: false }, { image: pic7, face: false }, { image: pic8, face: false }, { image: pic9, face: false }, { image: pic10, face: false }, { image: pic11, face: false }, { image: pic12, face: false }, { image: pic13, face: false }, { image: pic14, face: false }, { image: pic15, face: false }, { image: pic16, face: false }];
let players = [{player: "player 1", turn: true, color: "#E3637B"}, {player: "player 2", turn: false, color: "#C69559"}] 

// fisher & yates shuffle
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
shuffle(elements);

let refToFlipped = [];
let flippedCards = [];
let points = [0, 0];
function App() {

  const [cards, setFace] = useState(elements);
  const [flipped, setFlipped] = useState([]);
  const [currentPlayer, setPlayer] = useState(players[0]);

  const onFlip = async (index) => {
    if (refToFlipped.length < 2) {
      cards[index].face = true;
      setFlipped([...flipped, cards[index]]);
      flippedCards.push(cards[index]);
      refToFlipped.push(index);
      if (flippedCards.length === 2) {
        console.log(flippedCards);
        await checkIfPair();
        setFlipped([]);
        currentPlayer==players[0] ? setPlayer(players[1]) : setPlayer(players[0]);
      }
      else {
      }
      setFace(cards);
    }
  }

  const checkIfPair = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    if (flippedCards[0].image === flippedCards[1].image && refToFlipped[0] !== refToFlipped[1]) {
      console.log("match");
      currentPlayer.player === "player 1" ? points[0]++ : points[1]++ ;
    } else {
      console.log("no match");
      console.log(refToFlipped);
      cards[refToFlipped[0]].face = false;
      cards[refToFlipped[1]].face = false;
    }
    refToFlipped = [];
    flippedCards = [];
  }

  const currentStyle = {
    color: currentPlayer.color
  }
  const style1 = {
    color: "#E3637B"
  }
  const style2 = {
    color: "#C69559"
  }

  return (
    <div className="App">
      <h1>Candy Memory</h1>
      <h3 style={currentStyle}>{`${currentPlayer.player}'s turn`}</h3>
      <h3><span style={style1}>{points[0]}</span>:<span style={style2}>{points[1]}</span></h3>
      <Board cards={cards} flipCard={onFlip} />
    </div>
  )
}
App.propTypes = {
  cards: PropTypes.array.isRequired
}

export default App;
