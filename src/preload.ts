import { contextBridge, ipcRenderer} from "electron";
import { Dictionary } from "./lib";

contextBridge.exposeInMainWorld('BridgeApi', {
    send: (channel: string, data: Dictionary) => ipcRenderer.send(channel, data),
    receive: (channel: string, callback: any) => ipcRenderer.on(channel, callback),
});