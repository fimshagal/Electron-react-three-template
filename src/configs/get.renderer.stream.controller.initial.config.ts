import {
    RendererStreamControllerInitialConfig,
    WeakRendererStreamControllerInitialConfig
} from "../renderer.stream/controller";
import { getDataManagerInitialConfig } from "./get.data.manager.initial.config";
import { getGameFsmInitialConfig } from "./get.game.fsm.initial.config";
import { getUiManagerInitialConfig } from "./get.ui.manager.initial.config";
import { getGameSceneManagerInitialConfig } from "./get.game.scene.manager.initial.config";

export const getRendererStreamControllerInitialConfig = (overrideProps: WeakRendererStreamControllerInitialConfig): RendererStreamControllerInitialConfig => {
    return {
        dataManagerInitialConfig: getDataManagerInitialConfig(),
        gameFsmInitialConfig: getGameFsmInitialConfig(),
        uiManagerInitialConfig: getUiManagerInitialConfig(),
        gameSceneManagerInitialConfig: getGameSceneManagerInitialConfig(),
        ...overrideProps,
    };
};