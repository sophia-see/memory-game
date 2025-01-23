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

export default function GameHeader ({gameIcons}: {gameIcons: string[]}) {
    const { gameSettings, setGame } = useAppContext();
    const { isMobile } = useDeviceSize();

    const restartGame = () => {
        initializeGame({
            size: gameSettings.gridSize,
            gameIcons: gameIcons,
            theme: gameSettings.theme,
            setGame: setGame
        })
    }

    return (
        <div className="flex justify-between">
            <div className="font-bold text-[24px]">memory</div>
            {isMobile 
                ?   <HeaderButton 
                        label="Menu" 
                        customStyle="bg-yellow-fda text-white-fcf" 
                        onClick={() => {}}
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
                            onClick={() => {}}
                        />
                    </div>
            }
        </div>
    )
}