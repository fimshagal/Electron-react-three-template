import { DictionaryKey } from "../../lib";

export interface IDataManager {
    init(initialConfig: DataManagerInitialConfig): Promise<void>;
    updateProp(target: DictionaryKey, value: any): void;
    get props(): DataProps;
}

export interface DataManagerInitialConfig {
    props: DataProps;
}

// Weak interface to override certain props of strong typed config
export interface WeakDataManagerInitialConfig {
    props?: DataProps;
}

export interface DataProps {
    balance: number;
}