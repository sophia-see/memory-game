import React from "react";
import { useAppContext } from "../context/AppContext";

interface GameScoreboardProps {
    currPlayer: string;
}

export default function GameScoreboard ({currPlayer}: GameScoreboardProps) {    
    const { players } = useAppContext();

    console.log({players})

    return (
        <div>
            currplayer: {currPlayer}
        </div>
    )
}