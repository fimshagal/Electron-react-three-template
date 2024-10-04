export interface IGameSceneManager {
    init(initialConfig: GameSceneManagerInitialConfig): Promise<void>;
}

export interface GameSceneManagerInitialConfig {
    components: any[];
}

// Weak interface to override certain props of strong typed config
export interface WeakGameSceneManagerInitialConfig {
    components?: any[];
}