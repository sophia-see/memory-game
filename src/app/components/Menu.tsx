import { ReactNode } from "react"
import { useAppContext } from "../context/AppContext"
import { GameSettings } from "../types"
import AnimationSwitch from "./AnimationSwitch"

interface ManuLabelProps {
    label: string
}

function MenuLabel ({label}: Readonly<ManuLabelProps>) {
    return (
        <div className="font-bold text-[15px] md:text-[20px] text-blue-719">
            {label}
        </div>
    )
}

interface MenuValuesProps {
    children: ReactNode
}

function MenuValues ({children}: Readonly<MenuValuesProps>) {
    return (
        <div className="flex gap-2 justify-between">
            {children}
        </div>
    )
}

interface MenuValueProps {
    value: string;
    setValue: (menu: GameSettings) => void;
    settingsKey: string;
    settings: GameSettings;
}

function MenuValue ({ value, setValue, settingsKey, settings}: Readonly<MenuValueProps>) {
    const lowerCasedValue = value.toLowerCase();
    const selectedValue = settings[settingsKey as keyof GameSettings];
    const isSelected = lowerCasedValue == selectedValue;

    return (
        <div
            className={`
                text-white-fcf ${isSelected ? "bg-blue-304" : "bg-blue-bcc hover:bg-blue-639"}
                font-bold text-[16px] md:text-[26px]
                py-[10px]
                flex-1
                flex items-center justify-center
                rounded-full
                cursor-pointer
            `}
            onClick={() => {
                setValue({
                    ...settings,
                    [settingsKey]: lowerCasedValue
                })
            }} 
        >
            {value}
        </div>
    )
}

interface MenuItemProps {
    children: ReactNode
}

function MenuItem ({children}: Readonly<MenuItemProps>) {
    return (
        <div className="flex flex-col gap-[11px]">
            {children}
        </div>
    )
}

export default function Menu () {
    const { gameSettings, setGameSettings, setIsStarted, isAnimated, setIsAnimated } = useAppContext();

    return (
        <div 
            className="
                min-h-dvh
                bg-blue-152 text-white-fcf
                flex flex-col items-center justify-center gap-10
                px-[24px] md:px-[60px]
            "
        >
            <div className="font-bold text-[32px] md:text-[40px] text-white-fcf">
                memory
            </div>
            <div
                className="
                    w-full lg:max-w-[654px]
                    bg-white-fcf
                    p-[24px]
                    flex flex-col gap-[32px]
                    rounded-[10px]
                "
            >
                <div
                    className="
                        flex flex-col gap-[24px]
                    "
                >
                    <AnimationSwitch isAnimated={isAnimated} setIsAnimated={setIsAnimated}/>
                    <MenuItem>
                        <MenuLabel label="Select Theme" />
                        <MenuValues>
                            <MenuValue value="Numbers" setValue={setGameSettings} settingsKey={"theme"} settings={gameSettings} />
                            <MenuValue value="Icons" setValue={setGameSettings} settingsKey={"theme"} settings={gameSettings}/>
                        </MenuValues>
                    </MenuItem>
                    <MenuItem>
                        <MenuLabel label="Number of Players" />
                        <MenuValues>
                            <MenuValue value="1" setValue={setGameSettings} settingsKey={"playerCount"} settings={gameSettings} />
                            <MenuValue value="2" setValue={setGameSettings} settingsKey={"playerCount"} settings={gameSettings} />
                            <MenuValue value="3" setValue={setGameSettings} settingsKey={"playerCount"} settings={gameSettings} />
                            <MenuValue value="4" setValue={setGameSettings} settingsKey={"playerCount"} settings={gameSettings} />
                        </MenuValues>
                    </MenuItem>
                    <MenuItem>
                        <MenuLabel label="Grid Size" />
                        <MenuValues>
                            <MenuValue value="4x4" setValue={setGameSettings} settingsKey={"gridSize"} settings={gameSettings} />
                            <MenuValue value="6x6" setValue={setGameSettings} settingsKey={"gridSize"} settings={gameSettings}/>
                        </MenuValues>
                    </MenuItem>
                </div>
                <div
                    className="
                        bg-yellow-fda text-white-fcf hover:bg-yellow-ffb
                        font-bold text-[18px] md:text-[32px]
                        flex justify-center items-center
                        py-[14px]
                        rounded-full
                        cursor-pointer
                    "
                    onClick={() => setIsStarted(true)}
                >
                    Start Game
                </div>
            </div>
        </div>
    )
}