import {FsmInitialConfig, WeakFsmInitialConfig} from "../state.transition.handler";
import {
    ChestState,
    ErrorState,
    ExitState,
    ExplorationState,
    gameStateMachineConfig,
    InitState, MiniGameState, RewardCelebrationState,
    WelcomeState
} from "../states.storage/game";

export const getGameFsmInitialConfig = (overrideProps?: WeakFsmInitialConfig): FsmInitialConfig => {
    return {
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
        ...overrideProps,
    };
};