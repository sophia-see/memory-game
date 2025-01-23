import React from "react";
import { useAppContext } from "../context/AppContext"
import { GameState } from "../types";
import { setupGame, shuffleArray } from "../utils";

interface GameGridProps {
    gameArray: GameState[][];
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
                p-2 aspect-square max-w-[87px]
                rounded-full
            `}
            onClick={() => {
                if (selectedPair.length < 2) {
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

export default function GameGrid ({ gameArray }:GameGridProps) {
    const { gameSettings } = useAppContext();
    const [game, setGame] = React.useState(gameArray);
    const [selectedPair, setSelectedPair] = React.useState<string[]>([]);
    const gridSize = parseInt(gameSettings.gridSize[0]);
    const isSmallGrid = gridSize == 4;

    React.useEffect(() => {
        if (selectedPair.length == 2) {
            const timerId = setTimeout(() => {
                const isMatch = selectedPair[0] == selectedPair[1];
                let newGame = [];

                if (isMatch) {
                    newGame = game.map((row) => row.map(item => ({
                        ...item,
                        isSelected: false,
                        isOpened: item.isOpened ? item.isOpened : selectedPair[0] == item.value
                    })));
                } else {
                    newGame = game.map((row) => row.map(item => ({
                        ...item,
                        isSelected: false
                    })));
                }
                
                setSelectedPair([]);
                setGame(newGame)
            }, 500)

            return () => clearTimeout(timerId);
        }

    }, [selectedPair, game])

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