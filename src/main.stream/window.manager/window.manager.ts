import { IWindowManager, WindowManagerInitialConfig } from "./lib";
import EventEmitter from "eventemitter3";
import { genSingletonLock } from "../../utils";
import { WindowManagerEvents } from "./events";
import {Vector2} from "three";
import {Nullable} from "../../lib";
import {app, BrowserWindow} from "electron";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

// @ts-ignore
const fileName: string = fileURLToPath(import.meta.url);
const dirName: string = dirname(fileName);

const WindowManagerSingletonLock: string = genSingletonLock("WindowManager");

export class WindowManager implements IWindowManager {
    public events: EventEmitter = new EventEmitter();

    private static _instance: WindowManager;

    private _isInit: boolean;
    private _htmlSource: Nullable<any> = null;
    private _size: Nullable<Vector2> = null;
    private _window: Nullable<any> = null;

    constructor(singletonLock: string) {
        if (WindowManager._instance) {
            throw Error("Singleton constructor error: instance was created");
        }

        if (singletonLock !== WindowManagerSingletonLock) {
            throw Error("Singleton constructor error: try multi instancing");
        }
    }

    public static getSingle(): WindowManager  {
        if (!WindowManager._instance) {
            WindowManager._instance = new WindowManager(WindowManagerSingletonLock);
        }
        return WindowManager._instance;
    }

    public async init(initialConfig: WindowManagerInitialConfig): Promise<void> {
        if (this._isInit) {
            return;
        }

        this.applyInitialConfig(initialConfig);
        await app.whenReady();
        this.createWindow();

        this._isInit = true;

        this.events.emit(WindowManagerEvents.Init);
    }

    public createWindow(): void {
        this._window = new BrowserWindow({
            width: this._size.x,
            height: this._size.y,
            webPreferences: {
                preload: path.join(dirName, "preload.js"),
                nodeIntegration: false,
                contextIsolation: true,
            },
        });

        this._window.webContents.openDevTools();

        // @ts-ignore
        if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
            // @ts-ignore
            this.window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            // @ts-ignore
            this.window.loadFile(path.join(dirName, `../renderer/${MAIN_WINDOW_VITE_NAME}/${this._htmlSource}`));
        }

        this._window.on("closed", () => this._window.instance = null);
    }

    private applyInitialConfig(initialConfig: WindowManagerInitialConfig): void {
        this._size = initialConfig.size;
        this._htmlSource = initialConfig.htmlSource;
    }

    public get window(): Nullable<any> {
        return this._window;
    }
}