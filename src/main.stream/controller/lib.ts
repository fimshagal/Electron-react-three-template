import { WindowManagerInitialConfig } from "../window.manager";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMainStreamController {}

export interface MainStreamControllerInitialConfig {
    windowManagerInitialConfig: WindowManagerInitialConfig;
}

// Weak interface to override certain props of strong typed config
export interface WeakMainStreamControllerInitialConfig {
    windowManagerInitialConfig?: WindowManagerInitialConfig;
}

