import { GameSceneManagerInitialConfig, WeakGameSceneManagerInitialConfig } from "../renderer.stream/game.scene.manager";

export const getGameSceneManagerInitialConfig = (overrideProps?: WeakGameSceneManagerInitialConfig): GameSceneManagerInitialConfig => {
    return {
        components: [],
        ...overrideProps,
    };
};