import { DataManagerInitialConfig, IDataManager, DataProps } from "./lib";
import {genSingletonLock, hasOwnProperty} from "../../utils";
import EventEmitter from "eventemitter3";
import { DataManagerEvents } from "./events";
import {DictionaryKey} from "../../lib";

const DataManagerSingletonLock: string = genSingletonLock("DataManager");

export class DataManager implements IDataManager {
    public events: EventEmitter = new EventEmitter();

    private static _instance: DataManager;

    private _isInit: boolean;
    private _props: DataProps = {
        balance: 0,
    };

    constructor(singletonLock: string) {
        if (DataManager._instance) {
            throw Error("Singleton constructor error: instance was created");
        }

        if (singletonLock !== DataManagerSingletonLock) {
            throw Error("Singleton constructor error: try multi instancing");
        }
    }

    public static getSingle(): DataManager  {
        if (!DataManager._instance) {
            DataManager._instance = new DataManager(DataManagerSingletonLock);
        }
        return DataManager._instance;
    }

    public async init(initialConfig: DataManagerInitialConfig): Promise<void> {
        if (this._isInit) {
            return;
        }

        this.applyInitialConfig(initialConfig);

        this._isInit = true;

        this.events.emit(DataManagerEvents.Init);
    }

    public updateProp(target: DictionaryKey, value: any): void {
        if (!hasOwnProperty(this._props, target.toString())) {
            return;
        }

        this._props[target] = value;
        this.events.emit(DataManagerEvents.UpdateProp, { prop: target, value });
    }

    private applyInitialConfig(initialConfig: DataManagerInitialConfig): void {
        Object
            .entries(initialConfig.props)
            .forEach(([key, value]) => this.updateProp(key, value));
    }

    public get props(): DataProps {
        return { ...this._props };
    }
}