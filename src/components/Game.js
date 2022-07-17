import React from "react";
import CardDisplay from "./CardDisplay";
import ShowScore from "./ShowScore";
import './components.css'
import Confetti from 'react-confetti'

export default function Game(){
    


    const [cardArray,setCardArray] = React.useState([])
    const [refresh,setRefresh] = React.useState(false)
    const [gameState, setGameState] = React.useState([])


    function getArray(number){
        const array = []
        for (let index = 0; index < number; index++) {
            array.push(Math.floor(Math.random()*825))
            
        }
        return array
    }

    function shuffle(array) {
        const newArray = [...array]
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray
    }


    async function getData(){
        const promise = await fetch(`https://rickandmortyapi.com/api/character/${getArray(12)}`,)
        const response = await promise.json() 
        setCardArray(shuffle(response))
    }

    React.useEffect(()=>{
        getData()
        setGameState([])

        },[refresh])

    
    function handleClick(e){
        const {id} = e.target
        gameState.includes(id) ? setGameState([]) : setGameState(prev => [...prev, id])
    }

    function newGameHandle(){
        setRefresh(prev => !prev)
    }

    return(
        <div className="game">
            <CardDisplay cardArray={cardArray} 
                         handleClick={handleClick} 
                         gameState={gameState}
                         shuffle={shuffle} 
                         refresh={refresh}
                         />
            <ShowScore gameState={gameState}/>
        {gameState.length === 12 && <Confetti width={1920} height={1080}/>}
            <button className="game--NewGameButton" id="newGameButton" onClick={newGameHandle}>New Cards</button>
            {gameState.length === 12 && <p className="victory">YOU WIN!!!</p>}
        </div>
    )
}