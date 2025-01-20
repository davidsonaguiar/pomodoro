import {useEffect, useState} from "react";
import useInterval from "../hooks/use-interval.ts";
import secondsToTime from "../util/seconds-to-time.ts";
import {usePomodoroContext} from "../hooks/use-pomodoro-context.ts";

const ONE_SECOND_DELAY = 1000;

function Timer() {
    const {
        isPaused,
        isWorking,
        isResting,
        timeCycle,
        sizeCycle,
        timeWork,
        timeShotRest,
        timeLongRest,
        startWork,
        startRest
    } = usePomodoroContext();

    const [time, setTime] = useState<number>(timeWork);

    useEffect(() => {
        if (isWorking) setTime(timeWork);
        if (isResting && timeCycle < sizeCycle) setTime(timeShotRest);
        if (isResting && timeCycle === sizeCycle) setTime(timeLongRest);
        if (!isWorking && !isResting && isPaused) setTime(timeWork);
    }, [isWorking, isResting]);

    useInterval(
        () => {
            setTime((previous) => previous - 1);
            if (time === 0 && isWorking) startRest();
            if (time === 0 && isResting) startWork();
        },
        !isPaused ? ONE_SECOND_DELAY : null
    );

    return <div className="timer">{secondsToTime(time)}</div>;
}

export default Timer;
