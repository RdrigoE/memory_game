import React from "react";

export default function ShowScore(props){
    return(
        <h1>Score: {props.gameState.length}/12</h1>
    )
}