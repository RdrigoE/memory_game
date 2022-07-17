import React from "react";

export default function CardDisplay(props){    
    React.useEffect(() =>{
        return () =>{
            props.cardArray.map((el) => {
                document.removeEventListener("click", props.handleClick)
            },[])
        }

    },[props.gameState])
    

    const imgs = props.shuffle(props.cardArray).map(el=>{
        return(
            <div key={el.id} className="card" id={el.id} onClick={props.handleClick}> 
                <img className="card--img" src={el.image} id={el.id} alt={el.name}></img>
                <p className="card--title" id={el.id} >{el.name}</p>
            </div>
        )
    })
    
    return(
        <div className="cardDisplay">
            {imgs}
        </div>
    )
}