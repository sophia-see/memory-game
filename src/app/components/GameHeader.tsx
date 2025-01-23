import React from "react";
import { useAppContext } from "../context/AppContext";
import useDeviceSize from "../hooks/useDeviceSize"
import { initializeGame } from "../utils";

interface HeaderButton {
    label: string;
    customStyle: string;
    onClick: () => void;
}

function HeaderButton ({label, customStyle, onClick}: HeaderButton) {
    return (
        <div
            className={`
                ${customStyle}
                font-bold text-[16px]
                py-[10px] px-[18px]
                rounded-full
                cursor-pointer
            `}
            onClick={onClick}
        >
            {label}
        </div>
    )
}

export default function GameHeader ({gameIcons, setCurrPlayer}: {gameIcons: string[], setCurrPlayer: React.Dispatch<React.SetStateAction<string>>}) {
    const { gameSettings, setGame, setIsRestarted, setPlayers, setIsStarted } = useAppContext();
    const { isMobile } = useDeviceSize();
    const [isMenuOpened, setIsMenuOpened] = React.useState(false);
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
        setIsMenuOpened(false)
        setCurrPlayer("1")
    }

    const newGame = () => {
        restartGame();
        setIsStarted(false)
    }

    return (
        <div className="flex justify-between">
            <div className="font-bold text-[24px]">memory</div>
            {isMobile 
                ?   <HeaderButton 
                        label="Menu" 
                        customStyle="bg-yellow-fda text-white-fcf" 
                        onClick={() => setIsMenuOpened(true)}
                    />
                :   <div className="flex gap-4">
                        <HeaderButton 
                            label="Restart" 
                            customStyle="bg-yellow-fda text-white-fcf" 
                            onClick={restartGame}
                        />
                        <HeaderButton 
                            label="New Game" 
                            customStyle="bg-white-dfe text-blue-304" 
                            onClick={newGame}
                        />
                    </div>
            }
            {isMenuOpened && (
                <div
                    className="
                        absolute inset-0 backdrop-brightness-50
                        flex justify-center items-center
                        z-10
                    "
                >
                    <div
                        className="
                            w-full
                            mx-[24px] p-[24px]
                            bg-white-f2f
                            rounded-[10px]
                            flex flex-col items-center justify-center gap-4
                        "
                    >
                        <div 
                            className="w-full text-center rounded-full py-[12px] font-bold text-[18px] text-white-fcf bg-yellow-fda"
                            onClick={restartGame}
                        >
                            Restart
                        </div>
                        <div 
                            className="w-full text-center rounded-full py-[12px] font-bold text-[18px] text-blue-304 bg-white-dfe"
                            onClick={newGame}
                        >
                            New Game
                        </div>
                        <div 
                            className="w-full text-center rounded-full py-[12px] font-bold text-[18px] text-blue-304 bg-white-dfe"
                            onClick={() => setIsMenuOpened(false)}
                        >
                            Resume Game
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}