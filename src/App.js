import Die from "./Die.js"
import { useState, useEffect } from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [won, setWon] = useState(false)
  const [numOfRolls, setNumOfRolls] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isOn, setIsOn] = useState(true)

  useEffect(() => {
    let interval = null;
    console.log(isOn)
    if(isOn) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isOn])

  useEffect(() => {
    const firstDie = dice[0].value;
    const diceState = dice.every(element => element.isHeld === true && element.value === firstDie)
    //all dice picked && all dice ids same 
    if(diceState){
      setIsOn(false)
      setWon(prevWon => !prevWon)
    }
  }, [dice])

  function generateNewDie() {
    return({
      id: nanoid(),
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false
    })
  }

  function allNewDice() {
    let diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie());
    }
    return diceArray;
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }

  const die = dice.map(die => <Die 
                                  key={die.id} 
                                  value={die.value} 
                                  isHeld={die.isHeld} 
                                  holdDice={() => holdDice(die.id)} 
                                />)

  function rollNewDice() {
    if (!won) {
      setDice(oldDice => {
        let newDice = []
        for (let i = 0; i < dice.length; i++) {
          if (oldDice[i].isHeld) {
            newDice.push(oldDice[i])
          } else {
            newDice.push(generateNewDie())  
          }
        }
        return newDice
      })
      setNumOfRolls(prevNumOfRolls => prevNumOfRolls += 1)
    } else {
      setWon(false)
      setDice(allNewDice())
      setNumOfRolls(0)
      setTimer(0)
      setIsOn(true)
    }
  }
  return(
    <main className="game">
      {won && <Confetti />}
      <h1 className="game__header">Tenzies</h1>
      <p className="game__description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      
      <h3 className="game__stats">
        <span>{("0" + Math.floor((timer / 60) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((timer) % 60)).slice(-2)}</span>
      </h3>
      <div className="game__die">
        {die}
      </div>
      <button onClick={rollNewDice} className="game__buton">{won ? "New Game" : "Roll"}</button>     
      <h3 className="game__stats">Number of rolls: {numOfRolls}</h3>
    </main>
  )
} 