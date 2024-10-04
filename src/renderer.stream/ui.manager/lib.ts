import { Dictionary } from "../../lib";

export interface IUiManager {
    init(initialConfig: UiManagerInitialConfig): Promise<void>;
    receiveDataManagerUpdate(updateData: Dictionary): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UiManagerInitialConfig {

}

// Weak interface to override certain props of strong typed config
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WeakUiManagerInitialConfig {

}