import { WindowManagerInitialConfig } from "../window.manager";

export interface IMainStreamController {}

export interface MainStreamControllerInitialConfig {
    windowManagerInitialConfig: WindowManagerInitialConfig;
}

// Weak interface to override certain props of strong typed config
export interface WeakMainStreamControllerInitialConfig {
    windowManagerInitialConfig?: WindowManagerInitialConfig;
}

