import React from "react";
import { useAppContext } from "../context/AppContext"
import { GameState } from "../types";
import Image from "next/image";
import { motion } from "framer-motion";

interface GameGridProps {
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
    const isSvg = value.includes("svg");

    return (
        <motion.div
            key={`${rowIndex}-${colIndex}`} // Ensures component state consistency
            transition={{ duration: 0.6 }}
            initial={{ rotateY: 0 }} // Start with no rotation
            // whileTap={{ rotateY: 180 }}
            animate={{ rotateY: isSelected || isOpened ? 0 : -180 }} // Flip when opened/selected, revert when false
            exit={{ rotateY: 0 }} // Ensure it flips back when removed
            style={{ transformStyle: "preserve-3d" }}
            className={`
                font-bold
                flex items-center justify-center
                ${isSmallGrid ? "text-[40px] md:text-[56px]" : "text-[24px] md:text-[44px]"}
                ${isOpened ? "bg-blue-bcc" : (isSelected ? "bg-yellow-fda" : "bg-blue-304 cursor-pointer")}
                text-white-fcf
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
            {isSvg 
                ? <Image 
                    src={`./images/${value}`} 
                    alt="icon" 
                    layout="responsive" 
                    width={1} 
                    height={1} 
                    className={`${isSmallGrid ? "p-3" : "p-[6px]"} ${isOpened || isSelected ? "" : "hidden"}`}
                    priority
                    loading="eager"
                /> 
                : isOpened || isSelected  ? value : ""
            }
        </motion.div>
    )
}

export default function GameGrid ({ currPlayer, setCurrPlayer } : GameGridProps) {
    const { gameSettings, setPlayers, setIsDone, game, setGame } = useAppContext();
    const [selectedPair, setSelectedPair] = React.useState<string[]>([]);
    const gridSize = parseInt(gameSettings.gridSize[0]);
    const isSmallGrid = gridSize == 4;

    React.useEffect(() => {
        if (selectedPair.length == 2) {                
            const isMatch = selectedPair[0] == selectedPair[1];
            const timerId = setTimeout(() => {
                let newGame = [];
                const playerCount = parseInt(gameSettings.playerCount);

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
            }, isMatch ? 100 : 1000)

            return () => clearTimeout(timerId);
        }

    }, [selectedPair, game, gameSettings, currPlayer, setCurrPlayer, setPlayers, setGame]);

    React.useEffect(() => {
        const remainingUnmatched = game.flatMap(row => row).filter(i => !i.isOpened)
        if (remainingUnmatched.length == 0)
            setIsDone(true);
    }, [game, setIsDone])

    return (
        <div className={`
            w-full 
            flex-1 
            flex flex-col justify-center items-center 
            ${isSmallGrid ? "gap-3" : "gap-2"} 
            my-[50px] mx-auto
        `}>
            {game.map((row, rowIndex) => {
                return (
                    <div 
                        className={`
                            grid 
                            ${isSmallGrid 
                                ? "gap-[12px] grid-cols-[repeat(4,minmax(auto,87px))]" 
                                : "gap-[8px] grid-cols-[repeat(6,minmax(auto,87px))]"
                            }
                        `}
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