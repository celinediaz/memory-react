import React, { useState } from 'react';
import { pic, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16 } from './img';
import './App.css';
import Board from './components/Board';
import PropTypes from 'prop-types';
let elements = [{ image: pic, face: false }, { image: pic2, face: false }, { image: pic3, face: false }, { image: pic4, face: false }, { image: pic5, face: false }, { image: pic6, face: false }, { image: pic7, face: false }, { image: pic8, face: false }, { image: pic9, face: false }, { image: pic10, face: false }, { image: pic11, face: false }, { image: pic12, face: false }, { image: pic13, face: false }, { image: pic14, face: false }, { image: pic15, face: false }, { image: pic16, face: false }, { image: pic, face: false }, { image: pic2, face: false }, { image: pic3, face: false }, { image: pic4, face: false }, { image: pic5, face: false }, { image: pic6, face: false }, { image: pic7, face: false }, { image: pic8, face: false }, { image: pic9, face: false }, { image: pic10, face: false }, { image: pic11, face: false }, { image: pic12, face: false }, { image: pic13, face: false }, { image: pic14, face: false }, { image: pic15, face: false }, { image: pic16, face: false }];
let players = [{ player: "player 1", color: "#E3637B" }, { player: "player 2", color: "#C69559" }]
let winner = false;
let background = "rgba(0,0,0, 0.45)";

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

function App() {

  const [cards, setFace] = useState(elements);
  const [flipped, setFlipped] = useState([]);
  const [currentPlayer, setPlayer] = useState(players[0]);
  const [points, setPoints] = useState([0, 0]);
  const [refToFlipped, setRef] = useState([]);
  const [flippedCards, setCards] = useState([]);

  const onFlip = async (index) => {
    if (refToFlipped.length < 2) {
      cards[index].face = true;
      setFlipped([...flipped, cards[index]]);
      flippedCards.push(cards[index]);
      refToFlipped.push(index);
      if (flippedCards.length === 2 && refToFlipped[0] !== refToFlipped[1]) {
        await checkIfPair();
        setFlipped([]);
        winner = checkWinner();
        currentPlayer === players[0] ? setPlayer(players[1]) : setPlayer(players[0]);
      }else if(refToFlipped[0] === refToFlipped[1]){
        console.log("don't select the same card...")
        refToFlipped.pop();
        flippedCards.pop();
      }
      
      setFace(cards);
    }
  }

  const checkIfPair = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    if (flippedCards[0].image === flippedCards[1].image) {
      console.log(points);
      let player1=points[0]++;
      let player2=points[1]++;
      currentPlayer.player === "player 1" ? setPoints([player1, points[1]]) : setPoints([points[0], player2]) ;
    } else {
      cards[refToFlipped[0]].face = false;
      cards[refToFlipped[1]].face = false;
    }
    setRef([]);
    setCards([]);
  }

  const checkWinner = () => {
    if (cards.every(card => card.face === true)) {
      if (points[0] > points[1]) {
        background = "rgba(155,18,44, 0.45)";
        return "Player 1 won";
      } else if (points[1] > points[0]) {
        background = "rgba(121,72,13, 0.45)";
        return "Player 2 won";
      }
      return "There was a tie";
    }
  }

  const currentStyle = {
    color: currentPlayer.color
  }

  const winnerbg ={
    backgroundColor: background
  }

  return (
    <div className="App">
      <h1>Candy Memory</h1>
      <h3 style={currentStyle}>{`${currentPlayer.player}'s turn`}</h3>
      <h3><span style={{ color: "#E3637B"}}>{points[0]}</span>:<span style={{color: "#C69559"}}>{points[1]}</span></h3>
      <Board cards={cards} flipCard={onFlip} />
      <div className={winner ? 'winner disp': 'winner'} style ={winnerbg} >
        <p style ={{fontSize:"56px"}}>GAME OVER</p>
        <p>{winner}</p>
        <button onClick = {() => window.location.reload()}>Play again!</button>
      </div>
      <div className="foot">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  )
}
App.propTypes = {
  cards: PropTypes.array
}

export default App;
