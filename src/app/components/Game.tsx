"use client"

import { useAppContext } from "../context/AppContext"

export default function Game () {
    const { menuSettings } = useAppContext();

    return (
        <div>Game</div>
    )
}