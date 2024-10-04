import { StateTransitionHandlerInitConfig } from "./lib";
import { StateTransitionHandler } from "./state.transition.handler";

export const createStateTransitionHandler = (config: StateTransitionHandlerInitConfig, autoStart?: boolean): StateTransitionHandler => {
    const instance: StateTransitionHandler = new StateTransitionHandler();

    instance.init(config);

    if (autoStart) {
        instance.start();
    }

    return instance;
};