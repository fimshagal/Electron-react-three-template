import { gsap } from "gsap";
import { floatMs } from "./float.ms";

export const delay = async (ms: number): Promise<void> => {
    return await new Promise((resolve): void => {
        gsap.delayedCall(floatMs(ms), resolve);
    });
};