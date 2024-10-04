import { Dictionary } from "../../lib";

export interface IUiManager {
    init(initialConfig: UiManagerInitialConfig): Promise<void>;
    receiveDataManagerUpdate(updateData: Dictionary): void;
}

export interface UiManagerInitialConfig {

}

// Weak interface to override certain props of strong typed config
export interface WeakUiManagerInitialConfig {

}