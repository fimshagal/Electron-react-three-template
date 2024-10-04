import { GameSceneManagerInitialConfig, IGameSceneManager } from "./lib";
import EventEmitter from "eventemitter3";
import { genSingletonLock } from "../../utils";
import { GameSceneManagerEvents } from "./events";

const GameSceneManagerSingletonLock: string = genSingletonLock("GameSceneManager");

export class GameSceneManager implements IGameSceneManager {
    public events: EventEmitter = new EventEmitter();

    private static _instance: GameSceneManager;

    private _isInit: boolean;

    constructor(singletonLock: string) {
        if (GameSceneManager._instance) {
            throw Error("Singleton constructor error: instance was created");
        }

        if (singletonLock !== GameSceneManagerSingletonLock) {
            throw Error("Singleton constructor error: try multi instancing");
        }
    }

    public static getSingle(): GameSceneManager  {
        if (!GameSceneManager._instance) {
            GameSceneManager._instance = new GameSceneManager(GameSceneManagerSingletonLock);
        }
        return GameSceneManager._instance;
    }

    public async init(initialConfig: GameSceneManagerInitialConfig): Promise<void> {
        if (this._isInit) {
            return;
        }

        this.applyInitialConfig(initialConfig);

        this._isInit = true;

        this.events.emit(GameSceneManagerEvents.Init);
    }

    private applyInitialConfig(initialConfig: GameSceneManagerInitialConfig): void {
        // ...
    }
}