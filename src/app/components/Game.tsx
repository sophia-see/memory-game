"use client"

import React from "react";
import { useAppContext } from "../context/AppContext"
import GameHeader from "./GameHeader";
import GameGrid from "./GameGrid";
import Menu from "./Menu";
import { getFinalResult, initializeGame, setupPlayerStats } from "../utils";
import GameScoreboard from "./GameScoreboard";
import useTimer from "../hooks/useTimer";

interface GameProps {
    gameIcons: string[];
}

interface PlayerResultProps {
    label: string;
    value: string;
    isHighlight: boolean;
}

function PlayerResult (props: PlayerResultProps) {
    const {label, value, isHighlight} = props;

    return (
        <div 
            className={`
                p-4
                flex justify-between items-center
                ${isHighlight ? "bg-blue-152 text-white-fcf" : "bg-white-dfe text-blue-304"}
                rounded-[5px]
            `}
        >
            <div 
                className={`
                    ${isHighlight ? "" : "text-blue-719"}
                    font-bold text-[13px]
                `}
            >
                {label} {isHighlight ? "(Winner!)" : ""}
            </div>
            <div
                className={`
                    font-bold text-[20px]
                `}
            >
                {value}
            </div>
        </div>
    )
}

export default function Game ({ gameIcons }: GameProps) {
    const { 
        isStarted, setIsStarted, 
        gameSettings, 
        players, setPlayers, 
        setGame, 
        isDone, setIsDone,
        isRestarted, setIsRestarted
    } = useAppContext();
    
    const [currPlayer, setCurrPlayer] = React.useState("1");
    const timer = useTimer({isStopped: isDone, isRestarted: isRestarted || !isStarted});

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
            const { topPlayers, sortedPlayers, isTie, isSinglePlayer } = getFinalResult({players});

            return { topPlayers, sortedPlayers, isTie, isSinglePlayer };
        }
        return null;
    }, [players, isDone]);

    const restartGame = () => {
        setIsRestarted(true);

        initializeGame({
            size: gameSettings.gridSize,
            gameIcons: gameIcons,
            theme: gameSettings.theme,
            setGame: setGame,
            playerCount: parseInt(gameSettings.playerCount),
            setPlayers: setPlayers
        })

        setIsDone(false);
    }

    const newGame = () => {
        restartGame();
        setIsStarted(false)
    }

    if (!isStarted)
        return <Menu />

    return (
        <div
            className="
                w-full h-auto min-h-dvh max-w-[1110px] mx-auto
                p-[24px] md:p-[40px]
                flex flex-col justify-center
            "
        >
            <GameHeader gameIcons={gameIcons} setCurrPlayer={setCurrPlayer}/>
            <GameGrid currPlayer={currPlayer} setCurrPlayer={setCurrPlayer} />
            <GameScoreboard currPlayer={currPlayer} timer={timer}/>

            {isDone && (
                <div
                    className="
                        absolute inset-0 backdrop-brightness-50
                        flex justify-center items-center
                        z-20
                    "
                >
                    <div
                        className="
                            w-full max-w-[654px]
                            mx-[24px] p-[24px]
                            bg-white-f2f
                            rounded-[10px]
                            flex flex-col items-center justify-center gap-6
                        "
                    >
                        <div className="flex flex-col gap-2 items-center w-full">
                            {finalResult?.isSinglePlayer 
                                ?   <>
                                        <div
                                            className="
                                                font-bold text-[24px]
                                            "
                                        >
                                            You did it!
                                        </div>
                                        <div className="font-bold text-[14px] text-blue-719">
                                            Game over! Here’s how you got on…
                                        </div>
                                    </>
                                :   <>
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
                                    </>
                            }
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            {finalResult?.isSinglePlayer
                                ?   <>
                                        <PlayerResult 
                                            label={"Time Elapsed"} 
                                            value={timer} 
                                            isHighlight={false} 
                                            key={"time"}
                                        />
                                        <PlayerResult 
                                            label={"Moves Taken"} 
                                            value={`${finalResult.topPlayers[0].moves} Moves`} 
                                            isHighlight={false} 
                                            key={"moves"}
                                        />
                                    </>
                                : finalResult?.sortedPlayers.map((player) => {
                                    const isTopPlayer = finalResult.topPlayers.find(i => i.id == player.id);
    
                                    return (
                                        <PlayerResult 
                                            label={`Player ${player.id}`} 
                                            value={`${player.score} Pairs`} 
                                            isHighlight={!!isTopPlayer} 
                                            key={player.id}
                                        />
                                    )
                                })
                            }                  
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                            <div 
                                className="w-full rounded-full py-[12px] text-center bg-yellow-fda text-white-fcf"
                                onClick={restartGame}
                            >
                                Restart
                            </div>
                            <div 
                                className="w-full rounded-full py-[12px] text-center bg-white-dfe text-blue-304"
                                onClick={newGame}
                            >
                                Setup New Game
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}