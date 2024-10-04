import { IMainStreamController, MainStreamControllerInitialConfig, MainStreamControllerEvents} from "./";
import {MainBridgeActions, RendererBridgeAction} from "../../ipc";
import EventEmitter from "eventemitter3";
import {delay, genSingletonLock} from "../../utils";
import { app, BrowserWindow, ipcMain } from "electron";
import {WindowManager, WindowManagerInitialConfig} from "../window.manager";
import {Nullable} from "../../lib";

const MainStreamControllerSingletonLock: string = genSingletonLock("MainStreamController");

export class MainStreamController implements IMainStreamController {
    public events: EventEmitter = new EventEmitter();

    private static _instance: MainStreamController;

    private _isInit: boolean;
    private _singleAppLock: any;

    private _windowManagerInitialConfig: Nullable<WindowManagerInitialConfig> = null;
    private _windowManager: WindowManager = WindowManager.getSingle();

    constructor(singletonLock: string) {
        if (MainStreamController._instance) {
            throw Error("Singleton constructor error: instance was created");
        }

        if (singletonLock !== MainStreamControllerSingletonLock) {
            throw Error("Singleton constructor error: try multi instancing");
        }
    }

    public static getSingle(): MainStreamController  {
        if (!MainStreamController._instance) {
            MainStreamController._instance = new MainStreamController(MainStreamControllerSingletonLock);
        }
        return MainStreamController._instance;
    }

    public async init(initialConfig: MainStreamControllerInitialConfig): Promise<void> {
        if (this._isInit) {
            return;
        }

        this._singleAppLock = app.requestSingleInstanceLock();

        if (!this._singleAppLock) {
            this.quit();
            return;
        }

        this.applyInitialConfig(initialConfig);

        await this.initManagers();
        this.listenApp();

        ipcMain.on("action", this.handleReceivedAction.bind(this));

        this._isInit = true;

        this.events.emit(MainStreamControllerEvents.Init);
    }

    public quit(): void {
        app.quit();
    }

    private requestRendererAction(action: RendererBridgeAction): void {
        this._windowManager.window!.webContents?.send('action', action);
    }

    private applyInitialConfig(initialConfig: MainStreamControllerInitialConfig): void {
        this._windowManagerInitialConfig = initialConfig.windowManagerInitialConfig;
    }

    private async initManagers(): Promise<void> {
        await this._windowManager.init(this._windowManagerInitialConfig);
    }

    private handleReceivedAction(event, action): void {
        switch (action.name) {
            case MainBridgeActions.ReceiveEvent:
                console.log(`Received renderer stream's event "${action.data.event}"`);
                break;
            case MainBridgeActions.Quit:
                this.quit();
                break;
        }
    }

    private listenApp(): void {
        app.on("window-all-closed", (): void => {
            if (process.platform !== "darwin") {
                this.quit();
            }
        });

        app.on("activate", (): void => {
            if (BrowserWindow.getAllWindows().length === 0) {
                this._windowManager.createWindow();
            }
        });

        app.on("before-quit", (): void => {
            // ... some stuff before quit
        });

        app.on("will-finish-launching", (): void => {
            // ... some stuff for MacOS for future maybe...
        });

        app.on("second-instance", (): void => {
            if (!this._windowManager.window) return;

            if (this._windowManager.window.isMinimized()) {
                this._windowManager.window.restore();
                this._windowManager.window.focus();
            }
        });
    }
}