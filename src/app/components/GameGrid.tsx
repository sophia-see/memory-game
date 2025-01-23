import React from "react";
import { useAppContext } from "../context/AppContext"
import { GameState } from "../types";
import { setupGame, shuffleArray } from "../utils";

interface GameGridProps {
    gameArray: GameState[][];
    currPlayer: string;
    setCurrPlayer: React.Dispatch<React.SetStateAction<string>>
}

interface GameValueProps {
    rowIndex: number;
    colIndex: number;
    game: GameState[][];
    selectedPair: string[];
    setSelectedPair: React.Dispatch<React.SetStateAction<string[]>>
    isSmallGrid: boolean;
    setGame: React.Dispatch<React.SetStateAction<GameState[][]>>;
}

function GameValue (props: GameValueProps) {
    const {rowIndex, colIndex, game, selectedPair, setSelectedPair, isSmallGrid, setGame} = props;
    const item = game[rowIndex][colIndex];
    const { value, isOpened, isSelected } = item;
    
    return (
        <div
            className={`
                font-bold
                flex items-center justify-center
                ${isSmallGrid ? "text-[40px]" : "text-[24px]"}
                ${isOpened ? "bg-blue-bcc" : (isSelected ? "bg-yellow-fda" : "bg-blue-304")}
                p-2 aspect-square
                min-w-[45px] min-h-[45px] max-w-[87px]
                rounded-full
            `}
            onClick={() => {
                if (selectedPair.length < 2 && !isSelected) {
                    const newState = JSON.parse(JSON.stringify(game));
                    
                    setSelectedPair([...selectedPair, value]);

                    newState[rowIndex][colIndex] = {
                        ...game[rowIndex][colIndex],
                        isSelected: true,
                    }

                    setGame(newState)                    
                }

            }}
        >
            {isOpened || isSelected ? value : ""}
        </div>
    )
}

export default function GameGrid ({ gameArray, currPlayer, setCurrPlayer }:GameGridProps) {
    const { gameSettings, setPlayers, setIsDone } = useAppContext();
    const [game, setGame] = React.useState(gameArray);
    const [selectedPair, setSelectedPair] = React.useState<string[]>([]);
    const gridSize = parseInt(gameSettings.gridSize[0]);
    const isSmallGrid = gridSize == 4;

    React.useEffect(() => {
        if (selectedPair.length == 2) {
            const timerId = setTimeout(() => {
                const isMatch = selectedPair[0] == selectedPair[1];
                let newGame = [];
                let playerCount = parseInt(gameSettings.playerCount);

                if (isMatch) {
                    newGame = game.map((row) => row.map(item => ({
                        ...item,
                        isSelected: false,
                        isOpened: item.isOpened ? item.isOpened : selectedPair[0] == item.value
                    })));

                    setPlayers((prevState) => prevState.map(item => ({
                        ...item,
                        score: currPlayer == item.id ? item.score + 1 : item.score,
                        moves: item.moves + 1
                    })))
                } else {
                    newGame = game.map((row) => row.map(item => ({
                        ...item,
                        isSelected: false
                    })));

                    setPlayers((prevState) => prevState.map(item => ({
                        ...item,
                        moves: item.moves + 1
                    })))

                    setCurrPlayer(prev => {
                        let newNum = parseInt(prev) + 1;

                        if (newNum > playerCount) newNum = newNum % playerCount
                        if (newNum == 0) newNum = playerCount

                        return newNum.toString();
                    })
                }

                setSelectedPair([]);
                setGame(newGame)
            }, 500)

            return () => clearTimeout(timerId);
        }

    }, [selectedPair, game, gameSettings, currPlayer]);

    React.useEffect(() => {
        const remainingUnmatched = game.flatMap(row => row).filter(i => !i.isOpened)
        console.log({remainingUnmatched})
        if (remainingUnmatched.length == 0)
            setIsDone(true);
    }, [game])

    return (
        <div className={`w-full flex-1 flex flex-col justify-center items-center ${isSmallGrid ? "gap-3" : "gap-2"} m-auto`}>
            {game.map((row, rowIndex) => {
                return (
                    <div 
                        className={`grid ${isSmallGrid ? "gap-[12px] grid-cols-[repeat(4,minmax(auto,87px))]" : "gap-[8px] grid-cols-[repeat(6,minmax(auto,87px))]"}`}
                        key={`row_${rowIndex}`}
                    >
                        {row.map((item, colIndex) => {
                            return (
                                <GameValue
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    game={game}
                                    setGame={setGame}
                                    selectedPair={selectedPair}
                                    setSelectedPair={setSelectedPair}
                                    isSmallGrid={isSmallGrid} 
                                    key={`item_${colIndex}`}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}