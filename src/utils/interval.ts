import { gsap } from "gsap";
import { floatMs } from "./float.ms";

export const interval = (fn: any, intervalMs: number, immediately: boolean): () => boolean => {
    let isStopped: boolean;

    const stop = (): boolean => isStopped = true;

    const triggerCallback = (): void => {
        if (isStopped) return;
        fn();
        gsap.delayedCall(floatMs(intervalMs), triggerCallback);
    };

    if (immediately) {
        fn();
    }

    gsap.delayedCall(floatMs(intervalMs), triggerCallback);

    return stop;
};