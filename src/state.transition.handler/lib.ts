import { State } from "./";
import { Dictionary } from "../lib";

export interface IStateTransitionHandler {
    init(initConfig: StateTransitionHandlerInitConfig): void;
    transition(targetStateName: string): Promise<void>;
    update(deltaTime: number): void;
}

export interface IState {
    injectProps(props: Dictionary): void;
    onEnter(): Promise<void>;
    onExit(): Promise<void>;
    onUpdate(deltaTime: number): void;
    goTo(targetStateName: string): void;
}

export interface StateTransitionHandlerInitConfig {
    states: typeof State[];
    injectableProps?: Dictionary; // certain prop types
    actor: any;
    debug?: boolean;
}

export interface FsmInitialConfig {
    states: typeof State[];
    xStateInitialConfig: Dictionary;
}