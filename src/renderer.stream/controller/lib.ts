import { DataManagerInitialConfig } from "../data.manager";
import { FsmInitialConfig } from "../../state.transition.handler";
import { UiManagerInitialConfig } from "../ui.manager";
import {MainBridgeAction} from "../../ipc";
import {GameSceneManagerInitialConfig} from "../game.scene.manager";

export interface IRendererStreamController {
    requestMainAction(action: MainBridgeAction): void;
    init(initialConfig: RendererStreamControllerInitialConfig): Promise<void>;
}

export interface RendererStreamControllerInitialConfig {
    dataManagerInitialConfig: DataManagerInitialConfig;
    gameFsmInitialConfig: FsmInitialConfig;
    uiManagerInitialConfig: UiManagerInitialConfig;
    gameSceneManagerInitialConfig: GameSceneManagerInitialConfig;
}

// Weak interface to override certain props of strong typed config
export interface WeakRendererStreamControllerInitialConfig {
    dataManagerInitialConfig?: DataManagerInitialConfig;
    gameFsmInitialConfig?: FsmInitialConfig;
    uiManagerInitialConfig?: UiManagerInitialConfig;
    gameSceneManagerInitialConfig?: GameSceneManagerInitialConfig;
}