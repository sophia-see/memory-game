"use client"
import { createContext, ReactNode, useContext, useState } from "react";
import { GameSettings } from "../types";

interface AppContextProps {
    isStarted: boolean;
    setIsStarted: (isStarted: boolean) => void;
    gameSettings: GameSettings;
    setGameSettings: (menu: GameSettings) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({children}: Readonly<AppProviderProps>) => {
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [gameSettings, setGameSettings] = useState<GameSettings>({
        theme: "numbers",
        playerCount: "1",
        gridSize: "4x4"
    });

    return (
        <AppContext.Provider value={{isStarted, setIsStarted, gameSettings, setGameSettings}}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) throw new Error ("useAppContext must be used within AppProvider")

    return context;
}