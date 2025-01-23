import { GameState } from "./types";

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