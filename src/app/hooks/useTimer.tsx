import React from "react";
import { formatTime } from "../utils";
import { useAppContext } from "../context/AppContext";

interface TimerProps {
    isStopped: boolean;
    isRestarted?: boolean;
}

export default function useTimer ({isStopped, isRestarted}: TimerProps) {
    const {setIsRestarted} = useAppContext();
    const [elapsedTime, setElapsedTime] = React.useState<number>(0); // Time in seconds

    React.useEffect(() => {
        let interval:NodeJS.Timeout | undefined = undefined;

        console.log({isRestarted})

        if (isRestarted) {
            setElapsedTime(0);
            setIsRestarted(false);
        } else {
            if (!isStopped) {
                interval = setInterval(() => {
                    setElapsedTime((prev) => prev + 1);
                }, 1000);
            } else {
                clearInterval(interval);
            }            
        }

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [isStopped, isRestarted]);

    React.useEffect(() => {
        console.log({elapsedTime})
    }, [elapsedTime])

    return formatTime(elapsedTime);
}