import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import "../App.css";
const Main = () => {
  const [dice, setdice] = React.useState(allNewDice);
  const [count, setCount] = React.useState(0);
  const [highScore, setHighScore] = React.useState("--");

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function allNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }
  function rollDices() {
    if (!gameWon) {
      setdice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
      setCount((prevCount) => prevCount + 1);
    } else {
      if (highScore === "--") {
        setHighScore(count);
      } else {
        if (highScore >= count) {
          setHighScore(count);
        }
      }
      setdice(allNewDice);
      setCount(0);
    }
  }
  function hold(id) {
    setdice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={hold}
      id={dieObj.id}
    />
  ));

  return (
    <div className="main">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <div className="counter">
        <p>MOVES:{count}</p>
        <p>BEST:{highScore}</p>
      </div>
      <button className="roll" onClick={rollDices}>
        {gameWon ? "New Game" : "Roll Dice"}
      </button>
    </div>
  );
};

export default Main;
