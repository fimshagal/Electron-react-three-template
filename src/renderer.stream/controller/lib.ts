import { DataManagerInitialConfig } from "../data.manager";
import { FsmInitialConfig } from "../../state.transition.handler";
import { UiManagerInitialConfig } from "../ui.manager";

export interface IRendererStreamController {}

export interface RendererStreamControllerInitialConfig {
    dataManagerInitialConfig: DataManagerInitialConfig;
    gameFsmInitialConfig: FsmInitialConfig;
    uiManagerInitialConfig: UiManagerInitialConfig;
}