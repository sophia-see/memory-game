"use client"

import React from "react";
import { useAppContext } from "../context/AppContext"
import GameHeader from "./GameHeader";
import GameGrid from "./GameGrid";
import Menu from "./Menu";
import { initializeGame, setupPlayerStats } from "../utils";
import GameScoreboard from "./GameScoreboard";

interface GameProps {
    gameIcons: string[];
}

export default function Game ({ gameIcons }: GameProps) {
    const { isStarted, gameSettings, setPlayers, setGame, isDone } = useAppContext();
    
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
                <></>
            )}
        </div>
    )
}