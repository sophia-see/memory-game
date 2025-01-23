import { ReactNode } from "react"
import { useAppContext } from "../context/AppContext"
import { MenuSettings } from "../types"

interface ManuLabelProps {
    label: string
}

function MenuLabel ({label}: ManuLabelProps) {
    return (
        <div className="font-bold text-[15px] text-blue-719">
            {label}
        </div>
    )
}

interface MenuValuesProps {
    children: ReactNode
}

function MenuValues ({children}: MenuValuesProps) {
    return (
        <div className="flex gap-2 justify-between">
            {children}
        </div>
    )
}

interface MenuValueProps {
    value: string;
    setValue: (menu: MenuSettings) => void;
    settingsKey: string;
    settings: MenuSettings;
}

function MenuValue ({ value, setValue, settingsKey, settings}: MenuValueProps) {
    const lowerCasedValue = value.toLowerCase();
    const selectedValue = settings[settingsKey as keyof MenuSettings];
    const isSelected = lowerCasedValue == selectedValue;

    return (
        <div
            className={`
                text-white-fcf ${isSelected ? "bg-blue-304" : "bg-blue-bcc"}
                font-bold text-[16px]
                py-[10px]
                flex-1
                flex items-center justify-center
                rounded-full
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

function MenuItem ({children}: {children: ReactNode}) {
    return (
        <div className="flex flex-col gap-[11px]">
            {children}
        </div>
    )
}

export default function Menu () {
    const { menuSettings, setMenuSettings, setIsStarted } = useAppContext();

    return (
        <div 
            className="
                min-h-screen
                bg-blue-152 text-white-fcf
                flex flex-col items-center justify-center gap-10
                px-[24px]
            "
        >
            <div className="font-bold text-[32px] text-white-fcf">
                memory
            </div>
            <div
                className="
                    w-full
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
                    <MenuItem>
                        <MenuLabel label="Select Theme" />
                        <MenuValues>
                            <MenuValue value="Numbers" setValue={setMenuSettings} settingsKey={"theme"} settings={menuSettings} />
                            <MenuValue value="Icons" setValue={setMenuSettings} settingsKey={"theme"} settings={menuSettings}/>
                        </MenuValues>
                    </MenuItem>
                    <MenuItem>
                        <MenuLabel label="Number of Players" />
                        <MenuValues>
                            <MenuValue value="1" setValue={setMenuSettings} settingsKey={"playerCount"} settings={menuSettings} />
                            <MenuValue value="2" setValue={setMenuSettings} settingsKey={"playerCount"} settings={menuSettings} />
                            <MenuValue value="3" setValue={setMenuSettings} settingsKey={"playerCount"} settings={menuSettings} />
                            <MenuValue value="4" setValue={setMenuSettings} settingsKey={"playerCount"} settings={menuSettings} />
                        </MenuValues>
                    </MenuItem>
                    <MenuItem>
                        <MenuLabel label="Grid Size" />
                        <MenuValues>
                            <MenuValue value="4x4" setValue={setMenuSettings} settingsKey={"gridSize"} settings={menuSettings} />
                            <MenuValue value="6x6" setValue={setMenuSettings} settingsKey={"gridSize"} settings={menuSettings}/>
                        </MenuValues>
                    </MenuItem>
                </div>
                <div
                    className="
                        bg-custom-yellow text-white-fcf
                        flex justify-center items-center
                        py-[14px]
                        rounded-full
                    "
                    onClick={() => setIsStarted(true)}
                >
                    Start Game
                </div>
            </div>
        </div>
    )
}