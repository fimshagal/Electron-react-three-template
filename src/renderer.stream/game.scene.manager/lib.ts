export interface IGameSceneManager {

}

export interface GameSceneManagerInitialConfig {
    components: any[];
}

// Weak interface to override certain props of strong typed config
export interface WeakGameSceneManagerInitialConfig {
    components?: any[];
}