import { DataManagerInitialConfig, WeakDataManagerInitialConfig } from "../renderer.stream/data.manager";

export const getDataManagerInitialConfig = (overrideProps?: WeakDataManagerInitialConfig): DataManagerInitialConfig => {
    return {
        props: {
            balance: 1e5,
        },
        ...overrideProps,
    };
};