import {useEffect, useRef} from "react";

function useInterval<C extends CallableFunction>(callback: C, delay: number | null): void {
    const savedCallback = useRef<C>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            if (savedCallback.current) savedCallback.current();
        }

        if (delay !== null) {
            const intervalId = setInterval(tick, delay);
            return () => clearInterval(intervalId);
        }
    }, [delay]);
}

export default useInterval;
