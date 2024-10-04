import {UiManagerInitialConfig, WeakUiManagerInitialConfig} from "../renderer.stream/ui.manager";

export const getUiManagerInitialConfig = (overrideProps?: WeakUiManagerInitialConfig): UiManagerInitialConfig => {
    return {
        ...overrideProps,
    };
};