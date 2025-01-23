"use client"

import React from "react";
import { useAppContext } from "../context/AppContext"
import GameHeader from "./GameHeader";
import GameGrid from "./GameGrid";
import Menu from "./Menu";
import { getFinalResult, initializeGame, setupPlayerStats } from "../utils";
import GameScoreboard from "./GameScoreboard";

interface GameProps {
    gameIcons: string[];
}

interface PlayerResultProps {
    id: string;
    score: number;
    isWinner: boolean;
}

function PlayerResult ({id, score, isWinner}: PlayerResultProps) {
    return (
        <div 
            className={`
                p-4
                flex justify-between items-center
                ${isWinner ? "bg-blue-152 text-white-fcf" : "bg-white-dfe text-blue-304"}
                rounded-[5px]
            `}
        >
            <div 
                className={`
                    ${isWinner ? "" : "text-blue-719"}
                    font-bold text-[13px]
                `}
            >
                Player {id} {isWinner ? "(Winner!)" : ""}
            </div>
            <div
                className={`
                    font-bold text-[20px]
                `}
            >
                {score} Pairs
            </div>
        </div>
    )
}

export default function Game ({ gameIcons }: GameProps) {
    const { isStarted, gameSettings, players, setPlayers, setGame, isDone } = useAppContext();
    
    const [currPlayer, setCurrPlayer] = React.useState("1");

    React.useEffect(() => {
        initializeGame({
            size: gameSettings.gridSize,
            gameIcons: gameIcons,
            theme: gameSettings.theme,
            setGame: setGame,
            playerCount: parseInt(gameSettings.playerCount),
            setPlayers: setPlayers
        })
    }, [gameSettings.gridSize, gameSettings.theme, gameIcons, setGame, gameSettings.playerCount, setPlayers]);

    React.useEffect(() => {
        const playerStats = setupPlayerStats(parseInt(gameSettings.playerCount));
        setPlayers(playerStats);
    }, [gameSettings.playerCount, setPlayers])

    const finalResult = React.useMemo(() => {
        if (isDone && players) {
            const { topPlayers, sortedPlayers, isTie } = getFinalResult({players});

            return { topPlayers, sortedPlayers, isTie };
        }
        return null;
    }, [players, isDone])

    if (!isStarted)
        return <Menu />

    return (
        <div
            className="
                w-full min-h-screen max-w-[1110px] mx-auto
                p-[24px] md:p-[40px]
                flex flex-col justify-center
                relative
            "
        >
            <GameHeader gameIcons={gameIcons}/>
            <GameGrid currPlayer={currPlayer} setCurrPlayer={setCurrPlayer} />
            <GameScoreboard currPlayer={currPlayer}/>

            {isDone && (
                <div
                    className="
                        absolute inset-0 backdrop-brightness-50
                        flex justify-center items-center
                    "
                >
                    <div
                        className="
                            w-full
                            mx-[24px] p-[24px]
                            bg-white-f2f
                            rounded-[10px]
                            flex flex-col items-center justify-center gap-6
                        "
                    >
                        <div className="flex flex-col gap-2 items-center w-full">
                            <div
                                className="
                                    font-bold text-[24px]
                                "
                            >
                                {finalResult?.isTie ? "It's a tie!" : `Player ${finalResult?.topPlayers[0].id} wins!`}
                            </div>
                            <div className="font-bold text-[14px] text-blue-719">
                                Game over! Here are the results…
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            {finalResult?.sortedPlayers.map((player) => {
                                const isTopPlayer = finalResult.topPlayers.find(i => i.id == player.id);

                                return (
                                    <PlayerResult id={player.id} score={player.score} isWinner={!!isTopPlayer} key={player.id}/>
                                )
                            })}                        
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="w-full rounded-full py-[12px] text-center bg-yellow-fda text-white-fcf">
                                Restart
                            </div>
                            <div className="w-full rounded-full py-[12px] text-center bg-white-dfe text-blue-304">
                                Setup New Game
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}