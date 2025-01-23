"use client"

import React from "react";
import { useAppContext } from "../context/AppContext"
import GameHeader from "./GameHeader";
import GameGrid from "./GameGrid";
import Menu from "./Menu";
import { setupGame, shuffleArray } from "../utils";
import GameScoreboard from "./GameScoreboard";

interface GameProps {
    gameIcons: string[];
}

export default function Game ({ gameIcons }: GameProps) {
    const { isStarted, gameSettings } = useAppContext();
    const gridSize = parseInt(gameSettings.gridSize[0]);
    const isSmallGrid = gridSize == 4;
    const isGameIcons = gameSettings.theme == "icons";

    const valueSize = (gridSize ** 2) / 2
    const icons = gameIcons.slice(0, valueSize);
    const numbers = Array.from(Array(valueSize).keys()).map(i => `${i + 1}`);

    const values = isGameIcons ? icons : numbers;
    const shuffledValues = shuffleArray(values);

    const gameValues = Array.from({ length: gridSize }, (_, rowIndex) =>
        shuffledValues.slice(rowIndex * gridSize, rowIndex * gridSize + gridSize)
    );
    const gameArray = setupGame(gameValues);

    const [movesCount, setMovesCount] = React.useState(0);
    const [timePassed, setTimePassed] = React.useState(0);

    if (!isStarted)
        return <Menu />

    return (
        <div
            className="
                w-full min-h-screen
                p-[24px]
                flex flex-col justify-center
            "
        >
            <GameHeader />
            <GameGrid gameArray={gameArray}/>
            <GameScoreboard />
        </div>
    )
}