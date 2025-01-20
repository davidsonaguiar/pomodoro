import {useEffect} from "react";
import {usePomodoroContext} from "../hooks/use-pomodoro-context.ts";

import Timer from "./timer";
import Button from "./button";
import Title from "./title";

function PomodoroTime() {
    const {
        sizeCycle,
        isPaused,
        isResting,
        isWorking,
        quantityCycle,
        timeCycle,
        pauseOrPlay,
        startWork,
        startRest,
        stop,
    } = usePomodoroContext();

    useEffect(() => {
        const body = document.body;
        if (isWorking) body.className = "bg-working";
        if (isResting) body.className = "bg-resting";
        if (isPaused && (isWorking || isResting)) body.className = "bg-pause";
        if (!isWorking && !isResting) body.className = "bg-stop";
    }, [isWorking, isResting, isPaused]);

    const init = isPaused && !isWorking && !isResting;

    return (
        <div className={"pomodoro bg-white"}>
            <div>
                <Title>
                    {init && "Vamos começar?"}
                    {isWorking && "Trabalhando"}
                    {isResting && "Descansando"}
                    {!init && isPaused && "(Pausado)"}
                </Title>
                <div className="info">
                    <p>Ciclo: {quantityCycle}º</p>
                    <p>
                        Tempo: {timeCycle}º de {sizeCycle}
                    </p>
                </div>
            </div>
            <Timer/>
            <div className="buttons">
                <Button
                    className={init ? "bg-white" : "bg-working"}
                    hidden={isWorking && !init}
                    onClick={startWork}
                >
                    Trabalhar
                </Button>
                <Button
                    className="bg-resting"
                    onClick={startRest}
                    hidden={isResting || init}
                >
                    Descansar
                </Button>
                <Button className="bg-pause" onClick={pauseOrPlay} hidden={init}>
                    {isPaused ? "Continue" : "Pause"}
                </Button>
                <Button className="bg-stop" onClick={stop} hidden={init}>
                    Stop
                </Button>
            </div>
        </div>
    );
}

export default PomodoroTime;
