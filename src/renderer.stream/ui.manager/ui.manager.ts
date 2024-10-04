import {IUiManager, UiManagerInitialConfig} from "./lib";
import EventEmitter from "eventemitter3";
import {genSingletonLock} from "../../utils";
import {UiManagerEvents} from "./events";
import {Dictionary} from "../../lib";

const UiManagerSingletonLock: string = genSingletonLock("UiManager");

export class UiManager implements IUiManager {
    public events: EventEmitter = new EventEmitter();

    private static _instance: UiManager;

    private _isInit: boolean;

    constructor(singletonLock: string) {
        if (UiManager._instance) {
            throw Error("Singleton constructor error: instance was created");
        }

        if (singletonLock !== UiManagerSingletonLock) {
            throw Error("Singleton constructor error: try multi instancing");
        }
    }

    public static getSingle(): UiManager  {
        if (!UiManager._instance) {
            UiManager._instance = new UiManager(UiManagerSingletonLock);
        }
        return UiManager._instance;
    }

    public async init(initialConfig: UiManagerInitialConfig): Promise<void> {
        if (this._isInit) {
            return;
        }

        this.applyInitialConfig(initialConfig);

        this._isInit = true;

        this.events.emit(UiManagerEvents.Init);
    }

    public receiveDataManagerUpdate(updateData: Dictionary): void {
        const { prop, value } = updateData;
        console.log(`Ui Manager receive prop "${prop}" updating to ${value}`);
    }

    private applyInitialConfig(initialConfig: UiManagerInitialConfig): void {
        // ...
    }
}