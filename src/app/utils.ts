import { GameState, PlayerStats } from "./types";

export function shuffleArray(array: string[]) {
    const duplicateValues = [];

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        duplicateValues.push(element, element)
    }

    for (let i = duplicateValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [duplicateValues[i], duplicateValues[j]] = [duplicateValues[j], duplicateValues[i]];
    }

    return duplicateValues;
}

export function setupGame(array: string[][]) {
    return array.map((row) => {
        return row.map((item) => ({
            value: item,
            isOpened: false,
            isSelected: false
        }) as GameState)
    })
}

export function setupPlayerStats(playerCount: number) {
    return [...new Array(playerCount)].map((_, i) => ({
        id: `${i + 1}`,
        score: 0,
        moves: 0
    }) as PlayerStats);
}

// Format time into dd:hh:mm:ss
export const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Dynamically format based on availability
    if (hours > 0) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    } else {
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
};
