import { GameState, PlayerStats } from "./types";

export function shuffleArray(array: string[]) {
    let duplicateValues = [];

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
    return Array.apply(null, Array(playerCount)).map((_, i) => ({
        id: `${i + 1}`,
        score: 0
    }) as PlayerStats);
}