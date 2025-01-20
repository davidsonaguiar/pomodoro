import {ReactNode, createContext, useState} from "react";
import StartSound from "../sounds/start.mp3";
import StopSound from "../sounds/stop.mp3";

const startSound = new Audio(StartSound);
const stopSound = new Audio(StopSound);

interface PomodoroContextProps {
    timeWork: number;
    timeShotRest: number;
    timeLongRest: number;
    sizeCycle: number;
    timeCycle: number;
    quantityCycle: number;
    isWorking: boolean;
    isResting: boolean;
    isPaused: boolean;
    pauseOrPlay: () => void;
    startWork: () => void;
    startRest: () => void;
    stop: () => void;
}

export const PomodoroContext = createContext<PomodoroContextProps | null>(null);

export function PomodoroContextProvider(props: { children: ReactNode }) {
    const timeWork = 1500;
    const timeShotRest = 300;
    const timeLongRest = 900;
    const sizeCycle = 4;
    const [timeCycle, setTimeCycle] = useState(0);
    const [quantityCycle, setQuantityCycle] = useState(1);
    const [isWorking, setIsWorking] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [isPaused, setIsPaused] = useState(true);

    const pauseOrPlay = () => setIsPaused((previous) => !previous);

    function startWork() {
        setIsWorking(true);
        setIsResting(false);
        setTimeCycle((previous) => previous + 1);
        if (timeCycle == sizeCycle) {
            setTimeCycle(1);
            setQuantityCycle((previous) => previous + 1);
        }
        setIsPaused(false);
        startSound.play();
    }

    function startRest() {
        stopSound.play();
        setIsWorking(false);
        setIsResting(true);
        setIsPaused(false);
    }

    function stop() {
        setIsWorking(false);
        setIsPaused(true);
        setIsResting(false);
        setTimeCycle(0);
        setQuantityCycle(1);
    }


    return (
        <PomodoroContext.Provider
            value={{
                timeWork,
                timeShotRest,
                timeLongRest,
                sizeCycle,
                timeCycle,
                quantityCycle,
                isWorking,
                isResting,
                isPaused,
                pauseOrPlay,
                startWork,
                startRest,
                stop
            }}
        >
            {props.children}
        </PomodoroContext.Provider>
    );
}
