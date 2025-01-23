export type GameSettings = {
    theme: "numbers" | "icons";
    playerCount: "1" | "2" | "3" | "4";
    gridSize: "4x4" | "6x6";
}

export type PlayerStats = {
    id: "1" | "2" | "3" | "4";
    score: number;
}

export type GameState = {
    value: string;
    isOpened: boolean;
    isSelected: boolean;
}