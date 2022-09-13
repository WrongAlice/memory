import { useState, useEffect } from 'react'
import SingleCard from './components/singleCard'
import './App.css'
import './index.css'


const cardImages = [
  {"src": "/img/card-1.png", matched: false},
  {"src": "/img/card-2.png", matched: false },
  {"src": "/img/card-3.png", matched: false},
  {"src": "/img/card-4.png", matched: false},
  {"src": "/img/card-5.png", matched: false},
  {"src": "/img/card-6.png", matched: false},
]



function App() {
  const [ cards, setCards]  = useState([])
const [ turns, setTurns ] = useState(0)
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled ] = useState(false)


  //shuffle cards function
  // a: duplicate cards 
  // b: sort to randomize
  // c: apply random id to each card to use for key

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => 
    ({...card, id: Math.random()}))

    setCards(shuffledCards) 
    setTurns(0) // resets the game to a new one
  }

  console.log(cards, turns )

  const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  
// fn for comparison of selected  cards, when each choice is updated 
//via the dependency array
  useEffect(() => {
if (choiceOne && choiceTwo) {  
  setDisabled(true)
  if (choiceOne.src === choiceTwo.src) { 
setCards(prevCards => { 
  return prevCards.map(card => { 
    if (card.src === choiceOne.src) { 
    }else {
      return card
    }
  })
})

  resetTurn()
}else {

  setTimeout(() => resetTurn(), 1000)
}
}
  },[choiceOne, choiceTwo])


  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Monster Match</h1>
   
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
       <SingleCard key={card.id} card={card} handleChoice={handleChoice}
       flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled}/>
    ))}
     </div>
    </div>
  )
        }

export default App
