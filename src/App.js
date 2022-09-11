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


  //shuffle cards

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))

    setCards(shuffledCards)
    setTurns(0)
  }

  console.log(cards, turns )

  const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  
//for comparison of cards
  useEffect(() => {
if (choiceOne && choiceTwo) {
  if (choiceOne.src === choiceTwo.src) {
setCards(prevCards => {
  return prevCards.map(card => {
    if (card.src === choiceOne.src) {
      return {...card, matched: true} 
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
  }

  return (
    <div className="App">
      <h1>Monster Match</h1>
   
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
       <SingleCard key={card.id} card={card} handleChoice={handleChoice}
       flipped={card === choiceOne || card === choiceTwo || card.matched}/>
    ))}
     </div>
    </div>
  )
        }

export default App
