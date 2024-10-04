import { WeakWindowManagerInitialConfig, WindowManagerInitialConfig } from "../main.stream/window.manager";
import { Vector2 } from "three";

export const getWindowManagerInitialConfig = (overrideProps?: WeakWindowManagerInitialConfig): WindowManagerInitialConfig => {
    return {
        size: new Vector2(1024, 768),
        htmlSource: 'index.html',
        ...overrideProps,
    };
};