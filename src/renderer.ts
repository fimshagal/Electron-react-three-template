import { RendererStreamController } from "./renderer.stream/controller";
import {
    gameStateMachineConfig,
    ErrorState,
    ExitState,
    InitState,
    ExplorationState,
    MiniGameState, RewardCelebrationState, ChestState, WelcomeState
} from "./states.storage/game";

(async () => {

    await RendererStreamController
        .getSingle()
        .init({
            dataManagerInitialConfig: {
                props: {
                    balance: 1e5,
                }
            },
            gameFsmInitialConfig: {
                xStateInitialConfig: gameStateMachineConfig,
                states: [
                    InitState,
                    ExitState,
                    ErrorState,
                    WelcomeState,
                    ExplorationState,
                    MiniGameState,
                    RewardCelebrationState,
                    ChestState,

                ],
            },
            uiManagerInitialConfig: {},
        });

})();
