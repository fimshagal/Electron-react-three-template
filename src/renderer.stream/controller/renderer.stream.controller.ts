import { IRendererStreamController, RendererStreamControllerEvents, RendererStreamControllerInitialConfig } from "./";
import EventEmitter from "eventemitter3";
import { genSingletonLock } from "../../utils";
import { MainBridgeAction, MainBridgeActions, RendererBridgeActions } from "../../ipc";
import { DataManager, DataManagerEvents, DataManagerInitialConfig } from "../data.manager";
import { Nullable } from "../../lib";
import { createMachine, createActor } from "xstate";
import { FsmInitialConfig, StateTransitionHandler, createStateTransitionHandler } from "../../state.transition.handler";
import { GameInjectableProps } from "../../states.storage/game";
import { UiManager, UiManagerInitialConfig } from "../ui.manager";
import {GameSceneManager, GameSceneManagerInitialConfig} from "../game.scene.manager";

const RendererStreamControllerSingletonLock: string = genSingletonLock("RendererStreamController");

export class RendererStreamController implements IRendererStreamController {
    public events: EventEmitter = new EventEmitter();

    private static _instance: RendererStreamController;

    private _isInit: boolean;

    private _dataManagerInitialConfig: Nullable<DataManagerInitialConfig> = null;
    private _dataManager: DataManager = DataManager.getSingle();

    private _uiManagerInitialConfig: Nullable<UiManagerInitialConfig> = null;
    private _uiManager: UiManager = UiManager.getSingle();

    private _gameSceneManagerInitialConfig: Nullable<GameSceneManagerInitialConfig> = null;
    private _gameSceneManager: GameSceneManager = GameSceneManager.getSingle();

    private _gameFsmInitialConfig: Nullable<FsmInitialConfig> = null;
    private _gameStateMachine: Nullable<any> = null;
    private _gameStateMachineActor: Nullable<any> = null;
    private _gameStateTransitionHandler: Nullable<StateTransitionHandler> = null;

    constructor(singletonLock: string) {
        if (RendererStreamController._instance) {
            throw Error("Singleton constructor error: instance was created");
        }

        if (singletonLock !== RendererStreamControllerSingletonLock) {
            throw Error("Singleton constructor error: try multi instancing");
        }
    }

    public static getSingle(): RendererStreamController  {
        if (!RendererStreamController._instance) {
            RendererStreamController._instance = new RendererStreamController(RendererStreamControllerSingletonLock);
        }
        return RendererStreamController._instance;
    }

    public requestMainAction(action: MainBridgeAction): void {
        window.BridgeApi.send('action', action);
    }

    public async init(initialConfig: RendererStreamControllerInitialConfig): Promise<void> {
        if (this._isInit) {
            return;
        }

        this.applyInitialConfig(initialConfig);
        await this.initManagers();
        this.listenDataManager();

        window.BridgeApi.receive("action", this.handleOnReceiveAction.bind(this));

        this.initGameStateMachine();

        this._isInit = true;

        this.events.emit(RendererStreamControllerEvents.Init);

        this.requestMainAction({
            name: MainBridgeActions.ReceiveEvent,
            data: {
                event: RendererStreamControllerEvents.Init,
                timestamp: Date.now(),
            },
        });
    }

    private async initManagers(): Promise<void> {
        await this._dataManager.init(this._dataManagerInitialConfig);
        await this._uiManager.init(this._uiManagerInitialConfig);
        await this._gameSceneManager.init(this._gameSceneManagerInitialConfig);
    }

    private listenDataManager(): void {
        this._dataManager.events.on(DataManagerEvents.UpdateProp, (response): void => {
            this._uiManager.receiveDataManagerUpdate(response);
        });
    }

    private initGameStateMachine(): void {
        this._gameStateMachine = createMachine(this._gameFsmInitialConfig.xStateInitialConfig);
        this._gameStateMachineActor = createActor(this._gameStateMachine);

        const injectableProps: GameInjectableProps = {
            dataManager: this._dataManager,
            uiManager: this._uiManager,
            toolkit: {
                requestMainAction: this.requestMainAction.bind(this),
            },
        };

        this._gameStateTransitionHandler = createStateTransitionHandler({
            states: this._gameFsmInitialConfig.states,
            injectableProps,
            actor: this._gameStateMachineActor,
            debug: true,
        }, true);
    }

    private applyInitialConfig(initialConfig: RendererStreamControllerInitialConfig): void {
        this._dataManagerInitialConfig = initialConfig.dataManagerInitialConfig;
        this._gameFsmInitialConfig = initialConfig.gameFsmInitialConfig;
        this._uiManagerInitialConfig = initialConfig.uiManagerInitialConfig;
        this._gameSceneManagerInitialConfig = initialConfig.gameSceneManagerInitialConfig;
    }

    private handleOnReceiveAction(event, action): void {
        switch (action.name) {
            case RendererBridgeActions.ReceiveEvent:
                console.log(`Received main stream's event "${action.data.event}"`);
                break;
            case RendererBridgeActions.ReceiveFile:
                break;
            case RendererBridgeActions.ReceiveProp:
                break;
            case RendererBridgeActions.Unknown:
            default:
                break;
        }
    }
}