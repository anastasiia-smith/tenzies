import Die from "./Die.js"
import { useState } from "react"
import {nanoid} from "nanoid"

export default function App() {
  const [allDice, setAllDice] = useState(allNewDice())
    
  function allNewDice() {
    let diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        id: nanoid(),
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false
      });
    }
    return diceArray;
  }
  const die = allDice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} />)
  function rollNewDice() {
    setAllDice(allNewDice())
  }
  return(
    <main className="game">
      <h1 className="game__header">Tenzies</h1>
      <p className="game__description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="game__die">
        {die}
      </div>
      <button onClick={rollNewDice} className="game__buton">Roll</button>     
    </main>
  )
} 