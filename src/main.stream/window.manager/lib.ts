import { Vector2 } from "three";
import { Nullable } from "../../lib";

export interface IWindowManager {
    init(initialConfig: WindowManagerInitialConfig): Promise<void>;
    createWindow(): void;
    get window(): Nullable<any>;
}

export interface WindowManagerInitialConfig {
    size: Vector2;
    htmlSource: string;
}

// Weak interface to override certain props of strong typed config
export interface WeakWindowManagerInitialConfig {
    size?: Vector2;
    htmlSource?: string;
}