import React from "react";
import { formatTime } from "../utils";

interface TimerProps {
    isStopped: boolean;
}

export default function useTimer ({isStopped}: TimerProps) {
    const [elapsedTime, setElapsedTime] = React.useState<number>(0); // Time in seconds

    React.useEffect(() => {
        let interval:NodeJS.Timeout | undefined = undefined;

        if (!isStopped) {
            interval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [isStopped]);

    return formatTime(elapsedTime);
}