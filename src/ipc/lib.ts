export enum RendererBridgeActions {
    Unknown = "Unknown",
    ReceiveEvent = "ReceiveEvent",
    ReceiveFile = "ReceiveFile",
    ReceiveProp = "ReceiveProp",
}

export enum MainBridgeActions {
    Unknown = "Unknown",
    ReceiveEvent = "ReceiveEvent",
    Quit = "Quit",
    GetFile = "GetFile",
    GetProp = "GetProp",
    CreateFile = "CreateFile",
    UpdateProp = "UpdateProp",
}

interface BridgeAction {
    name: string;
    data?: any;
}

export interface RendererBridgeAction extends BridgeAction {
    name: RendererBridgeActions;
}

export interface MainBridgeAction extends BridgeAction {
    name: MainBridgeActions;
}