import "./Progress.css";

import { Line } from "@rc-component/progress";
import { useEffect, useRef, useState } from "react";

export type ProgressProps = {
    value: number;
    warningPercent: number;
    duration?: number; // in milliseconds
}

export const Progress = ({ value, warningPercent, duration = 300 }: ProgressProps) => {
    const [displayValue, setDisplayValue] = useState(value);
    const frameId = useRef<number | null>(null);
    const previousValue = useRef(value);

    useEffect(() => {
        const start = performance.now();
        const from = previousValue.current;
        const to = value;

        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const interpolated = from + (to - from) * easeOutCubic(progress);
            setDisplayValue(interpolated);

            if (progress < 1) {
                frameId.current = requestAnimationFrame(animate);
            } else {
                previousValue.current = to;
            }
        };

        if (frameId.current) {
            cancelAnimationFrame(frameId.current);
        }

        frameId.current = requestAnimationFrame(animate);

        return () => {
            if (frameId.current) {
                cancelAnimationFrame(frameId.current);
            }
        };
    }, [value, duration]);

    return (
        <Line
            className="progress"
            percent={displayValue}
            strokeColor={displayValue < warningPercent ? "#d093fe" : "#ff0000"}
            trailColor="#ffffff"
        />
    );
};

const easeOutCubic = (t: number) =>
    1 - Math.pow(1 - t, 3)
