import { MainStreamControllerInitialConfig, WeakMainStreamControllerInitialConfig } from "../main.stream";
import { getWindowManagerInitialConfig } from "./get.window.manager.initial.config";

export const getMainStreamControllerInitialConfig = (overrideProps?: WeakMainStreamControllerInitialConfig): MainStreamControllerInitialConfig => {
    return {
        windowManagerInitialConfig: getWindowManagerInitialConfig(),
        ...overrideProps,
    };
};