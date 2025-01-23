import React from "react";
import { useAppContext } from "../context/AppContext";
import useTimer from "../hooks/useTimer";

interface GameScoreboardProps {
    currPlayer: string;
}

interface PlayerCardProps {
    id: string;
    score: number;
    isCurrentPlayer: boolean;
}

function PlayerCard ({id, score, isCurrentPlayer}: PlayerCardProps) {
    return (
        <div 
            className={`
                flex-1
                font-bold
                ${isCurrentPlayer ? "bg-yellow-fda text-white-fcf" : "bg-white-dfe text-blue-304"}
                flex flex-col items-center justify-center
                py-[10px]
                rounded-[5px]
                relative
            `}
        >
            {isCurrentPlayer && 
                <div
                    className="
                        absolute 
                        -top-2 left-1/2 
                        transform -translate-x-1/2 
                        w-0 h-0 
                        border-l-[16px] border-l-transparent 
                        border-r-[16px] border-r-transparent 
                        border-b-[16px] 
                        border-b-yellow-fda
                    "
                >
                </div>
            }
            <div className={`text-[15px] ${isCurrentPlayer ? "" : "text-blue-719"}`}>P{id}</div>
            <div className="text-[24px]">{score}</div>
        </div>
    )
}

interface GameCardProps {
    label: string;
    value: string;
}

function GameCard ({label, value}: GameCardProps) {
    return (
        <div 
            className={`
                max-w-[255px]
                flex-1
                font-bold
                bg-white-dfe text-blue-304
                flex flex-col items-center justify-center md:flex-row md:justify-between md:p-[24px]
                py-[10px]
                rounded-[5px]
            `}
        >
            <div className={`text-[15px] md:text-[18px]`}>{label}</div>
            <div className="text-[24px] md:text-[32px]">{value}</div>
        </div>
    )
}

export default function GameScoreboard ({currPlayer}: GameScoreboardProps) {    
    const { players, isDone } = useAppContext();
    const isSinglePlayer = players.length == 1;
    const timer = useTimer({isStopped: isDone});

    return (
        <div className="flex justify-center gap-[24px] md:gap-[30px]">
            {isSinglePlayer
                ?   <>
                        <GameCard label="Time" value={timer ? timer : "0"} />
                        <GameCard label="Moves" value={players[0].moves.toString()} />
                    </>
                : players.map((player, index) => (
                    <PlayerCard 
                        id={player.id} 
                        score={player.score} 
                        isCurrentPlayer={currPlayer == player.id} 
                        key={index}
                    />
                ))
            }
        </div>
    )
}