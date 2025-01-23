"use client"
import { createContext, ReactNode, useContext, useState } from "react";
import { GameSettings, PlayerStats } from "../types";
import React from "react";

interface AppContextProps {
    isStarted: boolean;
    setIsStarted: (isStarted: boolean) => void;
    isDone: boolean;
    setIsDone: (isDone: boolean) => void;
    gameSettings: GameSettings;
    setGameSettings: (menu: GameSettings) => void;
    players: PlayerStats[];
    setPlayers: React.Dispatch<React.SetStateAction<PlayerStats[]>>; 
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({children}: Readonly<AppProviderProps>) => {
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [gameSettings, setGameSettings] = useState<GameSettings>({
        theme: "numbers",
        playerCount: "1",
        gridSize: "4x4"
    });
    const [players, setPlayers] = React.useState<PlayerStats[]>([]);

    return (
        <AppContext.Provider value={{isStarted, setIsStarted, isDone, setIsDone, gameSettings, setGameSettings, players, setPlayers}}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) throw new Error ("useAppContext must be used within AppProvider")

    return context;
}